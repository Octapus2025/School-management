import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentForm = ({ openPopup }) => {
    if (!openPopup) return null;

    const [students, setStudents] = useState([]);
    const { SN } = useParams(); // Use params to get the class identifier

    useEffect(() => {
        const fetchStudentsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/student?Class=${SN}`);
                if (response.data.Status) {
                    setStudents(response.data.Result);
                } else {
                    console.error(response.data.Error);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudentsDetails();
    }, [SN]);  // Add SN as a dependency

    return (
        <div className="popup">
            <div className="popup-inner">
                <h3>Students Details</h3>
                <div className="mt-3">
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
                            {
                                students.map((s, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{s.AdmissionNo}</td>
                                        <td>{s.Name}</td>
                                        <td>{s.Class}</td>
                                        <td>{s.Gender}</td>
                                        <td>{s.City}</td>
                                        <td><img src={`/Public/Image/${s.image}`} alt="student" style={{width: '50px'}}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
