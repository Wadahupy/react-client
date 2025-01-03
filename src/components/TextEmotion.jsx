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
    errorText,
  } = useGlobalContext();

  return (
    <div className="flex flex-col justify-center gap-2 my-2 md:flex-row">
      {/* Input Section */}
      <div className="flex flex-col w-full p-6 bg-white border text-start md:w-1/2 rounded-2xl">
        <h2 className="pb-5 mb-2 text-lg font-medium text-center font-body text-zinc-700">
          TEXT SCRIPT EMOTION DETECTION
        </h2>
        <p className="justify-start mb-2 text-sm font-body text-zinc-600">
          <b>Note:</b> Enter your text script inside the input box
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text script here..."
          className={`w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-300 ${
            errorText ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errorText && (
          <p className="mt-2 text-sm text-red-500">
            Please enter some text script to predict emotion.
          </p>
        )}
        <button
          onClick={handlePredictText}
          className="px-4 py-2 mt-4 text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-lg delay-1500 hover:scale-105 hover:bg-blue-600 active:bg-blue-700 place-content-end active:scale-100"
        >
          Predict Emotion
        </button>
      </div>

      {/* Result Section */}
      <div className="flex flex-col w-full p-6 bg-white border md:w-1/2 rounded-2xl">
        <h3 className="mb-2 text-lg font-medium text-center font-body text-zinc-700">
          RESULT FOR TEXT SCRIPT EMOTION
        </h3>
        <p className="mb-2 font-semibold">
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
        <p className="mb-2 text-sm italic font-body text-zinc-500">
          This table displays the confidence level for text script emotion
        </p>
        <EmotionChart
          confidence={resultText?.confidence || initialConfidence}
        />
      </div>
    </div>
  );
};

export default TextEmotion;
