import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

import axios from "axios";

function GenerateLogo() {
  const { state } = useLocation();
  const { style, logoType, name, color, secondaryColor, fontFamily } = state || {};

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // call backend (server.js) → HuggingFace/Gradio
  // async function queryHF(finalPrompt) {
  //   const response = await fetch("http://localhost:5000/generate-logo", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ prompt: finalPrompt }),
  //   });

  //   const data = await response.json();
  //   if (!data.success) throw new Error(data.error || "HF generation failed");
  //   return data.url;
  // }

  async function queryHF(finalPrompt) {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/multimodalart/Qwen-Image-Fast",
        { inputs: finalPrompt },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer", // image bytes
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }




  const generatePromptAndLogo = async () => {
    if (!style || !logoType || !name) {
      alert("Please provide all necessary logo details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Create prompt with Gemini
      const userPrompt = `Create exactly one MidJourney prompt for a ${style} ${logoType} logo design 
named "${name}", using ${fontFamily} font, with primary color ${color} and secondary color ${secondaryColor}. 
The prompt should describe a clean, professional, and visually striking logo, optimized for brand identity. 
Include design style details (e.g., minimalist, geometric, vector), emotional tone (e.g., conveys trust, innovation, creativity), 
and ensure the result is suitable for digital and print use. 
Append MidJourney parameters for square aspect ratio (--ar 1:1) and version 5 (--v 5). 
Return only the final MidJourney prompt, nothing else.`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(userPrompt);

      const finalPrompt = result.response.text();
      if (!finalPrompt) throw new Error("Gemini AI returned an empty prompt");

      setPrompt(finalPrompt);

      // 2️⃣ Call backend → HuggingFace
      const imgUrl = await queryHF(finalPrompt);
      if (!imgUrl) throw new Error("No image returned from Hugging Face");

      setImageUrl(imgUrl);
      console.log(imgUrl)
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate prompt or logo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Generate Your Logo</h1>

      <button
        onClick={generatePromptAndLogo}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Prompt & Logo"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {prompt && (
        <div className="mt-6 p-4 bg-white shadow rounded w-full max-w-lg">
          <h2 className="font-bold mb-2">Gemini Output Prompt:</h2>
          <p>{prompt}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">Generated Logo:</h2>
          <img
            src={imageUrl}
            alt="Generated Logo"
            className="w-64 h-64 object-contain border rounded shadow"
          />

          <p>k;k'afsk;as {imageUrl}</p>

          <a
            href={imageUrl}
            download="logo.png"
            className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Logo
          </a>
        </div>
      )}
    </div>
  );
}

export default GenerateLogo;
