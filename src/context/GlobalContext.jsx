import React, { createContext, useContext, useState } from "react";
import { predictTextEmotion, predictAudioEmotion } from "../api/emotionApi";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [confidence, setConfidence] = useState(null);
  const [text, setText] = useState("");
  const [resultAudio, setResultAudio] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [errorText, setErrorText] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);
  const [file, setFile] = useState(null);

  const initialConfidence = {
    angry: 0,
    disgust: 0,
    anger: 0,
    happy: 0,
    fear: 0,
    neutral: 0,
    ps: 0,
    sad: 0,
    fear: 0,
  };

  const handlePredictText = async () => {
    if (!text.trim()) {
      setErrorText(true);
      return;
    }

    setErrorText(false);
    try {
      const response = await predictTextEmotion(text);
      setResultText(response);
    } catch (error) {
      console.error("Error predicting text script emotion:", error);
    }
  };

  const handlePredictAudio = async () => {
    if (!file) {
      setErrorAudio(true);
      return;
    }

    try {
      const response = await predictAudioEmotion(file);
      setResultAudio(response);
    } catch (error) {
      console.error("Error predicting audio emotion:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        confidence,
        setConfidence,
        text,
        setText,
        resultAudio,
        setResultAudio,
        resultText,
        setResultText,
        handlePredictAudio,
        handlePredictText,
        initialConfidence,
        errorText,
        errorAudio,
        file,
        setFile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
