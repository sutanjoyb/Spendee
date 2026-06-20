import { Card, Badge } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";

function TransactionItem({ transaction }) {
  const isDebit = transaction.type === "debit";

  const getCategoryIcon = (description) => {
    const category = description?.toLowerCase();

    if (category.includes("food")) return "🍔";
    if (category.includes("grocery")) return "🛒";
    if (category.includes("transport")) return "🚗";
    if (category.includes("rent")) return "🏠";
    if (category.includes("salary")) return "💰";
    if (category.includes("shopping")) return "🛍️";
    if (category.includes("medical")) return "🏥";
    if (category.includes("education")) return "📚";

    return "📌";
  };

  return (
    <Card
      className="border-0 shadow-sm mb-3"
      style={{
        borderRadius: "20px",
        transition: "0.3s ease",
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          {/* Left Section */}
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#EEF6FF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.4rem",
              }}
            >
              {getCategoryIcon(transaction.description)}
            </div>

            <div>
              <h6
                className="mb-1"
                style={{
                  fontFamily: "EB Garamond",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                }}
              >
                {transaction.description}
              </h6>

              <small
                style={{
                  color: "#64748B",
                  fontFamily: "EB Garamond",
                  fontSize: "0.95rem",
                }}
              >
                {transaction.date}
              </small>
            </div>
          </div>

          {/* Right Section */}
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

            <Badge
              bg={isDebit ? "danger" : "success"}
              style={{
                fontFamily: "EB Garamond",
                fontSize: "0.8rem",
              }}
            >
              {isDebit ? "Debit" : "Credit"}
            </Badge>

            {transaction.balance !== undefined && (
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#64748B",
                  marginTop: "4px",
                  fontFamily: "EB Garamond",
                }}
              >
                Bal: ₹{formatCurrency(transaction.balance)}
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TransactionItem;
