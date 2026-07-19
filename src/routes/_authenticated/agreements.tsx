import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { listCustomers, sendOtp, verifyOtp, generateNdc, generateRestructuring, generateMoratorium } from "@/lib/customers.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Loader2, Mail, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/agreements")({
  head: () => ({ meta: [{ title: "Agreements — Narainsons" }] }),
  component: AgreementsPage,
});

type AgreementType = "ndc" | "restructuring" | "moratorium";

function AgreementsPage() {
  const [tab, setTab] = useState("emi");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  const listFn = useServerFn(listCustomers);
  const sendOtpFn = useServerFn(sendOtp);
  const verifyOtpFn = useServerFn(verifyOtp);
  const genNdc = useServerFn(generateNdc);
  const genRe = useServerFn(generateRestructuring);
  const genMora = useServerFn(generateMoratorium);

  const { data: customers, isLoading, refetch } = useQuery({ queryKey: ["customers"], queryFn: () => listFn() });

  const sendOtpMutation = useMutation({
    mutationFn: (v: { customerId: number; email: string; agreementType: string }) => sendOtpFn({ data: v }),
    onSuccess: (r, v) => {
      setSelectedId(v.customerId);
      setGeneratedOtp(r.otp);
      toast.success("OTP generated");
    },
    onError: () => toast.error("Failed to generate OTP"),
  });

  const openDoc = (html: string) => {
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  const generateFor = (type: AgreementType, customerId: number, otp: string) =>
    type === "ndc" ? genNdc({ data: { customerId } })
    : type === "restructuring" ? genRe({ data: { customerId, otp } })
    : genMora({ data: { customerId, otp } });

  const handleVerify = async (type: AgreementType) => {
    if (!selectedId || !otpValue) return toast.error("Enter OTP");
    try {
      await verifyOtpFn({ data: { customerId: selectedId, otp: otpValue } });
      const result = await generateFor(type, selectedId, otpValue);
      openDoc(result.html);
      toast.success("Verified — agreement ready");
      setSelectedId(null); setOtpValue(""); setGeneratedOtp(null);
      await refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Verification failed");
    }
  };

  const handleView = async (type: AgreementType, customerId: number, verifiedOtp: string) => {
    try {
      const result = await generateFor(type, customerId, verifiedOtp);
      openDoc(result.html);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to open agreement");
    }
  };

  const filter = (type: string) => (customers ?? []).filter(c =>
    type === "emi" ? c.status === "EMI" || c.status === "Restructuring"
    : type === "mora" ? c.status === "Moratorium"
    : c.status === "Closed"
  );

  const agreementFor = (type: string): AgreementType =>
    type === "emi" ? "restructuring" : type === "mora" ? "moratorium" : "ndc";

  const renderRows = (type: string) => {
    const list = filter(type);
    if (list.length === 0) return <div className="text-center py-12 text-muted-foreground">No customers in this category</div>;
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-navy-mid/70 text-accent">
            <tr>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Account</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c, idx) => (
              <tr key={c.id} className="table-row-anim border-b border-border/50 hover:bg-secondary/40 transition" style={{ animationDelay: `${idx * 40}ms` }}>
                <td className="px-6 py-3 text-sm font-medium">{c.name}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground font-mono">{c.oldAccountNumber}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground">{c.email}</td>
                <td className="px-6 py-3 text-sm">₹{c.pendingAmount || "-"}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {c.otpVerified === 1 && c.verifiedOtp ? (
                      <Button size="sm" className="btn-gold" onClick={() => handleView(agreementFor(type), c.id, c.verifiedOtp!)}>
                        <FileText className="w-3.5 h-3.5 mr-1" /> View Agreement
                      </Button>
                    ) : null}
                    <Button size="sm" variant="outline" disabled={sendOtpMutation.isPending} onClick={() => sendOtpMutation.mutate({ customerId: c.id, email: c.email, agreementType: agreementFor(type) })}>
                      <Mail className="w-3.5 h-3.5" /> {c.otpVerified === 1 ? "Re-verify" : "Send OTP"}
                    </Button>
                    {selectedId === c.id && (
                      <>
                        {generatedOtp && (
                          <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 rounded-md px-2 py-1 text-xs anim-fade-in">
                            <span className="font-mono font-bold text-accent">{generatedOtp}</span>
                            <button onClick={() => { navigator.clipboard.writeText(generatedOtp); toast.success("Copied"); }} className="text-muted-foreground hover:text-accent"><Copy className="w-3 h-3" /></button>
                          </div>
                        )}
                        <Input value={otpValue} onChange={e => setOtpValue(e.target.value)} placeholder="OTP" maxLength={6} className="w-24 h-8" />
                        <Button size="sm" className="btn-gold" onClick={() => handleVerify(agreementFor(type))}>
                          <FileText className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="text-foreground">
      <div className="hero-panel">
        <div className="container-lg py-10">
          <h1 className="text-3xl font-bold text-white anim-slide-up">Digital Agreements</h1>
          <p className="text-blue-100/80 mt-2 anim-slide-up" style={{ animationDelay: "80ms" }}>Manage EMI, Moratorium, and NDC agreements with OTP-signed workflows</p>
        </div>
      </div>
      <div className="container-lg py-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-3 mb-6 glass-panel p-1 rounded-lg">
            <TabsTrigger value="emi" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md">EMI &amp; Restructuring</TabsTrigger>
            <TabsTrigger value="mora" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md">Moratorium</TabsTrigger>
            <TabsTrigger value="ndc" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-md">Closed / NDC</TabsTrigger>
          </TabsList>
          {(["emi", "mora", "ndc"] as const).map(v => (
            <TabsContent key={v} value={v}>
              <Card className="glass-panel overflow-hidden">
                {isLoading ? <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div> : renderRows(v)}
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="glass-panel p-6 mt-8 anim-slide-up">
          <h3 className="text-lg font-semibold text-accent mb-3">How Digital Signing Works</h3>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Click "Send OTP" — a 6-digit code is generated and logged.</li>
            <li>Share the code with the customer for verification.</li>
            <li>Enter the OTP and click the document icon to render the signed agreement.</li>
            <li>Print or download from the browser print dialog.</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
