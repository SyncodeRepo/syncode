import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../../context/AuthContext'; // Adjust the import path according to your project structure

function HomePage() {
    const auth = useContext(AuthContext); // Access the authentication context
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (auth.user && auth.user.id) {
            fetch(`https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/students/${auth.user.id}/classes`)
                .then(response => response.json())
                .then(data => {
                    setClasses(data);
                })
                .catch(error => {
                    console.error('Failed to fetch classes:', error);
                });
        }
    }, [auth.user]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the starting point of our application.</p>
            {/* Display the user's name and role if available */}
            {auth.user && (
                <div>
                    <p>Name: {auth.user.first_name} {auth.user.last_name}</p>
                    <p>Role: {auth.user.role}</p>
                </div>
            )}
            {/* Display classes information */}
            {classes.map((classInfo) => (
                <div key={classInfo.class_id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{classInfo.class_name}</h2>
                        <p>Subject: {classInfo.subject_name}</p>
                        <p>Teacher ID: {classInfo.teacher_id}</p>
                        <p>Description: {classInfo.class_description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">More Info</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
