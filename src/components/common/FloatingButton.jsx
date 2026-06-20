import { Button } from "react-bootstrap";

function FloatingButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        border: "none",
        fontSize: "2rem",
        fontWeight: "600",
        background: "linear-gradient(135deg,#60A5FA,#2563EB)",
        boxShadow: "0 15px 35px rgba(37,99,235,0.35)",
        zIndex: 999,
      }}
    >
      +
    </Button>
  );
}

export default FloatingButton;
