import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setResponse("Please type a message first.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const apiUrl = `http://localhost:8081/api/${selectedModel}/${encodeURIComponent(
        trimmedPrompt
      )}`;

      const res = await fetch(
        apiUrl
      );

      if (!res.ok) {
        throw new Error(`Backend returned ${res.status}`);
      }

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching backend response. Check if Spring Boot is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1> Ani's Chat bot </h1>
      </header>

      <main className="chat-box">
        <section className="chat-panel">
          <form className="chat-form" onSubmit={handleSubmit}>
            <fieldset className="model-options" disabled={isLoading}>
              <legend>Choose AI model</legend>
              <label className="model-option">
                <input
                  type="radio"
                  name="model"
                  value="gemini"
                  checked={selectedModel === "gemini"}
                  onChange={(event) => setSelectedModel(event.target.value)}
                />
                Gemini
              </label>
              <label className="model-option">
                <input
                  type="radio"
                  name="model"
                  value="ollama"
                  checked={selectedModel === "ollama"}
                  onChange={(event) => setSelectedModel(event.target.value)}
                />
                Ollama
              </label>
            </fieldset>

            <label htmlFor="prompt">Ask something</label>
            <div className="input-row">
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          <div className="chat-response">
            {isLoading
              ? "Waiting for backend response..."
              : response || "Backend response will appear here..."}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Powered by React + Spring Boot AI</p>
      </footer>
    </div>
  );
}

export default App;
