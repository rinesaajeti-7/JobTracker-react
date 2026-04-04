import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';

const ApplicationList: React.FC = () => {
  const { applications, updateApplicationStatus, deleteApplication } = useApplications();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const handleStatusChange = (id: string, status: string) => {
    if (status === 'applied' || status === 'interviewing' || status === 'rejected' || status === 'offered') {
      updateApplicationStatus(id, status);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
    }
  };

  const startEditing = (id: string, currentNotes: string) => {
    setEditingId(id);
    setNotes(currentNotes);
  };

  const saveNotes = (id: string) => {
    updateApplicationStatus(id, applications.find(app => app.id === id)?.status || 'applied');
    setEditingId(null);
  };

  if (applications.length === 0) {
    return (
      <div className="applications-container">
        <h2>My Applications</h2>
        <div className="no-applications">
          <p>No applications yet. Start applying for jobs!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2>My Applications ({applications.length})</h2>
      
      <div className="applications-list">
        {applications.map((application) => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div>
                <h3>{application.jobTitle}</h3>
                <p className="company">{application.company}</p>
              </div>
              
              <div className="application-status">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.id, e.target.value)}
                  className="status-select"
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="rejected">Rejected</option>
                  <option value="offered">Offered</option>
                </select>
              </div>
            </div>
            
            <div className="application-details">
              <p>
                <strong>Applied:</strong> {new Date(application.appliedDate).toLocaleDateString()}
              </p>
              
              <div className="application-notes">
                <strong>Notes:</strong>
                {editingId === application.id ? (
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                    <button onClick={() => saveNotes(application.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>{application.notes || 'No notes'}</p>
                    <button onClick={() => startEditing(application.id, application.notes)}>
                      Edit Notes
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="application-actions">
              <button
                onClick={() => handleDelete(application.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;