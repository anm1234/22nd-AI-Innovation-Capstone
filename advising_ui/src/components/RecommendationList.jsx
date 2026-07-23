import RecommendationCard from "./RecommendationCard";

function RecommendationList({ recommendations = [] }) {
  return (
    <section className="recommendations-section">

      <div className="recommendations-header">

        <div>
          <h2>AI Recommendations</h2>
          <p>
            Courses recommended to optimize your path to graduation.
          </p>
        </div>

        <div className="recommendation-count">
          {recommendations.length} Recommendation(s)
        </div>

      </div>

      {recommendations.length === 0 ? (

        <div className="recommendations-empty">

          <h3>No Recommendations Available</h3>

          <p>
            Start a conversation with the AI Advisor to receive
            personalized course recommendations.
          </p>

        </div>

      ) : (

        <div className="recommendations-grid">

          {recommendations.map((recommendation, index) => (

            <RecommendationCard
              key={recommendation.course || index}
              recommendation={recommendation}
            />

          ))}

        </div>

      )}

    </section>
  );
}

export default RecommendationList;