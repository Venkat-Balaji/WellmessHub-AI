import React, { useState } from "react";
import { Send } from "lucide-react";

interface Post {
  id: number;
  user: string;
  message: string;
}

const Forums: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: "Alice", message: "How to manage stress effectively?" },
    { id: 2, user: "Bob", message: "Best post-workout meal ideas?" },
  ]);
  const [msg, setMsg] = useState("");

  const sendPost = () => {
    if (!msg.trim()) return;
    setPosts([...posts, { id: Date.now(), user: "You", message: msg }]);
    setMsg("");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Forums</h1>

      <div className="space-y-3 mb-6">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-100 dark:border-gray-700"
          >
            <p className="font-semibold text-accent">{p.user}</p>
            <p className="text-gray-700 dark:text-gray-200">{p.message}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          placeholder="Write a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2"
        />
        <button onClick={sendPost} className="bg-accent text-white px-4 py-2 rounded-lg">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Forums;
