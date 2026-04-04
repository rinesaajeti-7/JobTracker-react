// src/pages/JobList.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jobApi } from '../services/jobApi';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setSearchQuery(search);
    
    fetchJobs(search);
  }, [location]);

  const fetchJobs = async (query: string = '') => {
    setLoading(true);
    try {
      const result = await jobApi.searchJobs(query, 50);
      setJobs(result.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to mock data
      const mockJobs = Array.from({ length: 20 }, (_, i) => ({
        id: `mock-${i + 1}`,
        title: ['React Developer', 'Node.js Engineer', 'UI/UX Designer', 'Full Stack Developer'][i % 4],
        company: ['Tech Corp', 'Digital Solutions', 'Innovate LLC', 'Code Masters'][i % 4],
        location: 'Remote',
        remote: true,
        salary: `$${Math.floor(Math.random() * 50000) + 60000} - $${Math.floor(Math.random() * 50000) + 100000}`,
        type: ['Full-time', 'Contract', 'Part-time'][i % 3],
        postedDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
      }));
      setJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchQuery);
  };

  const categories = [
    { id: '', name: 'All Jobs' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'python', name: 'Python' },
    { id: 'design', name: 'Design' },
    { id: 'devops', name: 'DevOps' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🔍 Browse Jobs</h1>
        <p className="text-gray-600">Find your next career opportunity from thousands of remote jobs</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-4 top-3.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Count */}
      <div className="mb-6">
        <p className="text-gray-700">
          Showing <span className="font-bold">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{job.title}</h3>
                    <div className="text-gray-700 font-medium">{job.company}</div>
                  </div>
                  {job.remote && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      🌍 Remote
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <span className="mr-3">📍 {job.location}</span>
                  {job.type && <span className="bg-gray-100 px-2 py-1 rounded">⏰ {job.type}</span>}
                </div>
                
                {job.salary && (
                  <div className="text-green-600 font-bold mb-4">💰 {job.salary}</div>
                )}
                
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/job/${job.id}`}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? `No jobs found for "${searchQuery}". Try different keywords.` : 'No jobs available at the moment.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              fetchJobs('');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View All Jobs
          </button>
        </div>
      )}

      {/* AI Assistant Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Need help finding the right job?</h3>
            <p className="text-blue-100">Our AI assistant can help match you with perfect opportunities</p>
          </div>
          <Link
            to="/ai-assistant"
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100"
          >
            🤖 Try AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobList;