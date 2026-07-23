from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part

from app.ai.advisor_agent import advisor_agent

APP_NAME = "academic_advisor"

# Shared services
session_service = InMemorySessionService()

runner = Runner(
    agent=advisor_agent,
    app_name=APP_NAME,
    session_service=session_service,
)


async def chat_with_advisor(message: str, session: dict) -> str:
    student = session["student"]

    # Use an existing ID if present; otherwise create a stable fallback.
    user_id = (
        student.get("id")
        or student.get("student_id")
        or student["name"]
    )

    session_id = session.get("session_id", "default")

    # Create the ADK session if it doesn't already exist.
    try:
        await session_service.create_session(
            app_name=APP_NAME,
            user_id=user_id,
            session_id=session_id,
        )
    except Exception:
        # Session already exists.
        pass

    prompt = f"""
Student:
{student}

Completed Courses:
{session['completed_courses']}

Degree Audit:
{session['audit']}

Recommendations:
{session['recommendations']}

Student Question:
{message}
"""

    user_message = Content(
        role="user",
        parts=[Part(text=prompt)],
    )

    response = ""

    async for event in runner.run_async(
        user_id=user_id,
        session_id=session_id,
        new_message=user_message,
    ):
        if event.content:
            for part in event.content.parts:
                if getattr(part, "text", None):
                    response += part.text

    return response.strip()