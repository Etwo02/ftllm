// SentimentAnalyzer.jsx
import { useState } from 'react';
import './SentimentAnalyzer.css';

function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [model, setModel] = useState('custom');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text,
          model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze sentiment');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to analyze sentiment. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setText('');
    setError(null);
  };

  return (
    <div className="analyzer-container">
      <div className="analyzer-card">
        <h2 className="analyzer-title">Sentiment Analysis</h2>
        
        <div className="input-group">
          <label htmlFor="text-input">Enter your text:</label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="input-group">
          <label htmlFor="model-select">Select Model:</label>
          <select
            id="model-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="custom">Custom Model</option>
            <option value="llama">Llama 3</option>
          </select>
        </div>

        <button
          onClick={analyzeSentiment}
          disabled={!text.trim() || isLoading}
          className="analyze-button"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="results-container">
            <h3>Results</h3>
            <div className="result-item">
              <span>Sentiment:</span>
              <span className={`sentiment-${result.sentiment}`}>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </span>
            </div>
            <div className="result-item">
              <span>Confidence:</span>
              <span className="confidence">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <button
              onClick={clearResults}
              className="clear-button"
            >
              Clear Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SentimentAnalyzer;