import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SetupBudget from "./pages/SetupBudget";
import Dashboard from "./pages/Dashboard";
import Ledger from "./pages/Ledger";
import Reports from "./pages/Reports";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
  return (
    <BrowserRouter>
      <FinanceProvider>
        <Routes>
          {/* Default Route */}

          <Route path="/" element={<Navigate to="/setup" replace />} />

          {/* Pages */}

          <Route path="/setup" element={<SetupBudget />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/ledger" element={<Ledger />} />

          <Route path="/reports" element={<Reports />} />

          {/* Invalid Routes */}

          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </FinanceProvider>
    </BrowserRouter>
  );
}

export default App;
