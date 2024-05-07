import React, {useState} from 'react';
import './App.css';
import Navbar from './components/ui/navbar';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    const requestBody = {
      name: "rah",
      members: ["juan", "gaming"]
    };
    const config = {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.get('https://korwk8plv9.execute-api.us-west-1.amazonaws.com/default', requestBody, config);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <Navbar />
      <p>
        Hello from Krish Katariya!
        <button onClick={fetchData}>Fetch Data</button>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </p>
    </div>
  );
}

export default App;
