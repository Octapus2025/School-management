import React from 'react';
import { Menu } from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './MenuList.css'


const MenuList = ()=>{
    return (
        <Menu theme="light" mode="inline" className="menu-bar">
            <Menu.Item key="parentsdashboard" icon={<HomeOutlined/>}>
                <Link to="/parentsdashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="notices" icon={<HomeOutlined/>}>
                <Link to="/parentsdashboard/notices">Notices</Link>
            </Menu.Item>
            <Menu.Item key="reports" icon={<HomeOutlined/>}>
                <Link to="/parentsdashboard/reports">Reports</Link>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;