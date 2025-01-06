import React, { useState, useRef } from "react";
import { WaveFile } from "wavefile";
import { useGlobalContext } from "../context/GlobalContext";
import EmotionChart from "./Charts";
import Record from "../assets/record.svg";
import Record_play from "../assets/record-play.svg";

const AudioEmotion = () => {
  const {
    initialConfidence,
    file,
    text,
    setFile,
    handlePredictAudio,
    resultAudio,
    errorAudio,
    isLoading,
  } = useGlobalContext();

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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100, // High-quality sampling rate
          channelCount: 1, // Mono channel
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const arrayBuffer = await audioBlob.arrayBuffer();

          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          // Convert PCM data to WAV format
          const wav = new WaveFile();
          const channelData = audioBuffer.getChannelData(0); // Mono channel
          const pcmData = new Int16Array(channelData.length);

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
        } catch (error) {
          console.error("Error processing audio data: ", error);
        }
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
    <div className="flex flex-col justify-center gap-2 md:flex-row">
      <div className="flex flex-col w-full p-6 bg-white border text-start md:w-1/2 rounded-2xl">
        <h2 className="pb-5 mb-2 text-lg font-medium text-center font-body text-zinc-700">
          AUDIO EMOTION DETECTION
        </h2>
        <p className="justify-start mb-2 text-sm font-body text-zinc-600">
          <b>Note:</b> Press the record button and read the text script inside
          the input box
        </p>
        {/*Text Area Section */}
        <textarea
          value={text}
          placeholder="Wait for the text script..."
          className="w-full h-32 p-4 mb-5 border rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-300"
          disabled
        />
        {/* Audio Record Section */}
        <div className="mb-4 text-center">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="text-white transition duration-300 ease-in-out bg-red-500 rounded-full delay-1500 hover:scale-110 hover:bg-red-600"
            >
              <img src={Record_play} alt="Stop Recording" />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="text-white transition duration-300 ease-in-out rounded-full delay-1500 hover:scale-110 hover:bg-slate-100"
            >
              <img src={Record} alt="Start Recording" />
            </button>
          )}
          {isRecording && (
            <p className="font-bold text-red-500">Recording...</p>
          )}
        </div>
        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="w-full p-2 mt-4 border rounded-lg"
          >
            Your browser does not support the audio element.
          </audio>
        )}
        {/* File Input Section */}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden p-2 mb-4 border rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errorAudio && (
          <p className="text-sm text-center text-red-500">
            Please record first to predict emotion.
          </p>
        )}
        <button
          onClick={() => {
            handlePredictAudio();
            resetRecording();
          }}
          disabled={isLoading}
          className={`px-4 py-2 mt-4 text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-lg delay-1500 hover:scale-105 hover:bg-blue-600 active:bg-blue-700 place-content-end active:scale-100 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Predict Emotion"}
        </button>
      </div>

      {/* Result Section */}
      <div className="flex flex-col w-full p-6 bg-white border md:w-1/2 rounded-2xl">
        <h3 className="mb-2 text-lg font-medium text-center font-body text-zinc-700">
          RESULT FOR AUDIO EMOTION
        </h3>
        <p className="mb-4 font-semibold capitalize">
          Emotion:{" "}
          <span
            className={`font-medium ${
              resultAudio ? "text-green-500" : "animate-pulse text-gray-500"
            }`}
          >
            {resultAudio
              ? resultAudio.predicted_emotion
              : "Waiting for result..."}
          </span>
        </p>
        <p className="mb-2 text-sm italic font-body text-zinc-500">
          This table displays the confidence level for audio emotion
        </p>
        <EmotionChart
          confidence={resultAudio?.confidence || initialConfidence}
        />
      </div>
    </div>
  );
};

export default AudioEmotion;
