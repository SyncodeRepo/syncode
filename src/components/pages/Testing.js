import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    fetch('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/users/2', {
      method: 'GET',
      headers: {
        'x-api-key': 'y3Q7tGibFI9h9PaQ6O9ZA2NJRLSN37hH1mY92p8W'
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