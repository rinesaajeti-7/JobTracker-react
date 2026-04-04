// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ListChecks, 
  Search, 
  Briefcase, 
  Building, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import { jobApi } from '../services/jobApi';

const Home = () => {
  const [sampleJobs, setSampleJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSampleJobs = async () => {
      try {
        setLoading(true);
        // Mund të përdorni API tuaj ose të dhëna mock
        const response = await jobApi.searchJobs('', 3);
        setSampleJobs(response.jobs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching sample jobs:', error);
        // Mock data nëse API dështon
        setSampleJobs([
          {
            id: 'job-1',
            title: 'Senior React Developer',
            company: 'Tech Innovations Inc',
            location: 'Remote',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            postedDate: '2 days ago'
          },
          {
            id: 'job-2',
            title: 'Full Stack Engineer',
            company: 'Startup Labs',
            location: 'New York, NY',
            type: 'Contract',
            salary: '$90 - $120/hr',
            postedDate: '1 week ago'
          },
          {
            id: 'job-3',
            title: 'UI/UX Designer',
            company: 'Creative Studio',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$100,000 - $130,000',
            postedDate: '3 days ago'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSampleJobs();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to JobTracker</h1>
        <p className="text-blue-100 text-lg">Track, manage, and optimize your job search journey</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <span className="text-sm">Total Apps</span>
            </div>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              <span className="text-sm">Interview Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">33%</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="text-sm">Companies</span>
            </div>
            <p className="text-2xl font-bold mt-2">18</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span className="text-sm">Active Days</span>
            </div>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>
        </div>
      </div>

      {/* 3 BUTONAT KRYESORË */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BUTONI 1: Add Application */}
        <Link 
          to="/applications/new" 
          className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <PlusCircle size={32} className="text-white/90" />
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-xl font-bold mb-2">Add New Application</h3>
          <p className="text-blue-100">Track a new job application</p>
          <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
            Quick Add
          </div>
        </Link>

        {/* BUTONI 2: View Applications */}
        <Link 
          to="/applications" 
          className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <ListChecks size={32} className="text-white/90" />
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-xl font-bold mb-2">View Applications</h3>
          <p className="text-purple-100">Manage your job applications</p>
          <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
            24 Active
          </div>
        </Link>

        {/* BUTONI 3: Browse Jobs */}
        <Link 
          to="/jobs" 
          className="group bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <Search size={32} className="text-white/90" />
            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-xl font-bold mb-2">Browse Jobs</h3>
          <p className="text-green-100">Find new opportunities</p>
          <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
            {loading ? 'Loading...' : `${sampleJobs.length}+ New`}
          </div>
        </Link>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Application Statistics</h2>
        <StatsCard />
      </div>

      {/* 3 PUNËT (JOBS) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Job Opportunities</h2>
          <Link 
            to="/jobs" 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-500">Loading jobs...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`border rounded-xl p-5 hover:shadow-md transition-shadow ${
                  index === 0 ? 'border-blue-200 bg-blue-50' :
                  index === 1 ? 'border-purple-200 bg-purple-50' :
                  'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Building size={16} className="text-gray-500" />
                      <span className="text-gray-700">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-blue-100 text-blue-800' :
                    index === 1 ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {job.type}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">{job.salary}</p>
                  <p className="text-gray-500 text-xs">{job.postedDate}</p>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    to={`/job/${job.id}`}
                    className={`flex-1 text-center py-2 rounded-lg font-medium ${
                      index === 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      index === 1 ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                      'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    View Details
                  </Link>
                  <Link 
                    to="/applications/new"
                    className="flex-1 text-center py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Quick Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">AI Assistant</h3>
          <p className="mb-4">Get help with cover letters, interview prep, and more</p>
          <Link 
            to="/ai-assistant"
            className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
          >
            Try AI Assistant
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Track Progress</h3>
          <p className="mb-4">Monitor your job search performance with analytics</p>
          <Link 
            to="/dashboard"
            className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;