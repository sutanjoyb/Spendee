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
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
