import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import AddPaf from '../AddPaf';
import ViewPaf from '../ViewPaf';
import AddStakeholder from '../AddStakeholder';
import ViewStakeholder from '../ViewStakeholder';

const PAF = () => {

    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("PAF and Stakeholders")


    const [tabs, settabs] = useState([
        { name: 'Add PAF', number: '1', current: true },
        { name: 'View PAFs', number: '2', current: false },
        { name: 'Add Stakeholder', number: '3', current: false },
        { name: 'View Stakeholders', number: '4', current: false }
    ]);

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
                <div className='pb-0'>
                    <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
                </div>

                {
                    selectedoption == "1"
                        ? <AddPaf />
                        : <></>
                }

                {
                    selectedoption == "2"
                        ? <ViewPaf />
                        : <></>
                }
                
                {
                    selectedoption == "3"
                        ? <AddStakeholder />
                        : <></>
                }
                
                {
                    selectedoption == "4"
                        ? <ViewStakeholder />
                        : <></>
                }

            {/* </div> */}
        </>
    )
}

export default PAF
