import React from "react";
import TextEmotion from "./components/TextEmotion";
import AudioEmotion from "./components/AudioEmotion";

const App = () => {
  return (
    <div>
      <h1>Emotion Detection</h1>
      <TextEmotion />
      <AudioEmotion />
    </div>
  );
};

export default App;
