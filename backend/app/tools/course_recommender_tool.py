def recommend_courses(audit):
    """
    Generate course recommendations for the next semester.

    Parameters
    ----------
    audit : dict
        Output from run_degree_audit()

    Returns
    -------
    list
        List of recommended courses.
    """

    completed_codes = {
        course["code"]
        for course in audit["completed"]
    }

    recommendations = []

    for course in audit["missing"]:

        prerequisites = course.get("prerequisites", [])

        # Recommend only if every prerequisite has been completed
        if all(prereq in completed_codes for prereq in prerequisites):

            recommendations.append({
                "code": course["code"],
                "title": course["title"],
                "credits": course["credits"],
                "minimum_grade": course.get("minimum_grade", "C"),
                "reason": "All prerequisites have been completed."
            })

    # Sort alphabetically
    recommendations.sort(key=lambda c: c["code"])

    return recommendations