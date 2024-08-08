import React, { useState } from "react";
import { TabContext,TabList, TabPanel } from "@mui/lab";
import {Box,Tab} from '@mui/material';


const Staff =()=>{
    const [staff,setStaff] = useState({
        id:"",
        Name:"",
        Age:"",
        DOB:"",
        Gender:"",
        City:"",
        Subject:""
    });
    const [value,setValue] = useState('1');


    return (
        <div className="px-5 mt-3">
            <div className="justify-content-center flex-column">
                <TabContext value={value}>
                    <Box sx={{width:'100%'}}>
                        <TabList aria-label="tabs example">
                            <Tab label="All Teachers" value="1"/>
                            <Tab label="Add Teachers" value="2"/>

                        </TabList>
                        <TabPanel value="1">
                                
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="d-flex justify-content-center">
                                <div className='p-1 rounded w-100 border full-width' style={{width:'500px'}}>
                                <h2>Add Teacher</h2>
                                <form action="row full-width">
                                    <div className="col-12">
                                        <label htmlFor="inputID" className="form-label">ID</label>
                                        <input type="text" id="inputID" placeholder="Enter ID" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" id="inputName" placeholder="Enter Name" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAge" className="form-label">Age</label>
                                        <input type="text" id="inputAge" placeholder="Enter Age" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputDOB" className="form-label">Date of Birth</label>
                                        <input type="text" id="inputDOB" placeholder="Enter DOB" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputGender" className="form-label">Gender</label>
                                        <input type="text" id="inputGender" placeholder="Enter Gender" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputCity" className="form-label">City</label>
                                        <input type="text" id="inputCity" placeholder="Enter City" className='form-control rounded-0' />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputSubject" className="form-label">Subject</label>
                                        <input type="text" id="inputSubject" placeholder="Enter Subject" className='form-control rounded-0' />
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
                        </TabPanel>
                    </Box>
                </TabContext>
            </div>
        </div>
    )
}

export default Staff