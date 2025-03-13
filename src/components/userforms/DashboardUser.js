import React, { useState } from 'react'
import { PieChart } from "react-minimal-pie-chart";
import { toast } from 'react-toastify';
import api from '../axiosapi';
import DashboardCards from './DashboardCards';
import { useDispatch, useSelector } from 'react-redux';
import { delUserFormId, setUserFormId } from '../../store/user/userHelper';
import { useNavigate } from 'react-router-dom';
import DashboardTable from './DashboardTable';


const DashboardUser = () => {

    const [finance, setfinance] = useState('')
    const [formid, setformid] = useState(null)
    const [data, setdata] = useState([])

    // const userformid = useSelector((state) => state.user.user_form_id);

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const getData = async () => {
        if (finance == "" || finance == null) {
            toast.info("Please select financial year")
            return;
        }

        try {

            let response = await api.get(`/userform/userdashboard/${finance}`);

            if (response.data.status) {
                setdata(response.data.countofquartersubmissions)
                setformid(response.data.unique_form_id)
            }
            else {
                setdata([])
                toast.info(response.data.message)
                // dispatch(delUserFormId())
                setformid(null)
            }

        } catch (error) {
            setdata([])
            // dispatch(delUserFormId())
            setformid(null)
            toast.error(error.message)
        }
    }

    const viewForm = () => {
        navigate(`/viewformbyid/${formid}`)
    }

    return (
        <div>
            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Dashboard</p>

            <div className='flex items-center my-2'>
                <p className='text-blue-600 text-lg'>Financial Year:</p>
                <select
                    name="finance"
                    value={finance}
                    onChange={(e) => { setfinance(e.target.value) }}
                    className="border mx-2 rounded shadow font-open-sans"
                    // disabled={finance == "" ? false : true}
                    required
                >
                    <option value="">Select</option>
                    {/* <option>2024-25</option> */}
                    <option>2025-26</option>
                </select>
                <button onClick={() => getData()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Search</button>
                {formid && <button onClick={() => viewForm()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>View Form</button>}
            </div>



            {
                data.length > 0
                    ? <>
                        <DashboardCards formid={formid} data={data} />
                        <DashboardTable formid={formid} data={data} />
                    </>
                    : <></>
            }

        </div>
    )
}

export default DashboardUser
