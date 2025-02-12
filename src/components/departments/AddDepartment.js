import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../axiosapi'

const AddDepartment = () => {
    const [departmentname, setdepartmentname] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await api.post("http://localhost:8000/api/department/add", { "department_name": departmentname });

            if (response.data.status) {
                setdepartmentname("")
                toast.success(response.data.message)
            }
            else {

                toast.info(response.data.message)

            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='p-2'>
            <p className='text-cyan-900 text-xl text-center m-2'>Add Department:</p>

            <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto">

                <label className='text-sm my-1 text-cyan-800'>Department Name:</label>
                <input
                    type="text"
                    value={departmentname}
                    onChange={(e) => setdepartmentname(e.target.value)}
                    placeholder="Department Name"
                    className="border p-2 w-full my-2"
                    required
                />


                <button type="submit" className="bg-blue-700 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddDepartment
