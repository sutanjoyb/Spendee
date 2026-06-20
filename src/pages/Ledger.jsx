import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import Header from "../components/common/Header";
import EmptyState from "../components/common/EmptyState";
import MonthlyFilter from "../components/filters/MonthlyFilter";
import TransactionCard from "../components/transactions/TransactionCard";
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
        background: "linear-gradient(to bottom, #f8fafc, #eef6ff)",
        padding: "30px 0",
      }}
    >
      <Container>
        <Header />

        {/* Filters */}

        <Card
          className="border-0 shadow-sm mb-4"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: "14px",
                  }}
                />
              </Col>

              <Col xs={12} md={4}>
                <MonthlyFilter
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />
              </Col>

              <Col xs={6} md={2}>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    borderRadius: "14px",
                  }}
                />
              </Col>

              <Col xs={6} md={2}>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    borderRadius: "14px",
                  }}
                />
              </Col>
            </Row>

            <div className="mt-3">
              <Button
                variant="outline-primary"
                onClick={() =>
                  exportTransactionsPDF(
                    filteredTransactions,
                    Number(localStorage.getItem("monthlyIncome")) || 0,
                  )
                }
              >
                Export PDF
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Transactions */}

        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "24px",
          }}
        >
          <Card.Body>
            <h3
              className="mb-4"
              style={{
                fontFamily: "Croissant One",
                color: "#2563EB",
              }}
            >
              Transaction History
            </h3>

            {filteredTransactions.length === 0 ? (
              <EmptyState
                title="No Transactions Found"
                message="Try changing the search term or date filters."
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
