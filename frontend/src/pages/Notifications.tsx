import React from "react";

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, msg: "New report submitted by John" },
    { id: 2, msg: "System update completed" },
    { id: 3, msg: "New client registered" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Notifications
      </h1>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="p-3 rounded bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-200"
          >
            {n.msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
