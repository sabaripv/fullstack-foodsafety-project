import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateInspection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [msg, setMsg] = useState("");
  const [inspectionData, setInspectionData] = useState({
    remarks: "",
    status: "Pending",
  });

  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    const role = tokens ? JSON.parse(tokens).role : null;
    setUserRole(role);

    // If user is not inspector, redirect
    if (role !== "inspector") {
      setMsg("❌ Not authorized");
      setTimeout(() => navigate("/complaints"), 1500); // go back to complaints page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokens = localStorage.getItem("authTokens");
    const accessToken = tokens ? JSON.parse(tokens).access : null;

    if (!accessToken) return;

    try {
      await api.post(
        `/inspections/`,
        { complaint: id, ...inspectionData },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      navigate(`/complaints/${id}`); // go back to complaint details
    } catch (err) {
      console.error(err);
      setMsg("Failed to create inspection ❌");
    }
  };

  if (msg) return <p style={{ color: "red", padding: 20 }}>{msg}</p>;

  if (userRole !== "inspector") return null; // don’t render form for non-inspectors

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Inspection for Complaint #{id}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Remarks:
            <textarea
              value={inspectionData.remarks}
              onChange={(e) =>
                setInspectionData({ ...inspectionData, remarks: e.target.value })
              }
              required
              style={{ width: "100%", height: 80, marginTop: 5 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Status:
            <select
              value={inspectionData.status}
              onChange={(e) =>
                setInspectionData({ ...inspectionData, status: e.target.value })
              }
              style={{ marginLeft: 10 }}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>

        <button type="submit" style={{ padding: "8px 16px", borderRadius: 8 }}>
          Submit Inspection
        </button>
      </form>
    </div>
  );
}


