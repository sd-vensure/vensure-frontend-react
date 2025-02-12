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
        const value = e.target.value;

        setdrugdata({ ...drugdata, [name]: value })

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

    useEffect(() => {
        getAllMasterTypes();
        getAllStakeholders();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let datatopass = { ...drugdata, selectedcountry, selectedstakeholders }

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
        <div className='p-2'>

            <form onSubmit={handleSubmit} className="rounded-md w-full mx-auto">
                <div>
                    <p className='text-cyan-900 text-xl my-2'>Drug Details:</p>

                    <div className='grid grid-cols-3 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm my-1 text-cyan-800'>Drug Name:</label>
                            <input
                                type="text"
                                name="drug_name"
                                value={drugdata.drug_name}
                                onChange={handleChangeDrug}
                                placeholder="Drug Name"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm text-cyan-800 my-1'>API Details:</label>
                            <input
                                type="text"
                                name="drug_api"
                                value={drugdata.drug_api}
                                onChange={handleChangeDrug}
                                placeholder="API"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm text-cyan-800 my-1'>Innovator:</label>
                            <input
                                type="text"
                                name="drug_innovator"
                                value={drugdata.drug_innovator}
                                onChange={handleChangeDrug}
                                placeholder="Innovator"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm text-cyan-800 my-1'>Master Type:</label>
                            <select
                                name="master_type_id"
                                value={drugdata.master_type_id}
                                onChange={handleChangeDrug}
                                className="border p-2 w-full my-2"
                                required
                            >
                                <option>Select</option>
                                {
                                    masterTypes && masterTypes.length > 0 &&
                                    masterTypes.map((ele) =>
                                        <option value={ele.master_type_id}>{ele.master_type_name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className='col-span-2'>
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
                        </div>

                    </div>

                    <p className='text-cyan-900 text-xl my-2'>PAF Details:</p>


                    <div className='grid grid-cols-2 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm my-1 text-cyan-800'>Client Information:</label>
                            <input
                                type="text"
                                name="client_name"
                                value={drugdata.client_name}
                                onChange={handleChangeDrug}
                                placeholder="Client Information"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div>

                        <div>
                            <label className='text-sm text-cyan-800 my-1'>Driving Market:</label>
                            <SearchableCountryDropdown />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-x-4 gap-y-0'>

                        <div>
                            <label className='text-sm my-1 text-cyan-800'>Brief Scope:</label>
                            <input
                                type="text"
                                name="brief_scope"
                                value={drugdata.brief_scope}
                                onChange={handleChangeDrug}
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
                                value={drugdata.api_sources}
                                onChange={handleChangeDrug}
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
                                value={drugdata.sku}
                                onChange={handleChangeDrug}
                                placeholder="SKU"
                                className="border p-2 w-full my-2"
                                required
                            />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-x-4'>
                        <div>
                            <label className='text-sm my-1 text-cyan-800'>Import License API:</label>
                            <div className="flex space-x-4 my-2">
                                {['Yes', 'No', 'Not Applicable'].map((option) => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name="import_license_api"
                                            value={option}
                                            checked={drugdata.import_license_api === option}
                                            onChange={() => { setdrugdata({ ...drugdata, "import_license_api": option }); }}
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
                                            checked={drugdata.import_license_rld === option}
                                            onChange={() => { setdrugdata({ ...drugdata, "import_license_rld": option }); }}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='col-span-4'>
                        <label className='text-sm text-cyan-800 my-1'>Stakeholders:</label>
                        <SearchableStakeholderDropdown stakeholders={stakeholders} selectedstakeholders={selectedstakeholders} setselectedstakeholders={setselectedstakeholders} />
                    </div>

                </div>


                <button type="submit" className="bg-blue-700 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddPafNew
