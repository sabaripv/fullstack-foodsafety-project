import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const tokens = localStorage.getItem("authTokens");
    const accessToken = tokens ? JSON.parse(tokens).access : null;

    if (!accessToken) {
      setError("You must be logged in to submit a complaint.");
      return;
    }

    try {
      // ✅ FormData for image upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      // ✅ IMPORTANT:
      // DO NOT set Content-Type manually
      // Axios will set correct multipart boundary automatically
      const res = await api.post("complaints/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Complaint created:", res.data);
      navigate("/complaints");
    } catch (err) {
      console.log("Submit complaint error:", err.response?.data || err);
      setError(JSON.stringify(err.response?.data || "Failed", null, 2));
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Create Complaint</h2>

      {error && (
        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <textarea
          placeholder="Complaint Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", padding: 10, height: 120, marginTop: 10 }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: 10 }}
        />

        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: 10, cursor: "pointer" }}
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
