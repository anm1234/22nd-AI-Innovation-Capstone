from app.tools.degree_audit_tool import run_degree_audit
from app.tools.course_recommender_tool import recommend_courses


def get_degree_audit(student, completed_courses):
    """
    Return the student's degree audit.
    """

    return run_degree_audit(
        student,
        completed_courses,
    )


def recommend_next_semester(
    student,
    completed_courses,
    target_credits=12,
):
    """
    Recommend courses for the next semester.
    """

    audit = run_degree_audit(
        student,
        completed_courses,
    )

    return recommend_courses(
        audit=audit,
        target_credits=target_credits,
    )


def find_double_count_courses(
    student,
    completed_courses,
):
    """
    Placeholder.

    Later this will search for courses that satisfy
    both GEP and major requirements.
    """

    return []