// src/components/UploadLesson.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadLesson = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [file, setFile] = useState(null);
  const [lessonResponse, setLessonResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Corrected placement

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/profiles/list");
        setProfiles(response.data.profiles);
      } catch (error) {
        alert("Failed to fetch profiles.");
      }
    };
    fetchProfiles();
  }, []);

  const handleUpload = async () => {
    if (!file || !selectedProfile) {
      alert("Please select a file and a student profile.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await axios.post("/api/lessons/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const lessonId = uploadRes.data.lesson_id;

      const personalizeRes = await axios.post(
        `/api/lessons/personalize/${lessonId}/${selectedProfile}`
      );

      setLessonResponse(personalizeRes.data);  // Capture response
    } catch (error) {
      alert("Error uploading or personalizing lesson.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Lesson & Select Student</h2>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept=".docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Student Profile</option>
          {profiles.map((p) => (
            <option key={p} value={p.replace(".json", "")}>
              {p.replace(".json", "")}
            </option>
          ))}
        </select>

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`py-2 rounded text-white ${isLoading ? "bg-gray-400" : "bg-green-600"}`}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>

        {lessonResponse && (
          <div className="mt-4">
            <p className="mb-2 text-green-700">{lessonResponse.message}</p>
            <a
              href={`http://localhost:8000${lessonResponse.download_url}`}
              download
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download Modified Lesson
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadLesson;