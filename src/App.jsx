import React, { useState } from "react";
import TextEmotionForm from "./components/TextEmotionForm.jsx";
import AudioEmotionForm from "./components/AudioEmotionForm";
import Results from "./components/Results";

const App = () => {
  const [results, setResults] = useState(null);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Emotion Detection</h1>
      <TextEmotionForm setResults={setResults} />
      <AudioEmotionForm setResults={setResults} />
      <Results results={results} />
    </div>
  );
};

export default App;
