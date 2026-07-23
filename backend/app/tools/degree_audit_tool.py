import json
from pathlib import Path

# Path to the majors directory
DATA_DIR = Path(__file__).parent.parent / "data" / "majors"


def load_major(major_name: str):
    """
    Load the degree requirements JSON for the specified major.
    Example:
        Computer Science -> computer_science.json
    """

    filename = major_name.lower().replace(" ", "_") + ".json"
    file_path = DATA_DIR / filename

    if not file_path.exists():
        raise FileNotFoundError(
            f"No degree requirements found for '{major_name}'."
        )

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def run_degree_audit(student, completed_courses):
    """
    Compare a student's completed courses against
    the degree requirements.

    Parameters
    ----------
    student : dict
        Student information extracted from the transcript.

    completed_courses : list
        List of completed course codes.
        Example:
        [
            "CMSC 201",
            "CMSC 202",
            "MATH 151"
        ]
    """

    major = load_major(student["major"])

    completed = []
    missing = []

    completed_codes = set(completed_courses)

    # Core Courses
    for course in major["core_courses"]:
        if course["code"] in completed_codes:
            completed.append(course)
        else:
            missing.append(course)

    completion_percentage = round(
        (len(completed) / len(major["core_courses"])) * 100,
        1,
    )

    return {
        "major": major["major"],

        "completed": completed,

        "missing": missing,

        "completed_count": len(completed),

        "missing_count": len(missing),

        "total_required": len(major["core_courses"]),

        "completion_percentage": completion_percentage,

        "graduation_eligible": len(missing) == 0,
    }