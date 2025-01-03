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
    <div className="flex flex-wrap items-center justify-center min-h-screen bg-teal-100">
      {!started ? (
        <div className="container flex flex-col items-center justify-center p-5 pb-20 mx-auto text-center ">
          <div className="w-full h-full p-10 mx-5 border border-slate-300 rounded-2xl bg-slate-50">
            <h1 className="mb-2 text-2xl font-bold text-center md:text-3xl font-title text-zinc-800">
              Assessing Emotional State in EARIST Students through Machine
              Learning Analysis of Vocal Tone During Pocket Book Reading
            </h1>
            <p className="mb-2">By</p>
            <p className="text-sm underline md:text-md">Pil, Marck Darrel</p>
            <p className="text-sm underline md:text-md">Abalos, Rochelle</p>
            <p className="text-sm underline md:text-md">
              Durante, Jude Michael
            </p>
            <p className="text-sm underline md:text-md">Vinas, Rafael</p>

            <button
              className="p-6 mt-10 text-lg text-white transition-all duration-300 ease-in-out transform bg-blue-500 border-4 border-white border-double rounded-full delay-1500 hover:scale-110 hover:bg-blue-600 active:bg-blue-700 place-content-end active:scale-100"
              onClick={handleStart}
            >
              <FaPlay />
            </button>
          </div>
        </div>
      ) : (
        <div className="container p-10 m-2 bg-white border rounded-2xl min-w-dvh min-h-dvh">
          <h1 className="mb-5 text-4xl font-bold text-center font-title text-zinc-700">
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
