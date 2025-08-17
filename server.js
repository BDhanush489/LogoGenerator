import express from "express";
import cors from "cors";
import { Client } from "@gradio/client";

const app = express();
app.use(cors());
app.use(express.json());

// Route: Generate logo from prompt
app.post("/generate-logo", async (req, res) => {
  try {
    const { prompt } = req.body;

    const client = await Client.connect("multimodalart/Qwen-Image-Fast");
    const result = await client.predict("/infer", {
      prompt,
      seed: 0,
      randomize_seed: true,
      aspect_ratio: "1:1",
      guidance_scale: 1,
      num_inference_steps: 4,
      prompt_enhance: true,
    });

    res.json({ success: true, url: result.data?.[0]?.url });
  } catch (err) {
    console.error("HF error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
