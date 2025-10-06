import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Temporary mock login for now
    setTimeout(() => {
      if (email === "admin@demo.com" && password === "123456") {
        alert("✅ Login Successful!");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-teal-900">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">WellnessHub</h1>
          <p className="text-gray-300 mt-2 text-sm">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-300 mt-5 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-teal-300 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
