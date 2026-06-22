import { Card, Badge } from "react-bootstrap";
import { FaArrowUp, FaArrowDown, FaSyncAlt } from "react-icons/fa";

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
        {" "}
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          <div>
            <h5
              className="mb-1"
              style={{
                fontFamily: "EB Garamond",
                fontWeight: "600",
              }}
            >
              {transaction.description}{" "}
            </h5>

            <small
              style={{
                color: "#64748B",
                fontFamily: "EB Garamond",
              }}
            >
              {transactionDate}
            </small>

            <div className="mt-2 d-flex gap-2 flex-wrap">
              {transaction.category && (
                <Badge bg="primary">{transaction.category}</Badge>
              )}

              {transaction.recurring && (
                <Badge bg="warning" text="dark">
                  <FaSyncAlt className="me-1" />
                  Recurring
                </Badge>
              )}
            </div>
          </div>
          <div className="text-end">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              {isDebit ? (
                <FaArrowDown color="#EF4444" />
              ) : (
                <FaArrowUp color="#10B981" />
              )}

              <h5
                className="mb-0"
                style={{
                  color: isDebit ? "#EF4444" : "#10B981",
                  fontFamily: "EB Garamond",
                  fontWeight: "700",
                }}
              >
                ₹{formatCurrency(transaction.amount)}
              </h5>
            </div>

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
