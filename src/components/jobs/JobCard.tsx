import React from 'react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    tags: string[];
    description: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="company">{job.company}</span>
      </div>
      <hr />
      <div className="job-details">
        <span className="location">{job.location}</span>
        {job.remote && <span className="remote-badge">Remote</span>}
      </div>
      
      <div className="job-tags">
        {job.tags?.slice(0, 3).map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      
      <p className="job-description">
        {job.description?.substring(0, 150)}...
      </p>
      
      <div className="job-actions">
        <Link to={`/job/${job.id}`} className="btn-view">
          View Details
        </Link>
        <button className="btn-apply">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;