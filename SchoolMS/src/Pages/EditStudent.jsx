import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { sn } = useParams();
  const [student, setStudent] = useState({
    sn: "",
    admissionno: "",
    studentname: "",
    class: "",
    gender: "",
    city: ""
  });

  useEffect(() => {
    if (sn) {
      axios.get(`http://localhost:3000/auth/student/${sn}`)
        .then(result => {
          console.log("Fetched student data:", result.data); // Check the data here
          if (result.data && result.data.Result) {
            const studentData = result.data.Result[0];
            setStudent({
              sn: studentData.sn,
              admissionno: studentData.admissionno,
              studentname: studentData.studentname,
              class: studentData.class,
              gender: studentData.gender,
              city: studentData.city,
            });
          }
        })
        .catch(err => console.log(err));
    }
  }, [sn]);
  

  const handleSubmit = (s) => {
    s.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_student/${sn}`, student)
      .then(result => {
        console.log("Updated student:", result.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 mt-3'>
      <div className='justify-content-center flex-column'>
        <div className='d-flex justify-content-center'>
          <div className='p-1 rounded w-100 border full-width' style={{ width: '500px' }}>
            <h2>Edit Student</h2>
            <form className="row full-width" onSubmit={handleSubmit}>
              <div className="col-12 mb-5">
                <label htmlFor="inputSN" className="form-label">S/N:</label>
                <input
                  type="text"
                  id="inputSN"
                  placeholder="Enter S/N"
                  className='form-control'
                  value={student.sn}
                  onChange={(s) => setStudent({ ...student, sn: s.target.value })}
                />
              </div>
              <div className="col-12 mb-5">
                <label htmlFor="inputAdmissionNo" className="form-label">Admission No:</label>
                <input
                  type="text"
                  id="inputAdmissionNo"
                  placeholder="Enter Admission No."
                  className='form-control'
                  value={student.admissionno}
                  onChange={(s) => setStudent({ ...student, admissionno: s.target.value })}
                />
              </div>
              <div className="col-12 mb-5">
                <label htmlFor="inputStudentName" className="form-label">Student Name:</label>
                <input
                  type="text"
                  id="inputStudentName"
                  placeholder="Enter Student Name"
                  className='form-control'
                  value={student.studentname}
                  onChange={(s) => setStudent({ ...student, studentname: s.target.value })}
                />
              </div>
              <div className="col-12 mb-5">
                <label htmlFor="inputClass" className="form-label">Class:</label>
                <input
                  type="text"
                  id="inputClass"
                  placeholder="Enter Class"
                  className='form-control'
                  value={student.class}
                  onChange={(s) => setStudent({ ...student, class: s.target.value })}
                />
              </div>
              <div className="col-12 mb-5">
                <label htmlFor="inputGender" className="form-label">Gender:</label>
                <input
                  type="text"
                  id="inputGender"
                  placeholder="Enter Gender"
                  className='form-control'
                  value={student.gender}
                  onChange={(s) => setStudent({ ...student, gender: s.target.value })}
                />
              </div>
              <div className="col-12 mb-5">
                <label htmlFor="inputCity" className="form-label">City:</label>
                <input
                  type="text"
                  id="inputCity"
                  placeholder="Enter City"
                  className='form-control'
                  value={student.city}
                  onChange={(s) => setStudent({ ...student, city: s.target.value })}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Edit Student</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
