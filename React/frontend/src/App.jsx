import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Login and role selection
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp.jsx";
import RoleDashboard from "./Components/RoleDashboard/RoleDashboard.jsx";

// Interviewer and Interviewee dashboards
import InterviewerDashboard from "./Components/InterviewerDashboard.jsx";
import IntervieweeDashboard from "./Components/IntervieweeDashboard.jsx";

import "./Components/Shared.css";

function App() {
  // Shared state for questions/answers
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  console.log("App component is rendering"); // Debug line

  return (
    <Router>
      {/* Route definitions */}
      <Routes>
        {/* Auth / Landing */}
        <Route path="/" element={<LoginSignUp />} />

        {/* Choose Role */}
        <Route path="/dashboard" element={<RoleDashboard />} />

        {/* Interviewer Dashboard */}
        <Route
          path="/interviewer"
          element={
            <InterviewerDashboard
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
              setAnswers={setAnswers}
            />
          }
        />

        {/* Interviewee Dashboard */}
        <Route
          path="/interviewee"
          element={
            <IntervieweeDashboard
              questions={questions}
              answers={answers}
              setAnswers={setAnswers}
            />
          }
        />

        {/* Redirect any other path to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;