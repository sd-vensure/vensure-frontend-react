import React, { useEffect, useState } from 'react'
import { PieChart,Pie } from 'react-minimal-pie-chart';
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useDispatch } from 'react-redux';
import { kpiModalDel, kpiModalSet } from '../../store/user/userHelper';

const DashboardCards = ({ formid, data }) => {

    const [hoveredSegment, setHoveredSegment] = useState(null);

    const dispatch = useDispatch()

    let colordata = [
        {
            quarter: "Q1",
            data: [
                { title: "Complete", color: "#E38627", value: 0 },
                { title: "Incomplete", color: "#C13C37", value: 0 }
            ]
        },
        {
            quarter: "Q2",
            data: [
                { title: "Complete", color: "#6A2135", value: 0 },
                { title: "Incomplete", color: "#1D3C8C", value: 0 }
            ]
        },
        {
            quarter: "Q3",
            data: [
                { title: "Complete", color: "#FF6347", value: 0 },
                { title: "Incomplete", color: "#32CD32", value: 0 }
            ]
        },
        {
            quarter: "Q4",
            data: [
                { title: "Complete", color: "#FFD700", value: 0 },
                { title: "Incomplete", color: "#8A2BE2", value: 0 }
            ]
        },
    ]

    const [maindata, setmaindata] = useState(colordata)


    const getValidData = (data) => {
        return Array.isArray(data) && data.length > 0 ? data : [{ title: "No Data", value: 100, color: "#808080" }];
    };

    useEffect(() => {
        let temparray = []
        if (data && Array.isArray(data) && data.length > 0) {
            colordata.map((ele) => {
                let findobj = data.find((ee) => (ee.kpi_quarter) === (ele.quarter))
                if (findobj) {
                    // console.log("inside find")
                    let arraysextra = [...ele.data];
                    console.log(arraysextra, "this is array")
                    console.log(findobj, "this is findobj")
                    arraysextra[0].value = parseInt(findobj.total_completions);
                    arraysextra[1].value = parseInt(findobj.total_targets) - parseInt(findobj.total_completions);
                    temparray.push({
                        quarter: ele.quarter,
                        data: arraysextra
                    })
                }
                else {
                    temparray.push(ele)
                }
            })
        }

        setmaindata(temparray)

    }, [data])

    const viewKpis = async (ele) => {
        try {

            let resposne = await api.get(`/userform/getkpis/${formid}/${ele.quarter}`);

            if (resposne.data.status) {
                dispatch(kpiModalSet(resposne.data.data))

            }
            else {
                dispatch(kpiModalDel([]))
                toast.info(resposne.data.message)
            }


        } catch (error) {
            dispatch(kpiModalDel([]))
            toast.error(error.message)
        }

    }


    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 justify-center items-center text-center py-6 pt-2 w-full">

            {
                maindata && Array.isArray(maindata) && maindata.length > 0 &&
                maindata.map((ele, index) =>
                    ele.data[0].value + ele.data[1].value > 0 &&
                    <div onClick={() => { viewKpis(ele) }} className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-full cursor-pointer">
                        <div index={index} className="relative  flex justify-center items-center w-48 h-48">
                            <PieChart
                                data={getValidData(ele.data)}
                                lineWidth={30}
                                radius={30}
                                label={({ dataEntry }) => `${(dataEntry.percentage).toFixed(0)} %`}
                                labelStyle={{
                                    fontSize: '5px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    // fill: '#fff',
                                  }}
                                labelPosition={115}    
                                animate="true"
                                animationDuration="1000"
                            />

                            
                            <div className="font-open-sans absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-xl font-semibold text-gray-700">
                                {ele.quarter}
                            </div>
                        </div>

                        <div className="">
                            {
                                ele.data.map((ee) =>
                                    <div className="w-full text-sm text-gray-700 flex items-center space-x-2">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ee.color }}></span>
                                        <span>{ee.title}-{ee.value}</span>
                                    </div>
                                )
                            }
                            <div className="w-full text-sm text-gray-700 flex items-center space-x-2">
                                {/* <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor:  }}></span> */}
                                <span>Total KPIs-{ele.data[0].value + ele.data[1].value}</span>
                            </div>


                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default DashboardCards
