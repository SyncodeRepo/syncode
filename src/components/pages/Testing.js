import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    fetch('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/students/113993668318831450519/classes', {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
        <p>Hi!</p>
    </div>
  );
}

export default App;