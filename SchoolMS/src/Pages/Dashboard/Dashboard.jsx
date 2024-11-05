import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Layout } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import components from Chart.js
import Logo from '../../SideBar/Logo';
import MenuList from '../../SideBar/MenuList';
import '../Styles.css';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Sider } = Layout;

const Dashboard = () => {
    const [studentCount,setStudentCount] = useState(0);
    const [teacherCount,setTeacherCount] = useState(0);
    const location = useLocation(); // To get the current route

    // Sample data for charts
    const data = {
        labels: ['Students', 'Teachers', 'Classes'],
        datasets: [
            {
                label: '# of People',
                data: [studentCount, teacherCount], // Replace these with dynamic data as needed
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };


    //Function to fecth counts
    const fetchCounts = async () =>{
        try {
            const studentResponse = await axios.get('http://localhost:3000/auth/student');
            const teacherResponse = await axios.get('http://localhost:3000/auth/staff')
            console.log("Student Count:",studentResponse.data.count);
            console.log("Teacher Count:",teacherResponse.data.count);

            
            setStudentCount(studentResponse.data.count);
            setTeacherCount(teacherResponse.data.count);

        } catch (error){
            console.error("Error fetching counts:", error)
        }
    };

    useEffect(()=>{
        fetchCounts();
    },[]);
    
    

    // Check if the current path is the dashboard route
    const isDashboardRoute = location.pathname === "/dashboard";

    return (
        <Layout>
            <Sider  className="siderbar">
                <Logo />
                <MenuList  />
            </Sider>
            <div className="col p-0 m-0">
                <div className="p-2 d-flex justify-content-center shadow">
                    <h4>EduGrid</h4>
                    
                </div>
                {/* Render this only on the dashboard route */}
                {isDashboardRoute && (
                    <div className="dashboard-charts p-4">
                        <h5 className="mb-3">Dashboard Overview</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="chart-container">
                                    <Bar data={data} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
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
