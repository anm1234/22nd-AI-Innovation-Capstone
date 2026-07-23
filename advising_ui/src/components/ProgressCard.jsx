function ProgressCard({ progress = 0, student }) {
  const completed = student?.creditsCompleted ?? 0;
  const required = student?.creditsRequired ?? 120;
  const remaining = Math.max(required - completed, 0);

  return (
    <section className="progress-card">
      <div className="progress-header">
        <div>
          <h2>Degree Progress</h2>
          <p>Your progress toward graduation</p>
        </div>

        <div className="progress-percentage">
          {progress}%
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="progress-stats">

        <div className="progress-stat">
          <span>Completed</span>
          <h3>{completed}</h3>
        </div>

        <div className="progress-stat">
          <span>Remaining</span>
          <h3>{remaining}</h3>
        </div>

        <div className="progress-stat">
          <span>Required</span>
          <h3>{required}</h3>
        </div>

      </div>
    </section>
  );
}

export default ProgressCard;