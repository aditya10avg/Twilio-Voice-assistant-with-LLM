import { Hono } from 'hono'
import { serve } from 'bun'
import {twiml} from 'twilio'
import OpenAI from 'openai'
import { config } from 'dotenv'

config()

const app = new Hono()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

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
app.post('/respond',async (c) => {
  const formData = await c.req.formData()
  const voiceInput = formData.get('SpeechResult')?.toString()!
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an experienced cold caller who qualifies potential leads by speaking with them."
      },
      {
        role: "user",
        content: voiceInput // Passing the message that comes from the user for message generation.
      }
    ],
    temperature: 0.5,
})

  // Here we will set up the LLM model to understand the speech input and respond accordingly.
  const assistantResponse = chatCompletion.choices[0].message.content

  const Voicemessage= new twiml.VoiceResponse();
  Voicemessage.say(assistantResponse!);
  Voicemessage.redirect({method: 'POST'},'/call') // This ensure that call is hunged up and continuous conversation will start.
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