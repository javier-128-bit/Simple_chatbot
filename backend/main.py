from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from groq import Groq
from pydantic import BaseModel
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

load_dotenv()
client = Groq(api_key=os.environ.get("API_GROQ"))

class Chat(BaseModel):
    message:str

def get_bot_response(user_message):
    message=user_message.lower()
    completion = client.chat.completions.create(
    messages=[
      {
        "role": "user",
        "content": message
      }
    ],
    temperature=1,
    max_completion_tokens=2120,
    top_p=1,
    stream=False,
    stop=None,  
    model="llama-3.3-70b-versatile"  
)
    return completion.choices[0].message.content

@app.post("/send")
def kirim_message(request:  Chat):
   reply=get_bot_response(request.message)
   return {"reply":reply}