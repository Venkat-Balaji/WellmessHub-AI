import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Client {
  id: number;
  name: string;
  email: string;
}

const Clients: React.FC = () => {
  const { accent } = useTheme();
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const addClient = () => {
    if (!newName || !newEmail) return;
    setClients([...clients, { id: Date.now(), name: newName, email: newEmail }]);
    setNewName("");
    setNewEmail("");
  };

  const deleteClient = (id: number) =>
    setClients(clients.filter((c) => c.id !== id));

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Clients
      </h1>

      {/* Add Client Form */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <button
          onClick={addClient}
          className="bg-[var(--accent-color)] text-white px-5 py-2 rounded-lg transition-all hover:opacity-85"
        >
          <Plus className="w-4 h-4 inline mr-2" /> Add
        </button>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-all"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {client.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{client.email}</p>
            </div>
            <button
              onClick={() => deleteClient(client.id)}
              className="text-red-500 hover:text-red-600 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
