import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", clients: 30 },
  { name: "Feb", clients: 45 },
  { name: "Mar", clients: 60 },
  { name: "Apr", clients: 80 },
  { name: "May", clients: 100 },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ clients: 0, reports: 0, programs: 0 });

  useEffect(() => {
    setTimeout(() => {
      setStats({ clients: 128, reports: 56, programs: 14 });
    }, 500);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Clients", value: stats.clients },
          { label: "Reports", value: stats.reports },
          { label: "Programs", value: stats.programs },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow border-t-4 border-accent"
          >
            <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
            <h2 className="text-2xl font-semibold text-accent">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Monthly Growth
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-600" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="clients"
              stroke="var(--accent-color)"
              fill="var(--accent-color)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
