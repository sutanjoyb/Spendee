import { useState } from "react";
import { Form, Button, ToggleButton, ButtonGroup, Card } from "react-bootstrap";

function TransactionForm({ addTransaction, handleClose }) {
  const today = new Date().toISOString().split("T")[0];

  const [amount, setAmount] = useState("");

  const [type, setType] = useState("debit");

  const [date, setDate] = useState(today);

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("Other");

  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      date,
      description,
      category,
      recurring,
    };

    addTransaction(newTransaction);

    setAmount("");
    setDescription("");
    setType("debit");
    setDate(today);
    setCategory("Other");
    setRecurring(false);

    handleClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        className="border-0 mb-4"
        style={{
          background: "#F8FAFC",
          borderRadius: "20px",
        }}
      >
        <Card.Body>
          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Amount
            </Form.Label>

            <Form.Control
              type="number"
              placeholder="₹ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                height: "70px",
                fontSize: "2rem",
                textAlign: "center",
                borderRadius: "16px",
                border: "2px solid #E2E8F0",
                fontFamily: "EB Garamond",
                fontWeight: "600",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Transaction Type
            </Form.Label>

            <ButtonGroup className="w-100">
              <ToggleButton
                id="debit"
                type="radio"
                value="debit"
                checked={type === "debit"}
                onChange={(e) => setType(e.currentTarget.value)}
                variant={type === "debit" ? "danger" : "outline-danger"}
              >
                Debit
              </ToggleButton>

              <ToggleButton
                id="credit"
                type="radio"
                value="credit"
                checked={type === "credit"}
                onChange={(e) => setType(e.currentTarget.value)}
                variant={type === "credit" ? "success" : "outline-success"}
              >
                Credit
              </ToggleButton>
            </ButtonGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Date
            </Form.Label>

            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Description
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Groceries, Rent, Transport..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Category
            </Form.Label>

            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Grocery</option>
              <option>Transport</option>
              <option>Food</option>
              <option>Recharge</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>Healthcare</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="switch"
              id="recurring-switch"
              label="Recurring Transaction"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1.1rem",
              }}
            />
          </Form.Group>

          <div className="mb-4">
            <p
              style={{
                fontFamily: "EB Garamond",
                color: "#64748B",
              }}
            >
              Quick Categories
            </p>

            <div className="d-flex flex-wrap gap-2">
              {[
                "🛒 Grocery",
                "🚗 Transport",
                "🍔 Food",
                "📲 Recharge",
                "🖨️ Xerox",
                "💲 Funded",
              ].map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="light"
                  onClick={() => setDescription(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-100"
            style={{
              background: "linear-gradient(135deg,#60A5FA,#2563EB)",
              border: "none",
              height: "55px",
              borderRadius: "14px",
              fontFamily: "EB Garamond",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
          >
            Save Transaction
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default TransactionForm;
