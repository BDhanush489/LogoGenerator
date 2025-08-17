import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

function GenerateLogo() {
  const { state } = useLocation();
  const { style, logoType, name, color, secondaryColor, fontFamily } = state || {};

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // call backend (server.js) → HuggingFace/Gradio
  // call HuggingFace/Gradio directly from frontend
  async function queryHF(finalPrompt) {
    try {
      // Connect to the Hugging Face Space via Gradio client
      const client = await Client.connect("multimodalart/Qwen-Image-Fast");

      // Call the /infer endpoint
      const result = await client.predict("/infer", {
        prompt: finalPrompt,
        seed: 0,
        randomize_seed: true,
        aspect_ratio: "1:1",
        guidance_scale: 1,
        num_inference_steps: 4,
        prompt_enhance: true,
      });

      // return actual image URL (or base64)
      return result.data[0];

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

      <div className='md:w-[25rem] md:h-[25rem] w-[80%] flex justify-center mx-auto'>
        {imageUrl ? <img className='md:w-[25rem] md:h-[25rem] w-[80%]' src={imageUrl} /> : <div className="w-[25rem] h-[25rem] flex justify-center items-center">

        </div>}
      </div>
    </div>
  );
}

export default GenerateLogo;
