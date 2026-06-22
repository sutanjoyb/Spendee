import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaChartPie,
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaFileAlt,
  FaTags,
  FaSyncAlt,
} from "react-icons/fa";

import EmptyState from "../components/common/EmptyState";
import MonthlyFilter from "../components/filters/MonthlyFilter";
import ExpenseChart from "../components/charts/ExpenseChart";
import BottomNavigation from "../components/layout/BottomNavigation";

import { formatCurrency } from "../utils/formatCurrency";

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const income = Number(localStorage.getItem("monthlyIncome")) || 0;

    setTransactions(savedTransactions);
    setMonthlyIncome(income);
  }, []);

  const filteredTransactions =
    selectedMonth === ""
      ? transactions
      : transactions.filter((transaction) => {
          const date = new Date(transaction.date);

          const monthName = date.toLocaleString("default", {
            month: "long",
          });

          return monthName === selectedMonth;
        });

  const creditAmount = filteredTransactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const debitAmount = filteredTransactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalIncome = monthlyIncome + creditAmount;

  const remainingBalance = totalIncome - debitAmount;

  const recurringTransactions = filteredTransactions.filter(
    (transaction) => transaction.recurring,
  );

  const categoryTotals = {};

  filteredTransactions
    .filter((transaction) => transaction.type === "debit")
    .forEach((transaction) => {
      const category = transaction.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(transaction.amount);
    });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#f8fafc,#eef6ff)",
        padding: "30px 0 100px",
      }}
    >
      {" "}
      <Container>
        {" "}
        <div className="text-center mb-4">
          <h1
            style={{
              fontFamily: "Croissant One",
              color: "#2563EB",
              fontSize: "2.8rem",
              marginBottom: "8px",
            }}
          >
            Spendee{" "}
          </h1>

          <p
            style={{
              fontFamily: "EB Garamond",
              color: "#64748B",
              fontSize: "1.2rem",
              marginBottom: 0,
            }}
          >
            Track easily. Spend wisely.
          </p>
        </div>
        <BottomNavigation />
        <Card
          className="border-0 shadow-sm mb-4"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body>
            <MonthlyFilter
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </Card.Body>
        </Card>
        {filteredTransactions.length === 0 ? (
          <EmptyState
            title="No Reports Available"
            message="Add some transactions to generate reports and analytics."
          />
        ) : (
          <>
            <Card
              className="border-0 shadow-sm mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <FaChartPie size={22} color="#2563EB" />

                  <h3
                    className="mb-0"
                    style={{
                      fontFamily: "Croissant One",
                      color: "#2563EB",
                    }}
                  >
                    Financial Reports
                  </h3>
                </div>

                <ExpenseChart
                  totalSpent={debitAmount}
                  remainingBalance={remainingBalance}
                />
              </Card.Body>
            </Card>

            <Row className="g-4">
              <Col md={4}>
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "24px",
                  }}
                >
                  <Card.Body className="text-center">
                    <p
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#64748B",
                      }}
                    >
                      <FaWallet className="me-2" />
                      Total Income
                    </p>

                    <h2
                      style={{
                        color: "#10B981",
                        fontFamily: "EB Garamond",
                      }}
                    >
                      ₹ {formatCurrency(totalIncome)}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "24px",
                  }}
                >
                  <Card.Body className="text-center">
                    <p
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#64748B",
                      }}
                    >
                      <FaArrowDown className="me-2" />
                      Total Spent
                    </p>

                    <h2
                      style={{
                        color: "#EF4444",
                        fontFamily: "EB Garamond",
                      }}
                    >
                      ₹ {formatCurrency(debitAmount)}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "24px",
                  }}
                >
                  <Card.Body className="text-center">
                    <p
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#64748B",
                      }}
                    >
                      <FaArrowUp className="me-2" />
                      Remaining Balance
                    </p>

                    <h2
                      style={{
                        color: "#2563EB",
                        fontFamily: "EB Garamond",
                      }}
                    >
                      ₹ {formatCurrency(remainingBalance)}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card
              className="border-0 shadow-sm mt-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FaFileAlt color="#2563EB" />

                  <h4
                    className="mb-0"
                    style={{
                      fontFamily: "Croissant One",
                      color: "#2563EB",
                    }}
                  >
                    Report Summary
                  </h4>
                </div>

                <p>Total Transactions: {filteredTransactions.length}</p>

                <p>
                  Credits Recorded:{" "}
                  {
                    filteredTransactions.filter(
                      (transaction) => transaction.type === "credit",
                    ).length
                  }
                </p>

                <p>
                  Debits Recorded:{" "}
                  {
                    filteredTransactions.filter(
                      (transaction) => transaction.type === "debit",
                    ).length
                  }
                </p>

                <p>
                  <FaSyncAlt className="me-2" />
                  Recurring Transactions: {recurringTransactions.length}
                </p>

                {topCategory && (
                  <p>
                    <FaTags className="me-2" />
                    Top Spending Category: <strong>{topCategory[0]}</strong>
                    {" - "}₹ {formatCurrency(topCategory[1])}
                  </p>
                )}
              </Card.Body>
            </Card>

            <Card
              className="border-0 shadow-sm mt-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <Card.Body>
                <h4
                  style={{
                    fontFamily: "Croissant One",
                    color: "#2563EB",
                    marginBottom: "20px",
                  }}
                >
                  Category Breakdown
                </h4>

                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <div
                    key={category}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>{category}</span>

                    <strong>₹ {formatCurrency(amount)}</strong>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default Reports;
