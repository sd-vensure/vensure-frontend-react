import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewFormsDepartment = () => {

    const [data, setdata] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getFormsForUserId = async () => {

        try {
            const getdata = await api.get(`userform/getformdepartment/${currentuser.department_id}`)

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


    const setFormValue = (item,val) => {
        dispatch(setUserForm(item))
        if(val=="Edit")
        {
            navigate('/editparticularform')
        }
        else if(val=="View")
        {
            navigate('/viewparticularform')
        }
    };

    const sendForVerification = async (item) => {
        try {
            const uploaddata = await api.get(`userform/sendforverification/${item.form_id}`);

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

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Form</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Share for Verification</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Verification Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        Form {index + 1}
                                    </td>
                                    <td className='border'>
                                        {moment(item.created_at).format('DD-MM-YYYY')}
                                    </td>

                                    <td onClick={() => { setFormValue(item,"View") }} className='border underline cursor-pointer text-blue-500' >
                                        View
                                    </td>
                                    <td onClick={() => { setFormValue(item,"Edit") }} className='border underline cursor-pointer text-blue-500' >
                                        Edit
                                    </td>
                                    <td className='border text-blue-500 p-1' >
                                        {
                                            item.is_shared === "Y"
                                                ? <span className='text-green-500'>Shared</span>
                                                : <button onClick={() => sendForVerification(item)} className='bg-blue-500 cursor-pointer text-white px-3 py-1 rounded'>Share</button>
                                        }
                                    </td>
                                    <td className='border' >
                                        {item.is_verified === "In Progress" && <span className='text-blue-500'>In Progress</span>}
                                        {item.is_verified === "Pending" && <span className='text-blue-500'>Pending</span>}
                                        {item.is_verified === "Rejected" && <span className='text-red-500'>Rejected</span>}
                                        {item.is_verified === "Verified" && <span className='text-green-500'>Verified</span>}
                                    </td>
                                    
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

export default ViewFormsDepartment