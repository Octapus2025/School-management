import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ initialClass }) => {
  const [student, setStudent] = useState({
    sn: "",
    admissionno: "",
    studentname: "",
    parentsname: "",
    parentscontactnumber: "",
    homeaddress: "",
    class: initialClass,
    gender: "",
    city: "",
    image: "",
  });

  const [successAlert, setSuccessAlert] = useState(false); // State for success alert

  // Function to handle form submission
  const handleSubmit = (s) => {
    s.preventDefault();
    //Validation : Check if any field is empty
    for (let key in student){
      if (!student[key]){
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    //Create formData to handle image file
    const formData = new FormData();
    Object.keys(student).forEach((key)=>{
      formData.append(key,student[key]);
    });

    //Make sure to include the image file seperately
    formData.append("image",student.image);

    axios
      .post("http://localhost:3000/auth/add_student", student)
      .then((result) => {
        console.log(result); // Log the entire response object
        if (result.data.Status) {
          console.log("Student added successfully");
          setSuccessAlert(true); // Show success alert

          // Reset the form
          setStudent({
            sn: "",
            admissionno: "",
            studentname: "",
            parentsname: "",
            parentscontactnumber: "",
            homeaddress: "",
            class: initialClass,
            gender: "",
            city: "",
            image: "",
          });
          // Hide the alert after 3 seconds
          setTimeout(() => setSuccessAlert(false), 3000);
        } else {
          console.error(result.data.Error); // Display the exact error message
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error adding student:", err);
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="justify-content-center flex-column">
        <div className="d-flex justify-content-center">
          <div className="p-1 rounded w-100 border full-width" style={{ width: "500px" }}>
            <h2>Add Student</h2>
            {successAlert && (
              <div className="alert alert-success" role="alert">
                Student added successfully
              </div>
            )}
            <form className="row full-width" onSubmit={handleSubmit}>
              <div className="col-12 mb-3">
                <label htmlFor="inputSN" className="form-label">S/N:</label>
                <input
                    type="text"
                    id="inputSN"
                    placeholder="Enter S/N"
                    className="form-control"
                    value={student.sn}
                    onChange={(s) => setStudent({ ...student, sn: s.target.value })}
                  />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputAdmissionNo" className="form-label">Admission No:</label>
                <input
                  type="text"
                  id="inputAdmissionNo"
                  placeholder="Enter Admission No."
                  className="form-control"
                  value={student.admissionno}
                  onChange={(s) => setStudent({ ...student, admissionno: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputStudentName" className="form-label">Student Name:</label>
                <input
                  type="text"
                  id="inputStudentName"
                  placeholder="Enter Student Name"
                  className="form-control"
                  value={student.studentname}
                  onChange={(s) => setStudent({ ...student, studentname: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputParentsName" className="form-label">Parents Name:</label>
                <input
                  type="text"
                  id="inputParentsName"
                  placeholder="Enter Parents Name"
                  className="form-control"
                  value={student.parentsname}
                  onChange={(s) => setStudent({ ...student, parentsname: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputParentsContactNumber" className="form-label">Parents Contact Number:</label>
                <input
                  type="text"
                  id="inputParentsContactNumber"
                  placeholder="Enter Parents Contact Number"
                  className="form-control"
                  value={student.parentscontactnumber}
                  onChange={(s) => setStudent({ ...student, parentscontactnumber: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputHomeAddress" className="form-label">Home Address:</label>
                <input
                  type="text"
                  id="inputHomeAddress"
                  placeholder="Enter Home Address"
                  className="form-control"
                  value={student.homeaddress}
                  onChange={(s) => setStudent({ ...student, homeaddress: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputClass" className="form-label">Class:</label>
                <input
                  type="text"
                  id="inputClass"
                  placeholder="Enter Class"
                  className="form-control"
                  value={student.class}
                  onChange={(s) => setStudent({ ...student, class: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputCity" className="form-label">City:</label>
                <input
                  type="text"
                  id="inputCity"
                  placeholder="Enter City"
                  className="form-control"
                  value={student.city}
                  onChange={(s) => setStudent({ ...student, city: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputGender" className="form-label">Gender:</label>
                <input
                  type="text"
                  id="inputGender"
                  placeholder="Enter Gender"
                  className="form-control"
                  value={student.gender}
                  onChange={(s) => setStudent({ ...student, gender: s.target.value })}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="inputGroupFile01" className="form-label">Select Image:</label>
                <input type="file" id="inputGroupFile01" name="image" placeholder="Enter Image" className='form-control ' 
                  onChange={(s) => setStudent({ ...student, image: s.target.files[0] })} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Student</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
