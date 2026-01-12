
//node.js file for API to show gpa

const express = require('express');

const app = express();

// Mock student data
const students = [
    { id: 'E001', name: 'John Doe', department: 'Computer Engineering', gpa: 3.8 },
    { id: 'E002', name: 'Jane Smith', department: 'Civil Engineering', gpa: 3.6 },
    { id: 'E003', name: 'Mike Johnson', department: 'Mechanical Engineering', gpa: 3.9 },
    { id: 'E004', name: 'Sarah Williams', department: 'Electrical Engineering', gpa: 3.7 },
    { id: 'E005', name: 'Tom Brown', department: 'Computer Engineering', gpa: 3.5 },
    { id: 'E006', name: 'Emily Davis', department: 'Civil Engineering', gpa: 3.85 },
];

app.use(express.json());

// API 1: Get all students with GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa,
        });
        return acc;
    }, {});

    res.json({
        faculty: 'Faculty of Engineering',
        data: groupedByDept,
    });
});

// API 2: Get individual student GPA by student ID
app.get('/api/students/:studentId/gpa', (req, res) => {
    const student = students.find((s) => s.id === req.params.studentId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});