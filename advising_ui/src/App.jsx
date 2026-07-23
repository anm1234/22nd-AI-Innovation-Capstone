import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import StudentDashboard from "./components/StudentDashboard";
import ProgressCard from "./components/ProgressCard";
import RequirementList from "./components/RequirementList";
import RecommendationList from "./components/RecommendationList";
import SemesterPlanner from "./components/SemesterPlanner";
import TranscriptUpload from "./components/TranscriptUpload";
import { testConnection,sendMessage,} from "./api/advisor";
import { uploadTranscript } from "./api/transcript";

function App() {

  /* ===========================================
     APPLICATION STATE
  =========================================== */

  const [sessionId, setSessionId] = useState(null);

  const [backendStatus, setBackendStatus] = useState("Connecting...");

  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState("dashboard");

  const [student, setStudent] = useState(null);

  const [messages, setMessages] = useState([]);

  const [completedRequirements, setCompletedRequirements] = useState([]);

  const [remainingRequirements, setRemainingRequirements] = useState([]);

  const [recommendations, setRecommendations] = useState([]);

  const [semesterPlan, setSemesterPlan] = useState([]);

  const [studentInfo, setStudentInfo] = useState(null);

  /* ===========================================
     INITIALIZE APPLICATION
  =========================================== */

useEffect(() => {

    connectToBackend();

    // loadMockData();

}, []);
  /* ===========================================
     BACKEND CONNECTION
  =========================================== */

async function connectToBackend() {
  try {
    const response = await testConnection();

    console.log("Response from backend:", response);

    setBackendStatus("Backend connected successfully");
  } catch (error) {
    console.error("Connection failed:", error);

    setBackendStatus("Backend Offline");
  }
}

  /* ===========================================
     MOCK DATA
     (Temporary until FastAPI + ADK are ready)
  =========================================== */

  function loadMockData() {

    setStudent({

      major: "Computer Science",

      creditsCompleted: 72,

      creditsRequired: 120,

      progress: 60,

      expectedGraduation: "Spring 2027"

    });

    setCompletedRequirements([

      {
        name: "English Composition",
        description: "Completed through ENGL 100."
      },

      {
        name: "Mathematics",
        description: "Completed through MATH 151."
      },

      {
        name: "Writing Intensive",
        description: "Completed."
      }

    ]);

    setRemainingRequirements([

      {
        name: "Science with Lab",
        description: "Need one approved laboratory science."
      },

      {
        name: "Upper Level Elective",
        description: "Need one 300-level elective."
      }

    ]);

    setRecommendations([

      {

        course: "CMSC 341",

        credits: 3,

        priority: "High",

        reason:
          "Unlocks multiple upper-level Computer Science courses.",

        benefits: [

          "Major Requirement",

          "Prerequisite",

          "Recommended Next Semester"

        ]

      },

      {

        course: "PHYS 122",

        credits: 4,

        priority: "Medium",

        reason:
          "Completes both the Science and Laboratory requirements.",

        benefits: [

          "Science Requirement",

          "Laboratory Requirement"

        ]

      }

    ]);

    setSemesterPlan([

      {

        name: "Fall 2026",

        totalCredits: 15,

        courses: [

          {

            code: "CMSC 341",

            title: "Data Structures",

            credits: 3

          },

          {

            code: "CMSC 313",

            title: "Computer Organization",

            credits: 3

          },

          {

            code: "PHYS 122",

            title: "General Physics II",

            credits: 4

          },

          {

            code: "STAT 355",

            title: "Probability",

            credits: 3

          },

          {

            code: "ENGL 393",

            title: "Technical Communication",

            credits: 2

          }

        ]

      }

    ]);

    setMessages([

      {

        id: 1,

        role: "assistant",

        content:
          "Welcome to the AI Academic Advisor. Ask me anything about your degree or upload your unofficial transcript."

      }

    ]);

  }

  /* ===========================================
     CHAT
  =========================================== */
async function handleSendMessage(text) {

  if (!sessionId) {

    const aiMessage = {
        id: Date.now(),
        role: "assistant",
        content: "Please upload your transcript before asking academic advising questions."
    };

    setMessages(previous => [
        ...previous,
        aiMessage
    ]);

    return;
}

    const userMessage = {
        id: Date.now(),
        role: "user",
        content: text
    };

    setMessages(previous => [
        ...previous,
        userMessage
    ]);

    setLoading(true);

    try {

    const result = await sendMessage(
        text,
        sessionId
    );

    const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: result.response
    };

    setMessages(previous => [
        ...previous,
        aiMessage
    ]);

  } catch (error) {

        console.error(error);

        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant",
            content: "Unable to reach the AI Advisor."
        };

        setMessages(previous => [
            ...previous,
            aiMessage
        ]);

    } finally {

        setLoading(false);

    }
}

  /* ===========================================
     TRANSCRIPT
  =========================================== */

async function handleTranscriptUpload(file) {
    try {
        const result = await uploadTranscript(file);

        console.log(result);

        setStudentInfo(result.student);

        setSessionId(result.session_id);

        setCompletedRequirements(result.audit.completed);

        setRemainingRequirements(result.audit.missing);

        setRecommendations(result.recommendations);

    } catch (error) {
        console.error(error);
        alert("Upload failed.");
    }
}

    return (
    <div className="app">

      <Header backendStatus={backendStatus} />

      <div className="app-layout">

        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="main-content">

          <ChatPanel
            messages={messages}
            loading={loading}
            onSendMessage={handleSendMessage}
          />

          <StudentDashboard
            student={student}
          />

          <ProgressCard
            progress={student?.progress ?? 0}
            student={student}
          />

         <TranscriptUpload onUpload={handleTranscriptUpload}/>

        {studentInfo && (
          <div className="student-card">
            <h2>Student Information</h2>

            <p><strong>Name:</strong> {studentInfo.name}</p>
            <p><strong>Student ID:</strong> {studentInfo.student_id}</p>
            <p><strong>Major:</strong> {studentInfo.major}</p>
            <p><strong>Minor:</strong> {studentInfo.minor}</p>
            <p><strong>Academic Level:</strong> {studentInfo.academic_level}</p>
            <p><strong>College:</strong> {studentInfo.college}</p>
            <p><strong>Admit Term:</strong> {studentInfo.admit_term}</p>
          </div>
        )}

        <RecommendationList
          recommendations={recommendations}
        />

          <RequirementList
            title="Completed Requirements"
            requirements={completedRequirements}
          />

          <RequirementList
            title="Remaining Requirements"
            requirements={remainingRequirements}
          />

          <SemesterPlanner
            semesters={semesterPlan}
          />

        </main>

      </div>

    </div>
  );
}

export default App;