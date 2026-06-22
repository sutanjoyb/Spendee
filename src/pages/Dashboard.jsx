import { useEffect, useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import TransactionModal from "../components/transactions/TransactionModal";
import TransactionList from "../components/transactions/TransactionList";

import BalanceCard from "../components/dashboard/BalanceCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import WarningBanner from "../components/dashboard/WarningBanner";

import FloatingButton from "../components/common/FloatingButton";
import BottomNavigation from "../components/layout/BottomNavigation";

function Dashboard() {
  const navigate = useNavigate();

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [showMonthResetModal, setShowMonthResetModal] = useState(false);

  const [newMonthIncome, setNewMonthIncome] = useState("");

  useEffect(() => {
    const income = localStorage.getItem("monthlyIncome");

    if (!income) {
      navigate("/setup");
      return;
    }

    setMonthlyIncome(Number(income));

    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setTransactions(savedTransactions);
  }, [navigate]);

  const addTransaction = (transaction) => {
    const updatedTransactions = [transaction, ...transactions];

    setTransactions(updatedTransactions);

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const today = new Date();

  const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;

  const lastResetMonth = localStorage.getItem("lastResetMonth");

  const canStartNewMonth =
    today.getDate() === 1 && currentMonth !== lastResetMonth;

  const startNewMonth = () => {
    if (!newMonthIncome || Number(newMonthIncome) <= 0) {
      alert("Please enter a valid income amount");
      return;
    }

    const income = Number(newMonthIncome);

    setMonthlyIncome(income);
    setTransactions([]);

    localStorage.setItem("monthlyIncome", income);

    localStorage.setItem("transactions", JSON.stringify([]));

    localStorage.setItem("lastResetMonth", currentMonth);

    setShowMonthResetModal(false);
    setNewMonthIncome("");
  };

  const totalSpent = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalIncome =
    monthlyIncome +
    transactions
      .filter((transaction) => transaction.type === "credit")
      .reduce((total, transaction) => total + transaction.amount, 0);

  const remainingBalance = totalIncome - totalSpent;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#f8fafc,#eef6ff)",
        paddingBottom: "90px",
      }}
    >
      <Container className="py-4">
        <div className="text-center mb-4">
          <h1
            style={{
              fontFamily: "Croissant One",
              color: "#2563EB",
              fontSize: "3rem",
            }}
          >
            Spendee
          </h1>

          <p
            style={{
              fontFamily: "EB Garamond",
              color: "#64748B",
              fontSize: "1.2rem",
            }}
          >
            Track easily. Spend wisely.
          </p>
        </div>
        <BottomNavigation />
        {/* Balance */}
        <BalanceCard remainingBalance={remainingBalance} />
        {/* New Month */}
        {canStartNewMonth && (
          <div className="text-center mb-4">
            <Button
              variant="primary"
              onClick={() => setShowMonthResetModal(true)}
            >
              Start New Month
            </Button>
          </div>
        )}
        {/* Warning */}
        <WarningBanner remainingBalance={remainingBalance} />
        {/* Summary */}
        <SummaryCards totalIncome={totalIncome} totalSpent={totalSpent} />
        {/* History Button */}
        <div className="d-flex justify-content-center mt-5 mb-4">
          <Button
            onClick={() => setShowHistory(true)}
            className="d-inline-flex justify-content-center align-items-center gap-2"
            style={{
              background: "linear-gradient(135deg,#3B82F6,#2563EB)",
              border: "none",
              borderRadius: "50px",
              padding: "12px 28px",
              fontFamily: "EB Garamond",
              fontSize: "1.1rem",
              fontWeight: "600",
              boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
            }}
          >
            <FaHistory />
            <span>Recent Activity</span>
          </Button>
        </div>

        {/* Add Transaction */}
        <FloatingButton onClick={() => setShowModal(true)} />
        <TransactionModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          addTransaction={addTransaction}
        />
        {/* Recent Activity Modal */}
        <Modal
          show={showHistory}
          onHide={() => setShowHistory(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontFamily: "Croissant One",
                color: "#2563EB",
              }}
            >
              Recent Activity
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <TransactionList transactions={transactions.slice(0, 5)} />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-primary"
              style={{
                fontFamily: "EB Garamond",
                borderRadius: "12px",
              }}
              onClick={() => {
                setShowHistory(false);
                navigate("/ledger");
              }}
            >
              View Full Ledger
            </Button>

            <Button
              variant="secondary"
              style={{
                fontFamily: "EB Garamond",
                borderRadius: "12px",
              }}
              onClick={() => setShowHistory(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Month Reset Modal */}
        <Modal
          show={showMonthResetModal}
          onHide={() => setShowMonthResetModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                fontFamily: "Croissant One",
                color: "#2563EB",
              }}
            >
              Start New Month
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "EB Garamond",
                }}
              >
                New Month Income
              </Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter new month income"
                value={newMonthIncome}
                onChange={(e) => setNewMonthIncome(e.target.value)}
              />
            </Form.Group>

            <small
              className="text-muted"
              style={{
                fontFamily: "EB Garamond",
              }}
            >
              This will reset all transactions and start a fresh month with the
              new income.
            </small>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowMonthResetModal(false)}
            >
              Cancel
            </Button>

            <Button variant="primary" onClick={startNewMonth}>
              Start Month
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
