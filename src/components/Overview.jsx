const Overview = ({ metrics }) => {
  return (
    <section>
      <h2>Overview</h2>

      <div className="metrics-grid">
        {metrics.map((item) => (
          <div
            key={item.id}
            className="metric-card"
          >
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;