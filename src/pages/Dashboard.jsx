import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Form,
  Modal,
  Card,
  ProgressBar,
} from "react-bootstrap";
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
      navigate("/setupbudget");
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

  const recurringTransactions = transactions.filter(
    (transaction) => transaction.recurring === true,
  );

  const budgetUsed =
    totalIncome > 0 ? Math.min((totalSpent / totalIncome) * 100, 100) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#f8fafc,#eef6ff)",
        paddingBottom: "90px",
      }}
    >
      {" "}
      <Container>
        {" "}
        <div className="text-center py-4">
          <h1
            style={{
              fontFamily: "Croissant One",
              color: "#2563EB",
              fontSize: "3rem",
            }}
          >
            Spendee{" "}
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
        <BalanceCard remainingBalance={remainingBalance} />
        <Card
          className="border-0 shadow-sm mb-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <Card.Body>
            <div className="d-flex justify-content-between mb-2">
              <span>Budget Used</span>

              <span>{budgetUsed.toFixed(0)}%</span>
            </div>

            <ProgressBar
              now={budgetUsed}
              variant={budgetUsed > 80 ? "danger" : "success"}
              style={{
                height: "12px",
                borderRadius: "20px",
              }}
            />
          </Card.Body>
        </Card>
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
        <WarningBanner remainingBalance={remainingBalance} />
        {recurringTransactions.length > 0 && (
          <Card
            className="border-0 shadow-sm mb-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)",
            }}
          >
            <Card.Body>
              <h5
                style={{
                  color: "#2563EB",
                  fontFamily: "Croissant One",
                }}
              >
                Upcoming Recurring Expenses
              </h5>

              {recurringTransactions.map((item) => (
                <div key={item.id} className="d-flex justify-content-between">
                  <span>{item.description}</span>

                  <strong>₹{item.amount}</strong>
                </div>
              ))}
            </Card.Body>
          </Card>
        )}
        <SummaryCards totalIncome={totalIncome} totalSpent={totalSpent} />
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
        <FloatingButton onClick={() => setShowModal(true)} />
        <TransactionModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          addTransaction={addTransaction}
        />
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
              onClick={() => {
                setShowHistory(false);
                navigate("/ledger");
              }}
            >
              View Full Ledger
            </Button>

            <Button variant="secondary" onClick={() => setShowHistory(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
              <Form.Label>New Month Income</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter new month income"
                value={newMonthIncome}
                onChange={(e) => setNewMonthIncome(e.target.value)}
              />
            </Form.Group>
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
