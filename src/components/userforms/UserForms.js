import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import AddUserForm from './AddUserForm';
import ViewMyforms from './ViewMyforms';
import ViewFormsDepartment from './ViewFormsDepartment';
import FinalVerification from './FinalVerification';
import { useSelector } from 'react-redux';
import Unauthorised from '../Unauthorised';

const UserForms = () => {
    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("User Forms:");

    const currentuser = useSelector((state) => state.user.current_user);

    let roles = currentuser.roles;


    const [tabs, settabs] = useState([
        { name: 'Add Form', number: '1', current: true },
        { name: 'View My Form', number: '2', current: false },
        { name: 'View Department Forms', number: '3', current: false },
        { name: 'Verification', number: '4', current: false }
    ]);

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
            <div className='pb-0'>
                <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
            </div>


            {
                selectedoption == "1"
                    ? Array.isArray(roles) && roles.some(role => ["AddForm"].includes(role))
                        ? <AddUserForm />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "2"
                    ? Array.isArray(roles) && roles.some(role => ["ViewForm"].includes(role))
                        ? <ViewMyforms />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "3"
                    ? Array.isArray(roles) && roles.some(role => ["ViewDepartmentForm"].includes(role))
                        ? <ViewFormsDepartment />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "4"
                    ? Array.isArray(roles) && roles.some(role => ["VerifyForm"].includes(role))
                        ? <FinalVerification />
                        : <Unauthorised />
                    : <></>
            }


            {/* </div> */}
        </>
    )
}

export default UserForms