import React, {useState, useEffect} from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login({ onLoginSuccess }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [role, setRole] = useState(""); // Added to track the role of the user
    const [school, setSchool] = useState(""); // Added to track the school name
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.error('Login Failed:', error),
    }); 

    useEffect(
        () => {
            if (user) {
                console.log(user.access_token);
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'  
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        fetch(`https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/users/${res.data.id}`, {
                            method: 'GET',
                            headers: {
                                'x-api-key': process.env.REACT_APP_API_KEY
                            }
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data !== null) {
                                    setRegistered(true);
                                }
                                console.log(data);
                            })
                            .catch(error => console.error('Error:', error));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const register = () => {
        if (role === "student") {
            fetch('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_KEY
                },
                body: JSON.stringify({
                    ID: profile.id,
                    FirstName: profile.given_name,
                    LastName: profile.family_name,
                    Email: profile.email
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Student registered:', data);
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
        } else {
            fetch('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/teachers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_API_KEY
                },
                body: JSON.stringify({
                    id: profile.id,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    email: profile.name,
                    schoolName: school
                })
            })
            .then(console.log("rahh"))
            .then(response => response.json())
            .then(data => {
                console.log('Teacher registered:', data);
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
        }
        var roleVal;
        if (role === 'student') {
            roleVal = 1;
        } else {
            roleVal = 0;
        }
        fetch('https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY
            },
            body: JSON.stringify({
                ID: profile.id,
                FirstName: profile.given_name,
                LastName: profile.family_name,
                Email: profile.email,
                Role: roleVal
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setRegistered(true)
        navigate('/home')
    }

  return (
    <div>
        <br />
        <br />
        {profile ? navigate('/home') : (
            <button onClick={login}>Sign in with Google 🚀 </button>
        )}
        { (profile && !registered) ? (
            <div>
                <p>It looks like you don't have an account! Don't worry, we will register you. First: are you a teacher or student?</p>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Teacher</span> 
                    <input type="radio" name="role" className="radio checked:bg-red-500" onChange={() => setRole("teacher")} />
                </label>
                </div>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Student</span> 
                    <input type="radio" name="role" className="radio checked:bg-blue-500" onChange={() => setRole("student")} />
                </label>
                </div>
                {role && (
                    <div>
                        <p>Please enter the name of your {role === "teacher" ? "school" : "college"}:</p>
                        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder={`Enter your ${role === "teacher" ? "school" : "college"} name`} />
                    </div>
                )}
                <button onClick={register}>Register</button>
            </div>
        ) : null
        }
    </div>
  );
}

export default Login;