import React, { useState } from "react";
import TextEmotion from "../components/TextEmotion";
import AudioEmotion from "../components/AudioEmotion";
import { FaPlay } from "react-icons/fa";

const EmotionPredictPage = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-teal-100">
      {!started ? (
        <div className="flex flex-col justify-center items-center mb-10 text-center">
          <div className="mx-5 p-10 rounded-md bg-slate-50">
            <h1 className="text-4xl font-bold mb-2 text-center font-title text-zinc-800">
              Assessing Emotional State in EARIST Students through Machine
              Learning Analysis of Vocal Tone During Pocket Book Reading
            </h1>
            <h4 className="mt-5 font-body font-medium text-lg">By</h4>
            <div className="flex flex-row gap-2 justify-center font-body text-zinc-800 underline mx-80 p-1 rounded-md mt-3">
              <p>Pil, Marck Darrel</p>
              <p>Abalos, Rochelle</p>
              <p>Durante, Jude Michael</p>
              <p>Vinas, Rafael</p>
            </div>

            <button
              className="transition ease-in-out delay-1500 duration-300 hover:scale-110 p-6 border-double border-4 border-white bg-blue-500 text-white text-lg hover:bg-blue-600 rounded-full mt-10"
              onClick={handleStart}
            >
              <FaPlay />
            </button>
          </div>
        </div>
      ) : (
        <div className="container min-w-dvh min-h-dvh rounded-lg p-4">
          <h1 className="font-bold font-title text-center text-4xl text-zinc-700">
            Emotion Detection
          </h1>
          <div>
            <TextEmotion />
            <AudioEmotion />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionPredictPage;
