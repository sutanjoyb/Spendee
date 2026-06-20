function Header() {
  return (
    <div className="text-center mb-5">
      <h1
        style={{
          fontFamily: "Croissant One",
          color: "#2563EB",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          marginBottom: "10px",
        }}
      >
        Spendee
      </h1>

      <p
        style={{
          fontFamily: "EB Garamond",
          fontSize: "1.3rem",
          color: "#64748B",
          marginBottom: 0,
        }}
      >
        Track easily. Spend wisely.
      </p>
    </div>
  );
}

export default Header;
