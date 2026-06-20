import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import api from "../services/api";
import ReferralTable from "../components/ReferralTable";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import ServiceSummary from "../components/ServiceSummary";
import ShareReferral from "../components/ShareReferral";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const response = await api.get("/api/referrals");

      setDashboardData(response.data.data);

      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch data");

      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="loading-container">Loading...</h1>;
  }

  if (error) {
    return <div role="alert">{error}</div>;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Referral Dashboard</h1>

        <p className="dashboard-description">
          Track your referrals, earnings, and partner activity in one place.
        </p>

        <Overview metrics={dashboardData.metrics || []} />

        <ServiceSummary summary={dashboardData.serviceSummary || {}} />

        <ShareReferral referral={dashboardData.referral || {}} />
        <ReferralTable />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
