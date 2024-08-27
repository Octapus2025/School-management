import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import axios from "axios";

const Student = () => {
  const [student, setStudent] = useState({
    SN: "",
    AdmissionNo: "",  // Corrected field name
    Name: "",
    class: "",
    gender: "",
    state: "",
    image: "",
  });
  const [state, setState] = useState([]);
  const [value, setValue] = useState('1');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/state')
      .then(result => {
        if (result.data.Status) {
          setState(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (s) => {
    s.preventDefault();
    axios.post('http://localhost:3000/auth/add_student', student)
      .then(result => {
        console.log(result);  // Log the entire response object
        if (result.data.Status) {
          console.log('Student added successfully');
        } else {
          console.error(result.data.Error);  // Display the exact error message
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className='px-5 mt-3'>
      <div className='justify-content-center flex-column'>
        <TabContext value={value}>
          <Box sx={{ width: '100%' }}>
            <TabList onChange={handleChange} aria-label="tabs example">
              <Tab label="All Students" value="1" />
              <Tab label="Add Students" value="2" />
              <Tab label="Upload Students" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* Content for All Students */}
          </TabPanel>
          <TabPanel value="2">
            <div className='d-flex justify-content-center'>
              <div className='p-1 rounded w-100 border full-width' style={{ width: '500px' }}>
                <h2>Add Student</h2>
                <form className="row full-width" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="inputSN" className="form-label">S/N:</label>
                    <input type="text" id="inputSN" placeholder="Enter S/N" className='form-control rounded-0'
                      onChange={(s) => setStudent({ ...student, sn: s.target.value })} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAdmissionNo" className="form-label">Admission No:</label>
                    <input type="text" id="inputAdmissionNo" placeholder="Enter Admission No." className='form-control rounded-0' 
                      onChange={(s) => setStudent({ ...student, admissionno: s.target.value })} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputStudentName" className="form-label">Student Name:</label>
                    <input type="text" id="inputStudentName" placeholder="Enter Student Name" className='form-control rounded-0' 
                      onChange={(s) => setStudent({ ...student, studentname: s.target.value })} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputClass" className="form-label">Class:</label>
                    <input type="text" id="inputClass" placeholder="Enter Class" className='form-control rounded-0' 
                      onChange={(s) => setStudent({ ...student, class: s.target.value })} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputGender" className="form-label">Gender:</label>
                    <input type="text" id="inputGender" placeholder="Enter Gender" className='form-control rounded-0' 
                      onChange={(s) => setStudent({ ...student, gender: s.target.value })} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputState" className="form-label">State:</label>
                    <select name="state" id="state" className="form-select"
                      onChange={(s) => setStudent({ ...student, state: s.target.value })}>
                      {state.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label htmlFor="inputGroupFile01" className="form-label">Select Image:</label>
                    <input type="file" id="inputGroupFile01" name="image" placeholder="Enter Image" className='form-control rounded-0' 
                      onChange={(s) => setStudent({ ...student, image: s.target.files[0] })} />
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
          <TabPanel value="3">
            {/* Content for Upload Students */}
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default Student;
