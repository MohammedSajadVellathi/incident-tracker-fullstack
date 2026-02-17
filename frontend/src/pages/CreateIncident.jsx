import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateIncident() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV3",
    owner: "",
    summary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/incidents", form);
    navigate("/");
  };

  return (
    <div className="container">

    <div style={{ padding: "20px" }}>
      <h2>Create New Incident</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        /><br /><br />

        <input
          placeholder="Service"
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        /><br /><br />

        <select onChange={(e) => setForm({ ...form, severity: e.target.value })}>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select><br /><br />

        <input
          placeholder="Assigned To"
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        /><br /><br />

        <textarea
          placeholder="Summary"
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        /><br /><br />

        <button type="submit">Create Incident</button>
      </form>
    </div>
    </div>
  );
}
