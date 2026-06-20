import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedIncome = Number(localStorage.getItem("monthlyIncome")) || 0;

    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setMonthlyIncome(savedIncome);
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("monthlyIncome", monthlyIncome);
  }, [monthlyIncome]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const creditAmount = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const debitAmount = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalIncome = monthlyIncome + creditAmount;

  const remainingBalance = totalIncome - debitAmount;

  return (
    <FinanceContext.Provider
      value={{
        monthlyIncome,
        setMonthlyIncome,

        transactions,
        setTransactions,

        addTransaction,
        deleteTransaction,
        clearTransactions,

        creditAmount,
        debitAmount,

        totalIncome,
        remainingBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
