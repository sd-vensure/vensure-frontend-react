
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { delPAfRevise, openPAFModal, setPaf, setPafRevise } from '../store/user/userHelper'
import { useNavigate } from 'react-router-dom'
import api from './axiosapi'

const ViewPaf = () => {

    const [paf, setpaf] = useState([]);

    const currentuser = useSelector((state) => state.user.current_user);

    let roles = currentuser.roles;

    const [filterby, setfilterby] = useState("All")



    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getAllPaf = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/paf/get", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                setpaf(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setpaf([])
            }

        } catch (error) {
            toast.error(error.message)
            setpaf([])
        }
    }

    useEffect(() => {
        getAllPaf();
        dispatch(delPAfRevise())
    }, []);

    const handlePageChange = (val) => {
        dispatch(setPaf(val))
        navigate(`/pafform/${val.paf_id}`)
    }

    const approveDeclinePAF = async (ele, status) => {
        try {
            const resp = await api.post(`paf/status-change/${ele.paf_id}`, { "status": status });

            if (resp.data.status) {
                getAllPaf();
            }
            else {
                toast.info(resp.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const createRevise = (ele) => {

        dispatch(setPafRevise(ele))
        navigate(`/pafrevise`)

    }


    const assignDepartmentTimeline = (ele) => {

        dispatch(setPafRevise(ele))
        navigate(`/pafdepartmentassign`)

    }

    const addBudget = (ele) => {

        dispatch(setPafRevise(ele))
        navigate(`/assignbudget`)

    }

    const openPAFInformation = (ele) => {

        dispatch(setPaf(ele))
        dispatch(openPAFModal())

        // navigate(`/assignbudget`)

    }


    return (
        <>
            <div className='flex items-center'>
                <p className='text-cyan-900 text-base m-2'>Filter:</p>
                <select

                    value={filterby}
                    onChange={(e) => { setfilterby(e.target.value) }}
                    className="border p-2 w-fit my-2"
                    required
                >
                    <option>All</option>
                    <option>Pending Approval</option>

                </select>
            </div>

            <div className="overflow-x-auto border">
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">PAF ID</th>
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug API</th> */}
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug Name</th>
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Innovator</th> */}
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Client</th>
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">PAF Date</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Brief Scope</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">API Sources</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">SKUs</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Import Licence API</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Import Licence RLD</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Compositions Selected</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Driving Market</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stakeholders</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created By</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th> */}
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Approved/Rejected</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Assign Department</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">View</th>
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Approved At</th> */}
                            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Assign</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Budget</th> */}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {paf
                            .filter((ele) => filterby == "All" ? ele : ele.paf_approved_by == null)
                            .map((ele, index) => (
                                <tr key={index} className="odd:bg-gray-50">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                    <td
                                        onClick={() => ele.paf_approved_status === "Accepted" && handlePageChange(ele)}
                                        className="whitespace-nowrap px-4 py-2 text-gray-700 underline hover:cursor-pointer"
                                    >
                                        {ele?.paf_unique}
                                    </td>

                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_api}</td> */}
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_name}</td>
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_innovator}</td> */}
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.client_name}</td>
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(ele.paf_created_on).format("DD MMM YYYY")}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.brief_scope}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.api_sources}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.sku}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.import_license_api}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.import_license_rld}</td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {ele.compositions}
                                    </td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <ul className="list-disc">
                                            {ele.driving_market && JSON.parse(ele.driving_market)?.map((v, i) => (
                                                <li key={i} className="text-sm text-left">{v}</li>
                                            ))}
                                        </ul>
                                    </td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <ul className="list-disc">
                                            {ele.stakeholders && JSON.parse(ele.stakeholders)?.map((v, i) => (
                                                <li key={i} className="text-sm text-left">{v.stakeholder_designation}-{v.stakeholder_name}</li>
                                            ))}
                                        </ul>
                                    </td> */}
                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.paf_created_by || "-"}</td> */}
                                    <td className="whitespace-nowrap px-4 py-2">
                                        {ele.paf_approved_status == "Pending" && <span className='text-red-600'>Pending</span>}
                                        {ele.paf_approved_status == "Accepted" && <span className='text-green-600'>Accepted</span>}
                                        {ele.paf_approved_status == "Rejected" && <span className='text-red-600'>Rejected</span>}</td>

                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.paf_created_at ? moment(ele.paf_created_at).format("DD-MMM-YYYY") : "-"}</td> */}

                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {
                                            ele.paf_approved_by
                                                ? ele.paf_approved_by
                                                : Array.isArray(roles) && roles.some(role => ["ApprovePAF"].includes(role))
                                                    ? <div className='w-full flex flex-col justify-center items-center'>
                                                        <button onClick={() => { approveDeclinePAF(ele, "Accepted") }} className='block w-1/2 m-1 rounded-sm border border-green-600 bg-green-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-green-600 focus:ring-3 focus:outline-hidden'>Approve</button>
                                                        <button onClick={() => { approveDeclinePAF(ele, "Rejected") }} className='block w-1/2 m-1 rounded-sm border border-red-600 bg-red-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden'>Reject</button>
                                                    </div>
                                                    : <span className='text-red-700'>Approval Pending</span>
                                        }
                                    </td>

                                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.paf_approved_at ? moment(ele.paf_approved_at).format("DD-MMM-YYYY") : "Approval Pending"}</td> */}

                                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                        {
                                            ele.paf_approved_by && ele.paf_approved_status == "Accepted"
                                                ? ele.assign_departments == "Y"
                                                    ? <span className='text-green-700'>Assigned</span>
                                                    : <button onClick={() => handlePageChange(ele)} className=' rounded-sm border border-indigo-600 bg-indigo-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden'>Assign</button>
                                                : "Waiting for Approval"
                                        }
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <span onClick={() => { openPAFInformation(ele) }} className='underline cursor-pointer'>View</span>
                                    </td>

                                    {/* <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                        {
                                            ele.assign_departments=="Y"
                                                ?<button onClick={() => { addBudget(ele) }} className=' rounded-sm border border-indigo-600 bg-indigo-600 p-1 text-xs font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden'>Budget</button>
                                                : "Department Assign Pending"
                                        }
                                    </td> */}



                                </tr>

                            ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default ViewPaf
