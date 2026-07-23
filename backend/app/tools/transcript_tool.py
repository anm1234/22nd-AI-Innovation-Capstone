import fitz
import re

from app.tools.degree_audit_tool import run_degree_audit
from app.tools.course_recommender_tool import recommend_courses
from app.services.session_store import create_session


def extract_field(pattern, text):
    match = re.search(pattern, text)
    return match.group(1).strip() if match else None


def extract_completed_courses(text):
    courses = []

    match = re.search(
        r"COMPLETED COURSES(.*?)NOTES",
        text,
        re.DOTALL
    )

    if not match:
        return courses

    section = match.group(1)

    for line in section.splitlines():
        line = line.strip()

        if re.match(r"^[A-Z]{2,5}\s\d+[A-Z]?$", line):
            courses.append(line)

    return courses


async def process_transcript(file):
    pdf_bytes = await file.read()

    pdf = fitz.open(stream=pdf_bytes, filetype="pdf")

    text = ""

    for page in pdf:
        text += page.get_text()

    pdf.close()

    student = {
        "name": extract_field(r"Student Name:\s*(.*)", text),
        "student_id": extract_field(r"Student ID:\s*(.*)", text),
        "major": extract_field(r"Major:\s*(.*)", text),
        "minor": extract_field(r"Minor:\s*(.*)", text),
        "academic_level": extract_field(r"Academic Level:\s*(.*)", text),
        "college": extract_field(r"College:\s*(.*)", text),
        "admit_term": extract_field(r"Admit Term:\s*(.*)", text),
    }

    completed_courses = extract_completed_courses(text)

    audit = run_degree_audit(
        student,
        completed_courses,
    )

    recommendations = recommend_courses(audit)

    # Store transcript information in a session
    session_data = {
        "student": student,
        "completed_courses": completed_courses,
        "audit": audit,
        "recommendations": recommendations,
    }

    session_id = create_session(session_data)

    return {
        "session_id": session_id,
        "student": student,
        "completed_courses": completed_courses,
        "audit": audit,
        "recommendations": recommendations,
    }