import { Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/formatCurrency";

function BalanceCard({ remainingBalance }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <Card
        className="border-0 mb-4"
        style={{
          borderRadius: "30px",
          background: "linear-gradient(135deg,#60A5FA,#2563EB)",
          color: "white",
          boxShadow: "0 15px 40px rgba(37,99,235,0.25)",
        }}
      >
        <Card.Body className="text-center p-5">
          <p
            style={{
              fontFamily: "EB Garamond",
              fontSize: "1.3rem",
              marginBottom: "10px",
            }}
          >
            Remaining Balance
          </p>

          <h1
            style={{
              fontFamily: "EB Garamond",
              fontWeight: "700",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            ₹ {formatCurrency(remainingBalance)}
          </h1>

          <Badge
            bg={remainingBalance <= 500 ? "danger" : "success"}
            style={{
              fontSize: "0.9rem",
              padding: "8px 14px",
            }}
          >
            {remainingBalance <= 500 ? "Low Budget" : "Healthy Budget"}
          </Badge>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default BalanceCard;
