import React, { useState } from 'react'
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUserForm = () => {

    const [data, setdata] = useState([]);

    const navigate = useNavigate()

    const addNewData = () => {
        let newData = {
            type: '',
            date: '',
            remarks: ''
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
            const uploaddata = await api.post("userform/add", { "data": data })

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                setdata([])
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }



    return (
        <div className="overflow-x-auto ">

            <button onClick={()=>{submitForm()}} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button>

            <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white">
                <thead className="text-center bg-blue-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Type</th>
                        <th className="whitespace-nowrap px-1 py-2 font-medium text-white border">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Remarks</th>
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
                                        <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.type} name="type" type='text' className=' w-full' />
                                    </td>
                                    <td className='border'>
                                        <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.date} name="date" type='date' className=' w-fit' />
                                    </td>
                                    <td className='border'>
                                        <input onChange={(e) => handleChange(e.target.name, e.target.value, index)} value={item.remarks} name="remarks" type='text' className=' w-full' />
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
                                <td colSpan={5} className='border'>Nothing added yet</td>
                            </tr>


                    }

                    <tr className='text-left'>
                        <td colSpan={4} className='border'>
                            <button onClick={() => addNewData()} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Add New</button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default AddUserForm