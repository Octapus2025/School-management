import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AddStaff =()=>{
    const [staff,setStaff] = useState({
        id:"",
        teachername:"",
        email:"",
        contactnumber:"",
        dob:"",
        gender:"",
        city:"",
        subject:"",
        educationqualification:"",
        university:"",
        description:"",
        nic:"",
        joindate:"",
        image:""
    });
    const [state, setState] = useState([]);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_staff',staff)
        .then(result=>{
            console.log(result);
            if (result.data.Status){
                console.log('Teacher Added Successfully');
            } else{
                console.error(result.data.Error);
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="px-5 mt-3">
            <div className="justify-content-center flex-column">
                <div className="d-flex justify-content-center">
                    <div className='p-1 rounded w-100 border full-width' style={{width:'500px'}}>
                        <h2>Add Teacher</h2>
                        <form action="row full-width" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="inputID" className="form-label">ID</label>
                                <input type="text" id="inputID" placeholder="Enter ID" className='form-control rounded-0'
                                onChange={(e) => setStaff({...staff, id: e.target.value})}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" id="inputName" placeholder="Enter Name" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,teachername: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputEmail" className="form-label">Email</label>
                                <input type="text" id="inputEmail" placeholder="Enter Email" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,email: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputContactNumber" className="form-label">Contact Number</label>
                                <input type="text" id="inputContactNumber" placeholder="Enter Contact Number" className='form-control rounded-0'
                                onChange={(e) => setStaff({...staff,contactnumber: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputDOB" className="form-label">DOB</label>
                                <input type="text" id="inputDOB" placeholder="Enter DOB" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,dob: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputgender" className="form-label">Gender</label>
                                <input type="text" id="inputgender" placeholder="Enter Gender" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,gender: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" id="inputCity" placeholder="Enter City" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,city: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputSubject" className="form-label">Subject</label>
                                <input type="text" id="inputSubject" placeholder="Enter Subject" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,subject: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputEducation" className="form-label">Education Qualification</label>
                                <input type="text" id="inputEducation" placeholder="Enter Education Qualification" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,educationqualification: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputUniversity" className="form-label">University</label>
                                <input type="text" id="inputUniversity" placeholder="Enter University" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,university: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputdescription" className="form-label">Description</label>
                                <input type="text" id="inputdescription" placeholder="Enter Description" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,description: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputNIC" className="form-label">NIC</label>
                                <input type="text" id="inputNIC" className="form-control rounded-0" placeholder="Enter NIC"
                                onChange={(e) => setStaff({...staff,nic: e.target.value })}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputJoinDate" className="form-label">Join Date</label>
                                <input type="text" id="inputJoinDate" placeholder="Enter Subject" className='form-control rounded-0' 
                                onChange={(e) => setStaff({...staff,joindate: e.target.value })}/>
                            </div>
                            

                            <div className="col-12 mb-3">
                                <label htmlFor="inputGroupFile01" className="form-label">Select Image:</label>
                                <input type="file" id="inputGroupFile01" name="image" placeholder="Enter Image" className='form-control rounded-0' 
                                onChange={(s) => setStaff({ ...staff, image: e.target.files[0] })} />
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary btn-start">
                                    Add Student
                                </button>
                                <button type="submit" className="btn btn-delete btn-start">
                                    Delete Student
                                </button>
                                <button type="submit" className="btn btn-view btn-start">
                                    View Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Outlet />         
            </div>
        </div>
    )
}

export default AddStaff;