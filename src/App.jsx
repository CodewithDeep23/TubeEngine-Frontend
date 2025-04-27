import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <h1 className="text-4xl font-bold text-white bg-red-300">
        Hello, Tailwind + Vite + React 🚀
      </h1>
    </div>
  );
}

export default App;
