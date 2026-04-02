// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";

// const ComplaintDetails = () => {
//   const { id } = useParams();
//   const [complaint, setComplaint] = useState(null);
//   const [status, setStatus] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [inspections, setInspections] = useState([]);
//   const [remarks, setRemarks] = useState("");
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const fetchComplaint = async () => {
//       try {
//         const tokens = localStorage.getItem("authTokens");
//         const accessToken = tokens ? JSON.parse(tokens).access : null;
//         if (!accessToken) throw new Error("No access token");

//         const payload = JSON.parse(atob(accessToken.split(".")[1]));
//         setUserRole(payload.role || "");

//         // ✅ Fetch complaint
//         const res = await api.get(`complaints/${id}/`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         setComplaint(res.data);
//         setStatus(res.data.status);

//         // ✅ Fetch inspections (FIXED URL)
//         const insRes = await api.get(
//           `complaints/${id}/inspections/`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         setInspections(insRes.data);

//       } catch (error) {
//         console.error(error);
//         alert("Error: " + error.message);
//       }
//     };

//     fetchComplaint();
//   }, [id]);

//   const updateStatus = async (complaintId, newStatus) => {
//     try {
//       const tokens = localStorage.getItem("authTokens");
//       const accessToken = tokens ? JSON.parse(tokens).access : null;

//       // ✅ FIXED URL
//       const res = await api.patch(
//         `complaints/${complaintId}/update-status/`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       setStatus(res.data.status);
//       alert("Status updated successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating status: " + error.message);
//     }
//   };

//   const submitInspection = async () => {
//     try {
//       const tokens = localStorage.getItem("authTokens");
//       const accessToken = tokens ? JSON.parse(tokens).access : null;

//       const formData = new FormData();
//       formData.append("remarks", remarks);
//       if (image) formData.append("image", image);

//       // ✅ FIXED URL
//       const res = await api.post(
//         `complaints/${id}/inspections/add/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setInspections([...inspections, res.data]);
//       setRemarks("");
//       setImage(null);
//       alert("Inspection added successfully!");

//     } catch (error) {
//       console.error(error);
//       alert("Error adding inspection: " + error.message);
//     }
//   };

//   if (!complaint) return <p>Loading complaint...</p>;

//   return (
//     <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
//       <h2>Complaint Details</h2>
//       <p><b>ID:</b> {complaint.id}</p>
//       <p><b>Description:</b> {complaint.description}</p>
//       <p><b>Submitted By:</b> {complaint.user}</p>
//       <p><b>Created At:</b> {new Date(complaint.created_at).toLocaleString()}</p>

//       {userRole === "inspector" && (
//         <>
//           <label><b>Status:</b></label>
//           <select
//             value={status}
//             onChange={(e) => updateStatus(complaint.id, e.target.value)}
//             style={{ marginLeft: 10, padding: 5 }}
//           >
//             <option value="pending">Pending</option>
//             <option value="assigned">Assigned</option>
//             <option value="under_investigation">Under Investigation</option>
//             <option value="resolved">Resolved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </>
//       )}

//       <hr style={{ margin: "20px 0" }} />

//       <h3>Inspection History</h3>
//       {inspections.length === 0 && <p>No inspections yet.</p>}
//       {inspections.map((i) => (
//         <div
//           key={i.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10,
//             borderRadius: 8
//           }}
//         >
//           <p><b>Inspector:</b> {i.inspector_name}</p>
//           <p><b>Remarks:</b> {i.remarks}</p>
//           {i.image && (
//             <img
//               src={i.image}
//               alt="inspection"
//               style={{ width: 200, borderRadius: 5 }}
//             />
//           )}
//           <p><b>Date:</b> {new Date(i.created_at).toLocaleString()}</p>
//         </div>
//       ))}

//       {userRole === "inspector" && (
//         <>
//           <h3>Add Inspection</h3>
//           <textarea
//             placeholder="Enter remarks"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           />
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <br />
//           <button
//             onClick={submitInspection}
//             style={{ marginTop: 10, padding: "8px 15px", cursor: "pointer" }}
//           >
//             Submit Inspection
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ComplaintDetails;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState("");
  const [inspections, setInspections] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const tokens = localStorage.getItem("authTokens");
        const accessToken = tokens ? JSON.parse(tokens).access : null;

        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        setUserRole(payload.role || "");

        const res = await api.get(`complaints/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setComplaint(res.data);
        setStatus(res.data.status);

        const insRes = await api.get(
          `complaints/${id}/inspections/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setInspections(insRes.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaint();
  }, [id]);

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const tokens = localStorage.getItem("authTokens");
      const accessToken = tokens ? JSON.parse(tokens).access : null;

      const res = await api.patch(
        `complaints/${complaintId}/update-status/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setStatus(res.data.status);
      alert("Status updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const submitInspection = async () => {
    try {
      const tokens = localStorage.getItem("authTokens");
      const accessToken = tokens ? JSON.parse(tokens).access : null;

      const formData = new FormData();
      formData.append("remarks", remarks);
      if (image) formData.append("image", image);

      const res = await api.post(
        `complaints/${id}/inspections/add/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setInspections([...inspections, res.data]);
      setRemarks("");
      setImage(null);
      alert("Inspection added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding inspection.");
    }
  };

  if (!complaint) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const cardStyle = {
    maxWidth: "850px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "15px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  };

  const sectionTitle = {
    borderBottom: "2px solid #eee",
    paddingBottom: "8px",
    marginBottom: "15px"
  };

  const badgeStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "#f0f0f0",
    fontSize: "14px"
  };

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh", paddingBottom: "50px" }}>
      <div style={cardStyle}>

        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Complaint Details
        </h2>

        <div style={{ lineHeight: "1.8" }}>
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Submitted By:</strong> {complaint.user}</p>
          <p><strong>Created At:</strong> {new Date(complaint.created_at).toLocaleString()}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={badgeStyle}>{status}</span>
          </p>
        </div>

        {userRole === "inspector" && (
          <div style={{ marginTop: "20px" }}>
            <label><strong>Update Status:</strong></label>
            <select
              value={status}
              onChange={(e) => updateStatus(complaint.id, e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc"
              }}
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="under_investigation">Under Investigation</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        <div style={{ marginTop: "40px" }}>
          <h3 style={sectionTitle}>Inspection History</h3>

          {inspections.length === 0 && <p>No inspections yet.</p>}

          {inspections.map((i) => (
            <div key={i.id} style={{
              background: "#fafafa",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #eee"
            }}>
              <p><strong>Inspector:</strong> {i.inspector_name}</p>
              <p><strong>Remarks:</strong> {i.remarks}</p>
              {i.image && (
                <img
                  src={i.image}
                  alt="inspection"
                  style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
                />
              )}
              <p style={{ fontSize: "13px", marginTop: "8px", color: "#777" }}>
                {new Date(i.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {userRole === "inspector" && (
          <div style={{ marginTop: "40px" }}>
            <h3 style={sectionTitle}>Add Inspection</h3>

            <textarea
              placeholder="Enter inspection remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "15px"
              }}
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <br />

            <button
              onClick={submitInspection}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer"
              }}
            >
              Submit Inspection
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ComplaintDetails;