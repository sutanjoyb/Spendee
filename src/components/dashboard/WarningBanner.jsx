import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

function WarningBanner({ remainingBalance }) {
  if (remainingBalance > 500) {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <Card
        className="border-0 mb-4"
        style={{
          background: "linear-gradient(135deg,#FEF3C7,#FDE68A)",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(245,158,11,0.15)",
        }}
      >
        <Card.Body
          style={{
            fontFamily: "EB Garamond",
            color: "#92400E",
            fontSize: "1.15rem",
            fontWeight: "600",
          }}
        >
          ⚠️ Low Budget Warning: Your remaining balance is below ₹500.00
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default WarningBanner;
