// Document HTML generators - identical output to the original app
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
const COMPANY_ADDRESS = "Plot No. 40 & 41, Kh No. 14/11, G/F Front Side, German Nagar, Old Khaira Road, Najafgarh, New Delhi - 110043";

const COMMON_CSS = `
  body { font-family: 'Times New Roman', serif; background: #555; margin: 0; padding: 20px; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto 20px auto; background: white; position: relative; box-shadow: 0 0 10px rgba(0,0,0,0.5); overflow: hidden; page-break-after: always; box-sizing: border-box; }
  .content { position: relative; z-index: 1; padding: 90px 50px 100px 50px; box-sizing: border-box; }
  h2 { text-align: center; text-decoration: underline; text-transform: uppercase; margin-bottom: 25px; color: #003366; font-size: 22px; }
  h3.contd { text-align: center; color: #003366; font-size: 16px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px; margin-bottom: 20px; }
  th, td { border: 1px solid black; padding: 10px; text-align: left; vertical-align: middle; }
  th { background-color: #f2f2f2; color: #000; font-weight: bold; }
  .signatures { margin-top: 50px; display: flex; justify-content: space-between; font-size: 16px; }
  .stamp { border: 2px dashed green; padding: 10px; color: green; font-family: 'Courier New'; font-weight: bold; background: #f0fff0; margin-top: 10px; font-size: 15px; }
  .section-title { font-weight: bold; text-decoration: underline; margin-top: 20px; font-size: 18px; color: #000; }
  ul { font-size: 16px; line-height: 1.8; margin-top: 15px; }
  p { font-size: 16px; line-height: 1.6; }
  .header-band { background: linear-gradient(135deg, #1a3a52, #2d5a7b); color: #d4af37; padding: 20px 40px; margin: -90px -50px 20px -50px; }
  .header-band h1 { margin: 0; font-family: 'Playfair Display', serif; font-size: 22px; }
  .header-band p { margin: 5px 0 0; font-size: 12px; color: #ffd97a; }
  .page-num { position: absolute; bottom: 35px; right: 50px; font-size: 14px; font-weight: bold; z-index: 2; color: #000; }
  @media print { body { background: white; margin: 0; padding: 0; } .page { box-shadow: none; margin: 0; border: none; } .no-print { display: none; } }
`;

const headerBand = `<div class="header-band"><h1>${COMPANY_NAME}</h1><p>${COMPANY_ADDRESS}</p></div>`;

const printButton = (label: string) => `<div class="no-print" style="text-align:center;position:fixed; right:20px; top:20px; z-index:999;"><button onclick="window.print()" style="padding:15px;background:#0d6efd;color:white;border:none;border-radius:5px;font-size:16px;cursor:pointer;">🖨️ ${label}</button></div>`;

export function generateNdcHtml(customer: CustomerDoc): string {
  const dateStr = new Date().toLocaleDateString("en-IN");
  return `<!DOCTYPE html><html><head><title>NDC - ${customer.name}</title><style>${COMMON_CSS}</style></head><body>
    <div class="page"><div class="content">${headerBand}
      <h2>NO DUE CERTIFICATE</h2>
      <div style="font-size: 16px; margin-bottom: 35px;">Date: ${dateStr}<br><b>${customer.name.toUpperCase()}</b><br>SRNO-${customer.serialNumber || "-"}</div>
      <div style="margin:25px 0; font-weight:bold; font-size: 18px;">Subject: No Due Certificate for Loan Number –<br>${customer.oldAccountNumber}</div>
      <div style="text-align:justify; line-height:1.8; margin-bottom:60px; font-size: 16px;">
        Dear Customer,<br><br>
        This letter is to certify that Mr./Ms. <strong>${customer.name.toUpperCase()}</strong> Maintained the Loan Number: <strong>${customer.oldAccountNumber}</strong> with Narainsons Investment Finance Pvt Ltd.<br><br>
        As of this date, there are no outstanding liabilities, and the aforementioned loan has been fully repaid.
      </div>
      <div style="font-size: 16px;">Thank you.<br><br><br><strong>For Narainsons Investment Finance Pvt Ltd</strong></div>
      <div style="text-align:center;font-style:italic;font-size:14px;margin-top:100px;border-top:1px solid #ccc; padding-top:15px;">*This is a system-generated document and does not require any seal or signature.*</div>
    </div></div>${printButton("PRINT NDC")}</body></html>`;
}

export function generateRestructuringHtml(customer: CustomerDoc, otp: string): string {
  const dateStr = new Date().toLocaleDateString("en-IN");
  const timeStr = new Date().toLocaleTimeString("en-IN");
  let scheduleHtml = "";
  try {
    const nextDate = new Date(customer.nextEmiDate || new Date().toISOString());
    const tenure = parseInt(customer.tenure || "11");
    for (let i = 0; i < tenure; i++) {
      const emiDate = new Date(nextDate);
      emiDate.setMonth(emiDate.getMonth() + i);
      scheduleHtml += `<tr><td>${i + 1}</td><td>${emiDate.toLocaleDateString("en-IN")}</td><td>Rs. ${customer.emiAmount || "0"}</td></tr>`;
    }
  } catch { scheduleHtml = `<tr><td colspan='3'>Date format error.</td></tr>`; }

  return `<!DOCTYPE html><html><head><title>Restructure - ${customer.name}</title><style>${COMMON_CSS}</style></head><body>
    <div class="page"><div class="content">${headerBand}
      <h2>LOAN RESTRUCTURING AGREEMENT</h2>
      <p><strong>Between</strong><br>Lender: ${COMPANY_NAME}<br>Registered Office: ${COMPANY_ADDRESS}<br><br>Borrower: <strong>${customer.name}</strong><br>PAN: ${customer.pan || "-"}<br>Address: ${customer.address || "-"}</p>
      <div class="section-title">Loan Details</div>
      <table>
        <tr><th>Particular</th><th>Details</th><th>Note</th></tr>
        <tr><td>Old Loan Account No.</td><td><strong>${customer.oldAccountNumber}</strong></td><td rowspan="6">The old loan will be closed and adjusted under this new loan. No additional funds will be disbursed.</td></tr>
        <tr><td>New Loan Account No.</td><td><strong>${customer.newAccountNumber || "-"}</strong></td></tr>
        <tr><td>Restructured Amount</td><td>Rs. ${customer.pendingAmount || "0"}</td></tr>
        <tr><td>EMI Amount</td><td>Rs. ${customer.emiAmount || "0"}</td></tr>
        <tr><td>Tenure</td><td>${customer.tenure || "11"} Months</td></tr>
        <tr><td>First EMI Date</td><td>${customer.nextEmiDate || "-"}</td></tr>
      </table>
    </div><div class="page-num">Page 1 of 3</div></div>
    <div class="page"><div class="content">${headerBand}
      <h3 class="contd">LOAN RESTRUCTURING AGREEMENT (Contd.)</h3>
      <div class="section-title">EMI Repayment Schedule</div>
      <table><tr><th>Installment No.</th><th>EMI Date</th><th>EMI Amount</th></tr>${scheduleHtml}</table>
    </div><div class="page-num">Page 2 of 3</div></div>
    <div class="page"><div class="content">${headerBand}
      <h3 class="contd">LOAN RESTRUCTURING AGREEMENT (Contd.)</h3>
      <div class="section-title">Key Terms & Conditions</div>
      <ul>
        <li>Borrower agrees to repay ₹${customer.pendingAmount || "0"} in ${customer.tenure || "11"} monthly EMIs.</li>
        <li>Delay in payment will attract a penalty charge of 0.5% per day on the due amount.</li>
        <li>Continued default may result in legal action and a higher interest penalty as per company policy.</li>
        <li>Loan tenure will not exceed 12 months.</li>
        <li>Repayment must be made directly to the lender's approved bank account.</li>
        <li>Borrower must maintain active employment status and update the lender of any changes.</li>
        <li>Lender reserves the right to perform credit checks at any time.</li>
      </ul>
      <div class="section-title">Legal Clause</div>
      <p>This Agreement is governed by the laws of India, and any disputes shall fall under the jurisdiction of courts in Noida.</p>
      <div class="signatures">
        <div>For ${COMPANY_NAME}<br><br><br><br>(Authorized Signatory)</div>
        <div>For Borrower: <strong>${customer.name}</strong><div class="stamp">✔ DIGITALLY SIGNED VIA OTP<br>OTP: ${otp} | DATE: ${dateStr}<br>TIME: ${timeStr}</div></div>
      </div>
    </div><div class="page-num">Page 3 of 3</div></div>
    ${printButton("PRINT AGREEMENT")}</body></html>`;
}

export function generateMoratoriumHtml(customer: CustomerDoc, otp: string): string {
  const dateStr = new Date().toLocaleDateString("en-IN");
  const timeStr = new Date().toLocaleTimeString("en-IN");
  const dateRow = customer.moratiumStartDate && customer.moratiumEndDate
    ? `<tr><td>Moratorium Start Date<br>Moratorium End Date</td><td>${customer.moratiumStartDate}<br>${customer.moratiumEndDate}</td></tr>` : "";

  return `<!DOCTYPE html><html><head><title>Moratorium - ${customer.name}</title><style>${COMMON_CSS}</style></head><body>
    <div class="page"><div class="content">${headerBand}
      <h2>LOAN MORATORIUM AGREEMENT</h2>
      <p><strong>Between</strong><br>Lender: ${COMPANY_NAME}<br>Registered Office: ${COMPANY_ADDRESS}<br><br>Borrower: <strong>${customer.name}</strong><br>PAN: ${customer.pan || "-"}<br>Address: ${customer.address || "-"}</p>
      <div class="section-title">Loan Details</div>
      <table>
        <tr><th>Particular</th><th>Details</th></tr>
        <tr><td>Old Loan Account No.</td><td><strong>${customer.oldAccountNumber}</strong></td></tr>
        <tr><td>New Loan Account No.</td><td><strong>${customer.newAccountNumber || "-"}</strong></td></tr>
        <tr><td>Moratorium Deposit<br>Moratorium Period</td><td><strong>1,000 (Safety Deposit)</strong><br>${customer.tenure || "11"} Months</td></tr>
        ${dateRow}
        <tr><td>After Moratorium</td><td>Rs. ${customer.pendingAmount || "0"}</td></tr>
      </table>
      <p style="font-size:14px;font-style:italic;">Note: The old loan will be closed and adjusted under this new moratorium arrangement. No additional funds will be disbursed.</p>
    </div><div class="page-num">Page 1 of 2</div></div>
    <div class="page"><div class="content">${headerBand}
      <h3 class="contd">LOAN MORATORIUM AGREEMENT (Contd.)</h3>
      <div class="section-title">Key Terms & Conditions</div>
      <ul>
        <li>Borrower agrees to deposit ₹1,000 as a safety deposit at the time of signing this agreement.</li>
        <li>Moratorium period of ${customer.tenure || "11"} months is granted, during which no EMI payment is required.</li>
        <li>After completion of the ${customer.tenure || "11"}-month moratorium, the borrower must pay the full overdue amount.</li>
        <li>Delay in post-moratorium payment will attract a penalty as per company policy.</li>
        <li>Borrower must maintain accurate personal information and update the lender on any changes.</li>
        <li>Repayment must be made directly to the lender's approved bank account.</li>
        <li>Lender reserves the right to perform credit checks at any time.</li>
      </ul>
      <div class="section-title">Legal Clause</div>
      <p>This Agreement is governed by the laws of India, and any disputes shall fall under the jurisdiction of courts in Noida.</p>
      <div class="signatures">
        <div>For ${COMPANY_NAME}<br><br><br><br>(Authorized Signatory)</div>
        <div>For Borrower: <strong>${customer.name}</strong><div class="stamp">✔ DIGITALLY SIGNED VIA OTP<br>OTP: ${otp} | DATE: ${dateStr}<br>TIME: ${timeStr}</div></div>
      </div>
    </div><div class="page-num">Page 2 of 2</div></div>
    ${printButton("PRINT AGREEMENT")}</body></html>`;
}
