import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profiles/list");
      setProfiles(res.data.profiles);
    } catch (err) {
      alert("Failed to load profiles.");
    }
  };

  const loadProfile = async (filename) => {
    try {
      const res = await axios.get(`/api/profiles/load/${filename}`);
      setSelectedProfile(filename);
      setFormData(res.data);
    } catch (err) {
      alert("Error loading profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["strengths", "needs", "interests"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",") });
    } else if (name.startsWith("languages.")) {
      const langField = name.split(".")[1];
      setFormData({
        ...formData,
        languages: { ...formData.languages, [langField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const saveProfile = async () => {
    try {
      await axios.post("/api/profiles/create", formData);
      alert("Profile updated successfully.");
      await fetchProfiles();     // Refresh the profile list
      setFormData(null);         // Exit edit mode and stay on the same page
    } catch (err) {
      alert("Error saving profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Student Profiles</h2>

      {!formData ? (
        <ul className="space-y-2">
          {profiles.map((p) => (
            <li key={p} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{p.replace(".json", "")}</span>
              <button
                onClick={() => loadProfile(p)}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3 bg-white shadow p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Edit Profile: {selectedProfile.replace(".json", "")}</h3>

          <label>Name <span className="text-red-500">*</span></label>
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />

          <label>Age <span className="text-red-500">*</span></label>
          <input name="age" value={formData.age} onChange={handleChange} className="border p-2 w-full" type="number" required />

          <label>Native Language <span className="text-red-500">*</span></label>
          <input name="languages.native" value={formData.languages.native} onChange={handleChange} className="border p-2 w-full" required />

          <label>Native Reading Level <span className="text-red-500">*</span></label>
          <input name="native_reading_level" value={formData.native_reading_level} onChange={handleChange} className="border p-2 w-full" required />

          <label>Learning Language <span className="text-red-500">*</span></label>
          <input name="languages.learning" value={formData.languages.learning} onChange={handleChange} className="border p-2 w-full" required />

          <label>English Reading Level <span className="text-red-500">*</span></label>
          <input name="english_reading_level" value={formData.english_reading_level} onChange={handleChange} className="border p-2 w-full" required />

          <label>Math Level <span className="text-red-500">*</span></label>
          <input name="math_level" value={formData.math_level} onChange={handleChange} className="border p-2 w-full" required />

          <label>Disability <span className="text-red-500">*</span></label>
          <input name="disability" value={formData.disability} onChange={handleChange} className="border p-2 w-full" required />

          <label>Strengths (comma-separated) <span className="text-red-500">*</span></label>
          <input name="strengths" value={formData.strengths.join(",")} onChange={handleChange} className="border p-2 w-full" required />

          <label>Needs (comma-separated)</label>
          <input name="needs" value={formData.needs.join(",")} onChange={handleChange} className="border p-2 w-full" />
          <p className="text-sm text-gray-500 mb-2">Optional – derived from knowledge base if blank.</p>

          <label>Interests (comma-separated) <span className="text-red-500">*</span></label>
          <input name="interests" value={formData.interests.join(",")} onChange={handleChange} className="border p-2 w-full" required />

          <div className="flex gap-3 mt-4">
            <button onClick={saveProfile} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setFormData(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileList;