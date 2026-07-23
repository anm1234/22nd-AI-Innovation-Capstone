from google.adk.agents import Agent

from app.ai.prompts import SYSTEM_PROMPT

advisor_agent = Agent(
    name="academic_advisor",
    model="gemini-3.6-flash",
    description="Academic Advisor",
    instruction=SYSTEM_PROMPT,
)

