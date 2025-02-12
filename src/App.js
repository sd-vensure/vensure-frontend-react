import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AddDrug from './components/AddDrug';
import ViewDrug from './components/ViewDrug';
import AddInnovator from './components/AddInnovator';
import ViewInnovator from './components/ViewInnovator';
import AddPaf from './components/AddPaf';
import ViewPaf from './components/ViewPaf';
import AddStakeholder from './components/AddStakeholder';
import ViewStakeholder from './components/ViewStakeholder';
import Drugs from './components/drug/Drugs';
import PAF from './components/paf/PAF';
import Form from './components/forms/Form';
import RevisePAF from './components/RevisePAF';
import Department from './components/departments/Department';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route path='login' element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path='/' element={<Home />} />
                <Route path='/drug' element={<Drugs />} />
                <Route path='/paf' element={<PAF />} />
                <Route path='/department' element={<Department />} />
                <Route path='/pafrevise' element={<RevisePAF />} />
                <Route path='/pafform/:paf_id' element={<Form />} />
                {/* <Route path='/dashboard/add-drug' element={<AddDrug />} />
                <Route path='/dashboard/view-drug' element={<ViewDrug />} />
                <Route path='/dashboard/add-innovator' element={<AddInnovator />} />
                <Route path='/dashboard/view-innovator' element={<ViewInnovator />} />
                <Route path='/dashboard/add-paf' element={<AddPaf />} />
                <Route path='/dashboard/view-paf' element={<ViewPaf />} />
                <Route path='/dashboard/add-stakeholder' element={<AddStakeholder />} />
                <Route path='/dashboard/view-stakeholder' element={<ViewStakeholder />} /> */}
               
                {/* <Route path='logout' element={<Logout />} /> */}


              </Route>
            </Route>


          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
