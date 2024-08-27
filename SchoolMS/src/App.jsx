import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Pages/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Student from './Pages/Student'
import Staff from './Pages/Staff'
import Payments from './Pages/Payments'
import Class from './Pages/Class'
import TimeTable from './Pages/TimeTable'




function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='class' element={<Class/>}></Route>
        <Route path='student' element={<Student/>}></Route>
        <Route path='staff' element={<Staff/>}></Route>
        <Route path='payments' element={<Payments/>}></Route>
        <Route path='timetable' element={<TimeTable/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
