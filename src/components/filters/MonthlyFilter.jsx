import { Form } from "react-bootstrap";

function MonthlyFilter({
  selectedMonth,
  setSelectedMonth,
}) {
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
    <div>
      <Form.Label
        style={{
          fontFamily: "EB Garamond",
          fontSize: "1.1rem",
          color: "#64748B",
        }}
      >
        Filter By Month
      </Form.Label>

      <Form.Select
        value={selectedMonth}
        onChange={(e) =>
          setSelectedMonth(e.target.value)
        }
        style={{
          height: "50px",
          borderRadius: "14px",
          fontFamily: "EB Garamond",
          border: "1px solid #CBD5E1",
        }}
      >
        <option value="">
          All Months
        </option>

        {months.map((month) => (
          <option
            key={month}
            value={month}
          >
            {month}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default MonthlyFilter;