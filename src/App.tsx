import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import JobDetail from './components/jobs/JobDetail';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationForm from './components/applications/ApplicationForm';
import StatsCard from './components/dashboard/StatsCard';
import { useApplications } from './hooks/useApplications';
import { jobApi } from './services/jobApi';
import Charts from './components/dashboard/Charts';
import { useAuth } from './context/AuthContext';
import CoverLetterGenerator from './components/ai/CoverLetterGenerator';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import JobSearch from './components/jobs/JobSearch';
import AIAssistant from './pages/AIAssistant'; 
import About from './pages/about';
import AlertPage from './pages/AlertPage';

function Home() {
  const { getStats } = useApplications();
  const stats = getStats();
  
  const [sampleJobs, setSampleJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSampleJobs = async () => {
      try {
        setLoading(true);
        const response = await jobApi.searchJobs('', 3);
        setSampleJobs(response.jobs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching sample jobs:', error);
        setSampleJobs([
          {
            id: 'job-1',
            title: 'Senior React Developer',
            company: 'Tech Company',
            location: 'Remote',
          },
          {
            id: 'job-2', 
            title: 'Full Stack Engineer',
            company: 'Startup Inc',
            location: 'Remote',
          },
          {
            id: 'job-3',
            title: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'Remote',
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSampleJobs();
  }, []);

  return (
    <div className="home-container">
      <h1>Job Tracker Dashboard</h1>
      <StatsCard />
     
    </div>
  );
}

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


function App() {
  return (
    <AuthProvider>
      <Router>

        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           
            <Route path="/" element={
              <Protected>
                <Home />
              </Protected>
            } />
            
            <Route path="/job/:id" element={
              <Protected>
                <JobDetail />
              </Protected>
            } />
            
            <Route path="/jobs" element={
              <Protected>
                <JobSearch />
              </Protected>
            } />
            
            <Route path="/applications" element={
              <Protected>
                <ApplicationList />
              </Protected>
            } />
            
            <Route path="ApplicationForm" element={
              <Protected>
                <ApplicationForm />
              </Protected>
            } />
            
            <Route path="/StatsCard" element={
              <Protected>
                <StatsCard />
              </Protected>
            } />
            
           
            <Route path="/cover-letter" element={
              <Protected>
                <CoverLetterGenerator />
              </Protected>
            } />
            
            <Route path="/profile" element={
              <Protected>
                <Profile />
              </Protected>
            } />
         
            
              <Route 
            path="/ai-assistant" 
            element={
                <AIAssistant /> 
            } 
          />
         <Route 
            path="/alertpage" 
            element={
                <AlertPage /> 
            } 
          />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;