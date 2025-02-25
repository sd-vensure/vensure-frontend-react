import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddStakeholder = () => {
    const [stakeholdername, setstakeholdername] = useState("")
    const [stakeholderdesignation, setstakeholderdesignation] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post("http://localhost:8000/api/paf/add-stakeholder", { "stakeholder_name": stakeholdername, "designation": stakeholderdesignation }, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.status) {
                setstakeholdername("")
                setstakeholderdesignation("")
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
            <p className='text-cyan-800 font-semibold text-xl text-center m-2'>Add Stakeholder:</p>

            <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto">

                <label className='text-sm my-1 text-cyan-800'>Stakeholder Name:</label>
                <input
                    type="text"
                    value={stakeholdername}
                    onChange={(e) => setstakeholdername(e.target.value)}
                    placeholder="Stakeholder Name"
                    className="border p-2 w-full my-2"
                    required
                />
                
                <label className='text-sm my-1 text-cyan-800'>Stakeholder Designation:</label>
                <input
                    type="text"
                    value={stakeholderdesignation}
                    onChange={(e) => setstakeholderdesignation(e.target.value)}
                    placeholder="Designation"
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

export default AddStakeholder
