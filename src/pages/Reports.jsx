import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import Header from "../components/common/Header";
import EmptyState from "../components/common/EmptyState";
import MonthlyFilter from "../components/filters/MonthlyFilter";
import ExpenseChart from "../components/charts/ExpenseChart";

import { formatCurrency } from "../utils/formatCurrency";

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const income =
      Number(localStorage.getItem("monthlyIncome")) || 0;

    setTransactions(savedTransactions);
    setMonthlyIncome(income);
  }, []);

  const filteredTransactions =
    selectedMonth === ""
      ? transactions
      : transactions.filter((transaction) => {
          const date = new Date(transaction.date);

          const monthName = date.toLocaleString(
            "default",
            {
              month: "long",
            }
          );

          return monthName === selectedMonth;
        });

  const creditAmount = filteredTransactions
    .filter(
      (transaction) => transaction.type === "credit"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const debitAmount = filteredTransactions
    .filter(
      (transaction) => transaction.type === "debit"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalIncome =
    monthlyIncome + creditAmount;

  const remainingBalance =
    totalIncome - debitAmount;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #f8fafc, #eef6ff)",
        padding: "30px 0",
      }}
    >
      <Container>
        <Header
          title="Reports & Analytics"
          subtitle="Track your spending patterns"
        />

        {/* Month Filter */}

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
            {/* Chart */}

            <Card
              className="border-0 shadow-sm mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <Card.Body>
                <h4
                  className="text-center mb-4"
                  style={{
                    fontFamily: "Croissant One",
                    color: "#2563EB",
                  }}
                >
                  Expense Breakdown
                </h4>

                <ExpenseChart
                  totalSpent={debitAmount}
                  remainingBalance={remainingBalance}
                />
              </Card.Body>
            </Card>

            {/* Summary Cards */}

            <Row className="g-4">
              <Col xs={12} md={4}>
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
                      Total Income
                    </p>

                    <h2
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#10B981",
                      }}
                    >
                      ₹ {formatCurrency(totalIncome)}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4}>
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
                      Total Spent
                    </p>

                    <h2
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#EF4444",
                      }}
                    >
                      ₹ {formatCurrency(debitAmount)}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4}>
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
                      Remaining Balance
                    </p>

                    <h2
                      style={{
                        fontFamily: "EB Garamond",
                        color: "#2563EB",
                      }}
                    >
                      ₹ {formatCurrency(
                        remainingBalance
                      )}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Report Summary */}

            <Card
              className="border-0 shadow-sm mt-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <Card.Body>
                <h4
                  className="mb-3"
                  style={{
                    fontFamily: "Croissant One",
                    color: "#2563EB",
                  }}
                >
                  Report Summary
                </h4>

                <p
                  style={{
                    fontFamily: "EB Garamond",
                    fontSize: "1.1rem",
                  }}
                >
                  Total Transactions:{" "}
                  {filteredTransactions.length}
                </p>

                <p
                  style={{
                    fontFamily: "EB Garamond",
                    fontSize: "1.1rem",
                  }}
                >
                  Credits Recorded:{" "}
                  {
                    filteredTransactions.filter(
                      (transaction) =>
                        transaction.type ===
                        "credit"
                    ).length
                  }
                </p>

                <p
                  style={{
                    fontFamily: "EB Garamond",
                    fontSize: "1.1rem",
                  }}
                >
                  Debits Recorded:{" "}
                  {
                    filteredTransactions.filter(
                      (transaction) =>
                        transaction.type ===
                        "debit"
                    ).length
                  }
                </p>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}

export default Reports;
