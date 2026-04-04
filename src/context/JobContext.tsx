import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type?: string;
  remote: boolean;
  tags: string[];
}

interface JobContextType {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    remoteOnly: boolean;
    employmentType: string;
    experienceLevel: string;
  };
  setFilters: (filters: any) => void;
  clearFilters: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    remoteOnly: false,
    employmentType: '',
    experienceLevel: ''
  });

  const clearFilters = () => {
    setFilters({
      remoteOnly: false,
      employmentType: '',
      experienceLevel: ''
    });
    setSearchQuery('');
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        selectedJob,
        setSelectedJob,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        clearFilters
      }}
    >
      {children}
    </JobContext.Provider>
  );
};