import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useSelector } from 'react-redux';

const BudgetEdit = () => {

    const { paf_id } = useParams();

    const navigate = useNavigate();

    const paf_selected = useSelector((state) => state.user.paf_selected);
    
    const [data, setdata] = useState([])
    const [finaldata, setfinaldata] = useState([])

    const [departments, setdepartments] = useState([])

    const getFormdata = async () => {

        try {

            let response = await api.get(`http://localhost:8000/api/form/get-paf-form/${paf_id}`);

            if (response.data.data) {
                // toast.success(response.data.message)
                setdata(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setdata([])
            }

        } catch (error) {
            toast.error(error.message)
            setdata([])
        }
    }

    const getAllDepartments = async () => {
        try {

            let response = await api.get("http://localhost:8000/api/department/get");

            if (response.data.data) {
                // toast.success(response.data.message)
                setdepartments(response.data.data)
            }
            else {
                toast.info(response.data.message)
                setdepartments([])
            }

        } catch (error) {
            toast.error(error.message)
            setdepartments([])
        }
    }

    useEffect(() => {
        getFormdata();
        getAllDepartments()
    }, []);



    useEffect(() => {
        const result = [];

        if (data.length > 0 && departments.length > 0) {
            data.forEach(item => {
                let header = result.find(h => h.pafform_header_id === item.pafform_header_id);

                // If header doesn't exist, create a new header object
                if (!header) {
                    let department = departments.find((ele) => ele?.department_name == item?.pafform_team)
                    header = {
                        ...item,  // Add the entire header data
                        "q1": 0,
                        "q2": 0,
                        "q3": 0,
                        "q4": 0,
                        "department_name": department?.department_name,
                        "department_id": department?.department_id,
                        "paf_id":paf_selected.paf_id,
                        "paf_unique":paf_selected.paf_unique
                    };
                    result.push(header);
                }

            });
        }

        // console.log(result)

        setfinaldata(result);


    }, [data, departments])

    const handleHeaderChange = (name, val, index) => {
        let tempdata = [...finaldata];
        val = val == "" ? 0 : parseInt(val);
        tempdata[index][name] = val;
        setfinaldata(tempdata)
    }



    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(finaldata)
        // const converteddata= convertDataSending();

        try {
          const updatedata=await api.post("budget/add",{"data":finaldata})

          if(updatedata.status)
          {
            toast.success(updatedata.data.message)
            navigate("/paf")
          }
          else{
            toast.info(updatedata.data.message)
          }

        } catch (error) {
          toast.error(error.message)
        }

    }

    return (
        <div className="overflow-x-auto ">
            <form>
                <button onClick={onSubmit} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button>
                <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No.</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Team</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Target Date</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q1</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q2</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q3</th>
                            <th className="whitespace-nowrap py-2 font-medium text-gray-900">Q4</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            finaldata.filter((ee) => ee.header_status == "Active").map((ele, index) =>
                            (
                                <>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='whitespace-wrap'>{ele.pafform_item_name}</td>
                                        <td>{ele.pafform_team}</td>
                                        <td>{moment(ele.pafform_target).format("DD-MMM-YYYY")}</td>
                                        <td className=''>
                                            <input value={ele.q1} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q1" type="text" pattern="\d*" required placeholder='Q1' />
                                        </td>
                                        <td>
                                            <input value={ele.q2} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q2" type="text" pattern="\d*" required placeholder='Q2' />
                                        </td>
                                        <td>
                                            <input value={ele.q3} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q3" type="text" pattern="\d*" required placeholder='Q3' />
                                        </td>
                                        <td>
                                            <input value={ele.q4} onChange={(e) => handleHeaderChange(e.target.name, e.target.value, index)} className='w-32 h-9 text-center' name="q4" type="text" pattern="\d*" required placeholder='Q4' />
                                        </td>

                                    </tr>

                                </>
                            ))
                        }
                    </tbody>

                </table>
            </form>
        </div>
    )
}

export default BudgetEdit
