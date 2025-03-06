import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axiosapi';
import moment from 'moment';
import { setUserForm } from '../../store/user/userHelper';

const MyEditRequests = () => {

    const [data, setdata] = useState([]);

    const [financial, setfinancial] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getrequests = async () => {
        try {
            const getdata = await api.get(`userform/vieweditrequest/${financial}?userid=${currentuser.user_id}`)

            if (getdata.data.status) {
                setdata(getdata.data.data);
            }
            else {
                setdata([]);
                toast.info(getdata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getData = async () => {

        if (financial == "") {
            toast.info("Please select the financial year")
        }
        else {
            getrequests();
        }

    }

    const approveDeclineRequest = async (item, val) => {
        try {
            const uploaddata = await api.put(`userform/acceptrejectrequest`, { "requestid": item.request_id, "status": val });

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                getrequests()
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const editForm = async (item) => {
        dispatch(setUserForm(item))
        navigate("/editspecial")
    }


    return (
        <div className="overflow-x-auto ">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Requested Edit</p>


            <div className='flex items-center mb-1'>
                <p className='text-blue-500 mr-2'>Financial Year:</p>
                <select
                    name="financial"
                    value={financial}
                    onChange={(e) => { setfinancial(e.target.value); setdata([]) }}
                    className="border mx-2"
                    required
                >
                    <option value=''>Select</option>
                    <option>2024-25</option>
                    <option>2025-26</option>
                    <option>2026-27</option>

                </select>

                <button onClick={() => getData()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Search</button>

            </div>


            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Employee ID</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Financial Year</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Request By</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Request Date</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Approved / Rejected On</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Approve Status</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Edit Status</th>

                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        {item.request_for_empid}
                                    </td>
                                    <td className='whitespace-wrap border'>
                                        {item.request_for_name}
                                    </td>
                                    <td className='border'>
                                        {item.financial_year}
                                    </td>
                                    <td className='border whitespace-wrap'>
                                        {item.requested_by_name}
                                    </td>
                                    <td className='border'>
                                        {moment(item.request_created_on).format('DD-MM-YYYY')}
                                    </td>
                                    <td className='border'>
                                        {item.request_accepted_on ? moment(item.request_accepted_on).format('DD-MM-YYYY') : "-"}
                                    </td>
                                    <td className='border'>

                                        <>
                                            {item.request_status == "Accept" && <span className='text-green-500'>Accepted</span>}
                                            {item.request_status == "Reject" && <span className='text-red-500'>Rejected</span>}
                                            {item.request_status == "Pending" && <span className='text-red-500'>Pending</span>}

                                        </>

                                    </td>
                                    <td className='border'>
                                        {item.edit_status == "Pending"
                                            ? item.request_status == "Accept"
                                                ?
                                                <button onClick={() => { editForm(item) }} className='block w-1/2 m-1 rounded-sm border mx-auto  bg-blue-500 p-1 text-xs font-medium text-white focus:ring-3 focus:outline-hidden'>Edit</button>
                                                : <span className='text-red-500'>{item.request_status}</span>
                                            : <span className='text-blue-500'>Done</span>
                                        }
                                    </td>

                                </tr>
                            )) :
                            <tr>
                                <td colSpan={8} className='border'>No form found.</td>
                            </tr>

                    }

                </tbody>
            </table>

            {/* {
                    data.length > 0 &&
                    <div>
                        <p className='text-blue-500'>Total Employees: <span className='text-black'>{totalpersons}</span></p>
                        <p className='text-blue-500'>Total Forms Recieved: <span className='text-black'>{totalforms}</span></p> */}
            {/* <p className='text-blue-500'>Total Pending for Submission: <span className='text-black'>{notsharedforms}</span></p> */}
            {/* </div>
                } */}

        </div>
    )
}

export default MyEditRequests
