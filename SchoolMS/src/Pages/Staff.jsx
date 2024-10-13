import React, { useState,useEffect } from "react";
import axios from "axios";
import './Styles.css';

const Staff =()=>{
    const [staffs,setStaffs] = useState([]);

    useEffect(()=>{
        // fetch all staffs
        axios.get('http://localhost:3000/auth/staff')
        .then( result =>{
            if(result.data.Status){
                setStaffs(result.data.Result);
            } else{
                console.log(result.data.Error);
            }
        })
        .catch(err => console.log(err))
    })
    return (
        <div className="px-5 mt-3">
            <div className="justify-content flex-column">
                <h3>All Staff</h3>
                <div className="mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Teacher Name</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Dirth Of Birth</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Subject</th>
                                <th>Education Qualification</th>
                                <th>University</th>
                                <th>Description</th>
                                <th>NIC</th>
                                <th>Join Date</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                staffs.map(e =>(
                                    <tr>
                                        <td>{e.id}</td>
                                        <td>{e.teacher_name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.contactnumber}</td>
                                        <td>{e.dob}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.city}</td>
                                        <td>{e.subject}</td>
                                        <td>{e.educationqualification}</td>
                                        <td>{e.university}</td>
                                        <td>{e.description}</td>
                                        <td>{e.nic}</td>
                                        <td>{e.joindate}</td>
                                        <td><img src={'http://localhost:3000/Images/'+e.image} className="staff_image"/></td>
                                        <td>
                                            <button className="btn btn-info btn-sm">Edit</button>
                                            <button className="btn btn-warning btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Staff