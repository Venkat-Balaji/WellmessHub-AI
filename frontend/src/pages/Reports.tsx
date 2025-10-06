import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Report {
  id: number;
  title: string;
  date: string;
}

const Reports: React.FC = () => {
  const { accent } = useTheme();
  const [reports, setReports] = useState<Report[]>([
    { id: 1, title: "Client Progress Summary", date: "2025-10-01" },
    { id: 2, title: "Monthly Wellness Overview", date: "2025-09-28" },
  ]);
  const [newTitle, setNewTitle] = useState("");

  const addReport = () => {
    if (!newTitle.trim()) return;
    setReports([
      ...reports,
      { id: Date.now(), title: newTitle, date: new Date().toISOString().split("T")[0] },
    ]);
    setNewTitle("");
  };

  const deleteReport = (id: number) =>
    setReports(reports.filter((r) => r.id !== id));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Reports</h1>

      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Enter report title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-accent outline-none"
        />
        <button
          onClick={addReport}
          className="flex items-center bg-accent text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {reports.map((r) => (
          <div
            key={r.id}
            className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow border border-gray-100 dark:border-gray-700"
          >
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">{r.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{r.date}</p>
            </div>
            <button
              onClick={() => deleteReport(r.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
