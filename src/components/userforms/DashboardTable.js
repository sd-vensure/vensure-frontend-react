import React, { useEffect, useState } from 'react'

const DashboardTable = ({ formid, data }) => {

    const [maindata, setmaindata] = useState(null);

    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {

            let all_total_weightage = 0;
            let all_obtained_total = 0;
            let all_kpis_count = 0;
            let all_average = 0;

            data.map((ele) => {
                all_total_weightage += parseInt(ele.total_weightage)
                all_obtained_total += parseInt(ele.total_obtained)
                all_kpis_count += parseInt(ele.total_targets)
            })

            all_average=(parseInt(all_obtained_total)/(parseInt(all_kpis_count) * 10)) * 100

            setmaindata({
                all_total_weightage, all_obtained_total,all_kpis_count,all_average
            })
        }
        else {
            setmaindata(null)
        }
    }, [data])


    return (

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quarter</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">KPIs Count</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">KPIs Total Weightage</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">KPIs Obtained</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Average</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        data && Array.isArray(data) && data.length > 0 && data.map((ele) =>
                            ele.kpi_quarter != null && <tr>
                                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">{ele.kpi_quarter}</td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{ele?.total_targets}</td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{ele?.total_weightage}</td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{ele?.total_obtained}/{parseInt(ele?.total_targets) * 10}</td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{((ele?.total_obtained/(parseInt(ele?.total_targets) * 10)) * 100).toFixed(2)}%</td>
                            </tr>

                        )


                    }

                    {
                        data && Array.isArray(data) && data.length > 0 &&
                        <tr>
                            <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">Overall</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{maindata?.all_kpis_count}</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{maindata?.all_total_weightage}/100</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{maindata?.all_obtained_total}/{maindata?.all_kpis_count * 10}</td>
                            <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{maindata?.all_average ? (maindata?.all_average).toFixed(2) : "-"}%</td>
                        </tr>
                    }



                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable
