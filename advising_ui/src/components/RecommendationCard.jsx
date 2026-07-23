function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  return (
    <div className="recommendation-card">

      <div className="recommendation-top">

        <div>
          <h3>{recommendation.code}</h3>

          <p className="course-title">
            {recommendation.title}
          </p>

          <span className="priority normal">
            Recommended
          </span>
        </div>

        <div className="credits">
          {recommendation.credits} Credits
        </div>

      </div>

      <div className="recommendation-body">

        <h4>Why this course?</h4>

        <p>{recommendation.reason}</p>

      </div>

      <div className="recommendation-benefits">

        <div className="benefit">
          Minimum Grade: {recommendation.minimum_grade}
        </div>

      </div>

    </div>
  );
}

export default RecommendationCard;