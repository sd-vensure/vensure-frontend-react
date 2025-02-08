
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewInnovator = () => {

    const [innovators, setinnovators] = useState([])

    const getAllInnovators = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/drug/getInnovator", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                setinnovators(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setinnovators([])
            }

        } catch (error) {
            toast.error(error.message)
            setinnovators([])
        }
    }

    useEffect(() => {
        getAllInnovators();
    }, []);


    return (
        <>
            <p className='text-cyan-900 text-2xl m-2'>All Innovators:</p>

            <div className="overflow-x-auto border">
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Innovator Name</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {innovators.map((ele, index) => (
                            <tr key={index} className="odd:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele?.innovator_name}</td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default ViewInnovator
