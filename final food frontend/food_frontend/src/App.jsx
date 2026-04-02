import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import ComplaintList from "./pages/ComplaintList";
import CreateComplaint from "./pages/CreateComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import AuthProvider from "./auth/AuthContext";
import CreateInspection from "./pages/CreateInspection";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ padding: 20 }}>
          <Link to="/">Login</Link> |{" "}
          <Link to="/complaints">Complaints</Link> |{" "}
          <Link to="/create-complaint">Create Complaint</Link>
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/complaints" element={<ComplaintList />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/create-complaint" element={<CreateComplaint />} />
          <Route path="/create-inspection/:complaintId" element={<CreateInspection />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
