import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ParentsLogin = () => {
  const [values, setValues] = useState({
    AdmissionNo :'',
    UserName: '',
    Password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    axios.post('http://localhost:3000/auth/parentslogin', values)
        .then(result => {
            if (result.data.loginStatus) {
                localStorage.setItem('authToken', result.data.token);
                setTimeout(() => navigate('/parentsdashboard'), 100);
            } else {
                setError(result.data.Error);
            }
        })
        .catch(err => {
            console.error("Login Error:", err);
            setError('An error occurred. Please try again.');
        });
  };



  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="d-flex loginContainer">
        {/* Image on the left side */}
        <div className="loginImage">
          <img src="/Images/School.jpg" alt="School Management" className="img-fluid rounded-start" />
        </div>
        {/* Form on the right side */}
        <div className="p-3 rounded border loginForm">
          <div className="text-danger">
            {error && error}
          </div>
          <h2>Welcome To EduGrid</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="AdmissionNo"><strong>Admission No</strong></label>
              <input
                type="text"
                name="AdmissionNo"
                autoComplete="off"
                placeholder="Enter AdmissionNo"
                onChange={(e) => setValues({ ...values, AdmissionNo: e.target.value })}
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username"><strong>Username</strong></label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Enter UserName"
                onChange={(e) => setValues({ ...values, UserName: e.target.value })}
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setValues({ ...values, Password: e.target.value })}
                className="form-control rounded"
              />
            </div>
            <button className="btn btn-success w-100 rounded-0">Submit</button>
            <div className="mb-1">
              <input type="checkbox" name="tick" id="tick" className="me-2" />
              <label htmlFor="tick">You agree with terms & conditions</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentsLogin;
