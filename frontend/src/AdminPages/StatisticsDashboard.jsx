import React, { useState, useEffect } from "react";
import axios from "../Apis/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./StatisticsDashboard.scss";

const StatisticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/bookings/statistics");
        console.log(response);

        // const jsonData = await response.json();
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatRevenue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return `${(value / 1000).toFixed(1)}K`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4">No data available</div>;
  }

  const monthlyRevenueData = data.monthly_revenue.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
    bookings: item.bookings,
  }));

  const aircraftRankingData = data.aircraft_stats
    .map((aircraft) => ({
      name: aircraft.aircraft_code,
      revenue: aircraft.total_bookings * 1000000, // Example revenue calculation
      utilization: aircraft.utilization_rate,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="statistics-dashboard">
      <div className="section-container section-container--two-cols">
        {/* Monthly Revenue Chart */}
        <div className="card">
          <h3 className="card__header">Monthly Revenue</h3>
          <div className="card__chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatRevenue} />
                <Tooltip
                  formatter={(value) => formatRevenue(value)}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aircraft Revenue Ranking */}
        <div className="card">
          <h3 className="card__header">Aircraft Revenue Ranking</h3>
          <div className="card__chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aircraftRankingData}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, revenue }) =>
                    `${name} (${formatRevenue(revenue)})`
                  }
                >
                  {aircraftRankingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatRevenue(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="section-container section-container--three-cols">
        <div className="card">
          <h4 className="card__stat-title">Total Bookings</h4>
          <p className="card__stat-value">
            {data.summary.total_confirmed_bookings}
          </p>
        </div>
        <div className="card">
          <h4 className="card__stat-title">Total Revenue</h4>
          <p className="card__stat-value">
            {formatRevenue(data.booking_stats[0].totalRevenue)}
          </p>
        </div>
        <div className="card">
          <h4 className="card__stat-title">Total Aircraft</h4>
          <p className="card__stat-value">{data.summary.total_aircraft}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
