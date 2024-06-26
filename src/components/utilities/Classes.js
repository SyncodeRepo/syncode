import React from "react";

export async function addStudentClass(studentId, classId) {
    const url = `https://ah0wbtref0.execute-api.us-west-1.amazonaws.com/default/students/${studentId}/classes?class_id=${classId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_API_KEY
            },
            body: JSON.stringify({ class_id: classId })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to add student to class:', error);
        throw error;
    }
}
