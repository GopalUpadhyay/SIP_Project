import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Priority-specific colors with nice visual appeal
const PRIORITY_COLORS = {
  high: "#EF4444",      // Red - Urgent/Critical
  medium: "#F59E0B",    // Amber - Important
  normal: "#3B82F6",    // Blue - Standard
  low: "#10B981",       // Green - Low priority
};

export const Chart = ({ data }) => {
  // Get color based on priority name
  const getColorByPriority = (priorityName) => {
    const priority = priorityName?.toLowerCase();
    return PRIORITY_COLORS[priority] || "#6B7280"; // Default gray if unknown
  };

  // Custom tooltip to show priority with color
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold capitalize" style={{ color: data.fill }}>
            {data.payload.name} Priority
          </p>
          <p className="text-gray-700">
            Tasks: <span className="font-bold">{data.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarChart 
        width={150} 
        height={40} 
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke="#E5E7EB" />
        <XAxis 
          dataKey='name' 
          tick={{ fill: '#6B7280', textTransform: 'capitalize' }}
          tickLine={{ stroke: '#D1D5DB' }}
        />
        <YAxis 
          tick={{ fill: '#6B7280' }}
          tickLine={{ stroke: '#D1D5DB' }}
          label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value, entry) => (
            <span className="capitalize" style={{ color: entry.color }}>
              {entry.payload.name} Priority
            </span>
          )}
        />
        <Bar 
          dataKey='total' 
          radius={[8, 8, 0, 0]}
          maxBarSize={80}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorByPriority(entry.name)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
