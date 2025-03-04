import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewMyformsNew = () => {

    const [data, setdata] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getFormsForUserId = async () => {

        try {
            const getdata = await api.get(`userform/viewmyformnew/${currentuser.user_id}`)

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


    const setFormValue = async (item, val) => {
        dispatch(setUserForm(item))
        if (val == "View") {
            navigate('/viewparticularformnew')
        }

        if (val == "Edit") {
            navigate('/editparticularformnew')
        }
        if (val == "EditDate") {
            navigate('/editcompletiondate')
        }
       
        if (val == "EditMarks") {
            navigate('/editcompletionmarks')
        }
        if (val == "EditBoth") {
            navigate('/editboth')
        }

        if (val == "Share") {
            try {
                const getdata = await api.get(`userform/sendtodepartmenthead/${item.form_id}`)

                if (getdata.data.status) {
                    toast.success(getdata.data.message)
                    // setdata(getdata.data.data)
                }
                else {
                    toast.info(getdata.data.message)
                    // setdata([])
                }

            } catch (error) {
                toast.error(error.message)
            } finally {
                getFormsForUserId()
            }
        }
    };



    return (
        <div className="overflow-x-auto ">

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Financial Year</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit Obtained</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit Both</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Status</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Share</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        {item.financial_year}
                                    </td>
                                    <td className='border'>
                                        {moment(item.created_at).format('DD-MM-YYYY')}
                                    </td>
                                    <td onClick={() => { setFormValue(item, "View") }} className='border cursor-pointer text-blue-500' >
                                        View
                                    </td>
                                    <td className='border cursor-pointer' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "Edit") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Edit</button>
                                                : <span className='text-red-500'>Not Editable</span>
                                        }
                                    </td>
                                    <td className='border cursor-pointer' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "EditDate") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Edit</button>
                                                : <span className='text-red-500'>Not Editable</span>
                                        }
                                    </td>
                                    <td className='border cursor-pointer' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "EditMarks") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Edit</button>
                                                : <span className='text-red-500'>Not Editable</span>
                                        }
                                    </td>
                                    <td className='border cursor-pointer' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "EditBoth") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Edit</button>
                                                : <span className='text-red-500'>Not Editable</span>
                                        }
                                    </td>
                                    <td className='border cursor-pointer ' >
                                        {item.is_verified == "In Progress" && <span className='text-blue-500'>In Progress</span>}
                                        {item.is_verified == "Verified" && <span className='text-green-500'>Verified</span>}
                                        {item.is_verified == "Rejected" && <span className='text-red-500'>Rejected</span>}
                                        {item.is_verified == "Pending" && <span className='text-red-500'>Pending</span>}
                                    </td>


                                    <td className='border cursor-pointer text-blue-500' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "Share") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Share</button>
                                                : <span className='text-green-500'>Shared</span>
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={4} className='border'>No form found.</td>
                            </tr>


                    }

                </tbody>

            </table>
        </div>
    )
}

export default ViewMyformsNew