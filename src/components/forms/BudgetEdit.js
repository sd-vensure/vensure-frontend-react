import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useSelector } from 'react-redux';

const BudgetEdit = () => {

    const { paf_id } = useParams();

    const navigate = useNavigate();

    const paf_selected = useSelector((state) => state.user.paf_selected);
    const currentuser = useSelector((state) => state.user.current_user);


    const [data, setdata] = useState([])
    const [data1, setdata1] = useState([])
    const [finaldata, setfinaldata] = useState([])

    const [departments, setdepartments] = useState([])

    const getFormdata = async () => {

        try {

            let resp = await api.get(`http://localhost:8000/api/budget/get/${paf_id}`)

            if (resp.data.status) {

                let tempdata = resp.data.data;
                let arrayfiltered = tempdata.filter((ele) => ele.department_name == currentuser.department_name);

                if (arrayfiltered.length > 0) {
                    setdata1(arrayfiltered)
                }
                else {

                    let response = await api.get(`http://localhost:8000/api/form/get-paf-form/${paf_id}`);

                    if (response.data.data) {
                        // toast.success(response.data.message)

                        setdata(response.data.data)
                    }
                    else {
                        toast.info(response.data.message)
                        setdata([])
                    }
                }



            }
            else {

                let response = await api.get(`http://localhost:8000/api/form/get-paf-form/${paf_id}`);

                if (response.data.data) {
                    // toast.success(response.data.message)

                    setdata(response.data.data)
                }
                else {
                    toast.info(response.data.message)
                    setdata([])
                }

            }



        } catch (error) {
            toast.error(error.message)
            setdata([])
        }
    }

    const getAllDepartments = async () => {
        try {

            let response = await api.get("http://localhost:8000/api/department/get");

            if (response.data.data) {
                // toast.success(response.data.message)
                setdepartments(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setdepartments([])
            }

        } catch (error) {
            toast.error(error.message)
            setdepartments([])
        }
    }

    useEffect(() => {
        getFormdata();
        getAllDepartments()
    }, []);



    useEffect(() => {
        let result = [];

        if (data.length > 0 && departments.length > 0) {
            data.forEach(item => {
                let header = result.find(h => h.pafform_header_id === item.pafform_header_id);

                // If header doesn't exist, create a new header object
                if (!header) {
                    let department = departments.find((ele) => ele?.department_name == item?.pafform_team)
                    header = {
                        ...item,  // Add the entire header data
                        "q1": 0,
                        "q2": 0,
                        "q3": 0,
                        "q4": 0,
                        "department_name": department?.department_name,
                        "department_id": department?.department_id,
                        "paf_id": paf_selected.paf_id,
                        "paf_unique": paf_selected.paf_unique,
                        "item_type": "New",
                        "budget_status": "New",
                        "costhead": ""
                    };
                    result.push(header);
                }

            });

            console.log(result, "this is result")
            result = result.filter((ele) => ele.department_name == currentuser.department_name);

        }



        // console.log(result)

        setfinaldata(result);


    }, [data, departments])

    useEffect(() => {

        const result = [];

        if (data1.length > 0 && departments.length > 0) {
            data1.forEach(item => {
                if (item.budget_status == "Rejected") {
                    result.push({ ...item, "header_status": "Active", "pafform_team": item?.department_name, "item_type": "Old" })

                    let findingsame = data1.find((vv) => (vv.budget_status == "Pending" || vv.budget_status == "Approved") && item.pafform_id == vv.pafform_id && item.department_id == vv.department_id)
                    let findalreadyinsert = result.find((zz) => item.pafform_id == zz.pafform_id && item.department_id == zz.department_id && zz.item_type == "New")

                    let header = {
                        ...item,  // Add the entire header data
                        "q1": 0,
                        "q2": 0,
                        "q3": 0,
                        "q4": 0,
                        "department_name": item?.department_name,
                        "department_id": item?.department_id,
                        "paf_id": item?.paf_id,
                        "paf_unique": item?.paf_unique,
                        "item_type": "New",
                        "budget_status": "New",
                        "pafform_item_name": item.pafform_item_name,
                        "pafform_team": item?.department_name,
                        "header_status": "Active",
                        "costhead": ""
                    };

                    if (!findingsame && !findalreadyinsert) {
                        console.log(findingsame, "this is finding same")
                        result.push(header);
                    }
                }
                else {
                    result.push({ ...item, "header_status": "Active", "pafform_team": item?.department_name, "item_type": "Old" })
                }

            });
        }

        const statusOrder = { "Approved": 1, "Rejected": 2, "Processing": 3, "New": 4 };

        result.sort((a, b) => {

            if (a.department_id !== b.department_id) {
                return a.department_id - b.department_id;
            }

            return statusOrder[a.budget_status] - statusOrder[b.budget_status];
        });

        setfinaldata(result);

    }, [data1, departments])


    const handleHeaderChange = (name, val, index) => {
        let tempdata = [...finaldata];
        if (name == "costhead") {
            val = val == "" ? "" : val;
        }
        else {
            val = val == "" ? 0 : parseInt(val);
        }
        tempdata[index][name] = val;
        setfinaldata(tempdata)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        // console.log(finaldata,"this is finaldats")
        let datatopass = finaldata.filter((vv) => vv.item_type == "New")
        console.log(datatopass)
        // const converteddata= convertDataSending();

        try {
            const updatedata = await api.post("budget/add", { "data": datatopass })

            if (updatedata.status) {
                toast.success(updatedata.data.message)
                navigate("/paf")
            }
            else {
                toast.info(updatedata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className="overflow-x-auto ">
            <form>
                <button onClick={onSubmit} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button>
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Team</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Costhead</th>
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Target Date</th> */}
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q1</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q2</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q3</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q4</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {/* {
                            finaldata.filter((ee) => ee.header_status == "Active").map((ele, index) =>
                            (
                                <>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='whitespace-wrap'>{ele.pafform_item_name}</td>
                                        <td>{ele.pafform_team}</td>
                                        <td>
                                            <input disabled={ele.item_type == "New" ? false : true} value={ele.costhead} onChange={(e)=>handleHeaderChange(e.target.name, e.target.value, index)} name="costhead" type="text" placeholder='Costhead' className="m-1 shadow appearance-none border h-9 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base" />
                                        </td>

                                        <td className=''>
                                            <input disabled={ele.item_type == "New" ? false : true} value={ele.q1} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q1" type="text" pattern="\d*" required placeholder='Q1' />
                                        </td>
                                        <td>
                                            <input disabled={ele.item_type == "New" ? false : true} value={ele.q2} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q2" type="text" pattern="\d*" required placeholder='Q2' />
                                        </td>
                                        <td>
                                            <input disabled={ele.item_type == "New" ? false : true} value={ele.q3} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q3" type="text" pattern="\d*" required placeholder='Q3' />
                                        </td>
                                        <td>
                                            <input disabled={ele.item_type == "New" ? false : true} value={ele.q4} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q4" type="text" pattern="\d*" required placeholder='Q4' />
                                        </td>
                                        <td className='whitespace-wrap'>
                                            {ele.budget_status == "Approved" && <span className='text-green-500'>Approved</span>}
                                            {ele.budget_status == "Rejected" && <span className='text-red-500'>Rejected</span>}
                                            {ele.budget_status == "Pending" && <span className='text-blue-500'>Processing</span>}
                                            {ele.budget_status == "New" && <span className='text-blue-500'>New</span>}
                                        </td>

                                    </tr>

                                </>
                            ))
                        } */}

                        {finaldata.filter((ee) => ee.header_status == "Active").length > 0 ? (
                            finaldata.filter((ee) => ee.header_status == "Active").map((ele, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='whitespace-wrap'>{ele.pafform_item_name}</td>
                                    <td>{ele.pafform_team}</td>
                                    <td>
                                        <input disabled={ele.item_type !== "New"} value={ele.costhead} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} name="costhead" type="text" placeholder='Costhead' className="m-1 shadow appearance-none border h-9 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base" />
                                    </td>
                                    <td>
                                        <input disabled={ele.item_type !== "New"} value={ele.q1} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q1" type="text" pattern="\d*" required placeholder='Q1' />
                                    </td>
                                    <td>
                                        <input disabled={ele.item_type !== "New"} value={ele.q2} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q2" type="text" pattern="\d*" required placeholder='Q2' />
                                    </td>
                                    <td>
                                        <input disabled={ele.item_type !== "New"} value={ele.q3} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q3" type="text" pattern="\d*" required placeholder='Q3' />
                                    </td>
                                    <td>
                                        <input disabled={ele.item_type !== "New"} value={ele.q4} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q4" type="text" pattern="\d*" required placeholder='Q4' />
                                    </td>
                                    <td className='whitespace-wrap'>
                                        {ele.budget_status == "Approved" ? <span className='text-green-500'>Approved</span> :
                                            ele.budget_status == "Rejected" ? <span className='text-red-500'>Rejected</span> :
                                                ele.budget_status == "Pending" ? <span className='text-blue-500'>Processing</span> :
                                                    ele.budget_status == "New" ? <span className='text-blue-500'>New</span> : null}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-gray-500 py-4">
                                    Your department isnt assigned.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </form>
        </div>
    )
}

export default BudgetEdit
