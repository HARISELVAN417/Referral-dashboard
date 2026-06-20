const ShareReferral = ({ referral }) => {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <section>
      <h2>Refer friends and earn more</h2>

      <div className="share-box">
        <label>
          Your Referral Link
        </label>

        <div className="copy-row">
          <input
            readOnly
            value={referral.link}
          />

          <button
            onClick={() =>
              copyText(referral.link)
            }
          >
            Copy
          </button>
        </div>

        <label>
          Your Referral Code
        </label>

        <div className="copy-row">
          <input
            readOnly
            value={referral.code}
          />

          <button
            onClick={() =>
              copyText(referral.code)
            }
          >
            Copy
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShareReferral;