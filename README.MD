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
git clone https://github.com/aditya10avg/Twilio-Voice-assistant-with-LLM.git
cd Twilio-Voice-assistant-with-LLM.git
```

### 2. Install Dependencies
```bash
bun install
```

### 3.Setup Environment Variables
Create a .env file in the project root and add the following:
```bash
OPENAI_API_KEY=<your_openai_api_key>
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
```

### 4. Run the Server
```bash 
bun run index.ts
```

This will run the server on http://localhost:3000.

### 5. Ngrok for public URL
Use Ngrok for getting a public URL and Use that URL/call in the server endpoint line given in call.py
```bash
ngrok http http://localhost:3000
```

## Endpoints
### /call (POST)
Purpose: Handles incoming calls, starts the conversation, and gathers user input via speech.
Response: Returns TwiML instructions for Twilio to process.

### /respond (POST)
Purpose: Processes the user's speech input and sends it to OpenAI to generate a response. The conversation continues seamlessly by redirecting back to /call.

### / (GET)
Purpose: Health check to ensure the server is running.

### Outbound Call Script
You can make outbound calls and connect them to the voice assistant using the provided Python script.
Use 
```bash
python3 call.py
```

## Setup
Install dependencies:

```bash
pip install twilio python-dotenv
```
Create a .env file for the script:
``` bash
.env
```
``` bash
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
```
## How It Works
### Incoming Call:

### Twilio routes the call to /call.
The assistant greets the caller and starts gathering input.
Input is sent to /respond, processed by OpenAI, and a response is sent back.
The conversation continues seamlessly by redirecting back to /call.
Outbound Call:

### The Python script places a call and connects it to the /call endpoint.


## Deployment
Using Ngrok for Testing
Expose your local server to the internet using Ngrok:

```bash
ngrok http 3000
```
Update the server_url in the Python script with the public URL provided by Ngrok.

## Production
For production, deploy the server to a cloud platform like AWS, GCP, or Vercel and ensure a public URL is available for Twilio to connect to.

### Troubleshooting
Twilio Error 11200: Ensure your server is publicly accessible, and the endpoint responds with valid TwiML.
OpenAI API Error: Check your OpenAI API key and ensure you have sufficient usage quota.
Cookies Not Persisting: Verify that hono/cookie is correctly handling session data.

## Future Improvements
Replace Twilio TTS with Eleven Labs for more natural voices.
Use OpenAI’s Speech-to-Text API for enhanced speech recognition.
Add support for multi-language conversations.
Implement database storage for conversation logs.
