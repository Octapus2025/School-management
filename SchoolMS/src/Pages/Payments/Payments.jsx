import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import { FaEllipsisV } from "react-icons/fa";
import '../Styles.css';
import Popup from '../Popup';

const TERM_FEE = 100; // Fee for each term

const Class = () => {
    const [value, setValue] = useState(0); // State to manage active tab
    const [students, setStudents] = useState({}); // State to store students for each grade
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [dropdownVisible, setDropDownVisible] = useState(null);

    const Classes = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    const toggleDropdown = (i) => {
        setDropDownVisible(dropdownVisible === i ? null : i);
    };

    // Function to fetch students based on the grade
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/auth/student_class?Class=${Classes[value]}`);
                if (response.data.Status) {
                    setStudents(prevStudents => ({
                        ...prevStudents,
                        [Classes[value]]: response.data.Result.map(student=>({
                            ...student,
                            isPaid1stTerm:false,
                            isPaid2ndTerm: false,
                            isPaid3rdTerm: false
                        }))
                    }));
                } else {
                    console.error(response.data.Error);
                }
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };

        
    }, [value]);

    const handlePayment = (student, term )=>{
        setStudents(prevStudents => ({
            ...prevStudents,
            [Classes[value]]: prevStudents[Classes[value]].map(s=>
                s.AdmissionNo === student.AdmissionNo ? 
                {...s,[`isPaid${term}Term`]: true}:
                s
            )
        }));
    }

    // Function to handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue); // Update tab index on change
    };

    // Function to open popup with selected student data
    const handleViewClick = (student) => {
        setSelectedStudent(student);
        setOpenPopup(true);
    };

    //Handle payments update 
    const handlePaymentUpdate = async(student_admission_no,term)=>{
        try{
            const response = await axios.get(`http://localhost:3000/payments/update`,{
                student_admission_no,
                term
            });
            if(response.data.success){
                //Refresh students payment data to reflect updated status
                setStudents();
            }
        }catch (error){
            console.error('Error updating payment:',error)
        }
    };

    return (
        <div className='px-5 mt-3'>
            <div className="mt-4">
                <Tabs value={value} onChange={handleChange}>
                    {Classes.map((grade, index) => (
                        <Tab key={index} label={grade} />
                    ))}
                </Tabs>
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
                                                        <th>Student Name</th>
                                                        <th>Class</th>
                                                        <th>Admission No</th>
                                                        <th>More</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {students[grade].map((student,i) =>{                                    
                                                            const feeDue = TERM_FEE * 3
                                                                -(student.isPaid1stTerm ? TERM_FEE:0)
                                                                -(student.isPaid2ndTerm ? TERM_FEE : 0)
                                                                -(student.isPaid3rdTerm ? TERM_FEE : 0);

                                                            return (
                                                                <tr key={student.AdmissionNo || i}>
                                                                    <td>{student.Name}</td>
                                                                    <td>{student.AdmissionNo}</td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() => handlePaymentUpdate(student.AdmissionNo,'1st')}           
                                                                            className={student.paymentStatus.term1? 'btn-green' : 'btn-red'}
                                                                        >
                                                                            1st Term
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handlePaymentUpdate(student.AdmissionNo,'2nd')}
                                                                            className={student.paymentStatus.term2? 'btn-green' : 'btn-red'}
                                                                        >
                                                                            2nd Term
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handlePaymentUpdate(student.AdmissionNo,'3rd')}
                                                                            className={student.paymentStatus.term3? 'btn-green' : 'btn-red'}
                                                                        >
                                                                            3rd Term
                                                                        </button>
                                                                    </td>
                                                                    <td>${feeDue}</td>

                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No student found for {grade}</p>
                                )}
                            </div>
                        )
                    ))}
                </Box>
                {/** Popup component */}
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    selectedStudent={selectedStudent}
                />
            </div>
        </div>
    );
};

export default Class;
