import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/dashboard.css";

const ReferralDetails = () => {
  const { id } = useParams();

  const [referral, setReferral] = useState(null);

  const [loading, setLoading] = useState(true);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getReferralDetails();
  }, []);

  const getReferralDetails = async () => {
    try {
      const response = await api.get(`/api/referrals?id=${id}`);

      const data = response.data.data;

      console.log("FULL DATA:", data);

      let selectedReferral = null;

      if (data.referrals) {
        selectedReferral = data.referrals.find(
          (item) => String(item.id) === String(id),
        );
      }

      if (selectedReferral) {
        setReferral(selectedReferral);
      } else {
        setNotFound(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);

      setNotFound(true);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return date.replaceAll("-", "/");
  };
  const formatProfit = (profit) => {
    if (profit === undefined || profit === null){
      return "$0";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(profit);
  };

  if (loading) {
    return <h1 className="loading-container">Loading...</h1>;
    setloading(false);
  }
  if (notFound) {
    return (
      <>
        <Navbar />

        <div className="details-container">
          <h1>Referral not found</h1>

          <Link to="/">← Back to dashboard</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <h1>Referral Details</h1>

        <h2>{referral.name}</h2>

        <div className="details-card">
          <div className="detail-row">
            <strong>Referral ID:</strong>

            <span>{referral.id}</span>
          </div>

          <div className="detail-row">
            <strong>Service Name:</strong>

            <span>{referral.serviceName}</span>
          </div>

          <div className="detail-row">
            <strong>Date:</strong>

            <span>{formatDate(referral.date)}</span>
          </div>

          <div className="detail-row">
            <strong>Profit:</strong>

            <span>{formatProfit(referral.profit)}</span>
          </div>
        </div>

        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>
      </div>
    </>
  );
};

export default ReferralDetails;
