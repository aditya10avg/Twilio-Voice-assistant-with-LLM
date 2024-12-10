from twilio.rest import Client
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Twilio credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# Create a Twilio client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def make_call(to_phone_number, server_url):
    try:
        # Place the call
        call = client.calls.create(
            to=to_phone_number,
            from_=TWILIO_PHONE_NUMBER,
            url=server_url
        )
        print(f"Call initiated. Call SID: {call.sid}")
    except Exception as e:
        print(f"Error making call: {e}")

# Example usage
to_phone_number = "+918767057291"  
server_url = "https://0cbf-43-241-130-246.ngrok-free.app/call"

make_call(to_phone_number, server_url)
