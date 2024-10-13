import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Student from './Pages/Student';
import AddStudent from './Pages/AddStudent';
import Staff from './Pages/Staff';
import Payments from './Pages/Payments';
import Class from './Pages/Class';
import TimeTable from './Pages/TimeTable';
import AddStaff from './Pages/Addstaff';
import EditStudent from './Pages/EditStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='class' element={<Class />} />
          <Route path='student' element={<Student />} />
          <Route path='addstudent' element={<AddStudent/>}/>
          <Route path='/dashboard/edit_student/:SN' element={<EditStudent/>}/>
          <Route path='staff' element={<Staff />}/>
          <Route path='addstaff' element={<AddStaff />} />
          <Route path='payments' element={<Payments />} />
          <Route path='timetable' element={<TimeTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
