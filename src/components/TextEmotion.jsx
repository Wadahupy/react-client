import React, { useState } from "react";
import EmotionChart from "./Charts";
import { useGlobalContext } from "../context/GlobalContext";

const TextEmotion = () => {
  const {
    text,
    setText,
    handlePredictText,
    resultText,
    initialConfidence,
    error,
  } = useGlobalContext();

  return (
    <div className="flex flex-col md:flex-row justify-center py-6">
      {/* Input Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-l-2xl text-center border p-6 shadow-md">
        <h2 className="text-lg mb-2 text-center font-body font-medium text-zinc-700 pb-5">
          TEXT EMOTION DETECTION
        </h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className={`w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-300 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Please enter some text to predict emotion.
          </p>
        )}
        <button
          onClick={handlePredictText}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Predict Emotion
        </button>
      </div>

      {/* Result Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-r-2xl border p-6 shadow-md">
        <h3 className="text-lg mb-2 text-center font-body font-medium text-zinc-700">
          RESULT FOR TEXT EMOTION
        </h3>
        <p className="mb-4">
          Emotion:{" "}
          <span
            className={`font-medium ${
              resultText
                ? "text-green-500" // Green when result is available
                : "animate-pulse text-gray-500" // Pulse when waiting
            }`}
          >
            {resultText
              ? resultText.predicted_emotion
              : "Waiting for result..."}
          </span>
        </p>
        <EmotionChart
          confidence={resultText?.confidence || initialConfidence}
        />
      </div>
    </div>
  );
};

export default TextEmotion;
