import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, TeamOutlined, DollarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Menulist.css'

const MenuList = () => {
    return ( 
        <Menu theme="light" mode="inline" className="menu-bar">
            <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="class" icon={<UsergroupAddOutlined />}>
                <Link to="/dashboard/class">Class</Link>
            </Menu.Item>
            <Menu.SubMenu key="student" icon={<BookOutlined />} title="Students">
                <Menu.Item key="All Students" icon={<BookOutlined />}>
                    <Link to="/dashboard/student">All Students</Link>
                </Menu.Item>
                <Menu.Item key="Add Students" icon={<BookOutlined />}>
                    <Link to="/dashboard/addstudent">Add Students</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="teacher" icon={<TeamOutlined />} title="Teachers">
                <Menu.Item key="All Teachers" icon={<TeamOutlined />}>
                    <Link to="/dashboard/staff">All Teachers</Link>
                </Menu.Item>
                <Menu.Item key="Add Teachers" icon={<TeamOutlined />}>
                    <Link to="/dashboard/addstaff">Add Teachers</Link> {/* Corrected Path */}
                </Menu.Item>
            </Menu.SubMenu> 
            <Menu.Item key="payments" icon={<DollarOutlined />}>
                <Link to="/dashboard/payments">Payments</Link> {/* Ensure correct path for payments as well */}
            </Menu.Item>
            <Menu.Item key="timetable" icon={<ScheduleOutlined />}>
                <Link to="/dashboard/timetable">Time Table</Link> {/* Ensure correct path for timetable */}
            </Menu.Item>
            <Menu.Item key="Add Notice" icon={<ScheduleOutlined />}>
                <Link to="/dashboard/addnotice">Add Notice</Link> {/* Ensure correct path for timetable */}
            </Menu.Item>
        </Menu>
    );
};


export default MenuList;
