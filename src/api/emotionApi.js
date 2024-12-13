// src/api/emotionApi.js
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000"; // Replace with your Flask backend URL

export const predictTextEmotion = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, { text });
    return response.data;
  } catch (error) {
    console.error("Error predicting text emotion:", error);
    throw error;
  }
};

export const predictAudioEmotion = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting audio emotion:", error);
    throw error;
  }
};
