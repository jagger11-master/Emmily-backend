import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleDashboard.css'; // optional for styling

const RoleDashboard = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'Interviewer') {
      navigate('/interviewer');
    } else if (role === 'Interviewee') {
      navigate('/interviewee');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button onClick={() => handleRoleSelect('Interviewer')}>
          Interviewer Dashboard
        </button>
        <button onClick={() => handleRoleSelect('Interviewee')}>
          Interviewee Dashboard
        </button>
      </div>
    </div>
  );
};

export default RoleDashboard;