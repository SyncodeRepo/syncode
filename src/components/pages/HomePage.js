import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the import path according to your project structure
import { addStudentClass } from '../utilities/Classes'; // Import the addStudentClass function

function HomePage() {
    const auth = useContext(AuthContext); // Access the authentication context
    const [classes, setClasses] = useState([]);
    const [inputClassId, setInputClassId] = useState('');

    useEffect(() => {
        if (auth.user && auth.user.id) {
            fetchClasses();
        }
    }, [auth.user]);

    const fetchClasses = () => {
        console.log('User role:', auth.user.role);
        fetch(`https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/${auth.user.role}/${auth.user.id}/classes`)
            .then(response => response.json())
            .then(data => {
                setClasses(data);
            })
            .catch(error => {
                console.error('Failed to fetch classes:', error);
            });
    };

    const handleAddClass = (classId) => {
        addStudentClass(auth.user.id, classId)
            .then(() => {
                fetchClasses(); // Call fetchClasses to refresh the list
            })
            .catch(error => {
                fetchClasses(); // Call fetchClasses to refresh the list
                console.error('Error adding class:', error);
            });
    };

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
            {!classes.length ? (
                <p>You are not in any classes.</p>
            ) : (
                classes.map((classInfo) => (
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
                ))
            )}
            {/* Add class button outside the classes loop */}
            <input 
                type="text" 
                placeholder="Enter Class ID" 
                value={inputClassId}
                onChange={(e) => setInputClassId(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={() => handleAddClass(inputClassId)}>Add Class</button>
        </div>
    );
}

export default HomePage;
