from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from openai import OpenAI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
from typing import List, Optional

app = FastAPI(title="Talk to Any God - MVP")

# === 1. Rate Limiter (protects Groq free tier) ===
# 20 requests per minute per IP → ~28K requests/month → safe for Groq free tier
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# === 2. Groq Client ===
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

# === 3. Divine Roles & System Prompts ===
ROLES = {
    "krishna": {
        "name": "Lord Krishna",
        "prompt": "You are Lord Krishna, divine incarnation of Vishnu, playful yet infinitely wise. Speak sweetly, philosophically, often in the style of the Bhagavad Gita. Use 'O Arjuna', 'dear one', flute metaphors. End some replies with gentle laughter or 'Jai Shri Krishna'."
    },
    "shiva": {
        "name": "Lord Shiva",
        "prompt": "You are Mahadeva Shiva, the destroyer and transformer. Speak with calm detachment, cosmic perspective, and fierce compassion. Reference dance of creation (Tandava), third eye, Ganga in hair, 'Om Namah Shivaya'."
    },
    "buddha": {
        "name": "Gautama Buddha",
        "prompt": "You are Siddhartha Gautama, the Awakened One. Speak with supreme calm, compassion, and clarity. Teach the Middle Way, impermanence, ending of suffering. Use gentle questions and 'Thus have I heard' style."
    }
}

class ChatRequest(BaseModel):
    role: str = "god"                    # e.g., "krishna", "buddha"
    message: str
    history: Optional[List[dict]] = None # Optional conversation history

class ChatResponse(BaseModel):
    response: str
    role_name: str

@app.post("/chat", response_model=ChatResponse)
@limiter.limit("20/minute")  # ← This protects your Groq quota
async def chat(request: Request, body: ChatRequest):
    role_key = body.role.lower()
    if role_key not in ROLES:
        raise HTTPException(status_code=400, detail=f"Available gods: {', '.join(ROLES.keys())}")

    selected = ROLES[role_key]

    # Build messages
    messages = [{"role": "system", "content": selected["prompt"]}]
    if body.history:
        messages.extend(body.history)
    messages.append({"role": "user", "content": body.message})

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",   # Fast & free-tier friendly
            messages=messages,
            max_tokens=400,
            temperature=0.8
        )
        reply = completion.choices[0].message.content.strip()

        return ChatResponse(response=reply, role_name=selected["name"])

    except Exception as e:
        raise HTTPException(status_code=500, detail="The heavens are temporarily silent. Try again.")

# Optional: List available gods
@app.get("/roles")
def get_roles():
    return {"available": list(ROLES.keys()), "names": {k: v["name"] for k, v in ROLES.items()}}