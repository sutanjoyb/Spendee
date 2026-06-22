import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ totalSpent, remainingBalance }) {
  const data = [
    {
      name: "Spent",
      value: totalSpent,
    },
    {
      name: "Remaining",
      value: remainingBalance,
    },
  ];

  const COLORS = ["#EF4444", "#10B981"];

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={70}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
