import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNotice = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]); // Initialize as an array
    const [noticeText, setNoticeText] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [studentName, setStudentName] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]); // Initialize as an array

    // Fetch student data on component mount
    useEffect(() => {
        axios.get('http://localhost:3000/auth/student_admissionno')
            .then(result => {
                if (result.data.Status) {
                    setStudents(result.data.Result || []); // Ensure students is an array
                } else {
                    console.error(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Filter students based on searchTerm
    useEffect(() => {
        if (searchTerm) {
            const results = students.filter(student =>
                student.AdmissionNo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStudents(results);
        } else {
            setFilteredStudents([]); // Clear results when search term is empty
        }
    }, [searchTerm, students]);

    // Handle notice submission
    const handleNoticeSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/add_notice', {
                AdmissionNo: selectedStudent,
                NoticeText: noticeText
            });
            if (response.data.Status) {
                alert('Notice added successfully');
                setNoticeText(''); // Clear notice text after submission
                setSelectedStudent(''); // Clear selected student
                setStudentName(''); // Clear displayed student name
            } else {
                console.error(response.data.Error);
            }
        } catch (err) {
            console.error("Error adding notice:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Add Notice</h3>
            
            {/* Search Bar */}
            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Admission No"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display filtered results */}
            <div className="list-group">
                {filteredStudents.map(student => (
                    <button
                        key={student.AdmissionNo} // Unique key for each student
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                            setSelectedStudent(student.AdmissionNo);
                            setStudentName(student.name);
                        }}
                    >
                        {student.AdmissionNo} - {student.name}
                    </button>
                ))}
            </div>

            {/* Message when no results are found */}
            {searchTerm && filteredStudents.length === 0 && (
                <div className="alert alert-warning mt-3">No matching results found</div>
            )}

            {/* Display selected student's name */}
            {studentName && (
                <div className="form-group mb-3">
                    <label>Student Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={studentName}
                        readOnly
                    />
                </div>
            )}

            {/* Notice text input */}
            <div className="form-group mb-3">
                <label>Notice Text</label>
                <textarea
                    className="form-control"
                    value={noticeText}
                    onChange={e => setNoticeText(e.target.value)}
                    placeholder="Enter notice text"
                />
            </div>

            {/* Submit Button */}
            <button
                className="btn btn-primary"
                onClick={handleNoticeSubmit}
                disabled={!selectedStudent || !noticeText} // Disable button if no student or notice
            >
                Add Notice
            </button>
        </div>
    );
};

export default AddNotice;
