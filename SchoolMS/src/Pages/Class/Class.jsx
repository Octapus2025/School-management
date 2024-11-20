import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Dialog, DialogContent, DialogTitle, Avatar } from '@mui/material';
import axios from 'axios';
import { FaEllipsisV } from "react-icons/fa";
import '../Styles.css';

const Class = () => {
    const [value, setValue] = useState(0); // State to manage active tab
    const [students, setStudents] = useState({}); // State to store students for each grade
    const [openPopup, setOpenPopup] = useState(false); // State for popup
    const [selectedStudent, setSelectedStudent] = useState(null); // Current student in the popup
    const [dropdownVisible, setDropdownVisible] = useState(null); // Visible dropdown index
    const Classes = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    const toggleDropdown = (i) => {
        setDropdownVisible(dropdownVisible === i ? null : i);
    };

    // Fetch students based on the selected grade
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/student_class?Class=${Classes[value]}`);
                if (response.data.Status) {
                    setStudents(prevStudents => ({
                        ...prevStudents,
                        [Classes[value]]: response.data.Result
                    }));
                } else {
                    console.error(response.data.Error);
                }
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };
        fetchStudents();
    }, [value]);

    // Handle tab changes
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Open the popup
    const handleViewStudent = (student) => {
        setSelectedStudent(student);
        setOpenPopup(true);
    };

    // Close the popup
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    return (
        <div className="px-5 mt-3">
            <div className="mt-4">
                {/* Tabs for Grades */}
                <Tabs value={value} onChange={handleChange}>
                    {Classes.map((grade, index) => (
                        <Tab key={index} label={grade} />
                    ))}
                </Tabs>

                {/* Tab Content */}
                <Box sx={{ p: 3 }}>
                    {Classes.map((grade, index) => (
                        value === index && (
                            <div key={index}>
                                {students[grade] ? (
                                    <div className="justify-content-center flex-column">
                                        <div className="mt-3">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>Student Name</th>
                                                        <th>Class</th>
                                                        <th>Admission No</th>
                                                        <th>More</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {students[grade].map((student, i) => (
                                                        <tr key={student.AdmissionNo || i}>
                                                            <td>
                                                                <Avatar>{student.Name[0]}</Avatar>
                                                            </td>
                                                            <td>{student.Name}</td>
                                                            <td>{student.Class}</td>
                                                            <td>{student.AdmissionNo}</td>
                                                            
                                                            <td>
                                                                <button onClick={() => toggleDropdown(i)}>
                                                                    <FaEllipsisV />
                                                                </button>
                                                                {dropdownVisible === i && (
                                                                    <div className="dropdown">
                                                                        <ul>
                                                                            <li><button>Edit</button></li>
                                                                            <li><button>Delete</button></li>
                                                                            <li>
                                                                                <button onClick={() => handleViewStudent(student)}>View</button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </div>
                        )
                    ))}
                </Box>

                {/* Student Details Popup */}
                <Dialog 
                    open={openPopup} 
                    onClose={handleClosePopup} 
                    maxWidth="sm" 
                    fullWidth 
                    PaperProps={{
                        style:{borderRadius:12,padding:'20px'}
                    }}
                >
                    <DialogTitle sx={{textAlign:'center',fontWeight:'bold',fontSize:'1.5rem',color:'#3f51b5'}} >
                        Student Details
                    </DialogTitle>
                    <DialogContent>
                        {selectedStudent && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '10px' }}>
                                <Box
                                    sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginBottom:'20px'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor:'#3f51b5',
                                            width:80,
                                            height:80,
                                            fontSize:'2rem'
                                        }}
                                    >
                                        

                                    </Avatar>

                                </Box>
                                <Box>
                                    <p><strong>Name:</strong> {selectedStudent.Name}</p>
                                    <p><strong>Class:</strong> {selectedStudent.Class}</p>
                                    <p><strong>Admission No:</strong> {selectedStudent.AdmissionNo}</p>
                                    <p><strong>Parents Name:</strong>{selectedStudent.ParentsName}</p>
                                    <p><strong>Parents ContactNumber:</strong>{selectedStudent.ParentsContactNumber}</p>
                                    <p><strong>Home Address:</strong>{selectedStudent.HomeAddress}</p>
                                    <p><strong>Gender:</strong>{selectedStudent.Gender}</p>
                                    <p><strong>City:</strong>{selectedStudent.city}</p>
                                </Box>

                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Class;
