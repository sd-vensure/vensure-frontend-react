import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AddDrug = () => {

    const [composition, setComposition] = useState("");
    const [compositions, setCompositions] = useState([]);

    const [innovators, setinnovators] = useState([]);

    const handleCompositionChange = (e) => {
        setComposition(e.target.value);
    };

    const addComposition = (e) => {
        e.preventDefault();
        if (composition.trim()) {
            setCompositions([...compositions, composition]);
            setComposition("");
        }
    };

    const removeComposition = (e,index) => {
        e.preventDefault();
        const updatedNotes = compositions.filter((_, i) => i !== index);
        setCompositions(updatedNotes);
    };

    const [formData, setFormData] = useState({
        input1: "",
        input2: "",
        dropdown: ""
    });

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name === "multiRows") {
            const updatedRows = [...formData.multiRows];
            updatedRows[index] = value;
            setFormData({ ...formData, multiRows: updatedRows });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);

        let sendingdata={
            "drug_name":formData.input1,
            "drug_api": formData.input2,
            "innovator_id":formData.dropdown,
            "drug_composition":compositions
        }

        try {

            let response = await axios.post("http://localhost:8000/api/drug/add",sendingdata, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.status) {
                setFormData({
                    input1: "",
                    input2: "",
                    dropdown: ""
                })
                setCompositions([])
                toast.success(response.data.message)
                
            }
            else {
                toast.info(response.data.message)
               
            }


        } catch (error) {
            toast.error(error.message)
           
        }

    };

    const getAllInnovator = async () => {
        try {

            let response = await axios.get("http://localhost:8000/api/drug/getInnovator", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                setinnovators(response.data.data)
            }
            else {
                setinnovators([])
            }


        } catch (error) {
            setinnovators([])
        }

    }


    useEffect(() => {

        getAllInnovator();

    }, [])


    return (
            <div className='p-2'>
                <p className='text-cyan-900 text-xl text-center m-2'>Add Drug Form:</p>

                <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto">

                    <label className='text-sm my-1 text-cyan-800'>Drug Name:</label>
                    <input
                        type="text"
                        name="input1"
                        value={formData.input1}
                        onChange={handleChange}
                        placeholder="Drug Name"
                        className="border p-2 w-full my-2"
                        required
                    />


                    <label className='text-sm text-cyan-800 my-1'>API Details:</label>
                    <input
                        type="text"
                        name="input2"
                        value={formData.input2}
                        onChange={handleChange}
                        placeholder="API"
                        className="border p-2 w-full my-2"
                        required
                    />

                    <label className='text-sm text-cyan-800 my-1'>Innovator:</label>

                    <select
                        name="dropdown"
                        value={formData.dropdown}
                        onChange={handleChange}
                        className="border p-2 w-full my-2"
                        required
                    >
                        <option value="">Select</option>
                        {
                            innovators && innovators.length > 0 &&
                            innovators.map((ele) =>
                                <option value={ele.innovator_id}>{ele.innovator_name}</option>
                            )
                        }
                    </select>


                    <div className='my-1 leading-relaxed w-full'>
                        <span className='text-cyan-800 text-sm my-1'>Compositions:</span>
                        <div className='flex my-2'>
                            <input value={composition} onChange={handleCompositionChange} type='text' placeholder='Add Composition' className='w-full outline-none p-2 border focus:border-blue-800' />
                            <button onClick={addComposition} className='bg-blue-500 text-white px-3 py-1 rounded ml-2'>Add</button>
                        </div>
                        <ul className='mt-2'>
                            {compositions.map((ele, index) => (
                                <li key={index} className='text-sm my-2 py-2 px-2 border text-gray-700 flex justify-between items-center'>
                                    {ele}
                                    <button onClick={(e) => removeComposition(e,index)} className='text-red-500 ml-2'>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="bg-blue-700 text-white p-2 rounded w-full">
                        Submit
                    </button>
                </form>

            </div>
    )
}

export default AddDrug
