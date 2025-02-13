import React, { useEffect, useState } from 'react'
import api from './axiosapi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AssignBudget = () => {

    const [tempmaster, settempmaster] = useState([])
    const [masterpaf, setmasterpaf] = useState([])
    const [departments, setdepartments] = useState([])
    const [budget, setbudget] = useState([])
    const selected_paf_revise = useSelector((state) => state.user.revise_details);


    const getBudgetEntries = async () => {
        try {

            let response = await api.get(`http://localhost:8000/api/budget/get/${selected_paf_revise.paf_id}`);

            if (response.data.data) {
                setbudget(response.data.data)
            }
            else {
                setbudget([])
            }


        } catch (error) {
            setbudget([])
        }
    }

    const handleBudgetChange = (e, index) => {
        const updatedArray = [...budget];
        updatedArray[index].amount = e.target.value==""? null : e.target.value; // Update the target date
        setbudget(updatedArray); // Update the array with new target date
    };

    useEffect(() => {
        getBudgetEntries()
    }, [])


    const handleSubmit = async () => {

        try {
            const response = await api.post("paf/create-paf-form", { include_form_headers: masterpaf, master_type_id: selected_paf_revise.master_type_id, paf_id: selected_paf_revise.paf_id });

            if (response.data.status) {
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
        <div className="col-span-4">
            <p className='text-cyan-900 text-xl my-2'>Assign Budget:</p>
            <p className='text-cyan-900 text-base my-2'>PAF ID: {selected_paf_revise.paf_unique}</p>

            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-1">Department</th>
                        <th className="border px-4 py-1">Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.map((ele, index) => (
                        <tr key={index}>
                            
                            <td className="border px-4 py-1">{ele.department_name}</td>

                            <td className="border px-4 py-1">
                                <input
                                    type="number"
                                    className="border p-1"
                                    value={ele.amount || ""}
                                    onChange={(e) => handleBudgetChange(e, index)}
                                />
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <button onClick={handleSubmit} className='mt-4 rounded-sm border border-indigo-800 bg-indigo-800 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600  focus:ring-3 focus:outline-hidden'>Submit</button> */}
        </div>
    )
}

export default AssignBudget