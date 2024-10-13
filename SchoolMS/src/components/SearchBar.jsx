import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { json } from "react-router-dom";
import Student from "../Pages/Student";


export const SearchBar = ()=>{

    const [input,setInput]=useState("");
    const [students,setStudents]= useState([]);

    const fetchData = (value)=>{
        fetch("http://localhost:3000/auth/add_student")
        .then((response)=>response.json())
        .then((json)=>{
            if (Array.isArray(json)){
                const results = json.filter((student)=>{
                    return student.Class.toLowerCase().includes(value.toLowerCase());
                });
                setStudents(results);
            } else{
                console.error("Received data is not an array.");
            }
        })
        .catch((error)=>{
            console.error("Error fetching data:". error);
        });
    };

    const handleChange =(value)=>{
        setInput(value);
        fetchData(value)
    }
    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input type="text" 
                placeholder="Type to Search..." 
                value={input}
                onChange={(e)=> handleChange(e.target.value)}
            />
            {students.lenght > 0 &&(
                <ul>
                    {students.map((student,index)=>{
                        <li key={index}>{student.Name}-Class:{student.Class}</li>
                    })}
                </ul>
            )}
        </div>
    )
}