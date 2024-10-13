import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';

const Class = () => {
    const [value, setValue] = useState(0); // State to manage active tab
    const [students, setStudents] = useState({}); // State to store students for each grade

    // Function to fetch students based on the grade
    useEffect(()=>{
        const fetchStudents = async () =>{
            try{
                const response = await axios.get(`http://localhost:3000/auth/student_class?Class=${Classes[value]}`);
                if (response.data.Status){
                    setStudents(prevStudents =>({
                        ...prevStudents,
                        [Classes[value]]: response.data.Result
                    }));
                } else {
                    console.error(response.data.Error)
                }
            
            } catch {
                console.log(err);
            }
        };
        fetchStudents ();
    },[value]);

    // Function to handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue); // Update tab index on change
    };

    const Classes = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    return (
        <div className='px-5 mt-3'>
            <div className="mt-4">
                <Tabs value={value} onChange={handleChange}>
                    {Classes.map((grade, index) => (
                        <Tab key={index} label={grade} />
                    ))}
                </Tabs>
                <Box sx={{ p: 3 }}>
                    {Classes.map((grade,index)=>(
                        value === index && (
                            <div key={index}>
                                {students[grade] ? (
                                    students[grade].map((s,i)=>(
                                        <div className="px-5 mt-3">
                                            <div className="justify-content-center flex-column">
                                                <div className="mt-3">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Student Name</th>
                                                                <th>Class</th>
                                                                <th>Admission No</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                <tr key={i}>
                                                                    <td>{s.Name}</td>
                                                                    <td>{s.Class}</td>
                                                                    <td>{s.AdmissionNo}</td>
                                                                </tr>
                                                            }
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        
                                    ))
                                ) : (
                                    <p>No student found  for {grade}</p>
                                )}
                            </div>
                        )
                    ))}
                </Box>
            </div>
        </div>
    );
};

export default Class;
