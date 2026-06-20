import { useState } from "react";
import {
  Form,
  Button,
  ToggleButton,
  ButtonGroup,
  Card,
} from "react-bootstrap";

function TransactionForm({
  addTransaction,
  handleClose,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [amount, setAmount] =
    useState("");

  const [type, setType] =
    useState("debit");

  const [date, setDate] =
    useState(today);

  const [description, setDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !amount ||
      !description.trim()
    ) {
      alert(
        "Please fill all required fields"
      );
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      date,
      description,
    };

    addTransaction(newTransaction);

    setAmount("");
    setDescription("");
    setType("debit");
    setDate(today);

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
          {/* Amount */}

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily:
                  "EB Garamond",
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
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              style={{
                height: "70px",
                fontSize: "2rem",
                textAlign: "center",
                borderRadius: "16px",
                border:
                  "2px solid #E2E8F0",
                fontFamily:
                  "EB Garamond",
                fontWeight: "600",
              }}
            />
          </Form.Group>

          {/* Transaction Type */}

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily:
                  "EB Garamond",
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
                checked={
                  type === "debit"
                }
                onChange={(e) =>
                  setType(
                    e.currentTarget.value
                  )
                }
                variant={
                  type === "debit"
                    ? "danger"
                    : "outline-danger"
                }
                style={{
                  height: "50px",
                }}
              >
                Debit
              </ToggleButton>

              <ToggleButton
                id="credit"
                type="radio"
                value="credit"
                checked={
                  type === "credit"
                }
                onChange={(e) =>
                  setType(
                    e.currentTarget.value
                  )
                }
                variant={
                  type === "credit"
                    ? "success"
                    : "outline-success"
                }
                style={{
                  height: "50px",
                }}
              >
                Credit
              </ToggleButton>
            </ButtonGroup>
          </Form.Group>

          {/* Date */}

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily:
                  "EB Garamond",
                fontSize: "1.2rem",
                color: "#475569",
              }}
            >
              Date
            </Form.Label>

            <Form.Control
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              style={{
                borderRadius: "14px",
                height: "50px",
              }}
            />
          </Form.Group>

          {/* Description */}

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontFamily:
                  "EB Garamond",
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
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              style={{
                borderRadius: "14px",
                height: "50px",
              }}
            />
          </Form.Group>

          {/* Quick Categories */}

          <div className="mb-4">
            <p
              style={{
                fontFamily:
                  "EB Garamond",
                color: "#64748B",
                marginBottom: "12px",
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
                  onClick={() =>
                    setDescription(
                      item
                    )
                  }
                  style={{
                    borderRadius:
                      "30px",
                    border:
                      "1px solid #CBD5E1",
                    fontFamily:
                      "EB Garamond",
                    padding:
                      "8px 16px",
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {/* Submit */}

          <Button
            type="submit"
            className="w-100"
            style={{
              background:
                "linear-gradient(135deg,#60A5FA,#2563EB)",
              border: "none",
              height: "55px",
              borderRadius: "14px",
              fontFamily:
                "EB Garamond",
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
