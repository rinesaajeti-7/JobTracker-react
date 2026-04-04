import { useState, useEffect, useCallback } from 'react';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'interviewing' | 'rejected' | 'offered';
  notes: string;
  appliedDate: string;
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    }
  }, []);

  const saveToStorage = useCallback((apps: Application[]) => {
    localStorage.setItem('jobApplications', JSON.stringify(apps));
  }, []);

  const addApplication = useCallback((jobId: string, jobTitle: string, company: string) => {
    setLoading(true);
    
    const newApplication: Application = {
      id: Date.now().toString(),
      jobId,
      jobTitle,
      company,
      status: 'applied',
      notes: '',
      appliedDate: new Date().toISOString()
    };

    const updated = [...applications, newApplication];
    setApplications(updated);
    saveToStorage(updated);
    setLoading(false);
    
    return newApplication.id;
  }, [applications, saveToStorage]);

  const updateApplicationStatus = useCallback((id: string, status: Application['status']) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updated);
    saveToStorage(updated);
  }, [applications, saveToStorage]);

  const updateApplicationNotes = useCallback((id: string, notes: string) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, notes } : app
    );
    setApplications(updated);
    saveToStorage(updated);
  }, [applications, saveToStorage]);

  const deleteApplication = useCallback((id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    saveToStorage(updated);
  }, [applications, saveToStorage]);

  const getStats = useCallback(() => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'applied').length;
    const interviewing = applications.filter(app => app.status === 'interviewing').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    const offered = applications.filter(app => app.status === 'offered').length;
    
    const successRate = total > 0 
      ? Math.round(((offered + interviewing) / total) * 100)
      : 0;

    const byCompany = applications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      applied,
      interviewing,
      rejected,
      offered,
      successRate,
      byCompany
    };
  }, [applications]);

  return {
    applications,
    loading,
    addApplication,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication,
    getStats
  };
};