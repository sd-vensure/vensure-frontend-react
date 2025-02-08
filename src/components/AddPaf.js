
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SearchableCountryDropdown from './SearchableCountryDropdown';
import { setCountry } from '../store/user/userHelper';
import SearchableCompositionsDropdown from './SearchableCompositionsDropdown';
import SearchableStakeholderDropdown from './SearchableStakeholderDropdown';

const AddPaf = () => {

    const [drugs, setdrugs] = useState([]);
    const [mastertypes, setmastertypes] = useState([]);
    const [stakeholders, setstakeholders] = useState([]);
    const [selectedstakeholders, setselectedstakeholders] = useState([]);
    const dispatch = useDispatch();

    const selectedcountry = useSelector((state) => state.user.countrydata);

    const [formData, setFormData] = useState({
        client_information: "",
        driving_market: selectedcountry,
        paf_initiated_on: null,
        brief_scope: "",
        api_sources: "",
        sku: "",
        import_license_api: "",
        import_license_rld: "",
        drug_id: null,
        master_type: null
    });

    const [compositionsarray, setcompositionsarray] = useState([])
    const [selectedcompositions, setselectedcompositions] = useState([])

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name == "drug_id") {
            if (value == "Select") {
                setFormData({ ...formData, [name]: null });
                setcompositionsarray([])
                setselectedcompositions([])

            }
            else {
                setFormData({ ...formData, [name]: value });
                let compo_array = drugs.find((ele) => ele.drug_id == value);
                setcompositionsarray(compo_array.compositions)
                setselectedcompositions([])
            }
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let datatopass = { ...formData, driving_market: selectedcountry, composition_array: selectedcompositions,stakeholders:selectedstakeholders }


        try {

            let response = await axios.post("http://localhost:8000/api/paf/add", datatopass, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.status) {
                setFormData({
                    client_information: "",
                    paf_initiated_on: null,
                    brief_scope: "",
                    api_sources: "",
                    sku: "",
                    import_license_api: "",
                    import_license_rld: "",
                    drug_id: null,
                    master_type: null
                })

                dispatch(setCountry([]))
                setselectedcompositions([])
                setcompositionsarray([])
                setselectedstakeholders([])

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
            }
            else {
                setstakeholders([])
            }


        } catch (error) {
            setstakeholders([])
        }

    }
   
   
    const getAllMasterTypes = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/paf/get-master-types", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                setmastertypes(response.data.data)
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

    }, [])


    return (
        <div className='p-2'>
            <p className='text-cyan-900 text-xl text-center m-2'>Add PAF Form:</p>

            <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto">

                <label className='text-sm my-1 text-cyan-800'>PAF Initiated On:</label>
                <input
                    type="date"
                    name="paf_initiated_on"
                    value={formData.paf_initiated_on}
                    onChange={handleChange}
                    className="border p-2 w-full my-2"
                    required
                />


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

                {
                    compositionsarray.length > 0 &&
                    <>
                        <label className='text-sm text-cyan-800 my-1'>Compositions:</label>

                        <SearchableCompositionsDropdown compositions={compositionsarray} selectedcompositions={selectedcompositions} setselectedcompositions={setselectedcompositions} />
                    </>
                }


                <label className='text-sm text-cyan-800 my-1'>Driving Market:</label>

                <SearchableCountryDropdown />




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


                <label className='text-sm text-cyan-800 my-1'>Stakeholders:</label>
                <SearchableStakeholderDropdown stakeholders={stakeholders} selectedstakeholders={selectedstakeholders} setselectedstakeholders={setselectedstakeholders} />




                <button type="submit" className="bg-blue-700 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>

        </div>

    )
}

export default AddPaf
