import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SetupBudget() {
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!budget || Number(budget) <= 0) {
      alert("Please enter a valid income amount");
      return;
    }

    localStorage.setItem("monthlyIncome", budget);

    localStorage.setItem("transactions", JSON.stringify([]));

    localStorage.setItem(
      "lastResetMonth",
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    );

    navigate("/dashboard");

    localStorage.setItem("budget", budget);

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container>
        <div className="d-flex justify-content-center">
          <Card
            className="border-0 shadow-lg"
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "30px",
            }}
          >
            <Card.Body className="p-4 p-md-5">
              {/* App Name */}

              <div className="text-center mb-5">
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
                    fontSize: "1.3rem",
                    color: "#64748B",
                  }}
                >
                  Track easily. Spend wisely.
                </p>
              </div>

              {/* Heading */}

              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "EB Garamond",
                  fontWeight: "600",
                }}
              >
                Set Your Monthly Income
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label
                    style={{
                      fontFamily: "EB Garamond",
                      fontSize: "1.2rem",
                    }}
                  >
                    Monthly Income Amount
                  </Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{
                      height: "60px",
                      fontSize: "1.5rem",
                      textAlign: "center",
                      borderRadius: "15px",
                      fontFamily: "EB Garamond",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    height: "55px",
                    borderRadius: "15px",
                    background: "#2563EB",
                    border: "none",
                    fontSize: "1.1rem",
                    fontFamily: "EB Garamond",
                  }}
                >
                  Continue to Dashboard
                </Button>
              </Form>

              <div className="text-center mt-4">
                <small
                  style={{
                    color: "#64748B",
                    fontFamily: "EB Garamond",
                  }}
                >
                  Your budget will be saved locally and restored automatically
                  when you reopen the app.
                </small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default SetupBudget;
