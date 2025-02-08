
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddInnovator = () => {

    const [innovatorName, setinnovatorName] = useState("")

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try {
            let response = await axios.post("http://localhost:8000/api/drug/addInnovator",{innovatorName}, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.status) {
                setinnovatorName("")
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
                <p className='text-cyan-900 text-xl text-center m-2'>Add Innovator:</p>

                <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto">

                    <label className='text-sm my-1 text-cyan-800'>Drug Name:</label>
                    <input
                        type="text"
                        value={innovatorName}
                        onChange={(e)=>setinnovatorName(e.target.value)}
                        placeholder="Innovator Name"
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

export default AddInnovator
