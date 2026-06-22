import { Card } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

function EmptyState({ title, message }) {
  return (
    <Card
      className="border-0 shadow-sm text-center"
      style={{
        borderRadius: "24px",
      }}
    >
      <Card.Body className="py-5">
        <FaChartLine
          size={70}
          color="#2563EB"
          style={{
            marginBottom: "20px",
            opacity: 0.85,
          }}
        />

        <h3
          style={{
            fontFamily: "Croissant One",
            color: "#2563EB",
            marginBottom: "12px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "EB Garamond",
            fontSize: "1.15rem",
            color: "#64748B",
            marginBottom: 0,
          }}
        >
          {message}
        </p>
      </Card.Body>
    </Card>
  );
}

export default EmptyState;
