function SemesterPlanner({ semesters = [] }) {
  return (
    <section className="semester-planner">

      <div className="planner-header">
        <div>
          <h2>Semester Planner</h2>
          <p>
            AI-generated course plan based on your remaining degree requirements.
          </p>
        </div>
      </div>

      {semesters.length === 0 ? (

        <div className="planner-empty">

          <h3>No Semester Plan Available</h3>

          <p>
            Ask the AI Advisor to generate an optimized graduation plan.
          </p>

        </div>

      ) : (

        <div className="semester-grid">

          {semesters.map((semester, index) => (

            <div
              className="semester-card"
              key={index}
            >

              <div className="semester-title">

                <h3>{semester.name}</h3>

                <span>
                  {semester.totalCredits} Credits
                </span>

              </div>

              <div className="semester-courses">

                {semester.courses.map((course, courseIndex) => (

                  <div
                    className="course-item"
                    key={courseIndex}
                  >

                    <div>

                      <h4>{course.code}</h4>

                      <p>{course.title}</p>

                    </div>

                    <span>
                      {course.credits} cr
                    </span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default SemesterPlanner;