import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import AddUserForm from './AddUserForm';
import ViewMyforms from './ViewMyforms';
import ViewFormsDepartment from './ViewFormsDepartment';
import FinalVerification from './FinalVerification';
import { useSelector } from 'react-redux';
import Unauthorised from '../Unauthorised';
import AddForm1 from './AddForm1';
import AddForm2 from './AddForm2';
import ViewMyformsNew from './ViewMyformsNew';
import ViewFormsDepartmentNew from './ViewFormsDepartmentNew';
import QuestionForm from './QuestionForm';
import ViewMyQuestion from './ViewMyQuestion';

const UserQuestionForm = () => {
    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("");

    const currentuser = useSelector((state) => state.user.current_user);

    let roles = currentuser.roles;


    const [tabs, settabs] = useState([
        { name: 'Ask a Query', number: '1', current: true },
        { name: 'View My Queries', number: '2', current: false }
    ]);

    return (
        <>
            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Query Forms</p>

            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
            <div className='pb-0'>
                <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
            </div>

            {/* <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Query Forms</p> */}


            {/* {
                selectedoption == "1"
                    ? Array.isArray(roles) && roles.some(role => ["ViewDepartmentForm"].includes(role))
                        ? <ViewFormsDepartmentNew />
                        : <Unauthorised />
                    : <></>
            } */}

            {
                selectedoption == "1" &&
                <QuestionForm />

            }

            {
                selectedoption == "2" &&
                <ViewMyQuestion />

            }



            {/* {
                selectedoption == "3"
                    ? Array.isArray(roles) && roles.some(role => ["ViewDepartmentForm"].includes(role))
                        ? <ViewFormsDepartmentNew />
                        : <Unauthorised />
                    : <></>
            } */}

            {/* {
                selectedoption == "4"
                    ? Array.isArray(roles) && roles.some(role => ["HRView"].includes(role))
                        ? <FinalVerification />
                        : <Unauthorised />
                    : <></>
            } */}


            {/* </div> */}
        </>
    )
}

export default UserQuestionForm