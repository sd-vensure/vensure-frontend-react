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

    const [financial, setfinancial] = useState("");

    const [notsharedforms, setnotsharedforms] = useState(0)
    const [totalforms, settotalforms] = useState(0)
    const [totalpersons, settotalpersons] = useState(0)

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

    const getTotalFormsTotalUserForFinancialYear = async () => {
        try {
            const getdata = await api.post(`userform/totalformstotalusers`, { "financial_year": financial })

            if (getdata.data.status) {
                setdata(getdata.data.entries);
                setnotsharedforms(getdata.data.not_shared_forms);
                settotalforms(getdata.data.total_forms_filled);
                settotalpersons(getdata.data.total_persons);
            }
            else {
                setdata([]);
                setnotsharedforms(getdata.data.not_shared_forms);
                settotalforms(getdata.data.total_forms_filled);
                settotalpersons(getdata.data.total_persons);
                toast.info(getdata.data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        // getFormsForUserId();
        // getTotalFormsTotalUserForFinancialYear()
    }, []);


    const setFormValue = (item, val) => {
        dispatch(setUserForm(item))
        if (val == "Edit") {
            navigate('/editparticularform')
        }
        else if (val == "View") {
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

    const getData = async () => {

        if (financial == "") {
            toast.info("Please select the financial year")
        }
        else {
            getTotalFormsTotalUserForFinancialYear()
        }

    }

    const submitForShare = async () => {
        try {
            const uploaddata = await api.post(`userform/senddepartmentfinancialyear`, { "finance": financial });

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                await getTotalFormsTotalUserForFinancialYear()
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

            <div className='flex items-center'>
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
                {
                    data.length > 0 &&
                    parseInt(totalforms) === parseInt(totalpersons) && !data.some(item => item.is_shared === "Y") &&
                    <button onClick={() => submitForShare()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Share Forms</button>
                }

            </div>


            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Financial Year</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Department</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Shared Status</th>
                        {/* <th className="whitespace-wrap py-2 font-medium text-white border">Verification Status</th> */}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        {item.user_first_name}
                                    </td>
                                    <td className='whitespace-wrap border'>
                                        {item.financial_year}
                                    </td>
                                    <td className='border'>
                                        {item.department_name}
                                    </td>
                                    <td className='border'>
                                        {moment(item.created_at).format('DD-MM-YYYY')}
                                    </td>

                                    <td onClick={() => { setFormValue(item, "View") }} className='border underline cursor-pointer text-blue-500' >
                                        View
                                    </td>

                                    {
                                        item.is_shared === "Y"
                                            ? <td className='border underline cursor-pointer text-red-500' >
                                                Not Editable
                                            </td>
                                            : <td onClick={() => { setFormValue(item, "Edit") }} className='border underline cursor-pointer text-blue-500' >
                                                Edit
                                            </td>
                                    }

                                    <td className='border text-blue-500 p-1' >
                                        {
                                            item.is_shared === "Y"
                                                ? <span className='text-green-500'>Shared</span>
                                                : <span className='text-red-500'>Pending</span>

                                        }
                                    </td>
                                    {/* <td className='border' >
                                        {item.is_verified === "In Progress" && <span className='text-blue-500'>In Progress</span>}
                                        {item.is_verified === "Pending" && <span className='text-blue-500'>Pending</span>}
                                        {item.is_verified === "Rejected" && <span className='text-red-500'>Rejected</span>}
                                        {item.is_verified === "Verified" && <span className='text-green-500'>Verified</span>}
                                    </td> */}

                                </tr>
                            )) :
                            <tr>
                                <td colSpan={8} className='border'>No form found.</td>
                            </tr>

                    }

                </tbody>
            </table>

            {
                data.length > 0 &&
                <div>
                    <p className='text-blue-500'>Total Employees: <span className='text-black'>{totalpersons}</span></p>
                    <p className='text-blue-500'>Total Forms Recieved: <span className='text-black'>{totalforms}</span></p>
                    {/* <p className='text-blue-500'>Total Pending for Submission: <span className='text-black'>{notsharedforms}</span></p> */}
                </div>
            }

        </div>
    )
}

export default ViewFormsDepartment