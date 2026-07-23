import ProgressCard from "./ProgressCard";

function StudentDashboard({ student }) {
  if (!student) {
    return (
      <section className="student-dashboard">
        <div className="dashboard-header">
          <h2>Student Dashboard</h2>
          <p>No student information available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="student-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Student Dashboard</h2>
          <p>Overview of your current academic progress</p>
        </div>
      </div>

      <div className="student-grid">

        <div className="student-card">
          <span className="student-label">Major</span>
          <h3>{student.major || "--"}</h3>
        </div>

        <div className="student-card">
          <span className="student-label">Credits Completed</span>
          <h3>{student.creditsCompleted ?? 0}</h3>
        </div>

        <div className="student-card">
          <span className="student-label">Credits Required</span>
          <h3>{student.creditsRequired ?? 120}</h3>
        </div>

        <div className="student-card">
          <span className="student-label">Expected Graduation</span>
          <h3>{student.expectedGraduation || "--"}</h3>
        </div>

      </div>

      <ProgressCard
        progress={student.progress ?? 0}
      />

    </section>
  );
}

export default StudentDashboard;