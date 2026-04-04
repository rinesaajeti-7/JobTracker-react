import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useNavigate } from 'react-router-dom';

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle.trim() || !formData.company.trim()) {
      alert('Please fill in job title and company');
      return;
    }

    setLoading(true);
    try {
      await addApplication(
        Date.now().toString(),
        formData.jobTitle,
        formData.company
      );
      
      alert('Application added successfully!');
      navigate('/applications');
    } catch (err) {
      alert('Failed to add application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Add New Application</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            placeholder="e.g., Frontend Developer"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="e.g., Google"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Add any notes about this application..."
          />
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/applications')}
            className="cancel-btn"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Adding...' : 'Add Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;