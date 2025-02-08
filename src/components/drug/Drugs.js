import React, { useState } from 'react'
import AddDrug from '../AddDrug';
import ViewDrug from '../ViewDrug';
import AddInnovator from '../AddInnovator';
import ViewInnovator from '../ViewInnovator';
import HeaderComponent from '../HeaderComponent';

const Drugs = () => {

    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("Drugs and Innovator")


    const [tabs, settabs] = useState([
        { name: 'Add Drug', number: '1', current: true },
        { name: 'View Drug', number: '2', current: false },
        { name: 'Add Innovator', number: '3', current: false },
        { name: 'View Innovator', number: '4', current: false }
    ]);

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
                <div className='pb-0'>
                    <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
                </div>

                {
                    selectedoption == "1"
                        ? <AddDrug />
                        : <></>
                }

                {
                    selectedoption == "2"
                        ? <ViewDrug />
                        : <></>
                }
                
                {
                    selectedoption == "3"
                        ? <AddInnovator />
                        : <></>
                }
                
                {
                    selectedoption == "4"
                        ? <ViewInnovator />
                        : <></>
                }

            {/* </div> */}
        </>
    )
}

export default Drugs
