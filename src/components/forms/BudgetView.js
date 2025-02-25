import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useSelector } from 'react-redux';

const BudgetView = () => {

    const { paf_id } = useParams();

    const navigate = useNavigate();

    const paf_selected = useSelector((state) => state.user.paf_selected);

    const [data, setdata] = useState([])
    const [extradata, setextradata] = useState(null)

    const [filter, setfilter] = useState("All")


    const getBudgetEntries = async () => {
        try {

            let response = await api.get(`http://localhost:8000/api/budget/get/${paf_id}`);

            if (response.data.data) {
                // toast.success(response.data.message)
                let finaldata = calculateData(response.data.data)
                setdata(finaldata)
            }
            else {
                toast.info(response.data.message)
                setdata([])
            }

        } catch (error) {
            toast.error(error.message)
            setdata([])
        }
    }

    const calculateData = (val) => {
        let tempdata = [];
        let sumq1 = 0;
        let sumq2 = 0;
        let sumq3 = 0;
        let sumq4 = 0;
        let totalsum = 0;

        val.map((v) => {
            if (v.budget_status == "Approved") {
                sumq1 += parseInt(v.q1);
                sumq2 += parseInt(v.q2);
                sumq3 += parseInt(v.q3);
                sumq4 += parseInt(v.q4);
                totalsum += (parseInt(v.q1) + parseInt(v.q2) + parseInt(v.q3) + parseInt(v.q4))
            }
            // totalsum+=parseInt(v.q4);
            tempdata.push({
                ...v, "qtotal": (parseInt(v.q1) + parseInt(v.q2) + parseInt(v.q3) + parseInt(v.q4))
            })
        })

        setextradata({
            sumq1, sumq2, sumq3, sumq4, totalsum
        })

        return tempdata;
    }

    useEffect(() => {
        // getFormdata();
        // getAllDepartments()
        getBudgetEntries();
    }, []);


    // const onSubmit = async (e) => {
    //     e.preventDefault()

    //     console.log(finaldata)
    //     // const converteddata= convertDataSending();

    //     try {
    //         const updatedata = await api.post("budget/add", { "data": finaldata })

    //         if (updatedata.status) {
    //             toast.success(updatedata.data.message)
    //             navigate("/paf")
    //         }
    //         else {
    //             toast.info(updatedata.data.message)
    //         }

    //     } catch (error) {
    //         toast.error(error.message)
    //     }

    // }

    const approveDeclineBudget = async (ele, val) => {
        try {

            const response = await api.post(`http://localhost:8000/api/budget/update-budget-status/${ele.budget_id}`, { "status": val });

            if (response.data.status) {

                toast.success(response.data.message)
            }
            else {
                toast.info(response.data.message)
            }


        } catch (error) {
            toast.info(error.message)
        }
        finally {
            getBudgetEntries()
        }
    }

    return (
        <>
            <div className="overflow-x-auto ">
                <form>
                    <label className='text-sm text-cyan-800 my-1'>Filter:</label>

                    <select
                        name="dropdown"
                        value={filter}
                        onChange={(e) => { e.preventDefault(); setfilter(e.target.value) }}
                        className="border rounded border-black shadow p-2 w-full my-2"
                        required
                    >
                        <option>All</option>
                        <option>Approved</option>

                    </select>
                    {/* <button onClick={onSubmit} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button> */}
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-center bg-blue-500">
                            <tr>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">No.</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Department Name</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Costhead</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Created By</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Q1</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Q2</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Q3</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Q4</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Total</th>
                                <th className="whitespace-nowrap py-2 font-medium text-white border">Status</th>
                                {/* <th className="whitespace-nowrap py-2 font-medium text-gray-900">Approve/Reject</th> */}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data.filter((vv) => filter == "All" ? vv : vv.budget_status == "Approved").map((ele, index) =>
                                (
                                    <>
                                        <tr key={index} className=' text-center'>
                                            <td className='border'>{index + 1}</td>
                                            <td className='border'>{ele.department_name}</td>
                                            <td className='border whitespace-wrap'>{ele.costhead ||"-"}</td>
                                            <td className='border'>{ele.budget_updated_by}</td>
                                            <td className='border'>{ele.q1}</td>
                                            <td className='border'>{ele.q2}</td>
                                            <td className='border'>{ele.q3}</td>
                                            <td className='border'>{ele.q4}</td>
                                            <td className='border'>{ele.qtotal}</td>
                                            <td className='border'>
                                                {ele.budget_status == "Approved" && <span className='text-green-600'>Approved</span>}
                                                {ele.budget_status == "Rejected" && <span className='text-red-600'>Rejected</span>}
                                                {ele.budget_status == "Pending" && <span className='text-blue-600'>In Process</span>}


                                            </td>
                                            {/* <td>
                                                {
                                                    ele.budget_status == "Pending"
                                                        ? <div className='w-full flex flex-col justify-center items-center'>
                                                            <button onClick={(e) => { e.preventDefault(); approveDeclineBudget(ele, "Approved") }} className='block w-1/2 m-1 rounded-sm border border-green-600 bg-green-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-green-600 focus:ring-3 focus:outline-hidden'>Approve</button>
                                                            <button onClick={(e) => { e.preventDefault(); approveDeclineBudget(ele, "Rejected") }} className='block w-1/2 m-1 rounded-sm border border-red-600 bg-red-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden'>Reject</button>
                                                        </div>
                                                        : <span className=''>{ele.budget_approved_by}</span>
                                                }

                                            </td> */}

                                        </tr>

                                    </>
                                ))
                            }

                            <tr className=''>
                                <td className='p-2' colSpan={9}>
                                    Total Q1 (Approved): {extradata?.sumq1}
                                </td>
                            </tr>

                            <tr className=''>
                                <td className='p-2' colSpan={9}>
                                    Total Q2 (Approved): {extradata?.sumq2}
                                </td>
                            </tr>

                            <tr className=''>
                                <td className='p-2' colSpan={9}>
                                    Total Q3 (Approved): {extradata?.sumq3}
                                </td>
                            </tr>

                            <tr className=''>
                                <td className='p-2' colSpan={9}>
                                    Total Q4 (Approved): {extradata?.sumq4}
                                </td>
                            </tr>

                            <tr className=''>
                                <td className='p-2' colSpan={9}>
                                    Total All (Approved): {extradata?.totalsum}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </form>
            </div>
        </>
    )
}

export default BudgetView
