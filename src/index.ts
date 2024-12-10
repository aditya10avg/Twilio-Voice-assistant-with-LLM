import { Hono } from 'hono'
import { serve } from 'bun'
import {twiml} from 'twilio'
import OpenAI from 'openai'
import { config } from 'dotenv'
import {getCookie, setCookie} from 'hono/cookie'
import Content from 'twilio/lib/rest/Content'


config()

const Initial_message='Hello, How are you!'
const app = new Hono()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

app.post('/call', (c) => {
  const Voicemessage= new twiml.VoiceResponse();
  if (!getCookie(c,"messages")){
    // This is a new conversation.
    Voicemessage.say(Initial_message);
    setCookie(c,"messages",JSON.stringify([
      {role: "system",
       content: `You are an experienced cold caller who qualifies potential leads by speaking with them. You will behave and speak like a human and try to qualify the lead by asking questions and providing information.`
      },
      {role: "assistant",content: Initial_message}  
    ]))
  }
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

  let messages = JSON.parse(getCookie(c,"messages")!)
  messages.push({role: "user", content: voiceInput})

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.5,
})

  // Here we will set up the LLM model to understand the speech input and respond accordingly.
  const assistantResponse = chatCompletion.choices[0].message.content
  messages.push({role: "assistant", content: assistantResponse})
  console.log(messages)
  setCookie(c,"messages",JSON.stringify(messages))

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