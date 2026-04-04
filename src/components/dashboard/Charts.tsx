import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieLabelRenderProps } from 'recharts';

interface ChartsProps {
  stats: {
    applied: number;
    interviewing: number;
    rejected: number;
    offered: number;
    byCompany: Record<string, number>;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Charts: React.FC<ChartsProps> = ({ stats }) => {
  const statusData = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interviewing', value: stats.interviewing },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Offered', value: stats.offered },
  ];

  const companyData = Object.entries(stats.byCompany)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="dashboard-charts">
      <div className="chart-container">
        <h4>Application Status</h4>
        <PieChart width={300} height={300}>
       <Pie
        data={statusData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={(props: PieLabelRenderProps) => {
            const { name = '', percent = 0 } = props;
            return `${name}: ${(percent * 100).toFixed(0)}%`;
        }}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        >
        {/* ... */}
        </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="chart-container">
        <h4>Top Companies Applied</h4>
        <BarChart width={400} height={300} data={companyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;