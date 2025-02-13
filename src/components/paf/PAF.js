import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import AddPaf from '../AddPaf';
import ViewPaf from '../ViewPaf';
import AddStakeholder from '../AddStakeholder';
import ViewStakeholder from '../ViewStakeholder';
import AddPafNew from '../AddPafNew';
import Unauthorised from '../Unauthorised';
import { useSelector } from 'react-redux';

const PAF = () => {

    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("PAF and Stakeholders")

    const currentuser = useSelector((state) => state.user.current_user);

    let roles = currentuser.roles;



    const [tabs, settabs] = useState([
        { name: 'View PAFs', number: '1', current: true },
        { name: 'Add PAF', number: '2', current: false },
        // { name: 'Add PAF', number: '2', current: false },
        { name: 'Add Stakeholder', number: '3', current: false },
        { name: 'View Stakeholders', number: '4', current: false },
    ]);

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
            <div className='pb-0'>
                <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
            </div>

            {/* {
                    selectedoption == "2"
                        ? <AddPaf />
                        : <></>
                } */}

            {
                selectedoption == "1"
                    ? Array.isArray(roles) && roles.some(role => ["ViewPAF"].includes(role))
                        ? <ViewPaf />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "3"
                    ? Array.isArray(roles) && roles.some(role => ["AddStakeholder"].includes(role))
                        ? <AddStakeholder />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "4"
                    ? Array.isArray(roles) && roles.some(role => ["ViewStakeholder"].includes(role))
                        ? <ViewStakeholder />
                        : <Unauthorised />
                    : <></>
            }

            {
                selectedoption == "2"
                    ? Array.isArray(roles) && roles.some(role => ["AddPAF"].includes(role))
                        ? <AddPafNew />
                        : <Unauthorised />
                    : <></>
            }

            {/* </div> */}
        </>
    )
}

export default PAF
