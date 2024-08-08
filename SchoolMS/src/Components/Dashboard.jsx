import React from 'react'
import { Link, Outlet } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import './Styles.css';




const Dashboard = () => {
    return (
        <div className="container-fluid vh-full">
            <div className="row flex-nowrap h-full" >
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white h-100">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-black text-decoration-none">
                            
                            <span className='fs-5 fw-bolder d-none d-sm-inline'>
                                Admin
                            </span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="h-full">
                                <Link to="/dashboard" className="nav-link text-black px-0 align-middle">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/student" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Student</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/staff" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Staff</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/academics" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Academics</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/performance" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Performance</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/collectfees" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Collect Fees</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/setup" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Setup</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link to="/dashboard/changepassword" className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Change Password</span>
                                </Link>
                            </li>
                            <li className="h-full">
                                <Link className="nav-link px-0 align-middle text-black">
                                    
                                    <span className="ms-2 d-none d-sm-inline">Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>School Management System</h4>
                    </div>
                    <div className="p-4 h-100">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
