import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Layout } from 'antd';
import Logo from '../SideBar/Logo';
import MenuList from '../SideBar/MenuList';
import './Styles.css';

const { Sider } = Layout;

const Dashboard = () => {
    const [darkTheme, setDarkTheme] = useState(true);
    const location = useLocation(); // To get the current route

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    // Check if the current path is the dashboard route
    const isDashboardRoute = location.pathname === "/dashboard"; 

    return (
        <Layout>
            <Sider theme={darkTheme ? 'dark' : 'light'} className="siderbar">
                <Logo />
                <MenuList darkTheme={darkTheme} />
            </Sider>

            <div className="col p-0 m-0">
                <div className="p-2 d-flex justify-content-center shadow">
                    <h4>EduGrid</h4>
                </div>

                {/* Render this only on the dashboard route */}
                {isDashboardRoute && (
                    <div className="info-section p-2">
                        <h5>School History</h5>
                        <p>Our school was founded in 1985 with the mission to provide quality education. Over the years, we have nurtured thousands of students, offering a wide range of academic and extracurricular programs.</p>

                        <h5>Principal's History</h5>
                        <p>Our principal, John Doe, has been with the school for over 15 years, bringing innovation and leadership. Under his guidance, the school has achieved national recognition for academic excellence.</p>

                        <h5>Teachers and Staff</h5>
                        <p>The school is supported by a highly dedicated teaching and non-teaching staff, all committed to providing the best environment for our students to thrive. We have over 100 experienced teachers across various departments.</p>
                    </div>
                )}

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
