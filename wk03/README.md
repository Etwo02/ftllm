# Sentiment Analysis System

This project implements a sentiment analysis system using a custom fine-tuned model and Llama 3. It includes both a fine-tuned model trained on the IMDB dataset and integration with the Llama 3 model via Groq Cloud API.

## Architecture
- Custom fine-tuned DistilBERT model for sentiment analysis
- FastAPI backend with endpoints for both models
- Integration with Llama 3 via Groq Cloud API
- React frontend for easy interaction

## Prerequisites
- Python 3.8+
- pip
- Node.js and npm (for React frontend)
- Groq API key
- Hugging Face account

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sentiment-analysis-system
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the project root:
```
GROQ_API_KEY=your_groq_api_key_here
```

## Running the System

### 1. Running the Notebook
The Jupyter notebook contains model training and evaluation:
```bash
jupyter notebook ex03.ipynb
```

### 2. Running the API Locally
Start the FastAPI backend:
```bash
python main.py
```
The API will be available at `http://localhost:8000`

## API Endpoints

### `/analyze/` (POST)
Analyzes sentiment of input text using either custom or Llama model.

Request body:
```json
{
    "text": "Text to analyze",
    "model": "custom"
}
```

Response:
```json
{
    "sentiment": "positive",
    "confidence": 0.95
}
```

## Testing the API

### Using curl
For Windows Command Prompt:
```bash
curl -X POST "http://localhost:8000/analyze/" -H "Content-Type: application/json" -d "{\"text\": \"This movie was amazing!\", \"model\": \"custom\"}"
```

### Using Python requests
```python
import requests

response = requests.post(
    "http://localhost:8000/analyze/",
    json={
        "text": "This movie was amazing!",
        "model": "custom"
    }
)
print(response.json())
```

### Using Postman
1. Set request type to POST
2. Enter URL: `http://localhost:8000/analyze/`
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
    "text": "This movie was amazing!",
    "model": "custom"
}
```

## Models

### Custom Model
- Fine-tuned DistilBERT model on IMDB dataset
- Available at Hugging Face: `Etwo02/imdb-sentiment-classifier`

### Llama 3 Model
- Accessed via Groq Cloud API
- Uses `llama-3.3-70b-versatile` model
