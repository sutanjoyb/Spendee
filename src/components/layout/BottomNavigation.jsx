import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaChartPie,
} from "react-icons/fa";

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    color: active ? "#2563EB" : "#64748B",
    background: active
      ? "rgba(37,99,235,0.08)"
      : "transparent",
    fontFamily: "EB Garamond",
    fontSize: "1.05rem",
    fontWeight: active ? "700" : "500",
    transition: "all 0.2s ease",
  });

  return (
    <div
      className="mb-4"
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <Nav className="d-flex justify-content-center gap-3 flex-wrap">
        <div
          style={linkStyle(
            location.pathname === "/dashboard"
          )}
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
          Dashboard
        </div>

        <div
          style={linkStyle(
            location.pathname === "/ledger"
          )}
          onClick={() => navigate("/ledger")}
        >
          <FaBook />
          Ledger
        </div>

        <div
          style={linkStyle(
            location.pathname === "/reports"
          )}
          onClick={() => navigate("/reports")}
        >
          <FaChartPie />
          Reports
        </div>
      </Nav>
    </div>
  );
}

export default BottomNavigation;