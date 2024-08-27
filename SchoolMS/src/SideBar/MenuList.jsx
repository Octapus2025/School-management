import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, TeamOutlined, DollarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MenuList = ({ darkTheme }) => {
    return ( 
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
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
                    <Link to="/students/add">Add Students</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="teacher" icon={<TeamOutlined />} title="Teachers">
                <Menu.Item key="All Teachers" icon={<TeamOutlined />}>
                    <Link to="/dashboard/staff">All Teachers</Link>
                </Menu.Item>
                <Menu.Item key="Add Teachers" icon={<TeamOutlined />}>
                    <Link to="/teachers/add">Add Teachers</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="payments" icon={<DollarOutlined />}>
                <Link to="/payments">Payments</Link>
            </Menu.Item>
            <Menu.Item key="timetable" icon={<ScheduleOutlined />}>
                <Link to="/timetable">Time Table</Link>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
