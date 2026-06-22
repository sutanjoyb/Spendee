import { Form } from "react-bootstrap";

function MonthlyFilter({ selectedMonth, setSelectedMonth }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Form.Select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      style={{
        borderRadius: "14px",
        height: "50px",
        fontFamily: "EB Garamond",
        border: "1px solid #CBD5E1",
        boxShadow: "none",
      }}
    >
      <option value="" disabled={selectedMonth !== ""}>
        All Months
      </option>

      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </Form.Select>
  );
}

export default MonthlyFilter;
