import React ,{useState,useEffect}from "react";
import axios from "axios";

const AddStudent =({initialClass})=>{
    const [student, setStudent] = useState({
        sn: "",
        admissionno: "",  // Corrected field name
        studentname: "",
        class: initialClass,
        gender: "",
        city:"",
        image: "",
    });
    
    const [value, setValue] = useState('1');
    
    
    
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
                <div className='d-flex justify-content-center'>
              <div className='p-1 rounded w-100 border full-width' style={{ width: '500px' }}>
                <h2>Add Student</h2>

                <form className="row full-width" onSubmit={handleSubmit}>
                  <div className="col-12 mb-5">
                    <label htmlFor="inputSN" className="form-label">S/N:</label>
                    <input type="text" id="inputSN" placeholder="Enter S/N" className='form-control '
                      onChange={(s) => setStudent({ ...student, sn: s.target.value })} />
                  </div>

                  <div className="col-12 mb-5">
                    <label htmlFor="inputAdmissionNo" className="form-label">Admission No:</label>
                    <input type="text" id="inputAdmissionNo" placeholder="Enter Admission No." className='form-control ' 
                      onChange={(s) => setStudent({ ...student, admissionno: s.target.value })} />
                  </div>

                  <div className="col-12 mb-5">
                    <label htmlFor="inputStudentName" className="form-label">Student Name:</label>
                    <input type="text" id="inputStudentName" placeholder="Enter Student Name" className='form-control ' 
                      onChange={(s) => setStudent({ ...student, studentname: s.target.value })} />
                  </div>


                  <div className="col-12 mb-5">
                    <label htmlFor="inputClass" className="form-label">Class:</label>
                    <input type="text" id="inputClass" placeholder="Enter Class" className='form-control ' 
                      onChange={(s) => setStudent({ ...student, class: s.target.value })} />
                  </div>


                  <div className="col-12 mb-5">
                    <label htmlFor="inputGender" className="form-label">Gender:</label>
                    <input type="text" id="inputGender" placeholder="Enter Gender" className='form-control ' 
                      onChange={(s) => setStudent({ ...student, gender: s.target.value })} />
                  </div>


                  <div className="col-12 mb-5">
                    <label htmlFor="inputCity" className="form-label">City:</label>
                    <input type="text" id="inputCity" placeholder="Enter City" className='form-control'
                    onChange={(s) => setStudent({...student,city:s.target.value})} />
                  </div>
                
                  
                  <div className="col-12 mb-5">
                    <label htmlFor="inputGroupFile01" className="form-label">Select Image:</label>
                    <input type="file" id="inputGroupFile01" name="image" placeholder="Enter Image" className='form-control ' 
                      onChange={(s) => setStudent({ ...student, image: s.target.files[0] })} />
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary btn-start">
                      Add Student
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
            </div>
        </div>
    )
}


export default AddStudent