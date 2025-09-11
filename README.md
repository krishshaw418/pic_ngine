# Imagine Microservice

A lightweight microservice that integrates with the [Imagine.art API](https://www.imagine.art/) to generate AI-powered images based on user requests.  
This service is designed to be consumed by other applications—primarily [Alex](https://github.com/krishshaw418/Alex), a Telegram bot server that allows users to generate images directly within Telegram.

---

## Features

- Accepts JSON input and sends image generation requests to Imagine.art.
- Supports prompt-based image creation with optional style and aspect ratio customization.
- Built to be modular so it can be integrated into larger systems (e.g., with a queue-worker system).
- Handles errors gracefully and provides meaningful feedback for failed requests.

---

## API Specification

### Local Endpoint when run locally
http://localhost:8080/api/imagen

### Request Body
The input is a JSON object with the following parameters:

| Field         | Type     | Required | Description                                                                 |
|---------------|----------|----------|-----------------------------------------------------------------------------|
| `prompt`      | string   | Yes      | A human-readable text prompt describing the image to generate.              |
| `style`       | enum     | Yes      | One of: `"anime"`, `"flux-dev"`, `"flux-dev-fast"`, `"realistic"`, `"flux-schnell"`, `"imagine-turbo"` (currently not working due to issues on Imagine.art’s side) |
| `aspect_ratio`| enum     | No       | Optional image aspect ratio. Values: `"1:1"`, `"16:9"`, `"9:16"`.          |

### Example Request
```json
{
  "prompt": "A futuristic city skyline at sunset with flying cars",
  "style": "realistic",
  "aspect_ratio": "16:9"
}

```
