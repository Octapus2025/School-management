import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Student from './Pages/Student/Student';
import AddStudent from './Pages/Student/AddStudent';
import Staff from './Pages/Staff/Staff';
import Payments from './Pages/Payments/Payments';
import Class from './Pages/Class/Class';
import TimeTable from './Pages/TimeTable';
import AddStaff from './Pages/Staff/Addstaff';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AddNotice from './Pages/Notice/AddNotice';
import ParentsLogin from './User/Parents/ParentsLogin';
import ParentsDashboard from './User/Parents/ParentsDashboard';
import Notices from './User/Notices/Notices';






function App() {
  return (
    <Router>
      <Routes>
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path='class' element={<PrivateRoute><Class /></PrivateRoute>} />
          <Route path='student' element={<PrivateRoute><Student /></PrivateRoute>} />
          <Route path='addstudent' element={<PrivateRoute><AddStudent/></PrivateRoute>}/>
          <Route path='staff' element={<PrivateRoute><Staff /></PrivateRoute>}/>
          <Route path='addstaff' element={<PrivateRoute><AddStaff /></PrivateRoute>} />
          <Route path='payments' element={<PrivateRoute><Payments /></PrivateRoute>} />
          <Route path='timetable' element={<PrivateRoute><TimeTable /></PrivateRoute>} />
          <Route path='addnotice' element={<PrivateRoute><AddNotice/></PrivateRoute>} />
        </Route>

        <Route path='/parentslogin' element={<PrivateRoute><ParentsLogin/></PrivateRoute>}/>
        <Route path='/parentsdashboard' element={<PrivateRoute><ParentsDashboard/></PrivateRoute>}>
          <Route path='notices' element={<PrivateRoute><Notices/></PrivateRoute>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
