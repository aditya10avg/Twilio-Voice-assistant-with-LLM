import { Hono } from 'hono'
import { serve } from 'bun'
import {twiml} from 'twilio'


const app = new Hono()

// Twilio call handling endpoint
app.get('/call', (c) => {
  return c.text('Call endpoint is working')
})

app.post('/call', (c) => {
  const Voicemessage= new twiml.VoiceResponse();
  Voicemessage.say('Hello, How are you!');
  Voicemessage.gather({
    input: ["speech"], //Try using speech dtmf instead of speech for collecting both the speech and dtmf input i.e pressing numbers for particular services. 
    speechTimeout: "auto", // It will stop speech recognition after 1 second of silence. 
    speechModel: "experimental_conversations",
    enhanced: true,
    action:'/respond' // This is the endpoint where the speech input will be sent to.
  })
  c.header('Content-Type','application/xml');
  return c.body(Voicemessage.toString());
})

// Basic route to confirm server is running
app.get('/', (c) => {
  return c.text('Twilio Call Server is Running')
})

const port = 3000
console.log(`Server running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})