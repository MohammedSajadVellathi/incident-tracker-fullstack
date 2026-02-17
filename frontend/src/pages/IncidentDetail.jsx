import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    API.get(`/incidents/${id}`).then((res) => {
      setIncident(res.data);
      setStatus(res.data.status);
    });
  }, [id]);

  const handleSave = async () => {
    await API.patch(`/incidents/${id}`, { status });
    alert("Status updated!");
    navigate("/");
  };

  if (!incident) return <p>Loading...</p>;

  return (
    <div className="container">
    <div style={{ padding: "20px" }}>
      <h2>{incident.title}</h2>

      <p><b>Service:</b> {incident.service}</p>
      <p><b>Severity:</b> {incident.severity}</p>

      <p>
        <b>Status:</b>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </p>

      <p><b>Assigned To:</b> {incident.owner}</p>
      <p><b>Summary:</b> {incident.summary}</p>

      <button onClick={handleSave}>Save Changes</button>
    </div>
    </div>
  );
}
