import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Program {
  id: number;
  name: string;
  duration: string;
}

const Programs: React.FC = () => {
  const { accent } = useTheme();
  const [programs, setPrograms] = useState<Program[]>([
    { id: 1, name: "Stress Relief Therapy", duration: "4 weeks" },
    { id: 2, name: "Weight Management Plan", duration: "6 weeks" },
  ]);
  const [newProgram, setNewProgram] = useState("");
  const [duration, setDuration] = useState("");

  const addProgram = () => {
    if (!newProgram.trim() || !duration.trim()) return;
    setPrograms([...programs, { id: Date.now(), name: newProgram, duration }]);
    setNewProgram("");
    setDuration("");
  };

  const deleteProgram = (id: number) =>
    setPrograms(programs.filter((p) => p.id !== id));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Programs</h1>

      <div className="flex space-x-2 mb-4">
        <input
          placeholder="Program name"
          value={newProgram}
          onChange={(e) => setNewProgram(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-40 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <button onClick={addProgram} className="bg-accent text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4 inline mr-1" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {programs.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-100 dark:border-gray-700"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{p.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{p.duration}</p>
            </div>
            <button
              onClick={() => deleteProgram(p.id)}
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

export default Programs;
