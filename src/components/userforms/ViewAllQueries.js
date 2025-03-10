import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setQueryAnswer } from '../../store/user/userHelper';

const ViewAllQueries = () => {

    const [data, setdata] = useState([]);
    const [filterval, setfilterval] = useState("All");

    const showquestionmodal = useSelector((state) => state.user.query_answer);


    const dispatch = useDispatch();

    const getMyQueriesData = async () => {
        try {
            const getdata = await api.get(`userform/allqueries`)

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
            setdata([])
        }
    }

    useEffect(() => {
        getMyQueriesData();
    }, [showquestionmodal])

    const viewQuestionandAnswer = (ele,type) => {
        let datatopass={...ele,"typeofview":type}
        dispatch(setQueryAnswer(datatopass))
    }


    return (
        <div className="overflow-x-auto ">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>All Queries</p>

            <div className='flex items-center mb-1 mt-2'>
                <p className='text-blue-500 mr-2'>Filter:</p>
                <select

                    value={filterval}
                    onChange={(e) => { setfilterval(e.target.value); }}
                    className="border mx-2 rounded drop-shadow"

                >
                    <option>All</option>
                    <option>Answered</option>
                    <option>Pending</option>
                </select>


            </div>

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white mt-3">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Questioned By</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Questioned On</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Answered By</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Answered On</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Give Answer</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data
                            .filter((val) => {
                                // "All" filter: no filtering, return all items
                                if (filterval === "All") return true;
                            
                                // "Answered" filter: only items where `answerby_name` is not empty or null
                                if (filterval === "Answered") {
                                  return val.answerby_name != null && val.answerby_name !== "";
                                }
                            
                                // "Pending" filter: only items where `answerby_name` is empty or null
                                if (filterval === "Pending") {
                                  return val.answerby_name == null || val.answerby_name === "";
                                }
                            
                                return true; // Default, just in case, return true for all other cases
                              })
                            .map((item, index) => (
                    <tr key={index}>
                        <td className='border'>{index + 1}</td>
                        <td className='border whitespace-wrap'>{item?.queryby_name}</td>
                        <td className='border'>{moment(item.queryby_date).format("DD-MM-YYYY") || "-"}</td>
                        <td className='border whitespace-wrap'>{item.answerby_name || "-"}</td>
                        <td className='border'>{item?.answerby_date ? moment(item?.answerby_date).format("DD-MM-YYYY") : "-"}</td>
                        <td className='border text-blue-500 underline'>
                            <span onClick={() => { viewQuestionandAnswer(item,"View") }} className='cursor-pointer'>View</span>
                        </td>
                        <td className='border text-blue-500 '>
                            {
                                item?.answerby_date
                                ? <span className='cursor-pointer'>-</span>
                                : <span onClick={() => { viewQuestionandAnswer(item,"Edit") }} className='cursor-pointer underline'>Answer</span>
                            }
                           
                        </td>


                    </tr>
                    )) :
                    <tr>
                        <td colSpan={6} className='border'>No Queries found.</td>
                    </tr>
                    }

                </tbody>

            </table>
        </div>
    )
}

export default ViewAllQueries
