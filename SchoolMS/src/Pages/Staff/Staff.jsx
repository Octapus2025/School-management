import React, { useState,useEffect } from "react";
import axios from "axios";
import '../Styles.css';

const Staff =()=>{
    const [staffs,setStaffs] = useState([]);
    const [editID,setEditID] = useState(null); // ID of thr teachers 
    const [editData,setEditData] =  useState({
        teacher_name:'',
        email:'',
        contactnumber:'',
        dob:'',
        gender:'',
        city:'',
        subject:'',
        educationqualification:'',
        university:'',
        description:'',
        nic:'',
        joindate:'',
        image:'',
    })//Editabel teachers data
    const [deleteID,setDeleteID] = useState(null);

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
    },[]);

    //Hnadle Edit button Click
    const handleEdit = (staffs)=>{
        setEditID(staffs.id);//Set the current staffs ID
        setEditData(staffs);// Populate editdata with current staff info
    };

    //Handle form input change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    //Handle Update 
    const handleUpdate = () => {
        console.table("Updating staff with ID:",editID);
        console.table("Data being sent:",editData);

        axios.put(`http://localhost:3000/auth/edit_staff/${editID}`, editData)
            .then(response => {
                if (response.data.Status) {
                    // Update staff list with the edited data
                    console.log("Updating successful:",response.data);
                    setStaffs(staffs.map(item => 
                        item.id === editID ? { ...item, ...editData } : item
                    ));
                    setEditID(null); // Exit edit mode
                } else {
                    console.error("Error from server",response.data.Error); // Log errors from the server
                }
            })
            .catch(error => {
                console.error("Error updating staff data:",error);
            });
    };

    //Handle delete
    const handleDelete = () =>{
        axios.delete(`http://localhost:3000/auth/delete_staff/${deleteID}`)
            .then(response =>{
                if (response.data.Status){
                    //Delete students
                    setStaffs(staffs.filter(item => item.id !== deleteID));
                    setDeleteID(null);//Exit edit mode
                } else{
                    console.error(response.data.Error); //Handle Errors
                }
                
            })
            .catch(error => console.error(error));
    }
    

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
                                            <button className="btn btn-info btn-sm" onClick={() => handleEdit(e)}>Edit</button>
                                            <button className="btn btn-warning btn-sm" onClick={() => setDeleteID(e.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {editID && (
                    <div className="edit-form">
                        <h4>Edit Staff</h4>
                        <input type="text" name="teacher_name" value={editData.teacher_name} onChange={handleChange} placeholder="Teacher Name" />
                        <input type="email" name="email" value={editData.email} onChange={handleChange} placeholder="Email" />
                        <input type="text" name="contactnumber" value={editData.contactnumber} onChange={handleChange} placeholder="Contact Number" />
                        <input type="text" name="dob" value={editData.dob} onChange={handleChange} placeholder="Date of Birth" />
                        <input type="text" name="gender" value={editData.gender} onChange={handleChange} placeholder="Gender" />
                        <input type="text" name="city" value={editData.city} onChange={handleChange} placeholder="City" />
                        <input type="text" name="subject" value={editData.subject} onChange={handleChange} placeholder="Subject" />
                        <input type="text" name="educationqualification" value={editData.educationqualification} onChange={handleChange} placeholder="Education Qualification" />
                        <input type="text" name="university" value={editData.university} onChange={handleChange} placeholder="University" />
                        <input type="text" name="description" value={editData.description} onChange={handleChange} placeholder="Description" />
                        <input type="text" name="nic" value={editData.nic} onChange={handleChange} placeholder="NIC" />
                        <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                        <button className="btn btn-secondary" onClick={() => setEditID(null)}>Cancel</button>
                    </div>
                )}
            </div>
            <div>
                {deleteID &&(
                    <div className="delete-form">
                        <h4>Are you sure you want to delete this student?</h4>
            <button className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
            <button className="btn btn-secondary" onClick={() => setDeleteID(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Staff