// src/components/DownloadLink.jsx
import React from "react";

const DownloadLink = ({ fileName }) => {
  if (!fileName) return null;

  return (
    <div className="mt-4">
      <a
        href={`/api/lessons/download/${fileName}`}
        className="text-blue-600 underline"
        download
      >
        Download Modified Lesson
      </a>
    </div>
  );
};

export default DownloadLink;