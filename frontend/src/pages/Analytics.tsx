import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 90 },
  { month: "May", value: 120 },
];

export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Analytics</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
