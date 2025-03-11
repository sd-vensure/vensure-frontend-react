import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../axiosapi";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import RemarksModal from "../../modals/RemarksModal";

const EditCompletionDate = () => {

    const [data, setdata] = useState([]);

    const currentuser = useSelector((state) => state.user.current_user);
    const userform = useSelector((state) => state.user.user_form);

    const [finance, setfinance] = useState(userform.financial_year);

    const [startYear, endYear] = finance.split("-").map(Number);

    // Define min and max dates dynamically
    const minDate = `${startYear}-04-01`;
    const maxDate = `20${endYear}-03-31`;

    const navigate = useNavigate();

    const categoryLimits = [
        { min: 50, max: 80 },
        { min: 5, max: 25 },
        { min: 10, max: 20 },
        { min: 0, max: 0 }
    ];

    const [categories, setCategories] = useState([
        { category_id: 1, category_name: "Major Goals", kras: [], total: 0, include_kpis: "Y" },
        { category_id: 2, category_name: "Prganizational Goals", kras: [], total: 0, include_kpis: "Y" },
        { category_id: 3, category_name: "Personal Goals", kras: [], total: 0, include_kpis: "Y" },
        { category_id: 4, category_name: "Expectations", kras: [], total: 0, include_kpis: "N" }
    ]);

    const handleKRAChange = (catIndex, kraIndex, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex][field] = value;
        setCategories(updatedCategories);
    };

    const handleKPIChange = (catIndex, kraIndex, kpiIndex, field, value) => {

        const updatedCategories = [...categories];

        if (field === "number") {
            value = parseInt(value) || 0;
            updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex][field] = value;


            let allotalKPIs = 0;
            let tempkra = 0

            let categorytotals = [0, 0, 0]

            updatedCategories.map((ele, index) => {
                if (ele.kras.length > 0) {

                    tempkra = 0
                    ele.kras.map((kra) => {
                        if (kra.kpis.length > 0) {
                            kra.kpis.map((kpi) => {
                                allotalKPIs += kpi.number;
                                tempkra += kpi.number;
                            })
                        }
                        else {
                            tempkra = 0;
                        }
                    })
                    categorytotals[index] = tempkra;
                }
                else {
                    categorytotals[index] = 0
                }
            })

            updatedCategories[0].total = categorytotals[0];
            updatedCategories[1].total = categorytotals[1];
            updatedCategories[2].total = categorytotals[2];

            settotalKPIs(allotalKPIs);
        }
        else if (field === "obtained") {
            if (value < 0 || value > 10) {
                value = 0;
                toast.info("Please provide between 1 and 10");
            }
            value = parseInt(value) || null;
            updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex][field] = value;

            let allotalKPIs = 0;
            let tempkra = 0

            let categorytotals = [0, 0, 0]

            updatedCategories.map((ele, index) => {
                if (ele.kras.length > 0) {

                    tempkra = 0
                    ele.kras.map((kra) => {
                        if (kra.kpis.length > 0) {
                            kra.kpis.map((kpi) => {
                                allotalKPIs += kpi.number;
                                tempkra += kpi.number;
                            })
                        }
                        else {
                            tempkra = 0;
                        }
                    })
                    categorytotals[index] = tempkra;
                }
                else {
                    categorytotals[index] = 0
                }
            })

            updatedCategories[0].total = categorytotals[0];
            updatedCategories[1].total = categorytotals[1];
            updatedCategories[2].total = categorytotals[2];

            settotalKPIs(allotalKPIs);
        }
        else {

            updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex][field] = value;
        }

        setCategories(updatedCategories);

    };

    // Add KRA
    const addKRA = (catIndex, includeKpis) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras.push({
            id: Date.now(),
            text: "",
            date: "",
            // kpis: [{ id: Date.now(), name: "", number: 0, quarter: "Q1", target: null, obtained: null, completion: null }],
            kpis: includeKpis == "Y" ? [{ id: Date.now(), name: "", number: 0, quarter: "Q1", target: null, obtained: null, completion: null }] : [],
        });
        setCategories(updatedCategories);
    };

    // Remove KRA
    const removeKRA = (catIndex, kraIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras.splice(kraIndex, 1);
        updatedCategories[catIndex].total = updatedCategories[catIndex].kras.reduce(
            (sum, kra) => sum + kra.kpis.reduce((s, kpi) => s + kpi.number, 0),
            0
        );
        setCategories(updatedCategories);
    };

    // Add KPI
    const addKPI = (catIndex, kraIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex].kpis.push({
            id: Date.now(), name: "", number: 0, quarter: "Q1", target: null, obtained: null, completion: null
        });
        setCategories(updatedCategories);
    };

    // Remove KPI
    const removeKPI = (catIndex, kraIndex, kpiIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex].kpis.splice(kpiIndex, 1);
        updatedCategories[catIndex].total = updatedCategories[catIndex].kras.reduce(
            (sum, kra) => sum + kra.kpis.reduce((s, kpi) => s + kpi.number, 0),
            0
        );
        setCategories(updatedCategories);
    };



    const [totalKPIs, settotalKPIs] = useState(0);


    const getFormsForFormId = async () => {

        try {
            const getdata = await api.get(`userform/getparticularformnew/${userform.form_id}`)

            if (getdata.data.status) {
                toast.success(getdata.data.message)
                setdata(getdata.data.data)

            }
            else {
                toast.info(getdata.data.message)
                setdata([])

            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getFormsForFormId()
    }, []);

    const setDataAsRequired = () => {

        let distinctCategories = data
            .reduce((unique, item) => {
                // Find if the category already exists in the unique array
                let existingCategory = unique.find(category => category.category_id === item.category_id);

                // If the category doesn't exist, create it and add to unique array
                if (!existingCategory) {
                    existingCategory = {
                        category_id: item.category_id,
                        category_name: item.category_name,
                        kras: [],
                        total: 0,
                        include_kpis: item.include_kpi
                    };
                    unique.push(existingCategory); // Add new category to unique array
                }

                // Find if the KRA already exists for the category
                let existingKra = existingCategory.kras.find(kra => kra.id === item.kra_id);

                // If the KRA doesn't exist, create it and add to the kras array
                if (!existingKra) {
                    existingKra = {
                        id: item.kra_id,
                        text: item.kra_text,
                        date: "",
                        kpis: [] // Initialize an empty kpis array
                    };
                    existingCategory.kras.push(existingKra);
                }

                // Now check for KPIs related to this KRA and add them to the kpis array
                if (item.kpi_id) {
                    const kpiObject = {
                        kra_id: item.kra_id,  // Same as the parent kra_id
                        category_id: item.category_id, // Same as the parent category_id
                        id: item.kpi_id, // KPI ID
                        name: item.kpi_text, // KPI Text
                        number: item.kpi_weightage, // KPI Weightage
                        quarter: item.kpi_quarter, // KPI Quarter
                        target: item.kpi_target ? moment(item.kpi_target).format("YYYY-MM-DD") : null, // KPI Target
                        obtained: item.kpi_obtained, // KPI Obtained Value
                        completion: item.kpi_complete ? moment(item.kpi_complete).format("YYYY-MM-DD") : null, // KPI Completion Status
                        user_remarks: item?.user_remarks || null,
                        designated_remarks: item?.designated_remarks || null
                    };

                    // Add the KPI object to the kpis array of the existing KRA
                    existingKra.kpis.push(kpiObject);
                }

                return unique; // Return the accumulated unique array
            }, []);

        console.log(distinctCategories, "this is main categories");

        if (distinctCategories.length > 0) {

            let allotalKPIs = 0;
            let tempkra = 0

            let categorytotals = [0, 0, 0]

            distinctCategories.map((ele, index) => {
                if (ele.kras.length > 0) {

                    tempkra = 0
                    ele.kras.map((kra) => {
                        if (kra.kpis.length > 0) {
                            kra.kpis.map((kpi) => {
                                allotalKPIs += kpi.number;
                                tempkra += kpi.number;
                            })
                        }
                        else {
                            tempkra = 0;
                        }
                    })
                    categorytotals[index] = tempkra;
                }
                else {
                    categorytotals[index] = 0
                }
            })

            distinctCategories[0].total = categorytotals[0];
            distinctCategories[1].total = categorytotals[1];
            distinctCategories[2].total = categorytotals[2];

            settotalKPIs(allotalKPIs);

            // if (distinctCategories.length == 3) {
            //     distinctCategories.push({ category_id: 4, category_name: "Training", kras: [], total: 0, include_kpis: "N" })
            // }


            setCategories(distinctCategories);
        }

    }

    useEffect(() => {
        setDataAsRequired();
    }, [data])

    const submitForm = async () => {

        // console.log(categories,"this is imp")
        // return ;

        try {
            const uploaddata = await api.put(`userform/updatedateandmarks`, { "data": categories })

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                navigate("/")
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const [valuestopass, setvaluestopass] = useState({
        "catindex": null,
        "kraindex": null,
        "kpiindex": null,
        "modalstate": false
    })

    const openRemarksModal = async (catIndex, kraIndex, kpiIndex,usertext,designatedtext) => {
        let temp = { ...valuestopass };
        let modalstatenew = !(temp.modalstate);
        setvaluestopass({
            "catindex": catIndex,
            "kraindex": kraIndex,
            "kpiindex": kpiIndex,
            "modalstate": modalstatenew,
            "usertext":usertext,
            "designatedtext":designatedtext
        })
    }



    return (
        <>
            {
                valuestopass.modalstate
                ?<RemarksModal  valuestopass={valuestopass} setvaluestopass={setvaluestopass} categories={categories} setCategories={setCategories}/>
                :<></>
            }

            <div className="">

                <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Update Completion Date</p>

                {categories.map((category, catIndex) => (
                    <div key={category.category_id} className="mb-5 border p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center">

                            {
                                categoryLimits[catIndex].max > 0
                                &&

                                <h2 className="font-semibold mb-2 text-base">
                                    <span className="text-blue-700 ">{category.category_name}</span><br />
                                    (Total KPIs:

                                    {
                                        category.total >= categoryLimits[catIndex].min && category.total <= categoryLimits[catIndex].max
                                            ? <span className="text-green-500"> {category.total}</span>
                                            : <span className="text-red-500"> {category.total}</span>
                                    }

                                    /{categoryLimits[catIndex].min}-{categoryLimits[catIndex].max})
                                </h2>
                            }

                            {
                                categoryLimits[catIndex].max == 0 &&
                                <h2 className="text-base font-semibold mb-2">
                                    <span className="text-blue-600">{category.category_name}</span>
                                </h2>
                            }


                            {/* <button
                            className="whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => addKRA(catIndex, category.include_kpis)}
                        >
                            Add KRA
                        </button> */}
                        </div>

                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-200 font-open-sans">
                                    <th className="p-1.5 border">No.</th>
                                    <th className="p-1.5 border"> {category.include_kpis == "Y" ? "KRA" : "Expectations"}</th>

                                    {/* <th className="p-1.5 border">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.kras.map((kra, kraIndex) =>
                                        <>
                                            <tr key={kra.id} className="border">
                                                <td className="text-center font-bold">
                                                    {kraIndex + 1}
                                                </td>
                                                <td className="p-2 border w-full">
                                                    <textarea
                                                        disabled
                                                        type="text"
                                                        value={kra.text}
                                                        onChange={(e) => handleKRAChange(catIndex, kraIndex, "text", e.target.value)}
                                                        placeholder={category.include_kpis == "Y" ? "KRA Description" : "Expectations Description"}

                                                        className="p-2 h-14 border border-gray-400 w-full rounded"
                                                    />
                                                </td>
                                                {/* <td className="p-2 flex items-center gap-1 h-fit w-fit"> */}
                                                {/* {
                                                    category.include_kpis == "Y"
                                                    &&

                                                    <button
                                                        className=" bg-green-500 whitespace-nowrap text-white px-3 py-1 rounded"
                                                        onClick={() => addKPI(catIndex, kraIndex)}
                                                    >
                                                        Add KPI
                                                    </button>
                                                }
                                                <button
                                                    className="bg-red-500 whitespace-nowrap text-white px-3 py-1 rounded w-fit"
                                                    onClick={() => removeKRA(catIndex, kraIndex)}
                                                >
                                                    Remove KRA
                                                </button> */}

                                                {/* </td> */}

                                            </tr>

                                            {kra.kpis.length > 0 && (
                                                <tr>
                                                    <td colSpan="2">
                                                        <table className="w-full border mt-2">

                                                            <thead>
                                                                <tr className="bg-gray-200 text-base font-open-sans">
                                                                    <th className="px-2 border p-1.5">KPI</th>
                                                                    <th className="px-2 whitespace-nowrap border">Target Date</th>
                                                                    <th className="px-2 border">Quarter</th>
                                                                    <th className="px-2 border">Weightage</th>
                                                                    <th className="px-2 whitespace-nowrap border w-fit">Completion Date</th>
                                                                    {/* <th className="px-2 border w-fit">Obtained</th> */}
                                                                    <th className="px-2 border w-fit">Remarks</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {kra.kpis.map((kpi, kpiIndex) => (
                                                                    <tr>
                                                                        <td className="p-1.5 w-full border">
                                                                            <textarea
                                                                                disabled
                                                                                value={kpi.name}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "name", e.target.value)}
                                                                                placeholder="KPI Description"
                                                                                className="p-2 h-11 border rounded border-gray-400 w-full text-sm"
                                                                            />
                                                                        </td>

                                                                        <td className="p-2 border text-center">
                                                                            <input
                                                                                disabled
                                                                                name="target"
                                                                                type="date"
                                                                                value={kpi.target ? moment(kpi.target).format("YYYY-MM-DD") : ""}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "target", e.target.value)}
                                                                                className="p-1 m-0 border border-gray-400 rounded py-2 w-fit text-sm"
                                                                            />

                                                                        </td>

                                                                        <td className="p-2 border text-center">
                                                                            <select
                                                                                disabled
                                                                                name="dropdown"
                                                                                value={kpi.quarter}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "quarter", e.target.value)}
                                                                                className="border border-gray-400 rounded p-2 w-fit text-sm"
                                                                                required
                                                                            >
                                                                                <option value="Q1">Q1</option>
                                                                                <option value="Q2">Q2</option>
                                                                                <option value="Q3">Q3</option>
                                                                                <option value="Q4">Q4</option>
                                                                            </select>
                                                                        </td>

                                                                        <td className="p-2 border text-center">
                                                                            <input
                                                                                disabled
                                                                                onWheel={(e) => e.target.blur()}
                                                                                type="number"
                                                                                value={kpi.number || ""}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "number", e.target.value)}
                                                                                placeholder="0"
                                                                                className="p-2 text-sm border w-16 rounded border-gray-400"
                                                                            />
                                                                        </td>
                                                                        <td className="p-2 border text-center">
                                                                            <input

                                                                                min={minDate} max={maxDate}
                                                                                disabled={(kpi.completion && kpi.obtained) ? true : false}
                                                                                name="completion"
                                                                                type="date"
                                                                                value={kpi.completion ? moment(kpi.completion).format("YYYY-MM-DD") : ""}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "completion", e.target.value)}
                                                                                className="p-1 m-0 border border-gray-400 rounded py-2 w-fit text-sm"
                                                                            />
                                                                        </td>
                                                                        {/* <td className="w-fit border text-center">
                                                                            <input
                                                                                disabled
                                                                                onWheel={(e) => e.target.blur()}
                                                                                type="number"
                                                                                min="0" max="10" step="1"
                                                                                value={kpi.obtained || ""}
                                                                                onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "obtained", e.target.value)}
                                                                                placeholder="0"
                                                                                className="p-2 text-sm border w-16 rounded border-gray-400"
                                                                            />
                                                                        </td> */}
                                                                        <td className="w-fit border text-center">
                                                                            <button
                                                                                className="bg-blue-500 text-white w-fit px-3 py-1 rounded"
                                                                                onClick={() => { openRemarksModal(catIndex, kraIndex, kpiIndex,true,false); }}
                                                                            >
                                                                                Remarks
                                                                            </button>

                                                                        </td>
                                                                        {/* <td className="w-fit border text-center">
                                                                        <button
                                                                            className="bg-red-500 text-white w-fit px-3 py-1 rounded"
                                                                            onClick={() => removeKPI(catIndex, kraIndex, kpiIndex)}
                                                                        >
                                                                            -
                                                                        </button>

                                                                    </td> */}


                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}

                                        </>

                                    )}
                            </tbody>

                        </table>


                    </div>
                ))}

                <div className="flex gap-2">

                    <h2 className="text-xl font-semibold">
                        Total KPIs across categories:
                        {
                            totalKPIs == 100
                                ? <span className="text-green-500"> {totalKPIs}</span>
                                : <span className="text-red-500"> {totalKPIs}</span>
                        }
                        /100
                    </h2>

                    {
                        ((categories[0].total >= categoryLimits[0].min && categories[0].total <= categoryLimits[0].max) &&
                            (categories[1].total >= categoryLimits[1].min && categories[1].total <= categoryLimits[1].max) &&
                            (categories[2].total >= categoryLimits[2].min && categories[2].total <= categoryLimits[2].max)) &&
                            totalKPIs == 100

                            ? <button onClick={() => submitForm()}
                                className=" bg-green-500 whitespace-nowrap text-white px-3 py-1 rounded"
                            >
                                Submit
                            </button>
                            : <button
                                className=" bg-red-500 whitespace-nowrap text-white px-3 py-1 rounded"
                            >
                                Submit
                            </button>

                    }



                </div>
            </div>
        </>
    );
};

export default EditCompletionDate;

