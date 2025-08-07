import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProfileForm from "./components/ProfileForm";
import UploadLesson from "./components/UploadLesson";
import ProfileList from "./components/ProfileList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<ProfileForm />} />
        <Route path="/upload-lesson" element={<UploadLesson />} />
        <Route path="/profiles" element={<ProfileList />} />
      </Routes>
    </div>
  );
};

console.log("React loaded successfully!");

export default App;