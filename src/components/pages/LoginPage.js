import React, {useState} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Login from '../ui/Login';

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className="App">
            {!isLoggedIn ? <Login onLoginSuccess={setIsLoggedIn} /> : <div>Logged in</div>}
        </div>
    )
}

export default LoginPage;
