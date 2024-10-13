import React from "react";

const StudentDetails =({gradeClass,students =[] })=>{
    return (
        <ul>
            {students.map((student,index)=>(
                <li key={index}>
                    {student.Name} - {student.Class}
                </li>
            ))}
        </ul>
    );
};

export default StudentDetails;