import TransactionCard from "./TransactionCard";
import EmptyState from "../common/EmptyState";

function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        title="No Transactions"
        message="Start tracking your expenses by adding your first transaction."
      />
    );
  }

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{
          paddingBottom: "10px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <h5
          style={{
            fontFamily: "Croissant One",
            color: "#2563EB",
            margin: 0,
          }}
        >
          Recent Transactions
        </h5>

        <span
          style={{
            background: "#EFF6FF",
            color: "#2563EB",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          {transactions.length} Records
        </span>
      </div>

      <div className="mt-3">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
