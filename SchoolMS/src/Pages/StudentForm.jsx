import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentForm = ({ openPopup,selectedStudent }) => {
    if (!openPopup ||!selectedStudent) return null;

    const [studentDetails, setStudentDetails] = useState([]);

    useEffect(() => {
        const fetchStudentsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/student?AdmissionNo=${selectedStudent}`);
                if (response.data.Status) {
                    setStudentDetails(response.data.Result);
                } else {
                    console.error(response.data.Error);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudentsDetails();
    }, [selectedStudent]);  

    return (
        <div className="popup">
            <div className="popup-inner">
                <h3>Student Details</h3>
                {studentDetails ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Admission No</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{studentDetails.AdmissionNo}</td>
                                <td>{studentDetails.Name}</td>
                                <td>{studentDetails.Class}</td>
                                <td>{studentDetails.Gender}</td>
                                <td>{studentDetails.City}</td>
                                <td>
                                    <img src={`/Public/Image/${studentDetails.image}`} style={{ width: '50px' }} alt="Student" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading student details...</p>
                )}
            </div>
        </div>
    );
};

export default StudentForm;
