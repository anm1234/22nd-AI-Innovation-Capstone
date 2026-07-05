import "./App.css";
import { useEffect, useState } from "react";
import { testConnection } from "./api/advisor";

function App() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    async function connect() {
      try {
        const data = await testConnection();
        setStatus(data.message);
      } catch (error) {
        console.error(error);
        setStatus("Backend Offline");
      }
    }

    connect();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>🎓 UMBC AI Academic Advisor</h1>
        <p>Optimize your path to graduation with AI</p>
      </header>

      <div className="backend-status">
        <strong>Backend:</strong> {status}
      </div>

      <div className="main">
        <div className="chat-panel">
          <h2>AI Advisor</h2>

          <div className="messages">
            <div className="bot">
              Hi! Tell me your major and the courses you've completed.
            </div>

            <div className="user">
              I'm a Computer Science major.
            </div>
          </div>

          <textarea placeholder="Ask anything..." />

          <button>Send</button>
        </div>

        <div className="dashboard">
          <div className="card">
            <h2>Student Information</h2>

            <p>
              <strong>Major:</strong> Computer Science
            </p>

            <p>
              <strong>Credits:</strong> 72 / 120
            </p>

            <p>
              <strong>Graduation Progress</strong>
            </p>

            <div className="progress">
              <div className="progress-bar"></div>
            </div>

            <p>60% Complete</p>
          </div>

          <div className="card">
            <h2>Completed Requirements</h2>

            <ul>
              <li>✅ English Composition</li>
              <li>✅ Mathematics</li>
              <li>✅ Writing Intensive</li>
              <li>✅ Social Science</li>
            </ul>
          </div>

          <div className="card">
            <h2>Remaining Requirements</h2>

            <ul>
              <li>CMSC 341</li>
              <li>CMSC 421</li>
              <li>Science Lab</li>
              <li>Upper-Level Elective</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="recommendations">
        <h2>⭐ AI Recommendations</h2>

        <div className="recommendation">
          <h3>CMSC 341</h3>

          <p>
            Recommended because it unlocks multiple upper-level Computer
            Science courses.
          </p>
        </div>

        <div className="recommendation">
          <h3>PHYS 122</h3>

          <p>
            Completes both the Science requirement and Lab requirement.
          </p>
        </div>

        <div className="recommendation">
          <h3>MATH 221</h3>

          <p>Required before taking Algorithms.</p>
        </div>
      </section>
    </div>
  );
}

export default App;