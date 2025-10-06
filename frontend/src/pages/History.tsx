import React from "react";

const History: React.FC = () => {
  const logs = [
    { id: 1, action: "User John created a report", date: "2025-10-04 09:42" },
    { id: 2, action: "System backup completed", date: "2025-10-05 22:15" },
    { id: 3, action: "Appointment added for Alice", date: "2025-10-06 11:00" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">History</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0"
          >
            <p className="text-gray-700 dark:text-gray-200">{log.action}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{log.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
