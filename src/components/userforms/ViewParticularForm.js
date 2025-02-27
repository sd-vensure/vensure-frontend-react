import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';


const ViewParticularForm = () => {

    const [data, setdata] = useState([]);

    const currentuser = useSelector((state) => state.user.current_user);
    const userform = useSelector((state) => state.user.user_form);

    const getFormsForFormId= async ()=>{

        try {
            const getdata = await api.get(`userform/getparticularform/${userform.form_id}`)

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
        getFormsForFormId()
    }, [])
    


  return (
    <div className="overflow-x-auto ">

    <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
        <thead className="text-center bg-blue-500">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Type</th>
                <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Remarks</th>
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {
                data.length > 0 ?
                    data.map((item, index) => (
                        <tr key={index}>
                            <td className='border'>{index + 1}</td>
                            <td className='whitespace-wrap border'>
                                {item.type}
                            </td>
                            <td className='border'>
                                {moment(item.date).format('DD-MM-YYYY')}
                            </td>
                            <td className='border' >
                                {item.remarks}
                            </td>
                        </tr>
                    )) :
                    <tr>
                        <td colSpan={4} className='border'>No form found.</td>
                    </tr>


            }

        </tbody>

    </table>
</div>
  )
}

export default ViewParticularForm