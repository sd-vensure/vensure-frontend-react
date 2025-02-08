
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewPaf = () => {

    const [paf, setpaf] = useState([])

    const getAllPaf = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/paf/get", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                // toast.success(response.data.message)
                setpaf(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setpaf([])
            }

        } catch (error) {
            toast.error(error.message)
            setpaf([])
        }
    }

    useEffect(() => {
        getAllPaf();
    }, []);


    return (
        <>
            <p className='text-cyan-900 text-2xl m-2'>All PAF:</p>

            <div className="overflow-x-auto border">
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">PAF ID</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug API</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Innovator</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Client</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">PAF Date</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Brief Scope</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">API Sources</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">SKUs</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Import Licence API</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Import Licence RLD</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Compositions Selected</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Driving Market</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stakeholders</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {paf.map((ele, index) => (
                            <tr key={index} className="odd:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele?.paf_unique}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_api}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.drug_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.innovator_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.client_information}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(ele.paf_initiated_on).format("DD MMM YYYY")}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.brief_scope}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.api_sources}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.sku}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.import_license_api}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ele.import_license_rld}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <ul className="list-disc">
                                        {JSON.parse(ele.compositions_selected)?.map((v, i) => (
                                            <li key={i} className="text-sm text-left">{v}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <ul className="list-disc">
                                        {ele.driving_market && JSON.parse(ele.driving_market)?.map((v, i) => (
                                            <li key={i} className="text-sm text-left">{v}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <ul className="list-disc">
                                        { ele.stakeholders && JSON.parse(ele.stakeholders)?.map((v, i) => (
                                            <li key={i} className="text-sm text-left">{v.stakeholder_designation}-{v.stakeholder_name}</li>
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

export default ViewPaf
