function RequirementList({ title, requirements = [] }) {
  return (
    <section className="requirements-section">

      <div className="requirements-header">
        <h2>{title}</h2>

        <span>{requirements.length} Requirement(s)</span>
      </div>

      {requirements.length === 0 ? (

        <div className="requirements-empty">
          <p>No requirements to display.</p>
        </div>

      ) : (

        <div className="requirements-list">

          {requirements.map((course, index) => (

            <div
              className="requirement-card"
              key={course.code || index}
            >

              <div className="requirement-status"></div>

              <div className="requirement-information">

                <h3>{course.code}</h3>

                <p>{course.title}</p>

                <small>
                  {course.credits} Credits • Minimum Grade: {course.minimum_grade}
                </small>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default RequirementList;