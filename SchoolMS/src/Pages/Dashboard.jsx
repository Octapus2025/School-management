import React from 'react'
import { Link, Outlet } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import './Styles.css';
import { useState } from 'react';
import {Layout} from 'antd';
import Logo from '../SideBar/Logo';
import MenuList from '../SideBar/MenuList';
import ToggleThemeButton from '../SideBar/ToggleThemeButton';


const {Header,Sider} = Layout;




const Dashboard = () => {
    const [darkTheme,setDarkTheme] = useState(true);

    const toggleTheme =()=>{
        setDarkTheme(!darkTheme);
    }
    return (
        <Layout>
            <Sider theme={darkTheme ? 'dark' : 'light'} className="siderbar">
                <Logo/>
                <MenuList darkTheme={darkTheme}/>
                <ToggleThemeButton darkTheme={darkTheme} 
                toggleTheme={toggleTheme}/>
            </Sider>
            <div className="col p-0 m-0">
                <div className="p-2 d-flex justify-content-center shadow">
                    <h4>School Management System</h4>
                </div>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </Layout>
            
    )
}

export default Dashboard;
