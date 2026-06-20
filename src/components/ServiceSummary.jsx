const ServiceSummary = ({ summary }) => {
  return (
    <section>
      <h2>Service Summary</h2>

      <div className="summary-card">
        <p>
          <strong>Service:</strong>{" "}
          {summary.service}
        </p>

        <p>
          <strong>Your Referrals:</strong>{" "}
          {summary.yourReferrals}
        </p>

        <p>
          <strong>Active Referrals:</strong>{" "}
          {summary.activeReferrals}
        </p>

        <p>
          <strong>Total Ref. Earnings:</strong>{" "}
          {summary.totalRefEarnings}
        </p>
      </div>
    </section>
  );
};

export default ServiceSummary;