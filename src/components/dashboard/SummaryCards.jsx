import { Row, Col, Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";

function SummaryCards({ totalIncome, totalSpent }) {
  return (
    <Row className="g-4">
      {/* Total Income */}

      <Col xs={12} md={6}>
        <Card
          className="border-0 shadow-sm h-100"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body className="text-center">
            <p
              style={{
                color: "#64748B",
                fontFamily: "EB Garamond",
                fontSize: "1.1rem",
              }}
            >
              Total Income
            </p>

            <h2
              style={{
                color: "#10B981",
                fontFamily: "EB Garamond",
                fontWeight: "700",
              }}
            >
              ₹ {formatCurrency(totalIncome)}
            </h2>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Spent */}

      <Col xs={12} md={6}>
        <Card
          className="border-0 shadow-sm h-100"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body className="text-center">
            <p
              style={{
                color: "#64748B",
                fontFamily: "EB Garamond",
                fontSize: "1.1rem",
              }}
            >
              Total Spent
            </p>

            <h2
              style={{
                color: "#EF4444",
                fontFamily: "EB Garamond",
                fontWeight: "700",
              }}
            >
              ₹ {formatCurrency(totalSpent)}
            </h2>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default SummaryCards;
