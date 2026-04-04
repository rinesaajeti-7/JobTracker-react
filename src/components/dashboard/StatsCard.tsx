// src/components/dashboard/StatsCard.tsx
import React from 'react';
import { useApplications } from '../../hooks/useApplications';

const StatsCard: React.FC = () => {
  const { getStats } = useApplications();
  const stats = getStats();

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <div className="stat-value">{stats.total}</div>
            <p className="stat-description">Applications submitted</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Success Rate</h3>
            <div className="stat-value">{stats.successRate}%</div>
            <p className="stat-description">Interview to application ratio</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>Active Interviews</h3>
            <div className="stat-value">{stats.interviewing}</div>
            <p className="stat-description">Currently interviewing</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>Companies</h3>
            <div className="stat-value">
              {Object.keys(stats.byCompany || {}).length}
            </div>
            <p className="stat-description">Different companies applied</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;