import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from '../ui/Login';

function LoginPage() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 
    // useEffect(() => {
    //     axios.get('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/users', {
    //         headers: {
    //             'x-api-key': process.env.REACT_APP_API_KEY
    //         }
    //     })
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching users:', error);
    //     });
    // }, []);

    return (
        <div className="App">
            <p> It appears you haven't logged in! In order to access our services, you need to login.</p>
            <Login></Login>
        </div>
    )
}

export default LoginPage;
