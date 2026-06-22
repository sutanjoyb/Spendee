import { Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaWallet, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

import { formatCurrency } from "../../utils/formatCurrency";

function BalanceCard({ remainingBalance, monthlyIncome = 0 }) {
  const savingsPercentage =
    monthlyIncome > 0
      ? ((remainingBalance / monthlyIncome) * 100).toFixed(0)
      : 0;

  const isLowBudget = remainingBalance <= 500;

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
      whileHover={{
        scale: 1.01,
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
          overflow: "hidden",
        }}
      >
        <Card.Body className="text-center p-5">
          <div className="mb-3">
            <FaWallet size={35} />
          </div>

          <p
            style={{
              fontFamily: "EB Garamond",
              fontSize: "1.3rem",
              marginBottom: "10px",
              opacity: 0.9,
            }}
          >
            Remaining Balance
          </p>

          <h1
            style={{
              fontFamily: "EB Garamond",
              fontWeight: "700",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              marginBottom: "15px",
            }}
          >
            ₹ {formatCurrency(remainingBalance)}
          </h1>

          <div className="d-flex justify-content-center mb-3">
            <Badge
              bg={isLowBudget ? "danger" : "success"}
              style={{
                fontSize: "0.95rem",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {isLowBudget ? (
                <>
                  <FaExclamationTriangle />
                  Low Budget
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Healthy Budget
                </>
              )}
            </Badge>
          </div>

          {monthlyIncome > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "16px",
                padding: "12px",
                maxWidth: "260px",
                margin: "0 auto",
              }}
            >
              <small
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  opacity: 0.85,
                }}
              >
                Savings Rate
              </small>

              <h4
                style={{
                  margin: 0,
                  fontFamily: "EB Garamond",
                  fontWeight: "700",
                }}
              >
                {savingsPercentage}%
              </h4>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default BalanceCard;
