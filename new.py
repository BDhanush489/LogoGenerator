from gradio_client import Client

client = Client("Qwen/Qwen-Image")
result = client.predict(
		prompt="Hello!!",
		seed=0,
		randomize_seed=True,
		aspect_ratio="16:9",
		guidance_scale=4,
		num_inference_steps=50,
		prompt_enhance=True,
		api_name="/infer"
)
print(result)