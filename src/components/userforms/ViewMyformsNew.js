import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewMyformsNew = () => {

    const [tempdata, settempdata] = useState([]);
    const [data, setdata] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getFormsForUserId = async () => {

        try {
            const getdata = await api.get(`userform/viewmyformnew/${currentuser.user_id}`)

            if (getdata.data.status) {
                // toast.success(getdata.data.message)
                settempdata(getdata.data.data)
            }
            else {
                toast.info(getdata.data.message)
                settempdata([])
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

    useEffect(() => {
        let finaldata = [];

        if (tempdata.length > 0) {
            tempdata.map((form) => {

                let categoryLimits = [
                    { min: 50, max: 80 },
                    { min: 5, max: 25 },
                    { min: 10, max: 20 },
                    { min: 0, max: 0 }
                ];

                let categoriesdata = form.categoriesdata;

                let tempcategories = []

                let kpitotal = 0;

                categoryLimits.map((ele, index) => {
                    let maincategorytotal = categoriesdata.find((v) => v.category_id == index + 1)
                    kpitotal = kpitotal + parseInt(maincategorytotal.total)
                    tempcategories.push({ ...ele, ...maincategorytotal })
                })

                let is_categories_matching = (((tempcategories[0].total >= categoryLimits[0].min && tempcategories[0].total <= categoryLimits[0].max) &&
                    (tempcategories[1].total >= categoryLimits[1].min && tempcategories[1].total <= categoryLimits[1].max) &&
                    (tempcategories[2].total >= categoryLimits[2].min && tempcategories[2].total <= categoryLimits[2].max)) &&
                    kpitotal == 100)

                finaldata.push({ ...form, "categories_main": tempcategories, "kpitotal": kpitotal, is_categories_matching })

            })
        }

        setdata(finaldata)
    }, [tempdata])

    useEffect(() => {
        console.log(data, "this is data")
    }, [data])





    return (
        <div className="overflow-x-auto ">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>View KRA</p>

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white mt-3">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Financial Year</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Created On</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Edit Form</th>
                        <th className="whitespace-wrap px-4 py-2 font-medium text-white border">Update Target Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Status</th>
                        <th className="whitespace-wrap px-4 py-2 font-medium text-white border">Share to Designated Person</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">HR Status</th>
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
                                    <td className='border' >
                                        <span onClick={() => { setFormValue(item, "View") }} className='text-blue-500 hover:underline underline-offset-2 cursor-pointer'>View</span>
                                    </td>
                                    <td className='border' >
                                        {
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <span onClick={() => { setFormValue(item, "Edit") }} className='text-blue-500 hover:underline underline-offset-2 cursor-pointer'>Edit</span>
                                                : <span className='text-red-500'>Not Editable</span>
                                        }
                                    </td>

                                    <td className='border' >
                                        {
                                            item.is_verified == "Verified" && item.is_shared == "Y"
                                                ? <span onClick={() => { setFormValue(item, "EditDate") }} className='text-blue-500 hover:underline underline-offset-2 cursor-pointer'>Update</span>
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
                                        {item.is_categories_matching

                                            ?
                                            item.is_verified == "Pending" || item.is_verified == "Rejected"
                                                ? <button onClick={() => { setFormValue(item, "Share") }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Share</button>
                                                : <span className='text-green-500'>Shared</span>
                                            : <span className='text-green-500'>Categories Total not satisfactory</span>
                                        }
                                    </td>

                                    <td className='border cursor-pointer text-blue-500' >
                                        {
                                            item.is_verified == "Verified"
                                                ? item.is_shared == "Y"
                                                    ? <span className='text-green-500'>Shared</span>
                                                    : <span className='text-red-500'>Pending</span>
                                                : <span className='text-blue-500'>-</span>
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={9} className='border'>No form found.</td>
                            </tr>


                    }

                </tbody>

            </table>
        </div>
    )
}

export default ViewMyformsNew