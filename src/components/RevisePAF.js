
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SearchableCountryDropdown from './SearchableCountryDropdown';
import { delPAfRevise, setCountry, setPafRevise } from '../store/user/userHelper';
import SearchableCompositionsDropdown from './SearchableCompositionsDropdown';
import SearchableStakeholderDropdown from './SearchableStakeholderDropdown';
import api from './axiosapi'
import { useNavigate } from 'react-router-dom';

const RevisePAF = () => {

    const selected_paf_revise = useSelector((state) => state.user.revise_details);

    const navigate=useNavigate()

    // console.log(JSON.parse(selected_paf_revise.stakeholders))

    const [drugs, setdrugs] = useState([]);
    const [mastertypes, setmastertypes] = useState([]);
    const [stakeholders, setstakeholders] = useState([]);
    const [selectedstakeholders, setselectedstakeholders] = useState([]);
    const dispatch = useDispatch();

    const selectedcountry = useSelector((state) => state.user.countrydata);

    const [formData, setFormData] = useState({
        client_information: selected_paf_revise?.client_information,
        driving_market: JSON.parse(selected_paf_revise?.driving_market),
        paf_initiated_on: null,
        brief_scope: selected_paf_revise?.brief_scope,
        api_sources: selected_paf_revise?.api_sources,
        sku: selected_paf_revise?.sku,
        import_license_api: selected_paf_revise?.import_license_api,
        import_license_rld: selected_paf_revise?.import_license_rld,
        drug_id: selected_paf_revise?.drug_id,
        master_type: selected_paf_revise?.master_type_id,
        include_form_headers: [],
        paf_unique: selected_paf_revise?.paf_unique
    });

    const [compositionsarray, setcompositionsarray] = useState([])
    const [selectedcompositions, setselectedcompositions] = useState([])

    const [masterpafarray, setmasterpafarray] = useState([])
    const [tempmasterpafarray, settempmasterpafarray] = useState([])
    // const [selectedmasterpafarray, setselectedmasterpafarray] = useState([])

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name == "drug_id") {
            if (value == "Select") {
                setFormData({ ...formData, "master_type": null, [name]: null });
                setcompositionsarray([])
                setselectedcompositions([])
                setFormData({ ...formData, [name]: value });
                settempmasterpafarray([]);

            }
            else {
                let compo_array = drugs.find((ele) => ele.drug_id == value);
                console.log("this is compo_Array", compo_array);
                setFormData({ ...formData, "master_type": compo_array.master_type_id, [name]: value });
                let setarray = mastertypes.find((ele) => ele.master_type_id == compo_array?.master_type_id);
                console.log("this is set array", setarray)
                settempmasterpafarray(setarray?.items);
                setcompositionsarray(compo_array?.compositions)
                setselectedcompositions([])
            }
        }
        else if (name == "master_type") {
            if (value == "Select") {
                // setFormData({ ...formData, [name]: value });
                // setmasterpafarray([]);
                // setselectedmasterpafarray([])
            }
            else {
                // setFormData({ ...formData, [name]: value });
                // let setarray = mastertypes.find((ele) => ele.master_type_id == value);
                // setmasterpafarray(setarray.items);
                // setselectedmasterpafarray([]);
            }
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let datatopass = { ...formData, driving_market: selectedcountry, composition_array: selectedcompositions, stakeholders: selectedstakeholders, include_form_headers: masterpafarray }

        try {

            let response = await api.post("http://localhost:8000/api/paf/revise", datatopass);

            if (response.data.status) {
                setFormData({
                    client_information: "",
                    driving_market: selectedcountry,
                    paf_initiated_on: null,
                    brief_scope: "",
                    api_sources: "",
                    sku: "",
                    import_license_api: "",
                    import_license_rld: "",
                    drug_id: null,
                    master_type: null,
                    include_form_headers: []
                })

                dispatch(setCountry([]))
                setselectedcompositions([])
                setcompositionsarray([])
                setselectedstakeholders([])
                setmasterpafarray([])
                navigate("/", { replace: true });
                
                toast.success(response.data.message)

            }
            else {
                toast.info(response.data.message)

            }


        } catch (error) {
            toast.error(error.message)

        }

    };

    const getAllDrugs = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/drug/get", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                setdrugs(response.data.data)
                let compo_array = response.data.data.find((ele) => ele.drug_id == selected_paf_revise.drug_id);
                console.log(compo_array, "this is compo array")
                setcompositionsarray(compo_array.compositions)
                setselectedcompositions(JSON.parse(selected_paf_revise.compositions_selected))
            }
            else {
                setdrugs([])
            }


        } catch (error) {
            setdrugs([])
        }

    }

    const getAllStakeholders = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/paf/view-stakeholder", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                setstakeholders(response.data.data)
                setselectedstakeholders(JSON.parse(selected_paf_revise.stakeholders))

            }
            else {
                setstakeholders([])
                setselectedstakeholders([])
            }


        } catch (error) {
            setstakeholders([])
            setselectedstakeholders([])
        }

    }


    const getAllMasterTypes = async () => {
        try {

            let response = await api.get("http://localhost:8000/api/paf/get-master-types", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                setmastertypes(response.data.data)
                let setarray = response.data.data.find((ele) => ele.master_type_id == selected_paf_revise.master_type_id);
                // console.log("this is set array", setarray)
                settempmasterpafarray(setarray.items);
            }
            else {
                setmastertypes([])
            }


        } catch (error) {
            setmastertypes([])
        }

    }


    useEffect(() => {

        getAllDrugs();
        getAllStakeholders();
        getAllMasterTypes();
        dispatch(setCountry(JSON.parse(selected_paf_revise.driving_market)))

    }, [])

    useEffect(() => {
        if (tempmasterpafarray && Array.isArray(tempmasterpafarray) && tempmasterpafarray.length > 0) {
            setmasterpafarray(tempmasterpafarray.map((ele) => {
                return { ...ele, "status_selected": "Active", "timeline_selected": "", "target_date_selected": "" }
            }))
        }
        else {
            setmasterpafarray([])
        }
    }, [tempmasterpafarray])

    const handleCheckboxChange = (index) => {
        // Toggle the status_selected value when checkbox is clicked
        const updatedArray = [...masterpafarray];
        updatedArray[index].status_selected = updatedArray[index].status_selected === "Active" ? "Inactive" : "Active";
        setmasterpafarray(updatedArray); // Assuming setMasterpafArray updates the state
    };

    const handleTimelineChange = (e, index) => {
        const updatedArray = [...masterpafarray];
        updatedArray[index].timeline_selected = e.target.value;
        setmasterpafarray(updatedArray); // Update the array with new timeline
    };

    const handleTargetDateChange = (e, index) => {
        const updatedArray = [...masterpafarray];
        updatedArray[index].target_date_selected = e.target.value; // Update the target date
        setmasterpafarray(updatedArray); // Update the array with new target date
    };



    return (
        <div className='p-2'>
            <p className='text-cyan-900 text-xl text-center m-2'>Revise PAF: {selected_paf_revise?.paf_unique}</p>

            <form onSubmit={handleSubmit} className="p-4 border rounded-md w-full mx-auto">
                <div className='grid grid-cols-4 gap-5'>
                    <div>
                        <label className='text-sm my-1 text-cyan-800'>PAF Initiated On:</label>
                        <input
                            type="date"
                            name="paf_initiated_on"
                            value={formData.paf_initiated_on}
                            onChange={handleChange}
                            className="border p-2 w-full my-2"
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm my-1 text-cyan-800'>Client Name:</label>
                        <input
                            type="text"
                            name="client_information"
                            value={formData.client_information}
                            onChange={handleChange}
                            placeholder="Client Name"
                            className="border p-2 w-full my-2"
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm text-cyan-800 my-1'>Drug Name:</label>
                        <select
                            name="drug_id"
                            value={formData.drug_id}
                            onChange={handleChange}
                            className="border p-2 w-full my-2"
                            required
                        >
                            <option>Select</option>
                            {
                                drugs && drugs.length > 0 &&
                                drugs.map((ele) =>
                                    <option value={ele.drug_id}>{ele.drug_name}</option>
                                )
                            }
                        </select>
                    </div>


                    {/* <div>
                        <label className='text-sm text-cyan-800 my-1'>Master Type:</label>
                        <select
                            name="master_type"
                            value={formData.master_type}
                            onChange={handleChange}
                            className="border p-2 w-full my-2"
                            required
                        >
                            <option>Select</option>
                            {
                                mastertypes && mastertypes.length > 0 &&
                                mastertypes.map((ele) =>
                                    <option value={ele.master_type_id}>{ele.master_type_name}</option>
                                )
                            }
                        </select>
                    </div> */}

                    {
                        compositionsarray.length > 0 &&
                        <>
                            <div>
                                <label className='text-sm text-cyan-800 my-1'>Compositions:</label>

                                <SearchableCompositionsDropdown compositions={compositionsarray} selectedcompositions={selectedcompositions} setselectedcompositions={setselectedcompositions} />
                            </div>
                        </>
                    }

                    <div>
                        <label className='text-sm text-cyan-800 my-1'>Driving Market:</label>
                        <SearchableCountryDropdown />
                    </div>



                    <div>
                        <label className='text-sm my-1 text-cyan-800'>Brief Scope:</label>
                        <input
                            type="text"
                            name="brief_scope"
                            value={formData.brief_scope}
                            onChange={handleChange}
                            placeholder="Scope"
                            className="border p-2 w-full my-2"
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm my-1 text-cyan-800'>API Sources:</label>
                        <input
                            type="text"
                            name="api_sources"
                            value={formData.api_sources}
                            onChange={handleChange}
                            placeholder="Sources"
                            className="border p-2 w-full my-2"
                            required
                        />
                    </div>


                    <div>
                        <label className='text-sm my-1 text-cyan-800'>SKU:</label>
                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="SKU"
                            className="border p-2 w-full my-2"
                            required
                        />
                    </div>


                    <div>
                        <label className='text-sm my-1 text-cyan-800'>Import License API:</label>
                        <div className="flex space-x-4 my-2">
                            {['Yes', 'No', 'Not Applicable'].map((option) => (
                                <label key={option}>
                                    <input
                                        type="radio"
                                        name="import_license_api"
                                        value={option}
                                        checked={formData.import_license_api === option}
                                        onChange={() => { setFormData({ ...formData, "import_license_api": option }); }}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className='text-sm my-1 text-cyan-800'>Import License RLD:</label>
                        <div className="flex space-x-4 my-2">
                            {['Yes', 'No', 'Not Applicable'].map((option) => (
                                <label key={option}>
                                    <input
                                        type="radio"
                                        name="import_license_rld"
                                        value={option}
                                        checked={formData.import_license_rld === option}
                                        onChange={() => { setFormData({ ...formData, "import_license_rld": option }); }}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='col-span-4'>
                        <label className='text-sm text-cyan-800 my-1'>Stakeholders:</label>
                        <SearchableStakeholderDropdown stakeholders={stakeholders} selectedstakeholders={selectedstakeholders} setselectedstakeholders={setselectedstakeholders} />
                    </div>

                    {masterpafarray && (
                        <div className="col-span-4">
                            <table className="table-auto w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-1">Select</th>
                                        <th className="border px-4 py-1">Activity</th>

                                        <th className="border px-4 py-1">Target Date</th>
                                        <th className="border px-4 py-1">Timeline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {masterpafarray.map((ele, index) => (
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
                        </div>
                    )}






                </div>

                <button type="submit" className="bg-blue-700 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>

        </div>

    )
}

export default RevisePAF
