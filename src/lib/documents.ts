// Document HTML generators - styled to match the official Narainsons templates
export type CustomerDoc = {
  name: string;
  email: string;
  phone?: string | null;
  pan?: string | null;
  address?: string | null;
  oldAccountNumber: string;
  newAccountNumber?: string | null;
  pendingAmount?: string | null;
  emiAmount?: string | null;
  tenure?: string | null;
  nextEmiDate?: string | null;
  moratiumStartDate?: string | null;
  moratiumEndDate?: string | null;
  serialNumber?: string | null;
};

const COMPANY_NAME = "Narainsons Investments Finance and Consultancy Pvt. Ltd.";
const COMPANY_ADDRESS = "Plot No. 40 & 41, Kh No. 14/11, G/F Front Side, German Nagar, Old Khaira Road, Najafgarh, New Delhi – 110043";
const BRAND_BLUE = "#2E5AAC";
const BRAND_DARK = "#1F3D7A";

const BASE_CSS = `
  * { box-sizing: border-box; }
  body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; background: #e9ecef; margin: 0; padding: 24px; color: #111; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto 24px auto; background: #fff; position: relative; box-shadow: 0 8px 30px rgba(0,0,0,0.15); overflow: hidden; page-break-after: always; }
  .content { position: relative; z-index: 2; padding: 70px 70px 90px 70px; }
  .watermark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1; pointer-events: none; opacity: 0.06; font-size: 130px; font-weight: 800; color: ${BRAND_BLUE}; letter-spacing: 6px; transform: rotate(-18deg); font-family: 'Georgia', serif; }
  h1.doc-title { text-align: center; font-size: 44px; font-weight: 800; color: ${BRAND_BLUE}; margin: 0 0 8px 0; letter-spacing: -0.5px; }
  .title-rule { height: 2px; background: linear-gradient(90deg, transparent, ${BRAND_BLUE}, transparent); margin: 0 auto 30px auto; width: 92%; }
  h2.section { text-align: center; color: ${BRAND_DARK}; font-size: 26px; margin: 26px 0 14px; text-decoration: underline; font-weight: 700; }
  .party { font-size: 15px; line-height: 1.9; margin: 6px 0; }
  .party b, .party strong { font-weight: 700; }
  .divider { height: 1px; background: #cfd4dc; margin: 22px 0; }
  table.detail { width: 100%; border-collapse: collapse; margin: 8px 0 18px; font-size: 15px; }
  table.detail th { text-align: left; padding: 10px 14px; font-weight: 700; color: #111; border-bottom: 1.5px solid #d0d5dd; background: transparent; }
  table.detail td { padding: 9px 14px; vertical-align: top; border-bottom: 1px dashed #e3e6eb; }
  table.detail td.k { color: #333; width: 45%; }
  table.detail td.v { font-weight: 700; }
  .note { font-style: italic; color: #444; font-size: 14px; margin-top: 10px; }
  ul.terms { font-size: 15px; line-height: 1.9; padding-left: 22px; }
  ul.terms li { margin-bottom: 6px; }
  .signatures { margin-top: 46px; display: flex; justify-content: space-between; gap: 30px; font-size: 14px; }
  .sig-box { flex: 1; }
  .stamp { border: 2px dashed #1a7f37; padding: 10px 12px; color: #1a7f37; font-family: 'Courier New', monospace; font-weight: 700; background: #f0fdf4; margin-top: 10px; font-size: 12px; border-radius: 4px; }
  .page-num { position: absolute; bottom: 30px; right: 60px; font-size: 12px; color: #667085; }
  .badge { display:inline-block; background:${BRAND_BLUE}; color:#fff; padding:3px 10px; border-radius:999px; font-size:11px; letter-spacing:1px; }
  @media print { body { background: #fff; padding: 0; } .page { box-shadow: none; margin: 0; } .no-print { display: none; } }
`;

const NDC_CSS = `
  * { box-sizing: border-box; }
  body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; background: #e9ecef; margin: 0; padding: 24px; color: #111; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.15); overflow: hidden; position:relative; }
  .content { padding: 40px 55px 40px 55px; }
  .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
  .logo-wrap { display:flex; flex-direction:column; align-items:center; }
  .logo-mark { width: 90px; height: 90px; background: linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_DARK}); border-radius: 8px; color: #fff; display:flex; align-items:center; justify-content:center; font-family:'Georgia',serif; font-weight: 800; font-size: 44px; box-shadow: 0 4px 12px rgba(46,90,172,0.3); }
  .logo-text { color: ${BRAND_BLUE}; font-weight: 700; margin-top: 6px; font-size: 15px; }
  .co-block { flex: 1; }
  .co-header { background: #f2f4f7; border: 1px solid #d0d5dd; text-align: center; padding: 10px 14px; }
  .co-header h2 { margin: 0; color: ${BRAND_DARK}; font-size: 17px; letter-spacing: 0.5px; font-weight: 800; }
  .co-header .cin { color: ${BRAND_DARK}; font-size: 13px; margin-top: 4px; font-weight: 700; }
  .co-address { font-size: 13px; line-height: 1.6; padding: 10px 4px 0; color: #222; }
  .co-address b { font-weight: 700; }
  .srno { border: 1px solid #101828; padding: 6px 10px; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .hr-line { border: none; border-top: 2px solid #101828; margin: 18px 0 26px; }
  h1.ndc { text-align: center; font-size: 46px; font-weight: 400; margin: 20px 0 40px; color: #111; }
  .ndc-body { font-size: 17px; line-height: 1.75; }
  .ndc-body p { margin: 12px 0; }
  .ndc-subject { text-decoration: underline; font-size: 18px; margin: 22px 0 4px; }
  .ndc-loan { font-size: 17px; margin: 0 0 20px; }
  .ndc-note { text-align:center; font-style: italic; color: #444; margin-top: 60px; font-size: 14px; }
  .footer-band { border: 1px solid #d0d5dd; background: #f2f4f7; text-align: center; padding: 16px; margin: 40px 55px 40px; font-weight: 800; font-size: 22px; color: #111; }
  @media print { body { background: #fff; padding: 0; } .page { box-shadow: none; } .no-print { display: none; } }
`;

const printButton = (label: string) => `<div class="no-print" style="text-align:center;position:fixed; right:20px; top:20px; z-index:999;"><button onclick="window.print()" style="padding:12px 18px;background:${BRAND_BLUE};color:white;border:none;border-radius:6px;font-size:14px;cursor:pointer;box-shadow:0 4px 12px rgba(46,90,172,0.3);">🖨️ ${label}</button></div>`;

const watermark = `<div class="watermark">NARAINSONS</div>`;

const IST_OPTS = { timeZone: "Asia/Kolkata" } as const;
const istDate = () => new Date().toLocaleDateString("en-IN", IST_OPTS);
const istTime = () => new Date().toLocaleTimeString("en-IN", { ...IST_OPTS, hour12: true });

export function generateNdcHtml(customer: CustomerDoc): string {
  const dateStr = new Date().toLocaleDateString("en-GB", IST_OPTS).replace(/\//g, "-");
  return `<!DOCTYPE html><html><head><title>NDC - ${customer.name}</title><style>${NDC_CSS}</style></head><body>
    <div class="page">
      <div class="content">
        <div class="top">
          <div class="logo-wrap">
            <div class="logo-mark">N</div>
            <div class="logo-text">Narainsons</div>
          </div>
          <div class="co-block">
            <div style="display:flex; justify-content:flex-end; margin-bottom:8px;"><div class="srno">SRNO- ${customer.serialNumber || "-"}</div></div>
            <div class="co-header">
              <h2>NARAINSONS INVESTMENTS FINANCE AND CONSULTANCY PVT LTD</h2>
              <div class="cin">CIN NO. U74899DL1995PTC067793</div>
            </div>
            <div class="co-address">
              <b>Address</b> : Plot no-40, Khasra no. 14/11, German Nagar, Old Khaira Road, Najafgarh, New Delhi 110043<br>
              <b>Phone Number:</b> +91 9319-223024, <b>Email</b> : info.narainsons@gmail.com, <b>Website</b> : Narainsons.in
            </div>
          </div>
        </div>
        <hr class="hr-line">
        <h1 class="ndc">No Due Certificate</h1>
        <div class="ndc-body">
          <p>Date: ${dateStr}</p>
          <p><strong>${customer.name.toUpperCase()}</strong><br>${customer.address || ""}</p>
          <div class="ndc-subject">Subject: No Due Certificate for Loan Number –</div>
          <div class="ndc-loan">${customer.oldAccountNumber}</div>
          <p>Dear Sir/Madam,</p>
          <p>This letter is to certify that Mr./Ms. <strong>${customer.name.toUpperCase()}</strong> maintained the Loan Number: <strong>${customer.oldAccountNumber}</strong> with Narainsons Investment Finance Pvt Ltd. As of this date, there are no outstanding liabilities, and the aforementioned loan has been fully repaid.</p>
          <p>Thank you.<br>For Narainsons Investment Finance Pvt Ltd</p>
          <div class="ndc-note">*This is a system-generated document and does not require any seal or signature.*</div>
        </div>
      </div>
      <div class="footer-band">Fueling Ambitions with Flexible Finance</div>
    </div>
    ${printButton("PRINT NDC")}
  </body></html>`;
}

export function generateRestructuringHtml(customer: CustomerDoc, otp: string): string {
  const dateStr = istDate();
  const timeStr = istTime();
  const tenureNum = parseInt(customer.tenure || "11");
  let scheduleHtml = "";
  try {
    const nextDate = new Date(customer.nextEmiDate || new Date().toISOString());
    for (let i = 0; i < tenureNum; i++) {
      const emiDate = new Date(nextDate);
      emiDate.setMonth(emiDate.getMonth() + i);
      scheduleHtml += `<tr><td>${i + 1}</td><td>${emiDate.toLocaleDateString("en-IN")}</td><td>₹ ${customer.emiAmount || "0"}</td></tr>`;
    }
  } catch { scheduleHtml = `<tr><td colspan='3'>Date format error.</td></tr>`; }

  return `<!DOCTYPE html><html><head><title>Restructure - ${customer.name}</title><style>${BASE_CSS}</style></head><body>
    <div class="page">
      ${watermark}
      <div class="content">
        <h1 class="doc-title">Loan Restructuring Agreement</h1>
        <div class="title-rule"></div>
        <h2 class="section">Between</h2>
        <div class="party"><u>Lender</u>: <em>${COMPANY_NAME}</em></div>
        <div class="party">Registered Office: ${COMPANY_ADDRESS}</div>
        <div style="height:20px"></div>
        <div class="party"><u>Borrower</u> &nbsp;&nbsp; <strong>${customer.name.toUpperCase()}</strong></div>
        <div class="party"><strong>PAN</strong>: <strong>${customer.pan || "-"}</strong></div>
        <div class="party"><strong>Address</strong>: <strong>${(customer.address || "-").toUpperCase()}</strong></div>
        <div class="divider"></div>
        <h2 class="section">Loan Details</h2>
        <table class="detail">
          <tr><th>Particular</th><th>Details</th></tr>
          <tr><td class="k">Old Loan Account No.</td><td class="v">${customer.oldAccountNumber}</td></tr>
          <tr><td class="k">New Loan Account No.</td><td class="v">${customer.newAccountNumber || "-"}</td></tr>
          <tr><td class="k">Restructured Loan Amount</td><td class="v">₹ ${customer.pendingAmount || "0"}</td></tr>
          <tr><td class="k">EMI Amount</td><td class="v">₹ ${customer.emiAmount || "0"}</td></tr>
          <tr><td class="k">Tenure</td><td class="v">${tenureNum.toString().padStart(2, "0")} Months</td></tr>
          <tr><td class="k">First EMI Date</td><td class="v">${customer.nextEmiDate || "-"}</td></tr>
          <tr><td class="k">Total Payable</td><td class="v">₹${customer.pendingAmount || "0"} (Principal + Interest)</td></tr>
        </table>
        <div class="note">Note: The old loan will be closed and adjusted under this new loan. No additional funds will be disbursed.</div>
      </div>
      <div class="page-num">Page 1 of 3</div>
    </div>

    <div class="page">${watermark}<div class="content">
      <h1 class="doc-title" style="font-size:34px;">EMI Repayment Schedule</h1>
      <div class="title-rule"></div>
      <table class="detail">
        <tr><th>Installment No.</th><th>EMI Date</th><th>EMI Amount</th></tr>
        ${scheduleHtml}
      </table>
    </div><div class="page-num">Page 2 of 3</div></div>

    <div class="page">${watermark}<div class="content">
      <h2 class="section" style="text-align:left; text-decoration:underline;">Key Terms</h2>
      <ul class="terms">
        <li>Borrower agrees to repay <strong>₹${customer.pendingAmount || "0"}</strong> in <strong>${tenureNum.toString().padStart(2, "0")}</strong> monthly EMIs.</li>
        <li>Delay in payment will attract a <strong>penalty charge of 0.5% per day</strong> on the due amount.</li>
        <li>Continued default may result in legal action and a higher interest penalty as per company policy.</li>
        <li>Loan tenure will not exceed 12 months.</li>
        <li>Repayment must be made directly to the lender's approved bank account.</li>
        <li>Borrower must maintain active employment status and update the lender of any changes.</li>
        <li>Lender reserves the right to perform credit checks at any time.</li>
      </ul>
      <div style="margin-top:18px;"><strong>Legal Clause</strong><br>This Agreement is governed by the laws of <strong>India</strong>, and any disputes shall fall under the <strong>jurisdiction of courts in Noida.</strong></div>
      <div class="signatures">
        <div class="sig-box">For ${COMPANY_NAME}<br><br><em>(Authorized Signatory – Digitally Signed)</em></div>
        <div class="sig-box">For Borrower: <strong>${customer.name}</strong><br><em>(Digitally Signed)</em>
          <div class="stamp">✔ DIGITALLY SIGNED VIA OTP<br>OTP: ${otp} | DATE: ${dateStr}<br>TIME: ${timeStr}</div>
        </div>
      </div>
    </div><div class="page-num">Page 3 of 3</div></div>

    ${printButton("PRINT AGREEMENT")}
  </body></html>`;
}

export function generateMoratoriumHtml(customer: CustomerDoc, otp: string): string {
  const dateStr = istDate();
  const timeStr = istTime();
  const tenureNum = parseInt(customer.tenure || "11");
  const dateRow = customer.moratiumStartDate && customer.moratiumEndDate
    ? `<tr><td class="k">Moratorium Start / End</td><td class="v">${customer.moratiumStartDate} → ${customer.moratiumEndDate}</td></tr>` : "";

  return `<!DOCTYPE html><html><head><title>Moratorium - ${customer.name}</title><style>${BASE_CSS}</style></head><body>
    <div class="page">${watermark}
      <div class="content">
        <h1 class="doc-title">Loan Moratorium Agreement</h1>
        <div class="title-rule"></div>
        <div class="party"><strong>Between</strong></div>
        <div class="party"><strong>Lender:</strong> ${COMPANY_NAME}</div>
        <div class="party"><strong>Registered Office:</strong> ${COMPANY_ADDRESS}</div>
        <div class="party"><strong>Borrower:</strong> ${customer.name.toUpperCase()}</div>
        <div class="party"><strong>PAN:</strong> ${customer.pan || "-"}</div>
        <div class="party"><strong>Address:</strong> ${customer.address || "-"}</div>
        <div class="divider"></div>
        <h2 class="section" style="text-align:left; text-decoration:none; color:#111; font-size:28px;">Loan Details</h2>
        <table class="detail">
          <tr><th>Particular</th><th>Details</th></tr>
          <tr><td class="k">Old Loan Account No.</td><td class="v">${customer.oldAccountNumber}</td></tr>
          <tr><td class="k">New Loan Account No.</td><td class="v">${customer.newAccountNumber || "-"}</td></tr>
          <tr><td class="k">Moratorium Deposit</td><td class="v">₹1,000 (Safety Deposit)</td></tr>
          <tr><td class="k">Moratorium Period</td><td class="v">${tenureNum} Months</td></tr>
          ${dateRow}
          <tr><td class="k">Full Overdue Amount Payable After Moratorium</td><td class="v">₹${customer.pendingAmount || "0"}</td></tr>
        </table>
        <div class="note"><strong>Note:</strong> The old loan will be closed and adjusted under this new moratorium arrangement. No additional funds will be disbursed.</div>
        <div class="divider"></div>
        <h2 class="section" style="text-align:left; text-decoration:none; color:#111; font-size:28px;">Key Terms</h2>
        <ul class="terms">
          <li>Borrower agrees to deposit ₹1,000 as a safety deposit at the time of signing this agreement.</li>
          <li>Moratorium period of ${tenureNum} months is granted, during which no EMI payment is required.</li>
          <li>After completion of the ${tenureNum}-month moratorium, the borrower must pay the full overdue amount.</li>
        </ul>
      </div>
      <div class="page-num">Page 1 of 2</div>
    </div>

    <div class="page">${watermark}<div class="content">
      <ul class="terms">
        <li>Delay in post-moratorium payment will attract a penalty as per company policy.</li>
        <li>Borrower must maintain accurate personal information and update the lender on any changes.</li>
        <li>Repayment must be made directly to the lender's approved bank account.</li>
        <li>Lender reserves the right to perform credit verification at any time.</li>
      </ul>
      <div style="margin-top:22px;"><strong>Legal Clause</strong><br>This Agreement is governed by the laws of India, and any disputes shall fall under the jurisdiction of courts in Noida.</div>
      <div class="signatures">
        <div class="sig-box"><strong>For ${COMPANY_NAME}</strong><br><br>(Authorized Signatory – Digitally Signed)</div>
        <div class="sig-box"><strong>For Borrower: ${customer.name.toUpperCase()}</strong><br>(Digitally Signed)
          <div class="stamp">✔ DIGITALLY SIGNED VIA OTP<br>OTP: ${otp} | DATE: ${dateStr}<br>TIME: ${timeStr}</div>
        </div>
      </div>
      <div style="margin-top:30px; font-size:14px;"><strong>Date:</strong> <u>${dateStr}</u> &nbsp;&nbsp; <strong>TIME:</strong> <u>${timeStr}</u></div>
    </div><div class="page-num">Page 2 of 2</div></div>

    ${printButton("PRINT AGREEMENT")}
  </body></html>`;
}

export function generateTopUpHtml(customer: CustomerDoc, otp: string): string {
  const dateStr = istDate();
  const timeStr = istTime();
  const tenureNum = Math.max(1, parseInt(customer.tenure || "12"));

  // Top-Up logic: existing loan + equal top-up = combined principal, interest applied on total.
  const existingLoan = parseFloat((customer.pendingAmount || "0").replace(/[^0-9.]/g, "")) || 0;
  const topUpAmount = existingLoan; // top-up equal to existing outstanding
  const totalPrincipal = existingLoan + topUpAmount;
  const annualRate = 0.18; // 18% p.a.
  const r = annualRate / 12;
  // Reducing balance EMI formula
  const emi = totalPrincipal > 0
    ? (totalPrincipal * r * Math.pow(1 + r, tenureNum)) / (Math.pow(1 + r, tenureNum) - 1)
    : 0;
  const totalPayable = emi * tenureNum;
  const totalInterest = totalPayable - totalPrincipal;
  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const emiRounded = Math.round(emi);

  let scheduleHtml = "";
  try {
    const nextDate = new Date(customer.nextEmiDate || new Date().toISOString());
    for (let i = 0; i < tenureNum; i++) {
      const emiDate = new Date(nextDate);
      emiDate.setMonth(emiDate.getMonth() + i);
      scheduleHtml += `<tr><td>${i + 1}</td><td>${emiDate.toLocaleDateString("en-IN")}</td><td>₹ ${fmt(emiRounded)}</td></tr>`;
    }
  } catch { scheduleHtml = `<tr><td colspan='3'>Date format error.</td></tr>`; }

  return `<!DOCTYPE html><html><head><title>Top-Up Loan - ${customer.name}</title><style>${BASE_CSS}</style></head><body>
    <div class="page">${watermark}
      <div class="content">
        <h1 class="doc-title">Loan Top-Up Agreement</h1>
        <div class="title-rule"></div>
        <h2 class="section">Between</h2>
        <div class="party"><u>Lender</u>: <em>${COMPANY_NAME}</em></div>
        <div class="party">Registered Office: ${COMPANY_ADDRESS}</div>
        <div style="height:20px"></div>
        <div class="party"><u>Borrower</u> &nbsp;&nbsp; <strong>${customer.name.toUpperCase()}</strong></div>
        <div class="party"><strong>PAN</strong>: <strong>${customer.pan || "-"}</strong></div>
        <div class="party"><strong>Address</strong>: <strong>${(customer.address || "-").toUpperCase()}</strong></div>
        <div class="divider"></div>
        <h2 class="section">Top-Up Loan Details</h2>
        <table class="detail">
          <tr><th>Particular</th><th>Details</th></tr>
          <tr><td class="k">Existing Loan Account No.</td><td class="v">${customer.oldAccountNumber}</td></tr>
          <tr><td class="k">Top-Up Loan Account No.</td><td class="v">${customer.newAccountNumber || "-"}</td></tr>
          <tr><td class="k">Existing Outstanding Loan</td><td class="v">₹ ${fmt(existingLoan)}</td></tr>
          <tr><td class="k">Additional Top-Up Sanctioned</td><td class="v">₹ ${fmt(topUpAmount)}</td></tr>
          <tr><td class="k"><strong>Combined Principal (Existing + Top-Up)</strong></td><td class="v"><strong>₹ ${fmt(totalPrincipal)}</strong></td></tr>
          <tr><td class="k">Interest Rate</td><td class="v">${(annualRate * 100).toFixed(2)}% p.a. (reducing balance)</td></tr>
          <tr><td class="k">Total Interest Payable</td><td class="v">₹ ${fmt(totalInterest)}</td></tr>
          <tr><td class="k">Total Amount Repayable</td><td class="v">₹ ${fmt(totalPayable)}</td></tr>
          <tr><td class="k">Tenure Chosen by Borrower</td><td class="v">${tenureNum.toString().padStart(2, "0")} Months</td></tr>
          <tr><td class="k"><strong>Monthly EMI</strong></td><td class="v"><strong>₹ ${fmt(emiRounded)}</strong></td></tr>
          <tr><td class="k">First EMI Date</td><td class="v">${customer.nextEmiDate || "-"}</td></tr>
        </table>
        <div class="note">Note: The existing outstanding loan of ₹${fmt(existingLoan)} is combined with an equal top-up of ₹${fmt(topUpAmount)}. Interest at ${(annualRate * 100).toFixed(2)}% p.a. is applied on the combined principal of ₹${fmt(totalPrincipal)}, and the EMI is derived from the tenure of ${tenureNum} months selected by the borrower.</div>
      </div>
      <div class="page-num">Page 1 of 2</div>
    </div>

    <div class="page">${watermark}<div class="content">
      <h1 class="doc-title" style="font-size:32px;">EMI Repayment Schedule</h1>
      <div class="title-rule"></div>
      <table class="detail">
        <tr><th>Installment No.</th><th>EMI Date</th><th>EMI Amount</th></tr>
        ${scheduleHtml}
      </table>
      <h2 class="section" style="text-align:left; text-decoration:underline; margin-top:24px;">Key Terms</h2>
      <ul class="terms">
        <li>Borrower agrees to repay the combined principal of <strong>₹${fmt(totalPrincipal)}</strong> along with interest, in <strong>${tenureNum}</strong> monthly EMIs of <strong>₹${fmt(emiRounded)}</strong> each.</li>
        <li>Interest is calculated at <strong>${(annualRate * 100).toFixed(2)}% p.a.</strong> on the combined outstanding (existing + top-up).</li>
        <li>The top-up facility replaces the existing repayment schedule with a single consolidated EMI plan.</li>
        <li>Delay in payment will attract a <strong>penalty charge of 0.5% per day</strong> on the due amount.</li>
        <li>Repayment must be made directly to the lender's approved bank account.</li>
        <li>Lender reserves the right to recall the top-up facility in case of default.</li>
      </ul>
      <div style="margin-top:18px;"><strong>Legal Clause</strong><br>This Agreement is governed by the laws of <strong>India</strong>, and any disputes shall fall under the <strong>jurisdiction of courts in Noida.</strong></div>
      <div class="signatures">
        <div class="sig-box">For ${COMPANY_NAME}<br><br><em>(Authorized Signatory – Digitally Signed)</em></div>
        <div class="sig-box">For Borrower: <strong>${customer.name}</strong><br><em>(Digitally Signed)</em>
          <div class="stamp">✔ DIGITALLY SIGNED VIA OTP<br>OTP: ${otp} | DATE: ${dateStr}<br>TIME: ${timeStr}</div>
        </div>
      </div>
    </div><div class="page-num">Page 2 of 2</div></div>

    ${printButton("PRINT AGREEMENT")}
  </body></html>`;
}
