// src/components/ProfileForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    languages: {
      native: "",
      learning: ""
    },
    disability: "",
    english_reading_level: "",
    native_reading_level: "",
    math_level: "",
    strengths: "",
    needs: "",
    interests: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("languages.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        languages: { ...prev.languages, [key]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: parseInt(formData.age),
      strengths: formData.strengths.split(",").map((s) => s.trim()),
      needs: formData.needs
        ? formData.needs.split(",").map((n) => n.trim())
        : [],
      interests: formData.interests.split(",").map((i) => i.trim())
    };

    try {
      await axios.post("/api/profiles/create", payload);
      alert("Profile saved successfully!");
      navigate("/");
    } catch (error) {
      alert("Error saving profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Student Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="font-semibold">Name <span className="text-red-500">*</span></label>
        <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Age <span className="text-red-500">*</span></label>
        <input name="age" type="number" value={formData.age} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Native Language <span className="text-red-500">*</span></label>
        <input name="languages.native" value={formData.languages.native} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Native Reading Level <span className="text-red-500">*</span></label>
        <input name="native_reading_level" value={formData.native_reading_level} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Learning Language <span className="text-red-500">*</span></label>
        <input name="languages.learning" value={formData.languages.learning} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">English Reading Level <span className="text-red-500">*</span></label>
        <input name="english_reading_level" value={formData.english_reading_level} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Math Level <span className="text-red-500">*</span></label>
        <input name="math_level" value={formData.math_level} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Disability <span className="text-red-500">*</span></label>
        <input name="disability" value={formData.disability} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Strengths (comma-separated) <span className="text-red-500">*</span></label>
        <input name="strengths" value={formData.strengths} onChange={handleChange} className="border p-2 rounded" required />

        <label className="font-semibold">Needs (comma-separated)</label>
        <input name="needs" value={formData.needs} onChange={handleChange} className="border p-2 rounded" />
        <p className="text-sm text-gray-500">Optional – leave empty to auto-fill based on disability.</p>

        <label className="font-semibold">Interests (comma-separated) <span className="text-red-500">*</span></label>
        <input name="interests" value={formData.interests} onChange={handleChange} className="border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;