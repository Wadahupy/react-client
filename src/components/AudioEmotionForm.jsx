import React, { useState } from "react";
import axios from "axios";

const AudioEmotionForm = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict/audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResults(response.data); // Set results from response
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        {loading ? "Processing..." : "Analyze Audio"}
      </button>
    </form>
  );
};

export default AudioEmotionForm;
