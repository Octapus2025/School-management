import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles.css';

const Student = () => {
  const [students, setStudents] = useState([]); // list of students
  const [editSN,setEditSN] = useState(null); // SN of the student being edited
  const [editData,setEditData] = useState({
    AdmissionNo:'',
    Name:'',
    ParentsName:'',
    ParentsContactNumber:'',
    HomeAddress:'',
    Class:'',
    Gender:'',
    city:'',
    image:'',
  }); // Editable student data
  const [deleteSN,setDeleteSN] = useState(null);// SN of the student being deleted
  



  useEffect(() => {
    // Fetch all students
    axios.get('http://localhost:3000/auth/student')
      .then(result => {
        if (result.data.Status) {
          setStudents(result.data.Result); // Assuming result contains the list of students
        } else {
          console.error(result.data.Error); // Handle Errors
        }
      })
      .catch(err => console.log(err));
  }, []);


  //Handle Edit button Click
  const handleEdit = (student)=>{
    setEditSN(student.SN);//Set the current student ID
    setEditData(student); // Populate editData with current student info
  };

  //Handle form input change
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setEditData((prev) => ({...prev,[name]: value}));
  };


  // Handle update submission
  const handleUpdate = ()=> {
    axios.put(`http://localhost:3000/auth/edit_student/${editSN}`,editData)
      .then (response => {
        if (response.data.Status){
            // Update students 
            setStudents(students.map(item => item.SN === editSN ? {...item, ...editData} : item));
            setEditSN(null); // Exit edit mode
        } else {
          console.error(response.data.Error); //Handle Errors
        }   
      })
      .catch(error => console.error(error));
  };

  //Handle Delete 
    const handleDelete = ()=>{
      axios.delete(`http://localhost:3000/auth/delete_student/${deleteSN}`)
        .then(response => {
          if (response.data.Status){
            //Delete students
            setStudents(students.filter(item => item.SN !== deleteSN ));
            setDeleteSN(null);// Exit edit mode
          } else{
            console.error(response.data.Error); // Handle Errors
          }
        })
        .catch(error => console.error(error));
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
                <th>Parents Name</th>
                <th>Parents ContactNumber</th>
                <th>Home Address</th>
                <th>Class</th>
                <th>Gender</th>
                <th>State</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map((s) => (
                  <tr key={s.SN}>
                    <td>{s.SN}</td>
                    <td>{s.AdmissionNo}</td>
                    <td>{s.Name}</td>
                    <td>{s.ParentsName}</td>
                    <td>{s.ParentsContactNumber}</td>
                    <td>{s.HomeAddress}</td>
                    <td>{s.Class}</td>
                    <td>{s.Gender}</td>
                    <td>{s.city}</td>
                    <td><img src={`http://localhost:3000/Images/${s.image}`} className="student_image" /></td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="btn btn-warning btn-sm" onClick={() => setDeleteSN(s.SN)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {editSN &&(
          <div className="edit-form">
            <h4>Edit Student</h4>
            <input name="AdmissonNo" value={editData.AdmissionNo} onChange={handleChange}  placeholder="Admisson No"/>
            <input name="Name" value={editData.Name} onChange={handleChange} placeholder="Name"/>
            <input name="ParentsName" value={editData.ParentsName} onChange={handleChange} placeholder="ParentsName"/>
            <input name="ParentsContactNumber" value={editData.ParentsContactNumber} onChange={handleChange} placeholder="ParentsContactNumber"/>
            <input name="HomeAddress" value={editData.HomeAddress} onChange={handleChange} placeholder="Home Address"/>
            <input name="Class" value={editData.Class} onChange={handleChange} placeholder="Class"/>
            <input name="Gender" value={editData.Gender} onChange={handleChange} placeholder="Gender"/>
            <input name="city" value={editData.city} onChange={handleChange} placeholder="city"/>
            <input name="image" value={editData.image} onChange={handleChange} placeholder="image"/>
            <button className="btn btn-success" onClick={handleUpdate}>Update</button>
            <button className="btn btn-secondary" onClick={() => setEditID(null)}>Cancel</button>
          </div>
        )}
      </div>
      <div>
      {deleteSN &&(
        <div className="delete-form">
          <h4>Delete Student</h4>
            <h4>Are you sure you want to delete this student?</h4>
            <button className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
            <button className="btn btn-secondary" onClick={() => setDeleteSN(null)}>Cancel</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Student;
