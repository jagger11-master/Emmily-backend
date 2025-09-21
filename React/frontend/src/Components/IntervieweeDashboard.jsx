import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function IntervieweeDashboard({ questions, answers, setAnswers }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const navigate = useNavigate();

  const handleSubmitAnswer = () => {
    if (answerText.trim()) {
      setAnswers([...answers, { 
        id: Date.now(),
        question: selectedQuestion.text,
        text: answerText 
      }]);
      setSelectedQuestion(null);
      setAnswerText("");
    }
  };

  const handleDeleteAnswer = (answerId) => {
    const updatedAnswers = answers.filter(a => a.id !== answerId);
    setAnswers(updatedAnswers);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Rudi kwa role selection
  };

  const handleLogout = () => {
    navigate('/'); // Rudi kwa login page
  };

  return (
    <div className="dashboard">
      {/* Back and Logout buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handleBackToDashboard} className="btn secondary">
          Back to Dashboard
        </button>
        <button onClick={handleLogout} className="btn secondary">
          Logout
        </button>
      </div>

      <h2>Interviewee Dashboard</h2>

      {/* List of Questions */}
      <h3>Questions</h3>
      {questions.length === 0 ? (
        <p>No questions posted yet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              {q.text}{" "}
              <button onClick={() => setSelectedQuestion(q)} className="btn small">
                Answer
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Answer Form */}
      {selectedQuestion && (
        <div className="form">
          <h4>Answer: {selectedQuestion.text}</h4>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your answer..."
          />
          <div className="form-actions">
            <button onClick={handleSubmitAnswer} className="btn">Submit</button>
            <button onClick={() => setSelectedQuestion(null)} className="btn secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

IntervieweeDashboard.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
};