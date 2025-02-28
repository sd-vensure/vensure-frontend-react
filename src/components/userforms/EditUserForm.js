import React, { useEffect, useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment';

const EditUserForm = () => {

    const userform = useSelector((state) => state.user.user_form);
    
    const [data, setdata] = useState([]);
    const [finance, setfinance] = useState(userform.financial_year)

    const navigate = useNavigate();

    const currentuser = useSelector((state) => state.user.current_user);


    const addNewData = () => {
        let newData = {
            type: '',
            quarter: '',
            activity: ''
        }
        setdata([...data, newData])
    }


    const handleChange = (name, val, index) => {
        let tempdata = [...data];
        tempdata[index][name] = val;
        setdata(tempdata)
    }

    
    const submitForm= async ()=>{

        // console.log(data)

        try {
            const uploaddata = await api.put(`userform/update/${userform.form_id}`, { "data": data })

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                navigate("/")
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getFormsForFormId= async ()=>{

        try {
            const getdata = await api.get(`userform/getparticularform/${userform.form_id}`)

            if (getdata.data.status) {
                // toast.success(getdata.data.message)

                let tempdata=getdata.data.data.map((ele)=>{
                    return {...ele,date:moment(ele.date).format("YYYY-MM-DD")}
                });

                setdata(tempdata)
            }
            else {
                toast.info(getdata.data.message)
                navigate("/")
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

            <button onClick={() => { submitForm() }} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button>

            <div className=''>
                <p className='text-blue-500 text-lg'>User: <span className='text-black'>{userform.user_first_name}</span></p>
                <p className='text-blue-500 text-lg'>Department: <span className='text-black'>{userform.department_name}</span></p>
                <p className='text-blue-500 text-lg'>Financial Year: <span className='text-black'>{userform.financial_year}</span></p>
                
            </div>

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap py-2 font-medium text-white border">Type</th>
                        <th className="whitespace-nowrap  py-2 font-medium text-white border">Quarter</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Activity</th>
                        <th className="whitespace-nowrap py-2 font-medium text-white border">Delete</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data.length > 0 ?
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='whitespace-wrap border'>
                                        {/* <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.type} name="type" type='text' className=' w-full' /> */}

                                        <select
                                            name="type"
                                            value={item.type}
                                            onChange={(e) => { handleChange(e.target.name, e.target.value, index) }}
                                            className="border mx-2"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="KRA">KRA</option>
                                            <option value="KPI">KPI</option>

                                        </select>

                                    </td>
                                    <td className='border'>
                                        {/* <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.date} name="date" type='date' className=' w-fit' /> */}

                                        <select
                                            name="quarter"
                                            value={item.quarter}
                                            onChange={(e) => { handleChange(e.target.name, e.target.value, index) }}
                                            className="border mx-2"
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value="Q1">Q1</option>
                                            <option value="Q2">Q2</option>
                                            <option value="Q3">Q3</option>
                                            <option value="Q4">Q4</option>
                                        </select>

                                    </td>
                                    <td className='border px-2'>
                                        <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.activity} name="activity" type='text' className=' w-full' />
                                    </td>
                                    <td className='border'>
                                        <button onClick={() => {
                                            let tempdata = [...data];
                                            tempdata.splice(index, 1);
                                            setdata(tempdata)
                                        }} className='bg-red-500 text-white px-3 py-1 rounded ml-2 m-2'>Delete</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={6} className='border'>Nothing added yet</td>
                            </tr>


                    }

                    <tr className='text-left'>
                        <td colSpan={6} className='border'>
                            <button onClick={() => addNewData()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Add New</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default EditUserForm