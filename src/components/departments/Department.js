import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import AddPaf from '../AddPaf';
import ViewPaf from '../ViewPaf';
import AddStakeholder from '../AddStakeholder';
import ViewStakeholder from '../ViewStakeholder';
import AddDepartment from './AddDepartment';
import ViewDepartment from './ViewDepartment';

const Department = () => {

    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("Departments:")

    const [tabs, settabs] = useState([
        { name: 'View Departments', number: '1', current: true },
        { name: 'Add Department', number: '2', current: false }
    ]);

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
                <div className='pb-0'>
                    <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
                </div>

                {
                    selectedoption == "1"
                    ? <ViewDepartment />
                    : <></>
                }

                {
                    selectedoption == "2"
                        ? <AddDepartment />
                        : <></>
                }
                

            {/* </div> */}
        </>
    )
}

export default Department
