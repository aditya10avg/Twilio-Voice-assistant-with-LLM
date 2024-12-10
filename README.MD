# Twilio Voice Assistant with OpenAI Integration

This project is a voice assistant that uses **Twilio**, **OpenAI's GPT-3.5 Turbo**, and **Hono (Bun)** to facilitate a human-like conversational experience over a phone call. The assistant can qualify leads by asking questions, responding intelligently, and continuing conversations seamlessly. The project includes functionality for both incoming and outbound calls.

---

## Features

- **AI-Powered Conversations**: Uses OpenAI to generate human-like responses based on user inputs.
- **Twilio Voice API**: Handles calls and gathers speech input from users.
- **Hono Framework**: Built on Bun for high-performance HTTP server handling.
- **Session Persistence**: Manages conversation history using cookies to ensure continuity.
- **Outbound Calls**: Includes a Python script to make calls and connect them to the assistant.

---

## Prerequisites

Before running the project, ensure you have the following:

1. **Twilio Account**:
   - Get a Twilio phone number.
   - Note your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`.

2. **OpenAI API Key**:
   - Sign up at [OpenAI](https://platform.openai.com) and generate an API key.

3. **Environment Setup**:
   - Install **Bun** ([Get Bun](https://bun.sh)).
   - Install **Node.js** (optional, for related tools).
   - Install **Python** for the outbound call script.

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

## 2. Install Dependencies
```bash
bun install ```

## 3.Setup Environment Variables
Create a .env file in the project root and add the following:
```bash
OPENAI_API_KEY=<your_openai_api_key>
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
```

## 4. Run the Server
``` bash 
bun run index.ts
``` 

This will run the server on http://localhost:3000.

## 5. Ngrok for public URL
Use Ngrok for getting a public URL and Use that URL/call in the server endpoint line given in call.py
`` bash
 ngrok http http://localhost:3000
```
