import { Card } from "react-bootstrap";

function EmptyState({
  title = "No Data Found",
  message = "Nothing to display yet.",
}) {
  return (
    <Card
      className="border-0 shadow-sm"
      style={{
        borderRadius: "24px",
      }}
    >
      <Card.Body className="text-center py-5">
        <div
          style={{
            fontSize: "4rem",
          }}
        >
          📭
        </div>

        <h4
          style={{
            fontFamily: "Croissant One",
            color: "#2563EB",
            marginTop: "15px",
          }}
        >
          {title}
        </h4>

        <p
          style={{
            fontFamily: "EB Garamond",
            color: "#64748B",
            fontSize: "1.1rem",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      </Card.Body>
    </Card>
  );
}

export default EmptyState;
