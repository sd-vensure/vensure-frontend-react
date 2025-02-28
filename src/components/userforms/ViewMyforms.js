import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { setUserForm } from '../../store/user/userHelper';


const ViewMyforms = () => {

    const [data, setdata] = useState([]);

    const dispatch=useDispatch();

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);

    const getFormsForUserId= async ()=>{

        try {
            const getdata = await api.get(`userform/viewmyform/${currentuser.user_id}`)

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
      getFormsForUserId()
    }, []);


    const setFormValue=(item)=>{
        dispatch(setUserForm(item))
        navigate('/viewparticularform')
    };
    


  return (
    <div className="overflow-x-auto ">

    <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
        <thead className="text-center bg-blue-500">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Financial Year</th>
                <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">View</th>
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
                            <td onClick={()=>{setFormValue(item)}} className='border underline cursor-pointer text-blue-500' >
                                View
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

export default ViewMyforms