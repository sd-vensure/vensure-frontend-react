import React, { useEffect, useState } from 'react'
import AddDrug from '../AddDrug';
import ViewDrug from '../ViewDrug';
import AddInnovator from '../AddInnovator';
import ViewInnovator from '../ViewInnovator';
import HeaderComponent from '../HeaderComponent';
import ViewForm from './ViewForm';
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { delPAf, setPaf } from '../../store/user/userHelper';
import { toast } from 'react-toastify';
import axios from 'axios';

const Form = () => {

    const [selectedoption, setselectedoption] = useState("1");

    const [headertext, setheadertext] = useState("");
    const dispatch=useDispatch()

    const pafdetails= useSelector((state) => state.user.paf_selected);
    
    const { paf_id } = useParams();

    const [tabs, settabs] = useState([
        { name: 'View Form', number: '1', current: true },
        { name: 'Edit Form', number: '2', current: false },
    ]);

    const fetchPAFDetails= async()=>{
        try {

            let response = await axios.get(`http://localhost:8000/api/paf/get?pafId=${paf_id}`, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                dispatch(setPaf(response.data.data[0]))
                let finalstr="Viewing form for: "+response.data.data[0].paf_unique
                setheadertext(finalstr)
            }
            else {
                toast.info(response.data.message)
                dispatch(delPAf())
            }

        } catch (error) {
            toast.error(error.message)
            dispatch(delPAf())
        }
    }

    useEffect(() => {
      if(pafdetails)
      {
        let finalstr="Viewing form for: "+pafdetails.paf_unique
        setheadertext(finalstr)
      }
      else{
        fetchPAFDetails(paf_id)
      }
      
    }, [])
    

    return (
        <>
            {/* <div id="style-7" className='pt-20 md:p-0 w-full overflow-auto justify-center min-h-screen max-h-screen bg-[#F3F3F7] font-nm tracking-normal text-sm font-[300]'> */}
                <div className='pb-0'>
                    <HeaderComponent tabs={tabs} settabs={settabs} setselectedoption={setselectedoption} selectedoption={selectedoption} headertext={headertext} />
                </div>

                {
                    selectedoption == "1"
                        ? <ViewForm />
                        : <></>
                }

                {
                    selectedoption == "2"
                        ? <EditForm />
                        : <></>
                }

                {/* <p>{pafdetails?.stakeholders}</p> */}
                

            {/* </div> */}
        </>
    )
}

export default Form
