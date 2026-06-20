import { useEffect, useState } from "react";
import { Container, Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import TransactionModal from "../components/transactions/TransactionModal";
import TransactionList from "../components/transactions/TransactionList";
import BalanceCard from "../components/dashboard/BalanceCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import WarningBanner from "../components/dashboard/WarningBanner";
import Header from "../components/common/Header";
import FloatingButton from "../components/common/FloatingButton";
import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  const navigate = useNavigate();

  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);

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
      }}
    >
      <Container fluid className="py-4 px-3 px-md-5">
        <Header />

        {/* Navigation */}

        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <Button variant="outline-primary" onClick={() => navigate("/ledger")}>
            Ledger
          </Button>

          <Button
            variant="outline-success"
            onClick={() => navigate("/reports")}
          >
            Reports
          </Button>
        </div>

        {/* Balance Card */}

        <BalanceCard remainingBalance={remainingBalance} />

        {/* Start New Month Button */}

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

        <SummaryCards totalIncome={totalIncome} totalSpent={totalSpent} />

        {/* Recent Activity */}

        <Card
          className="border-0 mt-5 shadow-sm"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4
                style={{
                  fontFamily: "EB Garamond",
                }}
              >
                Recent Activity
              </h4>

              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => navigate("/ledger")}
              >
                View All
              </Button>
            </div>

            <TransactionList transactions={transactions.slice(0, 5)} />
          </Card.Body>
        </Card>

        <FloatingButton onClick={() => setShowModal(true)} />

        {/* Transaction Modal */}

        <TransactionModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          addTransaction={addTransaction}
        />

        {/* Monthly Reset Modal */}

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
              This will reset Total Income, Total Spent, Balance and
              Transactions for the new month.
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
