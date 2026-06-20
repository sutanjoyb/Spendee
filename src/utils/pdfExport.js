import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const formatPDFCurrency = (amount) => {
  return Number(amount || 0).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
};

export const exportTransactionsPDF = (
  transactions,
  monthlyIncome = 0
) => {
  const doc = new jsPDF();

  // Calculations

  const totalSpent = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const creditIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "credit"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalIncome =
    Number(monthlyIncome) + creditIncome;

  const remainingBalance =
    totalIncome - totalSpent;

  // Header Background

  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 40, "F");

  // App Name

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);

  doc.text("Spendee", 15, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Track easily. Spend wisely.",
    15,
    27
  );

  // Summary Card

  doc.setFillColor(248, 250, 252);

  doc.roundedRect(
    12,
    50,
    185,
    42,
    5,
    5,
    "F"
  );

  doc.setTextColor(30, 41, 59);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    `Total Income : Rs ${formatPDFCurrency(
      totalIncome
    )}`,
    20,
    65
  );

  doc.text(
    `Total Spent : Rs ${formatPDFCurrency(
      totalSpent
    )}`,
    20,
    77
  );

  doc.text(
    `Remaining Balance : Rs ${formatPDFCurrency(
      remainingBalance
    )}`,
    20,
    89
  );

  // Transactions Table

  autoTable(doc, {
    startY: 105,

    theme: "grid",

    head: [
      [
        "Date",
        "Description",
        "Type",
        "Amount",
      ],
    ],

    body: transactions.map(
      (transaction) => [
        transaction.date,

        transaction.description
          .replace(
            /[^\p{L}\p{N}\s]/gu,
            ""
          )
          .trim(),

        transaction.type === "credit"
          ? "Credit"
          : "Debit",

        `Rs ${formatPDFCurrency(
          transaction.amount
        )}`,
      ]
    ),

    styles: {
      halign: "center",
      valign: "middle",
      cellPadding: 4,
      fontSize: 10,
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },

    bodyStyles: {
      halign: "center",
      valign: "middle",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },

    columnStyles: {
      0: {
        halign: "center",
      },

      1: {
        halign: "center",
      },

      2: {
        halign: "center",
      },

      3: {
        halign: "center",
      },
    },
  });

  // Footer

  const pageHeight =
    doc.internal.pageSize.height;

  doc.setFontSize(9);
  doc.setTextColor(100);

  doc.text(
    `Generated on ${new Date().toLocaleDateString(
      "en-IN"
    )}`,
    14,
    pageHeight - 10
  );

  doc.text(
    "Spendee Financial Report",
    135,
    pageHeight - 10
  );

  // Download PDF

  doc.save(
    `Spendee_Report_${new Date().toLocaleDateString(
      "en-IN"
    )}.pdf`
  );
};
