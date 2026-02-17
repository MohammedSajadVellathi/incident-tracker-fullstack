import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();



  const fetchData = async () => {
  try {
    const res = await API.get(`/incidents?page=${page}&limit=10`);

    console.log("API RESPONSE:", res.data);   // 👈 ADD THIS

    setIncidents(res.data);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="container">

    <div className="header">
    <h1>Incident Tracker</h1>

    <Link to="/create">
        <button>New Incident</button>
    </Link>
    </div>


      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Service</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>

            <tbody>
        {incidents.map((i) => (
            <tr
            key={i.id}
            onClick={() => navigate(`/incident/${i.id}`)}
            style={{ cursor: "pointer" }}
            >
            <td>{i.title}</td>
            <td>{i.service}</td>
            <td>{i.severity}</td>
            <td>{i.status}</td>
            </tr>
        ))}
        </tbody>

      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
