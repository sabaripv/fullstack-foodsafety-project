import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/complaints")}>
        View Complaints
      </button>

      <br /><br />

      <button onClick={() => navigate("/create-complaint")}>
        Create Complaint
      </button>

      <br /><br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
