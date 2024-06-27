import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ClassPage() {
    const { classId } = useParams(); // Get the classId from the URL
    const [classInfo, setClassInfo] = useState(null);

    useEffect(() => {
        fetch(`https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/classes/${classId}`)
            .then(response => response.json())
            .then(data => {
                setClassInfo(data);
            })
            .catch(error => {
                console.error('Failed to fetch class info:', error);
            });
    }, [classId]);

    if (!classInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{classInfo.class_name}</h1>
            <p>Subject: {classInfo.SubjectName}</p>
            <p>Teacher ID: {classInfo.TeacherID}</p>
            <p>Description: {classInfo.ClassDescription}</p>
            {/* Add more class details as needed */}
        </div>
    );
}

export default ClassPage;
