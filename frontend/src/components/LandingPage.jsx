import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Personalized Lesson Generator</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/create-profile")}>Create Student Profile</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/upload-lesson")}>Upload Lesson & Personalize</button>
      <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => navigate("/profiles")}>View/Edit Student Profiles</button>
    </div>
  );
};

export default LandingPage;