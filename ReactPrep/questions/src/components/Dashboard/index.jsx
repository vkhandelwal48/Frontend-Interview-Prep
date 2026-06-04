import React, { useState, useEffect } from 'react';
import './styles.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    revenue: 45000,
    users: 12500,
    sessions: 8234,
    conversionRate: 3.45,
  });

  const [chartData, setChartData] = useState([
    { hour: '00:00', sales: 100 },
    { hour: '04:00', sales: 250 },
    { hour: '08:00', sales: 400 },
    { hour: '12:00', sales: 350 },
    { hour: '16:00', sales: 600 },
    { hour: '20:00', sales: 500 },
    { hour: '23:59', sales: 300 },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, action: 'New user signup', time: '2 mins ago' },
    { id: 2, action: 'Payment received', time: '5 mins ago' },
    { id: 3, action: 'Product added', time: '10 mins ago' },
    { id: 4, action: 'Order completed', time: '15 mins ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        users: prev.users + Math.floor(Math.random() * 10),
        sessions: prev.sessions + Math.floor(Math.random() * 20),
        conversionRate: (prev.conversionRate + (Math.random() - 0.5) * 0.2).toFixed(2),
      }));

      // Update chart data
      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push({
          hour: new Date().getHours() + ':' + String(new Date().getMinutes()).padStart(2, '0'),
          sales: Math.floor(Math.random() * 800),
        });
        return newData;
      });

      // Add new activity
      setActivities(prev => {
        const actions = ['New user signup', 'Payment received', 'Product added', 'Order completed', 'Review submitted'];
        const newActivity = {
          id: Date.now(),
          action: actions[Math.floor(Math.random() * actions.length)],
          time: 'Just now',
        };
        return [newActivity, ...prev.slice(0, 3)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxSales = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Analytics Dashboard</h1>
        <span className="last-update">Last updated: {new Date().toLocaleTimeString()}</span>
      </header>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>💰 Revenue</h3>
          <div className="metric-value">${metrics.revenue.toLocaleString()}</div>
          <span className="metric-change">↑ 12.5% vs last week</span>
        </div>

        <div className="metric-card">
          <h3>👥 Active Users</h3>
          <div className="metric-value">{metrics.users.toLocaleString()}</div>
          <span className="metric-change">↑ 8.3% vs last week</span>
        </div>

        <div className="metric-card">
          <h3>📱 Sessions</h3>
          <div className="metric-value">{metrics.sessions.toLocaleString()}</div>
          <span className="metric-change">↑ 5.2% vs last week</span>
        </div>

        <div className="metric-card">
          <h3>🎯 Conversion</h3>
          <div className="metric-value">{metrics.conversionRate}%</div>
          <span className="metric-change">↑ 0.8% vs last week</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>Sales Trend (24h)</h2>
        <div className="chart-container">
          <div className="chart">
            {chartData.map((data, idx) => (
              <div key={idx} className="chart-bar-wrapper">
                <div className="chart-bar-label">{data.hour}</div>
                <div
                  className="chart-bar"
                  style={{
                    height: `${(data.sales / maxSales) * 200}px`,
                  }}
                >
                  <span className="chart-value">{data.sales}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-feed">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
