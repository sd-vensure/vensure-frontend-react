import React, { useEffect, useState } from 'react'
import api from './axiosapi';
import SearchableCountryDropdown from './SearchableCountryDropdown';
import SearchableStakeholderDropdown from './SearchableStakeholderDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCountry } from '../store/user/userHelper';

const AddPafNew = () => {

    const [masterTypes, setmasterTypes] = useState([]);
    const [stakeholders, setstakeholders] = useState([]);
    const [selectedstakeholders, setselectedstakeholders] = useState([]);

    const [compositioncreated, setcompositioncreated] = useState([])
    const [compositiontext, setcompositiontext] = useState("")

    const [masterTypeList, setmasterTypeList] = useState([])
    const [departments, setdepartments] = useState([])

    const dispatch = useDispatch()

    const selectedcountry = useSelector((state) => state.user.countrydata);

    const [drugdata, setdrugdata] = useState({
        "drug_name": "",
        "drug_api": "",
        "drug_innovator": "",
        "compositions": [],
        "master_type_id": null,
        "client_name": "",
        "brief_scope": "",
        "sku": "",
        "api_sources": "",
        "import_license_rld": "",
        "import_license_api": ""

    });

    const handleChangeDrug = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name == "master_type_id") {
            if (value == "") {
                setdrugdata({ ...drugdata, [name]: null });
                setmasterTypeList([])
            }
            else {
                console.log(value)
                setdrugdata({ ...drugdata, [name]: value });
                let foundobj = masterTypes.find((ele) => ele.master_type_id == value)
                let data = foundobj.items;
                setmasterTypeList(data.map((ele) => {
                    return { ...ele, "status_selected": "Active", "timeline_selected": "", "target_date_selected": "", "department": "", "department_id": null, "milestone": "Inactive" }
                }))

            }
        }
        else {
            setdrugdata({ ...drugdata, [name]: value });
        }

    }

    const getAllMasterTypes = async () => {
        try {
            let response = await api.get("http://localhost:8000/api/paf/get-master-types");

            if (response.data.data) {
                setmasterTypes(response.data.data)
            }
            else {
                setmasterTypes([])
            }
        } catch (error) {
            setmasterTypes([])
        }
    }

    const getAllStakeholders = async () => {
        try {

            let response = await api.get("http://localhost:8000/api/paf/view-stakeholder");
            if (response.data.data) {
                setstakeholders(response.data.data)
            }
            else {
                setstakeholders([])
            }
        } catch (error) {
            setstakeholders([])
        }
    }

    const handleCheckboxChange = (index) => {
        // Toggle the status_selected value when checkbox is clicked
        const updatedArray = [...masterTypeList];
        updatedArray[index].status_selected = updatedArray[index].status_selected === "Active" ? "Inactive" : "Active";
        setmasterTypeList(updatedArray); // Assuming setMasterpafArray updates the state
    };

    const handleCheckboxMilestoneChange = (index) => {
        // Toggle the status_selected value when checkbox is clicked
        const updatedArray = [...masterTypeList];
        updatedArray[index].milestone = updatedArray[index].milestone === "Active" ? "Inactive" : "Active";
        setmasterTypeList(updatedArray); // Assuming setMasterpafArray updates the state
    };

    const handleTimelineChange = (e, index) => {
        const updatedArray = [...masterTypeList];
        updatedArray[index].timeline_selected = e.target.value;
        setmasterTypeList(updatedArray); // Update the array with new timeline
    };

    const handleTargetDateChange = (e, index) => {
        const updatedArray = [...masterTypeList];
        updatedArray[index].target_date_selected = e.target.value; // Update the target date
        setmasterTypeList(updatedArray); // Update the array with new target date
    };

    const handleDepartmentChange = (e, index, val) => {
        let department_id = null;

        if (e.target.value != "Select") {
            let tt = departments.find((ele) => ele.department_name == e.target.value)
            department_id = tt.department_id
        }

        const updatedArray = [...masterTypeList];
        updatedArray[index].department = e.target.value; // Update the target date
        updatedArray[index].department_id = department_id; // Update the target date
        setmasterTypeList(updatedArray); // Update the array with new target date
    };

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

    useEffect(() => {
        getAllMasterTypes();
        getAllStakeholders();
        getAllDepartments()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let datatopass = { ...drugdata, selectedcountry, selectedstakeholders, "include_form_headers": masterTypeList, "compositions": compositioncreated }

        console.log(datatopass,"this is datatopass")
        return;

        try {

            let response = await api.post("http://localhost:8000/api/paf/add-new", datatopass, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.status) {

                setdrugdata({
                    "drug_name": "",
                    "drug_api": "",
                    "drug_innovator": "",
                    "compositions": [],
                    "master_type_id": null,
                    "client_name": "",
                    "brief_scope": "",
                    "sku": "",
                    "api_sources": "",
                    "import_license_rld": "",
                    "import_license_api": ""
                });


                dispatch(setCountry([]))
                setselectedstakeholders([])
                setcompositioncreated([])
                setmasterTypeList([])

                toast.success(response.data.message)

            }
            else {
                toast.info(response.data.message)

            }


        } catch (error) {
            toast.error(error.message)

        }

    }

    const addComposition = (e) => {
        e.preventDefault();
        setcompositioncreated(previtems => [...previtems, compositiontext])
        setcompositiontext("")
    }

    const removeComposition = (e, index) => {
        e.preventDefault();
        setcompositioncreated(prevItems => prevItems.filter((item, i) => i !== index));
    }


    return (
        <div className='p-2'>

            <form onSubmit={handleSubmit} className="rounded-md w-full mx-auto">
                <div>
                    <p className='text-cyan-900 font-semibold text-xl my-2'>Drug Details:</p>

                    <div className='grid grid-cols-3 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm font-semibold my-1 text-cyan-800'>Drug Name:</label>
                            <input
                                type="text"
                                name="drug_name"
                                value={drugdata.drug_name}
                                onChange={handleChangeDrug}
                                placeholder="Drug Name"
                                className="border bg-white border-gray-500 shadow rounded p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm font-semibold text-cyan-800 my-1'>API Details:</label>
                            <input
                                type="text"
                                name="drug_api"
                                value={drugdata.drug_api}
                                onChange={handleChangeDrug}
                                placeholder="API"
                                className="border border-gray-500 shadow rounded p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm font-semibold text-cyan-800 my-1'>Innovator:</label>
                            <input
                                type="text"
                                name="drug_innovator"
                                value={drugdata.drug_innovator}
                                onChange={handleChangeDrug}
                                placeholder="Innovator"
                                className="border border-gray-500 shadow rounded p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm font-semibold text-cyan-800 my-1'>Product Type:</label>
                            <select
                                name="master_type_id"
                                value={drugdata.master_type_id}
                                onChange={handleChangeDrug}
                                className="border border-gray-500 rounded shadow p-2 w-full my-2"
                                required
                            >
                                <option value="">Select</option>
                                {
                                    masterTypes && masterTypes.length > 0 &&
                                    masterTypes.map((ele) =>
                                        <option value={ele.master_type_id}>{ele.master_type_name}</option>
                                    )
                                }
                            </select>
                        </div>

                        {/* <div className='col-span-2'>
                            <label className='text-sm text-cyan-800 my-1'>Compositions:</label>
                            <input
                                type="text"
                                name="compositions"
                                value={drugdata.compositions}
                                onChange={handleChangeDrug}
                                placeholder="Compositions"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div> */}

                        <div className=' leading-relaxed w-full'>
                            <span className='text-cyan-800 font-semibold text-sm my-1'>Compositions:</span>
                            <div className='flex justify-center items-center'>
                                <input value={compositiontext} onChange={(e) => { setcompositiontext(e.target.value) }} type='text' placeholder='Add Composition' className='w-full rounded border-gray-500 shadow outline-none p-2 border my-2 focus:border-blue-800' />
                                <button onClick={addComposition} className='bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 h-full rounded ml-2'>Add</button>
                            </div>
                        </div>

                        <div className='leading-relaxed w-full'>
                            <span className='text-cyan-800 font-semibold text-sm my-1'>Compositions Created:</span>
                            <ul className='mt-2'>
                                {compositioncreated.map((ele, index) => (
                                    <li key={index} className='text-sm my-2 py-2 px-2 border text-gray-700 flex justify-between items-center'>
                                        {ele}
                                        <button onClick={(e) => removeComposition(e, index)} className='text-red-500 ml-2'>Remove</button>
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>

                    <p className='text-cyan-900 font-semibold text-xl my-2'>PAF Details:</p>


                    <div className='grid grid-cols-2 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>Client Information:</label>
                            <input
                                type="text"
                                name="client_name"
                                value={drugdata.client_name}
                                onChange={handleChangeDrug}
                                placeholder="Client Information"
                                className="border border-gray-500 rounded shadow p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm text-cyan-800 font-semibold my-1'>Driving Market:</label>
                            <SearchableCountryDropdown />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>Brief Scope:</label>
                            <input
                                type="text"
                                name="brief_scope"
                                value={drugdata.brief_scope}
                                onChange={handleChangeDrug}
                                placeholder="Scope"
                                className="border border-gray-500 rounded shadow p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>API Sources:</label>
                            <input
                                type="text"
                                name="api_sources"
                                value={drugdata.api_sources}
                                onChange={handleChangeDrug}
                                placeholder="Sources"
                                className="border border-gray-500 rounded shadow p-2 w-full my-2"
                                required
                            />
                        </div>


                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>SKU:</label>
                            <input
                                type="text"
                                name="sku"
                                value={drugdata.sku}
                                onChange={handleChangeDrug}
                                placeholder="SKU"
                                className="border border-gray-500 rounded shadow p-2 w-full my-2"
                                required
                            />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-x-4'>
                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>Import License API:</label>
                            <div className="flex space-x-4 my-2">
                                {['Yes', 'No', 'Not Applicable'].map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name="import_license_api"
                                            value={option}
                                            checked={drugdata.import_license_api === option}
                                            onChange={() => { setdrugdata({ ...drugdata, "import_license_api": option }); }}
                                            className="mr-2 shadow"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className='text-sm my-1 text-cyan-800 font-semibold'>Import License RLD:</label>
                            <div className="flex space-x-4 my-2">
                                {['Yes', 'No', 'Not Applicable'].map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name="import_license_rld"
                                            value={option}
                                            checked={drugdata.import_license_rld === option}
                                            onChange={() => { setdrugdata({ ...drugdata, "import_license_rld": option }); }}
                                            className="mr-2 shadow"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='col-span-4'>
                        <label className='text-sm text-cyan-800 my-1 font-semibold'>Stakeholders:</label>
                        <SearchableStakeholderDropdown stakeholders={stakeholders} selectedstakeholders={selectedstakeholders} setselectedstakeholders={setselectedstakeholders} />
                    </div>

                </div>

                {masterTypeList && masterTypeList.length > 0 && (
                    <div className="col-span-4">
                        <table className="table-auto w-full border-collapse">
                            <thead className='bg-blue-500 text-white'>
                                <tr>
                                    <th className="border px-1 py-1">Select</th>
                                    <th className="border px-4 py-1">Activity</th>

                                    <th className="border px-1 py-1">Target Date</th>
                                    <th className="border px-1 py-1">Department</th>
                                    <th className="border px-2 py-1">Timeline</th>
                                    <th className="border py-1">Milestone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {masterTypeList.map((ele, index) => (
                                    <tr key={index}>
                                        <td className="border text-center px-4 py-1">
                                            <input
                                                type="checkbox"
                                                checked={ele.status_selected === "Active"}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                        <td className="border px-4 py-1">{ele.master_item_name}</td>

                                        <td className="border text-center px-1 py-1">
                                            <input
                                                type="date"
                                                className="border p-1"
                                                value={ele.target_date_selected || ""}
                                                onChange={(e) => handleTargetDateChange(e, index)}
                                            />
                                        </td>
                                        <td className="border text-center px-1 py-2">
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
                                        <td className="border text-center px-1 py-2">
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
                                        <td className="border text-center px-1 py-1">
                                            <input
                                                type="checkbox"
                                                checked={ele.milestone === "Active"}
                                                onChange={() => handleCheckboxMilestoneChange(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}



                <button type="submit" className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddPafNew
