import React, { useState,useEffect } from "react";
import axios from "axios";
import './Styles.css';
import { Link } from "react-router-dom";


const Student = () => {
  const [students,setStudents]=useState([]);
  const [updateState,setUpdateState] = useState(-1);
  
  
  useEffect(()=>{
    // fetch all students 
    axios.get('http://localhost:3000/auth/student')
    .then(result =>{
      if(result.data.Status){
        setStudents(result.data.Result); // Assuming result contains the list of status 
      } else{
        console.error(result.data.Error); //Handle Errors
      }
    })
    .catch(err => console.log(err))
  })

  function handleSubmit(sn){
    setUpdateState(sn);
  }

  function handleUpdate(){
    // Handle teh update
    console.log("Update button clicked ");
    setUpdateState(-1);// Close the edit mode
  }
  

  return (
    <div className='px-5 mt-3'>
      <div className='justify-content-center flex-column'>
        <h3>All Students</h3>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Gender</th>
                <th>State</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map((s) =>(
                  updateState === s.sn ? <EditList
                  key={s.SN}
                  s={s} 
                  students={students} 
                  setStudents={setStudents}
                  setUpdateState={setUpdateState}/> :
                  <tr key={s.SN}>
                    <td>{s.SN}</td>
                    <td>{s.AdmissionNo}</td>
                    <td>{s.Name}</td>
                    <td>{s.Class}</td>
                    <td>{s.Gender}</td>
                    <td>{s.city}</td>
                    <td><img src={'http://localhost:3000/Images/'+s.image} className="student_image"/></td>
                    <td>
                      <button className="btn btn-info btn-sm" onClick={() =>handleSubmit(s.sn)}>Edit</button>
                      <button className="btn btn-warning btn-sm" >Delete</button>
                    </td>
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

function EditList({s,students,setStudents,setUpdateState}){
  function handleInputChange(event) {
    const { name, value } = event.target;
    // Create an updated list
    const updatedStudentlist = students.map((student) =>
      student.SN === s.SN ? { ...student, [name]: value } : student
    );
    setStudents(updatedStudentlist);
  }
  

  return (
      <tr>
        <td><input type="text"  name="S/N" value={s.SN || ''} onChange={handleInputChange}/></td>
        <td><input type="text" name="Admissionno" value={s.AdmissionNo || ''} onChange={handleInputChange}/></td>
        <td><input type="text" name="Name" value={s.Name || ''} onChange={handleInputChange}/></td>
        <td><input type="text" name="Class" value={s.Class || ''} onChange={handleInputChange}/></td>
        <td><input type="text" name="Gender" value={s.Gender || ''} onChange={handleInputChange}/></td>
        <td><input type="text" name="City" value={s.city ||''} onChange={handleInputChange}/></td>
        <td><input type="text" name="Image" value={s.image || ''} onChange={handleInputChange}/></td>
        <td>
          <button type="text" onClick={handleUpdate}>Update</button>
        </td>
      </tr>
  )
}

export default Student;
