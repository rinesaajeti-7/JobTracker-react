import React, { useState, useEffect } from 'react'; 
import { useJobs } from '../../hooks/useJobs';
import JobCard from './JobCard';
import './JobSearch.css';

const JobSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    jobs, 
    loading, 
    error, 
    searchJobs, 
    loadMore, 
    hasMore,
    totalJobs,
    currentPage,
    jobsPerPage 
  } = useJobs();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch(e);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchJobs(searchQuery);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMore();
    }
  };


  const remainingJobs = Math.max(0, totalJobs - jobs.length);

  console.log('Jobs:', jobs);

  return (
    <div className="job-search-container">
      <h1>Find Your Dream Job</h1>
      <p className="job-count">Showing {jobs.length} of {totalJobs} jobs</p>
      
  


      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search jobs by title, company, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          type="submit" 
          className="search-btn"
          disabled={loading && currentPage === 1}
        >
          {loading && currentPage === 1 ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </form>

      {loading && currentPage === 1 && (
        <div className="loading">
          <div className="spinner"></div>
          Loading jobs...
        </div>
      )}
      
      {error && <div className="error">⚠️ {error}</div>}

      <div className="jobs-grid">
        {jobs.length > 0 ? (
          <>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            
            {loading && currentPage > 1 && (
              <div className="loading-more">
                <div className="spinner-small"></div>
                Loading more jobs...
              </div>
            )}
            
            {hasMore && !loading && remainingJobs > 0 && (
              <div className="load-more-container">
                <button 
                  onClick={handleLoadMore} 
                  className="load-more-btn"
                >
                  📥 Load More Jobs ({remainingJobs} more available)
                </button>
              </div>
            )}
          </>
        ) : (
          !loading && !error && (
            <div className="no-jobs">
              <div className="no-jobs-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search terms or browse all jobs</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default JobSearch;