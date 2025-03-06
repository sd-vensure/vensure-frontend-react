import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const FinalVerification = () => {

    const [financial, setfinancial] = useState("");

    const [data, setdata] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getFormsForUserId = async () => {

        try {
            const getdata = await api.get(`userform/getsubmittedformsnew`)

            if (getdata.data.status) {
                // toast.success(getdata.data.message)
                setdata(getdata.data.data)
            }
            else {
                toast.info(getdata.data.message)
                setdata([])
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getFormsForUserId()
    }, []);


    const setFormValue = (item) => {
        dispatch(setUserForm(item))
        navigate('/viewparticularformnew')
    };

    const getrequests = async () => {
        try {
            const getdata = await api.get(`userform/getsubmittedformsnew?financial=${financial}`)

            if (getdata.data.status) {
                // toast.success(getdata.data.message)
                setdata(getdata.data.data)
            }
            else {
                toast.info(getdata.data.message)
                setdata([])
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


    const approveDecline = async (item, val) => {
        try {
            const uploaddata = await api.get(`userform/approvedecline/${item.form_id}/${val}`);

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                getFormsForUserId()
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className="overflow-x-auto ">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>All KRA Forms</p>

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
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">ID</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">User Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Department</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Designated Person</th>
                        {/* <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th> */}
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        {/* <th className="whitespace-wrap py-2 font-medium text-white border">Verification Status</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Update Status</th> */}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        {item.emp_id}
                                    </td>
                                    <td className='whitespace-wrap border'>
                                        {item.user_first_name}
                                    </td>
                                    <td className='whitespace-wrap border'>
                                        {item.department_name}
                                    </td>
                                    <td className='whitespace-wrap border'>
                                        {item.designated_user_name}
                                    </td>
                                    {/* <td className='border'>
                                        {moment(item.updated_at).format('DD-MM-YYYY')}
                                    </td> */}
                                    <td onClick={() => { setFormValue(item) }} className='border underline cursor-pointer text-blue-500' >
                                        View
                                    </td>

                                    {/* <td className='border' >
                                        {item.is_verified === "In Progress" && <span className='text-blue-500'>In Progress</span>}
                                        {item.is_verified === "Pending" && <span className='text-blue-500'>Pending</span>}
                                        {item.is_verified === "Rejected" && <span className='text-red-500'>Rejected</span>}
                                        {item.is_verified === "Verified" && <span className='text-green-500'>Verified</span>}
                                    </td> */}

                                    {/* <td className='border text-blue-500 p-1' >
                                        {
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <button onClick={() => { approveDecline(item, "Verified") }} className='block w-1/2 m-1 rounded-sm border border-green-600 bg-green-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-green-600 focus:ring-3 focus:outline-hidden'>Approve</button>
                                                <button onClick={() => { approveDecline(item, "Rejected") }} className='block w-1/2 m-1 rounded-sm border border-red-600 bg-red-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden'>Reject</button>
                                            </div>
                                        }
                                    </td> */}
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={6} className='border'>No form found.</td>
                            </tr>


                    }

                </tbody>

            </table>
        </div>
    )
}

export default FinalVerification