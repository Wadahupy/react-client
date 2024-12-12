import React, { useState } from "react";
import axios from "axios";

const TextEmotionForm = ({ setResults }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/predict/text", {
        text, // Send text data
      });
      setResults(response.data); // Set results from response
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full p-4 border border-gray-300 rounded"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {loading ? "Processing..." : "Analyze Emotion"}
      </button>
    </form>
  );
};

export default TextEmotionForm;
