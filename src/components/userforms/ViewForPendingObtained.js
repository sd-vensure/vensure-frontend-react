import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewForPendingObtained = () => {

    const [data, setdata] = useState([]);

    const [financial, setfinancial] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getTotalFormsTotalUserForFinancialYear = async () => {
        try {
            const getdata = await api.post(`userform/getpendingmarksassign`, { "financial": financial })

            if (getdata.data.status) {
                setdata(getdata.data.data);
                toast.success(getdata.data.message);
            }
            else {
                setdata([]);
                
                toast.info(getdata.data.message);
            }

        } catch (error) {
            setdata([]);
            toast.error(error.message)
        }
    }



    const setFormValue = (item, val) => {
        dispatch(setUserForm(item))
        if (val == "Assign") {
            navigate('/editcompletionmarks')
        }
        else if (val == "View") {
            navigate('/viewparticularformnew')
        }
    };

    const getData = async () => {

        if (financial == "") {
            toast.info("Please select the financial year")
        }
        else {
            getTotalFormsTotalUserForFinancialYear()
        }

    }



    return (
        <div className="overflow-x-auto ">

<p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Assign Obtained Points</p>


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
                    <option>2026-27</option>

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
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Assign</th>
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
                                        {item.department_user}
                                    </td>

                                    <td onClick={() => { setFormValue(item, "View") }} className='border hover:underline underline-offset-2 cursor-pointer text-blue-500' >
                                        View
                                    </td>
                                   
                                    <td onClick={() => { setFormValue(item, "Assign") }} className='border hover:underline underline-offset-2 cursor-pointer text-blue-500' >
                                        Assign
                                    </td>
      
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={5} className='border'>No form found.</td>
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

export default ViewForPendingObtained