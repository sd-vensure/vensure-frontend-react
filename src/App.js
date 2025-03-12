import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
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
import Unauthorised from './components/Unauthorised';
import AssignDepartmentAndTimeline from './components/AssignDepartmentAndTimeline';
import AssignBudget from './components/AssignBudget';
import UserForms from './components/userforms/UserForms';
import ViewParticularForm from './components/userforms/ViewParticularForm';
import EditUserForm from './components/userforms/EditUserForm';
import ViewParticularFormNew from './components/userforms/ViewParticularFormNew';
import EditUserFormNew from './components/userforms/EditUserFormNew';
import EditCompletionDate from './components/userforms/EditCompletionDate';
import EditCompletionMarks from './components/userforms/EditCompletionMarks';
import EditCompletionDateAndMarks from './components/userforms/EditCompletionDateAndMarks';
import { useSelector } from 'react-redux';
import Dummy from './components/Dummy';
import FinalVerification from './components/userforms/FinalVerification';
import ViewFormsDepartmentNew from './components/userforms/ViewFormsDepartmentNew';
import AddForm2 from './components/userforms/AddForm2';
import ViewMyformsNew from './components/userforms/ViewMyformsNew';
import ViewForPendingObtained from './components/userforms/ViewForPendingObtained';
import HREditRequests from './components/userforms/HREditRequests';
import MyEditRequests from './components/userforms/MyEditRequests';
import EditCompleteFormAfter from './components/userforms/EditCompleteFormAfter';
import Loader from './components/Loader';
import UserQuestionForm from './components/userforms/UserQuestionForm';
import ViewAllQueries from './components/userforms/ViewAllQueries';
import DashboardUser from './components/userforms/DashboardUser';
import ViewParticularFormByID from './components/userforms/ViewParticularFormByID';


function App() {

  const currentuser = useSelector((state) => state.user.current_user);

  let roles = currentuser?.roles;


  const ProtectedRoute = ({ element, allowedRoles }) => {
    // Check if any of the user's roles exist in allowedRoles
    const hasAccess = currentuser.roles && Array.isArray(currentuser.roles) && currentuser.roles.some(role => allowedRoles.includes(role));

    return hasAccess ? element : <Navigate to="/unauthorized" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>

            <Route path='login' element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path='/' element={<DashboardUser />} />
                <Route path='/drug' element={<Drugs />} />
                <Route path='/paf' element={<PAF />} />
                <Route path='/department' element={<Department />} />
                <Route path='/pafrevise' element={<RevisePAF />} />
                <Route path='/pafform/:paf_id' element={<Form />} />
                <Route path='/unauthorised' element={<Unauthorised />} />
                <Route path='/pafdepartmentassign' element={<AssignDepartmentAndTimeline />} />
                <Route path='/assignbudget' element={<AssignBudget />} />
                <Route path='/userforms' element={<UserForms />} />
                <Route path='/viewparticularform' element={<ViewParticularForm />} />
                <Route path='/viewparticularformnew' element={<ViewParticularFormNew />} />
                <Route path='/viewformbyid/:formid' element={<ViewParticularFormByID />} />
                <Route path='/editparticularform' element={<EditUserForm />} />
                <Route path='/editparticularformnew' element={<EditUserFormNew />} />

                <Route path='/editcompletiondate' element={<EditCompletionDate />} />
                <Route path='/editcompletionmarks' element={<EditCompletionMarks />} />
                <Route path='/editboth' element={<EditCompletionDateAndMarks />} />
                <Route path='/editspecial' element={<EditCompleteFormAfter />} />

                <Route path='/addkra' element={<AddForm2 />} />
                <Route path='/viewkra' element={<ViewMyformsNew />} />

                <Route path='/hrview' element={<ProtectedRoute allowedRoles={["HRView"]} element={<FinalVerification />} />} />
                <Route path='/hreditrequests' element={<ProtectedRoute allowedRoles={["HREdit"]} element={<HREditRequests />} />} />
                <Route path='/myeditrequests' element={<ProtectedRoute allowedRoles={["MyEdit"]} element={<MyEditRequests />} />} />

                <Route path='/viewdepartmentform' element={<ProtectedRoute allowedRoles={["ViewDepartmentForm"]} element={<ViewFormsDepartmentNew />} />} />

                <Route path='/viewformsforobtained' element={<ProtectedRoute allowedRoles={["ViewDepartmentForm"]} element={<ViewForPendingObtained />} />} />

                <Route path='/question' element={<UserQuestionForm />} />
                <Route path='/allquestion' element={<ProtectedRoute allowedRoles={["HRView"]} element={<ViewAllQueries />} />} />


                <Route path='/dummy' element={<ProtectedRoute allowedRoles={["Testing"]} element={<Dummy />} />} />
                <Route path='/unauthorized' element={<Unauthorised />} />

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
