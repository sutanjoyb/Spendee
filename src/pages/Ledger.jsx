import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import EmptyState from "../components/common/EmptyState";
import MonthlyFilter from "../components/filters/MonthlyFilter";
import TransactionCard from "../components/transactions/TransactionCard";
import BottomNavigation from "../components/layout/BottomNavigation";

import { exportTransactionsPDF } from "../utils/pdfExport";

function Ledger() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setTransactions(savedTransactions);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const transactionDate = new Date(transaction.date);

      const matchesFromDate =
        !fromDate || transactionDate >= new Date(fromDate);

      const matchesToDate = !toDate || transactionDate <= new Date(toDate);

      const monthName = transactionDate.toLocaleString("default", {
        month: "long",
      });

      const matchesMonth = !selectedMonth || monthName === selectedMonth;

      return matchesSearch && matchesFromDate && matchesToDate && matchesMonth;
    });
  }, [transactions, searchTerm, fromDate, toDate, selectedMonth]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#f8fafc,#eef6ff)",
        padding: "30px 0",
      }}
    >
      {" "}
      <Container>
        {/* App Title */}
        <div className="text-center mb-4">
          <h1
            style={{
              fontFamily: "Croissant One",
              color: "#2563EB",
              fontSize: "2.8rem",
              marginBottom: "8px",
            }}
          >
            Spendee
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

        {/* Filter Section */}

        <Card
          className="border-0 shadow-sm mb-4"
          style={{
            borderRadius: "28px",
            background: "linear-gradient(135deg,#ffffff,#f8fbff)",
          }}
        >
          <Card.Body className="p-4">
            <Row className="g-3 align-items-end">
              <Col lg={4}>
                <Form.Control
                  type="text"
                  placeholder="Search by description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    height: "55px",
                    borderRadius: "16px",
                    border: "1px solid #CBD5E1",
                    fontFamily: "EB Garamond",
                  }}
                />
              </Col>

              <Col lg={3}>
                <MonthlyFilter
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />
              </Col>

              <Col lg={2}>
                <Form.Label
                  style={{
                    fontFamily: "EB Garamond",
                    color: "#64748B",
                    marginBottom: "6px",
                  }}
                >
                  From
                </Form.Label>

                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    height: "55px",
                    borderRadius: "16px",
                    border: "1px solid #CBD5E1",
                  }}
                />
              </Col>

              <Col lg={2}>
                <Form.Label
                  style={{
                    fontFamily: "EB Garamond",
                    color: "#64748B",
                    marginBottom: "6px",
                  }}
                >
                  To
                </Form.Label>

                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    height: "55px",
                    borderRadius: "16px",
                    border: "1px solid #CBD5E1",
                  }}
                />
              </Col>

              <Col lg={1}>
                <Button
                  className="w-100"
                  variant="primary"
                  style={{
                    height: "55px",
                    borderRadius: "16px",
                    border: "none",
                    fontFamily: "EB Garamond",
                    fontWeight: "600",
                  }}
                  onClick={() =>
                    exportTransactionsPDF(
                      filteredTransactions,
                      Number(localStorage.getItem("monthlyIncome")) || 0,
                    )
                  }
                >
                  PDF
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Transaction History */}

        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2
                    style={{
                      fontFamily: "Croissant One",
                      color: "#2563EB",
                      marginBottom: "6px",
                    }}
                  >
                    Transaction History
                  </h2>

                  <p
                    style={{
                      fontFamily: "EB Garamond",
                      color: "#64748B",
                      fontSize: "1.1rem",
                      marginBottom: 0,
                    }}
                  >
                    View and manage all your transactions
                  </p>
                </div>

                <div
                  style={{
                    background: "#EFF6FF",
                    color: "#2563EB",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontFamily: "EB Garamond",
                    fontWeight: "600",
                  }}
                >
                  {filteredTransactions.length} Records
                </div>
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <EmptyState
                title="No Transactions Found"
                message="Try changing the search term or filters."
              />
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Ledger;
