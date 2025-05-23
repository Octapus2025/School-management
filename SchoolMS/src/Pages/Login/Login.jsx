import React, { useState } from 'react';
import '../Styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Corrected spelling
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem('authToken', result.data.token);
          console.log('Redirecting to dashboard...');
          setTimeout(() => navigate('/dashboard'), 100); // Small delay
        }else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error(err);
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
              <label htmlFor="username"><strong>School Name</strong></label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Enter UserName"
                onChange={(e) => setValues({ ...values, username: e.target.value })}
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
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

export default Login;
