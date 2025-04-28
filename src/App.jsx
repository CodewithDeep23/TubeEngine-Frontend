import { useEffect, useState } from "react";
import "./index.css";
import axios from './helpers/axiosClient.js'

function App() {
  useEffect(() => {
    const checkout = async () => {
      try {
        const res = await axios.get('/healthcheck');
        console.log("hello")
        console.log('Backend connected ✅', res.data);
        alert('Backend Connected ✅');
      } catch (error) {
        console.log('Backend connection failed ❌', error.message);
        alert('Backend Not Connected ❌');
      }
    }
    checkout();
  }, []);

  return (
    <div className="App">
      <h1>My React App</h1>
    </div>
  );
}

export default App;
