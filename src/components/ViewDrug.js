import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewDrug = () => {

    const [drugs, setdrugs] = useState([])

    const getAllDrugs = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/drug/get", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                setdrugs(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setdrugs([])
            }

        } catch (error) {
            toast.error(error.message)
            setdrugs([])
        }
    }

    useEffect(() => {
        getAllDrugs();
    }, []);


    return (
        <>

            <p className='text-cyan-900 text-2xl m-2'>All Drugs:</p>

            <div className="overflow-x-auto border">
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug API</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Innovator</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug Compositions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {drugs.map((ele, index) => (
                            <tr key={index} className="odd:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele?.drug_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_api}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.innovator_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <ul className="list-disc">
                                        {ele.compositions?.map((v, i) => (
                                            <li key={i} className="text-sm">{v.composition_name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default ViewDrug
