# ChatBot

A simple full-stack AI chatbot built with React, Spring Boot, and Spring AI. The app lets you switch between two backend AI providers:

- Gemini through Google's Gemini API
- Ollama through a locally running Ollama model

The React frontend sends your prompt to the Spring Boot backend, and the backend forwards it to the selected AI model.

## Features

- React chat UI with model selection
- Spring Boot REST API
- Gemini integration using Spring AI Google GenAI
- Ollama integration using Spring AI Ollama
- CORS enabled for local frontend development
- Environment-based API key loading
- Separate endpoints for Gemini and Ollama

## Tech Stack

Frontend:

- React 19
- Vite
- JavaScript
- CSS

Backend:

- Java 25+
- Spring Boot 3.5.14
- Spring AI 1.1.7
- Maven
- Google GenAI starter
- Ollama starter

## Project Structure

```text
ChatBot/
+-- README.md
+-- backend/
|   +-- .env
|   +-- .gitignore
|   +-- pom.xml
|   +-- src/main/
|       +-- java/com/example/backend/demo/
|       |   +-- DemoApplication.java
|       |   +-- controller/
|       |       +-- GeminiController.java
|       |       +-- OllamaControler.java
|       +-- resources/
|           +-- application.properties
+-- frontend/
    +-- package.json
    +-- src/
        +-- App.jsx
        +-- App.css
```

## Backend Configuration

The backend runs on port `8081`.

Current backend config:

```properties
spring.application.name=demo
spring.config.import=optional:file:.env[.properties],optional:file:ChatBot/backend/.env[.properties]
spring.ai.ollama.chat.options.model=Jarvis:latest
spring.ai.google.genai.api-key=${GEMINI_API_KEY}
spring.ai.google.genai.chat.options.model=gemini-2.5-flash-lite
server.port=8081
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit `.env`. It is ignored by `backend/.gitignore`.

## Gemini Setup

1. Create a Gemini API key from Google AI Studio.
2. Put the key in `backend/.env` as `GEMINI_API_KEY`.
3. Use a model that your key has quota for.

This project currently uses:

```properties
spring.ai.google.genai.chat.options.model=gemini-2.5-flash-lite
```

Useful alternatives:

```properties
spring.ai.google.genai.chat.options.model=gemini-2.5-flash
spring.ai.google.genai.chat.options.model=gemini-2.0-flash-lite
spring.ai.google.genai.chat.options.model=gemini-2.0-flash
```

If you get `429 RESOURCE_EXHAUSTED`, your API key/project does not have available quota for that model. Try another model, wait for quota reset, or check your Google AI Studio quota.

If you get `400 API key not valid`, check that `backend/.env` exists, the variable is named exactly `GEMINI_API_KEY`, and the backend was restarted after editing the file.

## Ollama Setup

Install and start Ollama locally:

```powershell
ollama serve
```

Make sure the configured model exists:

```powershell
ollama list
```

This project is configured for:

```properties
spring.ai.ollama.chat.options.model=Jarvis:latest
```

If the model is missing, either pull/create that model or change the property to a model you have, for example:

```properties
spring.ai.ollama.chat.options.model=llama3.2:1b
```

## Run The Backend

From the backend folder:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Or with system Maven:

```powershell
cd backend
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

## Run The Frontend

From the frontend folder:

```powershell
cd frontend
npm install
npm run dev
```

Vite will print the frontend URL, usually:

```text
http://localhost:5173
```

## API Endpoints

Gemini:

```http
GET /api/gemini/{prompt}
```

Example:

```text
http://localhost:8081/api/gemini/hello
```

Ollama:

```http
GET /api/ollama/{prompt}
```

Example:

```text
http://localhost:8081/api/ollama/hello
```

The frontend automatically calls:

```text
http://localhost:8081/api/{selectedModel}/{encodedPrompt}
```

## Test The Backend

From the backend folder:

```powershell
mvn test
```

## Build The Frontend

From the frontend folder:

```powershell
npm run build
```

## Common Issues

Backend is not running:

- Make sure Spring Boot is running on `8081`.
- Check that no other process is already using port `8081`.

Gemini returns `400 API key not valid`:

- Confirm `backend/.env` exists.
- Confirm it contains `GEMINI_API_KEY=...`.
- Restart Spring Boot after editing `.env`.
- Make sure there are no extra quotes or spaces around the key.

Gemini returns `429 RESOURCE_EXHAUSTED`:

- The selected Gemini model has no available quota for your key/project.
- Try `gemini-2.5-flash-lite` or another model your key can use.
- Check quota in Google AI Studio.

Ollama request fails:

- Make sure Ollama is running.
- Make sure the configured model exists in `ollama list`.
- Update `spring.ai.ollama.chat.options.model` if needed.

Frontend says `Error fetching backend response`:

- Start the backend first.
- Confirm the backend URL is `http://localhost:8081`.
- Check the Spring Boot console for the real provider error.

## Security Notes

- Never commit `backend/.env`.
- Rotate the Gemini API key if it was accidentally exposed.
- API keys are project-scoped, so creating a new key in the same Google project may still share the same quota.

## Current Defaults

- Backend port: `8081`
- Frontend dev server: Vite default, usually `5173`
- Gemini model: `gemini-2.5-flash-lite`
- Ollama model: `Jarvis:latest`
- Gemini endpoint: `/api/gemini/{prompt}`
- Ollama endpoint: `/api/ollama/{prompt}`
