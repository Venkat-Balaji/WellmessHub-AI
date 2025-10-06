import React, { useState } from "react";
import { CalendarPlus, Trash2 } from "lucide-react";

interface Appointment {
  id: number;
  client: string;
  date: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, client: "John Doe", date: "2025-10-10", status: "Upcoming" },
  ]);
  const [newClient, setNewClient] = useState("");
  const [newDate, setNewDate] = useState("");

  const addAppointment = () => {
    if (!newClient || !newDate) return;
    setAppointments([
      ...appointments,
      { id: Date.now(), client: newClient, date: newDate, status: "Upcoming" },
    ]);
    setNewClient("");
    setNewDate("");
  };

  const deleteAppointment = (id: number) =>
    setAppointments(appointments.filter((a) => a.id !== id));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Appointments</h1>

      <div className="flex space-x-2 mb-4">
        <input
          placeholder="Client name"
          value={newClient}
          onChange={(e) => setNewClient(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <button onClick={addAppointment} className="bg-accent text-white px-4 py-2 rounded-lg">
          <CalendarPlus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="flex justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-100 dark:border-gray-700"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{a.client}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{a.date} • {a.status}</p>
            </div>
            <button
              onClick={() => deleteAppointment(a.id)}
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

export default Appointments;
