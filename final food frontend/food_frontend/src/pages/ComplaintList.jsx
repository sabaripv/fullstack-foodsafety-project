// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function ComplaintList() {
//   const navigate = useNavigate();

//   const [complaints, setComplaints] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const tokens = localStorage.getItem("authTokens");
//         const accessToken = tokens ? JSON.parse(tokens).access : null;

//         const res = await api.get("complaints/", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         console.log("COMPLAINTS DATA:", res.data);
//         setComplaints(res.data);
//       } catch (err) {
//         console.log("Fetch complaints error:", err.response?.data || err);
//         setError("Failed to load complaints.");
//       }
//     };

//     fetchComplaints();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Complaints</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {complaints.length === 0 && <p>No complaints found</p>}

//       {complaints.map((c) => (
//         <div
//           key={c.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 15,
//             marginTop: 15,
//             borderRadius: 10,
//           }}
//         >
//           <h3>{c.title}</h3>

//           {/* ✅ Status */}
//           <p>
//             <b>Status:</b> {c.status}
//           </p>

//           <p>{c.description}</p>

//           {/* ✅ Image */}
//           {c.image && (
//             <img
//               src={c.image}
//               alt="complaint"
//               style={{
//                 width: 250,
//                 marginTop: 10,
//                 borderRadius: 10,
//                 display: "block",
//               }}
//             />
//           )}

//           {/* ✅ View Details Button */}
//           <button
//             onClick={() => navigate(`/complaints/${c.id}`)}
//             style={{
//               marginTop: 12,
//               padding: "8px 14px",
//               cursor: "pointer",
//               borderRadius: 8,
//               border: "1px solid #333",
//               background: "white",
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ComplaintList() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const tokens = localStorage.getItem("authTokens");
        const accessToken = tokens ? JSON.parse(tokens).access : null;
        if (!accessToken) throw new Error("No access token");

        // Decode JWT to get role
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        setUserRole(payload.role || "");

        const res = await api.get("complaints/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setComplaints(res.data);
      } catch (err) {
        console.error("Fetch complaints error:", err.response?.data || err);
        setError("Failed to load complaints.");
      }
    };

    fetchComplaints();
  }, []);

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const tokens = localStorage.getItem("authTokens");
      const accessToken = tokens ? JSON.parse(tokens).access : null;

      const res = await api.patch(
        `complaints/${complaintId}/update-status/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setComplaints((prev) =>
        prev.map((c) => (c.id === complaintId ? { ...c, status: res.data.status } : c))
      );

      alert("Status updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Complaints</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {complaints.length === 0 && <p>No complaints found</p>}

      {complaints.map((c) => (
        <div
          key={c.id}
          style={{ border: "1px solid #ccc", padding: 15, marginTop: 15, borderRadius: 10 }}
        >
          <h3>{c.title}</h3>
          <p>{c.description}</p>

          {c.image && (
            <img src={c.image} alt="complaint" style={{ width: 250, marginTop: 10, borderRadius: 10 }} />
          )}

          {/* Status editable only for inspectors */}
          <p>
            <b>Status:</b>{" "}
            {userRole === "inspector" ? (
              <select value={c.status} onChange={(e) => updateStatus(c.id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="under_investigation">Under Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            ) : (
              c.status
            )}
          </p>

          <button
            onClick={() => navigate(`/complaints/${c.id}`)}
            style={{
              marginTop: 12,
              padding: "8px 14px",
              cursor: "pointer",
              borderRadius: 8,
              border: "1px solid #333",
              background: "white",
            }}
          >
            View Details →
          </button>
        </div>
      ))}
    </div>
  );
}