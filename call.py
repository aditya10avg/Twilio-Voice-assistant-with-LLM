from twilio.rest import Client

# Twilio credentials
TWILIO_ACCOUNT_SID = "AC863c8e3958f68efe29f9a36fe8e13019"
TWILIO_AUTH_TOKEN = "cf5c3edb6de353722463a0541f61a0c8"
TWILIO_PHONE_NUMBER = "+17163335523"

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


to_phone_number = "+918767057291"  
server_url = "https://498d-43-241-130-246.ngrok-free.app/call"  

make_call(to_phone_number, server_url)
