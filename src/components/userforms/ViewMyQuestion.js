import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setQueryAnswer } from '../../store/user/userHelper';

const ViewMyQuestion = () => {

    const [data, setdata] = useState([]);
    
    const dispatch=useDispatch();

    const getMyQueriesData = async () => {
        try {
            const getdata = await api.get(`userform/myqueries`)

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
    }, [])

    const viewQuestionandAnswer=(ele)=>{
        let datatopass={...ele,"typeofview":"View"}
        dispatch(setQueryAnswer(datatopass))
    }


    return (
        <div className="overflow-x-auto ">

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white mt-3">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Questioned By</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Questioned On</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Answered By</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Answered On</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='border whitespace-wrap'>{item?.queryby_name}</td>
                                    <td className='border'>{moment(item.queryby_date).format("DD-MM-YYYY") || "-"}</td>
                                    <td className='border whitespace-wrap'>{item.answerby_name || "-"}</td>
                                    <td className='border'>{item?.answerby_date ? moment(item?.answerby_date).format("DD-MM-YYYY") : "-"}</td>
                                    <td className='border text-blue-500 underline'>
                                        <span onClick={()=>{viewQuestionandAnswer(item,"View")}} className='cursor-pointer'>View</span>
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

export default ViewMyQuestion
