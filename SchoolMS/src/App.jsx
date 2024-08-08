import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Student from './Components/Student'
import Staff from './Components/Staff'
import Academics from './Components/Academics'
import Perfomance from './Components/Performance'
import CollectFees from './Components/CollectFees'
import Setup from './Components/Setup'
import ChangePassword from './Components/ChangePassword'




function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='/dashboard/student' element={<Student/>}></Route>
        <Route path='/dashboard/staff' element={<Staff/>}>
          
        </Route>
        <Route path='/dashboard/academics' element={<Academics/>}></Route>
        <Route path='/dashboard/performance' element={<Perfomance/>}></Route>
        <Route path='/dashboard/collectfees' element={<CollectFees/>}></Route>
        <Route path='/dashboard/setup' element={<Setup/>}></Route>
        <Route path='/dashboard/changepassword' element={<ChangePassword/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
