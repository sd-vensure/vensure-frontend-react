import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ViewStakeholder = () => {

    const [stakeholders, setstakeholders] = useState([])

    const getAllStakeholders = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/paf/view-stakeholder", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                setstakeholders(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setstakeholders([])
            }

        } catch (error) {
            toast.error(error.message)
            setstakeholders([])
        }
    }

    useEffect(() => {
        getAllStakeholders();
    }, []);


    return (
        <>

            <p className='text-cyan-900 font-semibold text-xl mt-4 m-2'>All Stakeholders:</p>

            <div className="overflow-x-auto border">
                <table className="min-w-full text-center divide-y-2 divide-gray-200  text-sm">
                    <thead className="text-center bg-blue-500">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Stakeholder Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Designation</th>
                            
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {stakeholders.map((ele, index) => (
                            <tr key={index} className="odd:bg-gray-50">
                                <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                <td className="border whitespace-nowrap px-4 py-2 text-gray-800">{ele?.stakeholder_name}</td>
                                <td className="border whitespace-nowrap px-4 py-2 text-gray-800">{ele.stakeholder_designation}</td>
                                
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default ViewStakeholder
