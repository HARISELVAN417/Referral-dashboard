import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ReferralTable = () => {
  const navigate = useNavigate();

  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReferrals();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, sort]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/referrals?search=${search}&sort=${sort}`,
      );

      const data = response?.data?.data?.referrals || [];

      setReferrals(data);

      setCurrentPage(1);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.replaceAll("-", "/");
  };

  const formatProfit = (profit) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(profit);
  };

  const totalPages = Math.ceil(referrals.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentRows = referrals.slice(startIndex, startIndex + rowsPerPage);

  return (
    <section>
      <h2>All referrals</h2>

      <div className="table-controls">
        <input
          type="text"
          aria-label="Search referrals"
          placeholder="Name or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>
          Sort by date
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Newest first</option>

            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan="4">No matching entries</td>
                </tr>
              ) : (
                currentRows.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/referral/${item.id}`)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td>{item.name}</td>

                    <td>{item.serviceName}</td>

                    <td>{formatDate(item.date)}</td>

                    <td>{formatProfit(item.profit)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {totalPages > 1 && [...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>

          <p>
            Showing {startIndex + 1}–
            {Math.min(startIndex + rowsPerPage, referrals.length)} of{" "}
            {referrals.length} entries
          </p>
        </>
      )}
    </section>
  );
};

export default ReferralTable;
