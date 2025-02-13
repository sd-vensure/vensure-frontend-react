import React, { useEffect, useState } from 'react'
import api from './axiosapi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AssignDepartmentAndTimeline = () => {

    const [tempmaster, settempmaster] = useState([])
    const [masterpaf, setmasterpaf] = useState([])
    const [departments, setdepartments] = useState([])
    const selected_paf_revise = useSelector((state) => state.user.revise_details);


    const getAllMasterTypes = async () => {
        try {

            let response = await api.get(`http://localhost:8000/api/paf/get-master-types?masterId=${selected_paf_revise.master_type_id}`);

            if (response.data.data) {
                settempmaster(response.data.data[0].items)
            }
            else {
                settempmaster([])
            }


        } catch (error) {
            settempmaster([])
        }

    }

    const getAllDepartments = async () => {
        try {

            let response = await api.get(`http://localhost:8000/api/department/get`);

            if (response.data.data) {
                setdepartments(response.data.data)
            }
            else {
                setdepartments([])
            }


        } catch (error) {
            setdepartments([])
        }
    }

    const handleCheckboxChange = (index) => {
        // Toggle the status_selected value when checkbox is clicked
        const updatedArray = [...masterpaf];
        updatedArray[index].status_selected = updatedArray[index].status_selected === "Active" ? "Inactive" : "Active";
        setmasterpaf(updatedArray); // Assuming setMasterpafArray updates the state
    };

    const handleTimelineChange = (e, index) => {
        const updatedArray = [...masterpaf];
        updatedArray[index].timeline_selected = e.target.value;
        setmasterpaf(updatedArray); // Update the array with new timeline
    };

    const handleTargetDateChange = (e, index) => {
        const updatedArray = [...masterpaf];
        updatedArray[index].target_date_selected = e.target.value; // Update the target date
        setmasterpaf(updatedArray); // Update the array with new target date
    };

    const handleDepartmentChange = (e, index, val) => {
        let department_id = null;

        if (e.target.value != "Select") {
            let tt = departments.find((ele) => ele.department_name == e.target.value)
            department_id = tt.department_id
        }

        const updatedArray = [...masterpaf];
        updatedArray[index].department = e.target.value; // Update the target date
        updatedArray[index].department_id = department_id; // Update the target date
        setmasterpaf(updatedArray); // Update the array with new target date
    };

    useEffect(() => {
        getAllMasterTypes();
        getAllDepartments()
    }, [])


    useEffect(() => {
        if (tempmaster && Array.isArray(tempmaster) && tempmaster.length > 0) {
            setmasterpaf(tempmaster.map((ele) => {
                return { ...ele, "status_selected": "Active", "timeline_selected": "", "target_date_selected": "", "department": "", "department_id": null }
            }))
        }
        else {
            setmasterpaf([])
        }
    }, [tempmaster])

    const handleSubmit = async () => {
        console.log(masterpaf)

        try {
            const response = await api.post("paf/create-paf-form", { include_form_headers: masterpaf, master_type_id: selected_paf_revise.master_type_id, paf_id: selected_paf_revise.paf_id,paf_unique: selected_paf_revise.paf_unique });

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
            <p className='text-cyan-900 text-xl my-2'>Assign Department and Timeline:</p>
            <p className='text-cyan-900 text-base my-2'>PAF ID: {selected_paf_revise.paf_unique}</p>

            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-1">Select</th>
                        <th className="border px-4 py-1">Activity</th>
                        <th className="border px-4 py-1">Target Date</th>
                        <th className="border px-4 py-1">Department</th>
                        <th className="border px-4 py-1">Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    {masterpaf.map((ele, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-1">
                                <input
                                    type="checkbox"
                                    checked={ele.status_selected === "Active"}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td className="border px-4 py-1">{ele.master_item_name}</td>

                            <td className="border px-4 py-1">
                                <input
                                    type="date"
                                    className="border p-1"
                                    value={ele.target_date_selected || ""}
                                    onChange={(e) => handleTargetDateChange(e, index)}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <select
                                    className="border p-1"
                                    value={ele.department || ""}
                                    onChange={(e) => handleDepartmentChange(e, index)}
                                >
                                    <option>Select</option>
                                    {
                                        departments && departments.length > 0 && departments.map((ele) =>
                                            <option>{ele.department_name}</option>
                                        )
                                    }
                                </select>
                            </td>
                            <td className="border px-4 py-2">
                                <select
                                    className="border p-1"
                                    value={ele.timeline_selected || ""}
                                    onChange={(e) => handleTimelineChange(e, index)}
                                >
                                    <option value="">Select</option>
                                    <option>T0</option>
                                    <option>T1</option>
                                    <option>T2</option>
                                    <option>T3</option>
                                    <option>T4</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleSubmit} className='mt-4 rounded-sm border border-indigo-800 bg-indigo-800 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-600  focus:ring-3 focus:outline-hidden'>Submit</button>
        </div>
    )
}

export default AssignDepartmentAndTimeline