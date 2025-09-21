import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function InterviewerDashboard({ questions, setQuestions, answers, setAnswers }) {
  const [newQuestion, setNewQuestion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), text: newQuestion }]);
      setNewQuestion("");
      setShowForm(false);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
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

      <h2>Interviewer Dashboard</h2>

      {/* Add Question */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn">
         Add Question
        </button>
      )}
      {showForm && (
        <div className="form">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question..."
          />
          <div className="form-actions">
            <button onClick={handleAddQuestion} className="btn">Post</button>
            <button onClick={() => setShowForm(false)} className="btn secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Posted Questions */}
      <h3>Posted Questions</h3>
      {questions.length === 0 ? <p>No questions yet.</p> : (
        <ul>
          {questions.map((q) => (
            <li key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <span>{q.text}</span>
              <button 
                onClick={() => handleDeleteQuestion(q.id)} 
                className="btn secondary"
                style={{ backgroundColor: '#ff4444', color: 'white', padding: '5px 10px', fontSize: '12px' }}
              >
              Delete
              </button>
            </li>
          ))}
        </ul>
      )}

     
      {/* View Answers */}
      <h3>Answers from Interviewees</h3>
      {answers.length === 0 ? <p>No answers yet.</p> : (
        <ul>
          {answers.map((a) => (
            <li key={a.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <div style={{ marginBottom: '10px' }}>
                <b>Q:</b> {a.question}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <b>A:</b> {a.text}
              </div>
              <button 
                onClick={() => handleDeleteAnswer(a.id)} 
                className="btn secondary"
                style={{ backgroundColor: '#ff4444', color: 'white', padding: '5px 10px', fontSize: '12px' }}
              >
              Delete Answer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

InterviewerDashboard.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  setAnswers: PropTypes.func.isRequired,
};