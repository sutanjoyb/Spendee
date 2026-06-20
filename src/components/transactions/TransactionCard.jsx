import { Card, Badge } from "react-bootstrap";

import { formatCurrency } from "../../utils/formatCurrency";

function TransactionCard({ transaction }) {
  const isDebit = transaction.type === "debit";

  const transactionDate = new Date(transaction.date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Card
      className="border-0 shadow-sm mb-3"
      style={{
        borderRadius: "18px",
        transition: "0.2s",
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          {/* Left Side */}

          <div>
            <h5
              className="mb-1"
              style={{
                fontFamily: "EB Garamond",
                fontWeight: "600",
              }}
            >
              {transaction.description}
            </h5>

            <small
              style={{
                color: "#64748B",
                fontFamily: "EB Garamond",
              }}
            >
              {transactionDate}
            </small>
          </div>

          {/* Right Side */}

          <div className="text-end">
            <h5
              className="mb-1"
              style={{
                color: isDebit ? "#EF4444" : "#10B981",
                fontFamily: "EB Garamond",
                fontWeight: "700",
              }}
            >
              {isDebit ? "-" : "+"}₹{formatCurrency(transaction.amount)}
            </h5>

            <Badge bg={isDebit ? "danger" : "success"}>
              {isDebit ? "Debit" : "Credit"}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TransactionCard;
