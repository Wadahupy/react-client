import React, { useState } from "react";
import { predictTextEmotion } from "../api/emotionApi";

const TextEmotion = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await predictTextEmotion(text);
      setResult(response);
    } catch (error) {
      console.error("Error predicting text emotion:", error);
    }
  };

  return (
    <div>
      <h2>Text Emotion Detection</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
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

export default TextEmotion;
