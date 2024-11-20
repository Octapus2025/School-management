import React,{useState} from 'react';
import { Layout } from 'antd';
import MenuList from '../SideBar/MenuList';
import { Outlet ,useLocation} from "react-router-dom";
import Logo from '../SideBar/Logo';
import "bootstrap-icons/font/bootstrap-icons.css";



const {Sider} = Layout;

const ParentsDashboard =()=>{

    const location = useLocation();

    //Chech if the current path is the dashboard route
    const isParentsDashboardRoute = location.pathname === "/parentsdashboard";
    

    return(
        <Layout>
            <Sider className="siderbar">
                <Logo />
                <MenuList />
            </Sider>
            <div className="col p-0 m-0">
                <div className="p-2 d-flex judtify-content-center shadow">
                    <h4>Edu Grid</h4>
                </div>
                {/*Render this only on the dashboard route*/}
                {isParentsDashboardRoute && (
                    <div className="dashboard-charts-p-4">
                        <h5 className="mb-3">Parents View</h5>
                    </div>
                )}
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>        
        </Layout>
    );
};

export default ParentsDashboard