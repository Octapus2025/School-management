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
import './dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Sider } = Layout;

const Dashboard = () => {
    const [studentCount,setStudentCount] = useState(0);
    const [teacherCount,setTeacherCount] = useState(0);
    const [totClass,setTotClass]=useState(0);
    const [totNotice,setTotNotice]=useState(0);
    const [totPublicNotice,setTotPublicNotice]=useState(0);
    const location = useLocation(); // To get the current route



    // Sample data for charts
    const barData = {
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

    const lineData ={
        labels:['January','February','March','April','May','June','July'],
        datasets:[
            {
                label:'Total Students Over Time',
                data:[65,59,80,81,56,55,40],
                borderColor:'rgba(75,192,192,1)',
                backgroundColor:'rgba(75,192,192,0.2)'
            },
        ],
    };


    //Function to fecth counts
    const fetchCounts = async () =>{
        try {
            const noticeResponse = await axios.get('http://localhost:3000/auth/notices');
            const classResponse =  await axios.get('http://localhost:3000/auth/Classes');
            const studentResponse = await axios.get('http://localhost:3000/auth/student');
            const teacherResponse = await axios.get('http://localhost:3000/auth/staff');
            const publicNoticeResponse = await axios.get('http://localhost3000:/auth/publicnotices');
            console.log("Student Count:",studentResponse.data.count);
            console.log("Teacher Count:",teacherResponse.data.count);

            setTotPublicNotice(publicNoticeResponse.data.total)
            setTotClass(classResponse.data.total);
            setTotNotice(noticeResponse.data.count);
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
                    <div className="dashboard-charts-p-4">
                        <h5 className="mb-3">Dashboard Overview</h5>
                        <div className="row report-inner-cards-wrapper mt-4">
                            <InfoCard title="Total Class" count={totClass} icon="icon-rocket" bgColor="bg-success"/>
                            <InfoCard title="Total Students" count={studentCount} icon="icon-user" bgColor="bg-danger"/>
                            <InfoCard title="Total Class Notice" count={totNotice}  icon="icon-user" bgColor="bg-warning"/>
                            <InfoCard title="Total Public Notice" count={totPublicNotice}icon="icon-user" bgColor="bg-danger"/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="chart-container">
                                    <Bar data={barData} options={{maintainAspectRatio: false}}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="chart-container">
                                    <Bar data={lineData} options={{maintainAspectRatio: false}}/>
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

const InfoCard = ({title,count,link,iconClass,bgColor})=>(
    <div className="col-md col-xl report-inner-card">
        <div className="inner-card-text">
            <span className="report-title">{title}</span>
            <h4>{count}</h4>
            <a href={link}>
                <span className="report-count">View {title}</span>
            </a>
        </div>
        <div className={`inner-card-icon ${bgColor}`}>
            <i className={iconClass}></i>
        </div>
        
    </div>
)

export default Dashboard;
