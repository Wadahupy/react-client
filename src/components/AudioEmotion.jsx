import React, { useState, useRef } from "react";
import { WaveFile } from "wavefile";
import { useGlobalContext } from "../context/GlobalContext";
import EmotionChart from "./Charts";
import Record from "../assets/record.svg";
import Record_play from "../assets/record-play.svg";

const AudioEmotion = () => {
  const { initialConfidence, file, setFile, handlePredictAudio, resultAudio } =
    useGlobalContext();

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording
  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const arrayBuffer = await audioBlob.arrayBuffer();

        // Decode the raw audio data into PCM format
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Convert PCM data to WAV format
        const wav = new WaveFile();
        const channelData = audioBuffer.getChannelData(0); // Mono channel
        const pcmData = new Int16Array(channelData.length);

        // Normalize and convert PCM data to 16-bit integer
        for (let i = 0; i < channelData.length; i++) {
          pcmData[i] = Math.max(
            -32768,
            Math.min(32767, channelData[i] * 32768)
          );
        }

        wav.fromScratch(1, audioBuffer.sampleRate, "16", pcmData);
        const wavBlob = new Blob([wav.toBuffer()], { type: "audio/wav" });
        const audioFile = new File([wavBlob], "recording.wav", {
          type: "audio/wav",
        });

        setAudioUrl(URL.createObjectURL(wavBlob)); // For playback
        setFile(audioFile); // Simulate file input upload
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone: ", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Reset recording state
  const resetRecording = () => {
    setAudioUrl(null);
    setFile(null);
    audioChunksRef.current = [];
  };

  return (
    <div className="flex flex-col md:flex-row justify-center">
      {/* File Input Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-l-2xl text-center border p-6 shadow-md">
        <h2 className="text-lg mb-2 text-center font-body font-medium text-zinc-700 pb-5">
          AUDIO EMOTION DETECTION
        </h2>

        <div className="mb-4">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white rounded-full ease-in-out delay-1500 duration-300 hover:scale-110 hover:bg-red-600 transition"
            >
              <img src={Record_play} />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-slate-200 text-white rounded-full ease-in-out delay-1500 duration-300 hover:scale-110 hover:bg-slate-300 transition"
            >
              <img src={Record} />
            </button>
          )}
          {isRecording && (
            <p className="text-red-500 font-bold">Recording...</p>
          )}
        </div>
        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="mt-4 border rounded-lg p-2 w-full"
          >
            Your browser does not support the audio element.
          </audio>
        )}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 p-2 border rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 hidden"
        />
        <button
          onClick={() => {
            handlePredictAudio();
            resetRecording();
          }}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
        >
          Predict Emotion
        </button>
      </div>

      {/* Result Section */}
      <div className="flex flex-col w-full md:w-1/2 bg-white rounded-r-2xl border p-6 shadow-md">
        <h3 className="text-lg mb-2 text-center font-body font-medium text-zinc-700">
          RESULT FOR AUDIO EMOTION
        </h3>
        <p className="mb-4">
          Emotion:{" "}
          <span
            className={`font-medium ${
              resultAudio
                ? "text-green-500" // Green when result is available
                : "animate-pulse text-gray-500 " // Pulse when waiting
            }`}
          >
            {resultAudio
              ? resultAudio.predicted_emotion
              : "Waiting for result..."}
          </span>
        </p>
        <EmotionChart
          confidence={resultAudio?.confidence || initialConfidence}
        />
      </div>
    </div>
  );
};

export default AudioEmotion;
