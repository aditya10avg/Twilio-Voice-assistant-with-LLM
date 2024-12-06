import { Hono } from 'hono'
import { serve } from 'bun'
import {twiml} from 'twilio'


const app = new Hono()

// Twilio call handling endpoint
app.get('/call', (c) => {
  return c.text('Call endpoint is working')
})

app.post('/call', (c) => {
  const Voicemessage= twiml.newVoiceResponse();
  
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