// src/hooks/useJobs.ts - Version i përmirësuar
import { useState, useEffect, useCallback } from 'react';
import { jobApi } from '../services/jobApi';

export const useJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 10;

  const fetchJobs = useCallback(async (query: string = '', page: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Merr më shumë punë nga API
      const result = await jobApi.searchJobs(query, 100); // Kërko deri në 100 punë
      console.log(`API returned ${result.jobs.length} jobs, total: ${result.total}`);
      
      // Implemento pagination client-side
      const startIndex = (page - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const paginatedJobs = result.jobs.slice(startIndex, endIndex);
      
      setJobs(paginatedJobs);
      setTotalJobs(result.total);
      setCurrentPage(page);
      
      console.log(`Showing ${paginatedJobs.length} jobs on page ${page}`);
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const searchJobs = (query: string) => {
    fetchJobs(query, 1);
  };

  const loadMore = () => {
    fetchJobs('', currentPage + 1);
  };

  const hasMore = currentPage * jobsPerPage < totalJobs;

  return {
    jobs,
    loading,
    error,
    currentPage,
    totalJobs,
    jobsPerPage,
    hasMore,
    searchJobs,
    loadMore,
    fetchJobs
  };
};