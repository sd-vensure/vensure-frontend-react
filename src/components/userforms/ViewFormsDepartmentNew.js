import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewFormsDepartmentNew = () => {

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
            const getdata = await api.get(`userform/getformdepartmentnew/${currentuser.department_id}`)

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
            const getdata = await api.post(`userform/getassignedformstome`, { "financial_year": financial })

            if (getdata.data.status) {
                setdata(getdata.data.entries);
            }
            else {
                setdata([]);
                toast.info(getdata.data.message)


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
            navigate('/editparticularformnew')
        }
        else if (val == "View") {
            navigate('/viewparticularformnew')
        }
    };

    const sendForVerification = async (item) => {
        try {
            const uploaddata = await api.get(`userform/sendforverification/${item.form_id}`);

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                getTotalFormsTotalUserForFinancialYear()
                // getFormsForUserId()
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


    const approveDeclineForm = async (item, val) => {
        try {
            const uploaddata = await api.get(`userform/approvedeclinenew/${item.form_id}/${val}`);

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                // getFormsForUserId()
                getTotalFormsTotalUserForFinancialYear()
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const sendForEditRequest = async (item) => {
        try {
            const getdata = await api.post(`userform/editrequest`, { data: item })

            if (getdata.data.status) {
                toast.success(getdata.data.message)
            }
            else {
                toast.info(getdata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }



    return (
        <div className="overflow-x-auto ">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Department Head Forms</p>


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
                    {/* <option>2024-25</option> */}
                    <option>2025-26</option>
                    {/* <option>2026-27</option> */}

                </select>

                <button onClick={() => getData()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Search</button>
                {/* {
                    data.length > 0 &&
                    parseInt(totalforms) === parseInt(totalpersons) && !data.some(item => item.is_shared === "Y") &&
                    <button onClick={() => submitForShare()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Share Forms</button>
                } */}

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
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Accept/Reject</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Share to HR</th>
                        <th className="whitespace-wrap py-2 font-medium text-white border">Request Edit</th>
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

                                    <td onClick={() => { setFormValue(item, "View") }} className='border hover:underline underline-offset-2 cursor-pointer text-blue-500' >
                                        View
                                    </td>

                                    {/* {
                                        item.is_shared === "Y"
                                            ? <td className='border underline cursor-pointer text-red-500' >
                                                Not Editable
                                            </td>
                                            :  */}
                                    <td className='border' >

                                        {
                                            item.is_verified == "Verified" || item.is_verified == "Rejected"
                                                ? <span className=' text-red-500'>Not Editable</span>
                                                : <span onClick={() => { setFormValue(item, "Edit") }} className='cursor-pointer text-green-500 hover:underline underline-offset-2'>Edit</span>
                                        }
                                    </td>
                                    {/* } */}

                                    <td>
                                        {
                                            item.is_verified == "In Progress"
                                                ? <div className='w-full flex flex-col justify-center items-center'>
                                                    <button onClick={() => { approveDeclineForm(item, "Verified") }} className='block w-1/2 m-1 rounded-sm border border-green-600 bg-green-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-green-600 focus:ring-3 focus:outline-hidden'>Approve</button>
                                                    <button onClick={() => { approveDeclineForm(item, "Rejected") }} className='block w-1/2 m-1 rounded-sm border border-red-600 bg-red-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden'>Reject</button>
                                                </div>
                                                : item.is_verified == "Verified"
                                                    ? <span className='text-green-500'>Verified</span>
                                                    : <span className='text-red-500'>{item.is_verified}</span>

                                            // <span>{item.is_verified}</span>
                                        }


                                    </td>

                                    <td className='border text-blue-500 p-1' >
                                        {
                                            item.is_verified === "Verified"
                                                ? item.is_shared == "Y"
                                                    ? <span className='text-green-500'>Shared</span>
                                                    :
                                                    <button onClick={() => { sendForVerification(item) }} className=" bg-blue-500 whitespace-nowrap text-white px-3 py-1 rounded">Share</button>
                                                : <span className='text-green-500'>-</span>
                                        }
                                    </td>

                                    <td className='border text-blue-500 p-1' >
                                        {
                                            item.is_shared == "Y"
                                                ? <button onClick={() => { sendForEditRequest(item) }} className=" bg-red-500 whitespace-nowrap text-white px-2 py-1 rounded text-sm">Request</button>
                                                : <span className='text-green-500'>-</span>

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

export default ViewFormsDepartmentNew