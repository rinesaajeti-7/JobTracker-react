// src/pages/JobDetail.tsx - Version i përditësuar
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplications } from '../../hooks/useApplications';
import { jobApi } from '../../services/jobApi';


const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [similarJobs, setSimilarJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // Shtuar
  const { addApplication } = useApplications();

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      setLoading(true);
      console.log('Fetching job with ID from URL:', id);
      
      try {
        const data = await jobApi.getJobDetails(id);
        console.log('Job data received:', data);
        setJob(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!id || !job) return;
      
      setSimilarLoading(true);
      try {
        const similar = await jobApi.getSimilarJobs(id);
        console.log(`Found ${similar.length} similar jobs`);
        setSimilarJobs(similar);
      } catch (err) {
        console.error('Error fetching similar jobs:', err);
      } finally {
        setSimilarLoading(false);
      }
    };

    if (job) {
      fetchSimilar();
    }
  }, [id, job]);

  const handleApply = async () => {
    if (!job) return;
    
    setApplying(true);
    try {
      await addApplication(job.id, job.title, job.company);
      alert('Application submitted successfully!');
      
      if (job.link && job.link !== '#') {
        window.open(job.link, '_blank');
      }
      
      navigate('/applications');
    } catch (err) {
      alert('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  // Funksioni i përditësuar për të shfaqur vetëm 3-4 fjali
  const formatDescription = (htmlContent: string, short: boolean = true) => {
    // Heq të gjitha tag-et HTML
    const plainText = htmlContent.replace(/<[^>]*>/g, ' ');
    
    // Zëvendëson entitetet e speciale
    const decodedText = plainText
      .replace(/&#8211;/g, '–')
      .replace(/&#8217;/g, '’')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ') // Heq hapësirat e tepërta
      .trim();
    
    // Ndaj në fjali (bazuar në pikat)
    const sentences = decodedText.split(/(?<=[.!?])\s+/);
    
    if (short && sentences.length > 3) {
      // Merr vetëm 3-4 fjali të para
      const shortSentences = sentences.slice(0, 4);
      return (
        <>
          {shortSentences.map((sentence, index) => (
            <p key={index} className="job-description-paragraph">
              {sentence}
            </p>
          ))}
          <button 
            className="show-more-btn"
            onClick={() => setShowFullDescription(true)}
          >
            📖 Show Full Description...
          </button>
        </>
      );
    }
    
    // Shfaq të gjitha fjalitë
    return sentences.map((sentence, index) => (
      <p key={index} className="job-description-paragraph">
        {sentence}
      </p>
    ));
  };

  // Funksioni për të shfaqur një parështje të shkurtër të punëve të ngjashme
  const renderSimilarJobPreview = (job: any) => (
    <div key={job.id} className="similar-job-card">
      <div className="similar-job-header">
        <h4>{job.title}</h4>
        <div className="similar-job-company">{job.company}</div>
      </div>
      <br />
      <div className="similar-job-details">
        <div className="similar-job-meta">
          <span className="similar-job-location">📍 {job.location}</span>
          {job.remote && <span className="similar-job-remote">🌍 Remote</span>}
          {job.type && <span className="similar-job-type">⏰ {job.type}</span>}
        </div>
        <br />
        {job.salary && job.salary !== 'Not specified' && (
          <div className="similar-job-salary">💰 {job.salary}</div>
        )}
        <br />
        {/* Përshkrim i shkurtër (1-2 fjali) */}
        {job.description && (
          <div className="similar-job-description">
            {formatShortDescription(job.description)}
          </div>
        )}
        <br />
        {job.tags && job.tags.length > 0 && (
          <div className="similar-job-tags">
            {job.tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="similar-job-tag">🏷️ {tag}</span>
            ))}
          </div>
        )}
      </div>
     
      <button 
        onClick={() => navigate(`/job/${job.id}`)}
        className="view-similar-job-btn"
      >
        👀 View Details
      </button>
      <br /> <br /> <hr />
    </div>
  );

  // Funksion ndihmës për përshkrim të shkurtër
  const formatShortDescription = (description: string, maxSentences: number = 2) => {
    const plainText = description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const sentences = plainText.split(/(?<=[.!?])\s+/);
    
    if (sentences.length <= maxSentences) {
      return sentences.join(' ');
    }
    
    return sentences.slice(0, maxSentences).join(' ') + '...';
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <div className="job-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to Jobs
      </button>
      
      <div className="job-header">
        <h1>{job.title}</h1>
        <div className="company-info">
          <h2>{job.company}</h2>
          <span className="location">📍 {job.location}</span>
          {job.remote && <span className="remote-badge">🌍 Remote</span>}
        </div>
        
        {/* Info shtesë në header */}
        <div className="job-header-meta">
          {job.type && <span className="job-type-badge">⏰ {job.type}</span>}
          {job.salary && job.salary !== 'Not specified' && (
            <span className="salary-badge">💰 {job.salary}</span>
          )}
          {job.postedDate && (
            <span className="date-badge">
              📅 Posted: {new Date(job.postedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>
      
      {job.tags && job.tags.length > 0 && (
        <div className="job-tags">
          <strong>🏷️ Skills & Technologies:</strong>
          {job.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="job-content">
        <div className="job-description-card">
          <div className="description-header">
            <h3>📝 Job Description</h3>
            <div className="description-status">
              {showFullDescription ? '📖 Full Description' : '📄 Short Preview'}
            </div>
          </div>
          
          <div className="description-text">
            {job.description ? 
              formatDescription(job.description, !showFullDescription) 
              : 'No description available.'
            }
            
            {showFullDescription && (
              <button 
                className="show-less-btn"
                onClick={() => setShowFullDescription(false)}
              >
                📕 Show Less
              </button>
            )}
          </div>
          
          {job.link && job.link !== '#' && (
            <div className="job-link">
              <a 
                href={job.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="original-link"
              >
                🔗 View Original Job Posting on {job.company} Website
              </a>
            </div>
          )}
        </div>
        
        <div className="job-sidebar">
          <div className="job-actions-card">
            <h4>🚀 Apply Now</h4>
            <button 
              onClick={handleApply} 
              disabled={applying}
              className="apply-btn-primary"
            >
              {applying ? '🔄 Applying...' : '📝 Apply Now & Track Application'}
            </button>
            
            <div className="apply-note">
              <small>✅ Application will be tracked in your dashboard</small>
            </div>
            
            <a 
              href={job.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="apply-btn-external"
            >
              🌐 Apply Directly on {job.company} Site
            </a>
          </div>
          
          <div className="job-meta-card">
            <h4>📋 Job Details</h4>
            <div className="meta-grid">
              <div className="meta-item">
                <div className="meta-icon">📍</div>
                <div className="meta-content">
                  <strong>Location</strong>
                  <span>{job.location}</span>
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-icon">🏠</div>
                <div className="meta-content">
                  <strong>Remote</strong>
                  <span>{job.remote ? 'Yes' : 'No'}</span>
                </div>
              </div>
              
              {job.salary && job.salary !== 'Not specified' && (
                <div className="meta-item">
                  <div className="meta-icon">💰</div>
                  <div className="meta-content">
                    <strong>Salary</strong>
                    <span>{job.salary}</span>
                  </div>
                </div>
              )}
              
              {job.type && (
                <div className="meta-item">
                  <div className="meta-icon">⏰</div>
                  <div className="meta-content">
                    <strong>Type</strong>
                    <span>{job.type}</span>
                  </div>
                </div>
              )}
              
              {job.postedDate && (
                <div className="meta-item">
                  <div className="meta-icon">📅</div>
                  <div className="meta-content">
                    <strong>Posted</strong>
                    <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
              
              <div className="meta-item">
                <div className="meta-icon">🏢</div>
                <div className="meta-content">
                  <strong>Company</strong>
                  <span>{job.company}</span>
                </div>
              </div>
            </div>
            
            {job.source === 'mock' && (
              <div className="demo-notice">
                <strong>⚠️ Demo Job</strong>
                <small>This is a sample job for demonstration purposes</small>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Seksioni i përditësuar për punë të ngjashme */}
      <div className="similar-jobs-section">
        <div className="section-header">
            <br />
          <h3>🧐 Similar Jobs</h3>
          <br />
          <div className="section-subtitle">
            {similarJobs.length} jobs similar to "{job.title}"
          </div>
          <br />
        </div>
        
        {similarLoading ? (
          <div className="loading-similar">
            <div className="spinner"></div>
            <p>Finding similar jobs...</p>
          </div>
        ) : similarJobs.length > 0 ? (
          <>
            <div className="similar-jobs-grid">
                <hr />
              {similarJobs.slice(0, 15).map(renderSimilarJobPreview)} {/* Shfaq maksimum 6 */}
            </div>
            
            {similarJobs.length > 6 && (
              <div className="view-more-container">
                <button 
                  className="view-more-btn"
                  onClick={() => {
                    // Mund të shtoni logjikë për të shfaqur më shumë
                    navigate('/jobs', { state: { search: job.title.split(' ')[0] } });
                  }}
                >
                  👁️ View All {similarJobs.length} Similar Jobs
                </button>
              
              </div>
            )}
          </>
        ) : (
          <div className="no-similar-jobs">
            <div className="no-jobs-icon">🔍</div>
            <h4>No similar jobs found</h4>
            <p>Try searching for related keywords or check back later</p>
            <button 
              className="browse-jobs-btn"
              onClick={() => navigate('/jobs')}
            >
              Browse All Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;