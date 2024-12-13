import React, { useState } from "react";
import { predictAudioEmotion } from "../api/emotionApi";

const AudioEmotion = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an audio file!");
      return;
    }
    try {
      const response = await predictAudioEmotion(file);
      setResult(response);
    } catch (error) {
      console.error("Error predicting audio emotion:", error);
    }
  };

  return (
    <div>
      <h2>Audio Emotion Detection</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handlePredict}>Predict Emotion</button>
      {result && (
        <div>
          <h3>Prediction Result:</h3>
          <p>Emotion: {result.predicted_emotion}</p>
          <p>Confidence: {JSON.stringify(result.confidence)}</p>
        </div>
      )}
    </div>
  );
};

export default AudioEmotion;
