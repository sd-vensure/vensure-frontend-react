import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../axiosapi";
import { getFinancialQuarter } from "../../helper";

const AddForm2 = () => {

    const [finance, setfinance] = useState('')

    const [startYear, endYear] = finance.split("-").map(Number);

    // Define min and max dates dynamically
    const minDate = `${startYear}-04-01`;
    const maxDate = `20${endYear}-03-31`;


    const categoryLimits = [
        { min: 50, max: 80 },
        { min: 5, max: 25 },
        { min: 10, max: 20 },
        { min: 0, max: 0 }
    ];

    const [categories, setCategories] = useState([
        { id: 1, name: "Major Goals", kras: [], total: 0, include_kpis: "Y" },
        { id: 2, name: "Organizational Goals", kras: [], total: 0, include_kpis: "Y" },
        { id: 3, name: "Personal Goals", kras: [], total: 0, include_kpis: "Y" },
        { id: 4, name: "Training", kras: [], total: 0, include_kpis: "N" }
    ]);

    const [totalKPIs, settotalKPIs] = useState(0);

    // Handle KRA Input Change
    const handleKRAChange = (catIndex, kraIndex, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex][field] = value;
        setCategories(updatedCategories);
    };


    // Add KRA
    const addKRA = (catIndex, includeKpis) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras.push({
            id: Date.now(),
            text: "",
            date: "",
            kpis: includeKpis == "Y" ? [{ id: Date.now(), name: "", number: 0, quarter: "-", date: null }] : [],
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
            id: Date.now(),
            name: "",
            number: 0,
            date: null,
            quarter: "-"
        });
        setCategories(updatedCategories);
    };

    // Remove KPI
    const removeKPI = (catIndex, kraIndex, kpiIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex].kpis.splice(kpiIndex, 1);

        if (updatedCategories[catIndex].kras[kraIndex].kpis.length == 0) {
            updatedCategories[catIndex].kras.splice(kraIndex, 1);

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

        updatedCategories[catIndex].total = updatedCategories[catIndex].kras.reduce(
            (sum, kra) => sum + kra.kpis.reduce((s, kpi) => s + kpi.number, 0),
            0
        );
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
        else if (field == "date") {
            if (value == "" || value == null) {
                updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["date"] = null;
                updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["quarter"] = "-";
            }
            else {

                if (value >= minDate && value <= maxDate) {
                    let resp = getFinancialQuarter(value);
                    updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["date"] = value;
                    updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["quarter"] = resp.quarter;
                } else {
                    toast.info(`Please select a date between ${minDate} and ${maxDate}`);
                    updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["date"] = null;
                    updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex]["quarter"] = "-";
                }


            }
        }
        else {
            updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex][field] = value;
        }

        setCategories(updatedCategories);

    };


    const submitForm = async () => {

        if (finance == "") {
            toast.info("Please select financial year")
            return;
        }

        try {
            const uploaddata = await api.post("userform/addnew", { "data": categories, "finance": finance })

            if (uploaddata.data.status) {
                toast.success(uploaddata.data.message)
                setCategories([
                    { id: 1, name: "Organizational Goals", kras: [], total: 0 },
                    { id: 2, name: "Persoanl Behaviour and Training", kras: [], total: 0 },
                    { id: 3, name: "Extra Activities", kras: [], total: 0 }
                ])
            }
            else {
                toast.info(uploaddata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className="">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>Add New KRA</p>


            <div className='flex items-center my-2'>
                <p className='text-blue-600 text-lg'>Financial Year:</p>
                <select
                    name="finance"
                    value={finance}
                    onChange={(e) => { setfinance(e.target.value) }}
                    className="border mx-2 rounded shadow font-open-sans"
                    required
                >
                    <option value="">Select</option>
                    {/* <option>2024-25</option> */}
                    <option>2025-26</option>

                </select>
            </div>

            {categories.map((category, catIndex) => (
                <div key={category.id} className="mb-5 border p-4 rounded-lg shadow-lg font-open-sans">
                    <div className="flex justify-between items-center">

                        {
                            categoryLimits[catIndex].max > 0
                            &&

                            <h2 className="font-semibold mb-2 text-base">
                                <span className="text-blue-700 ">{category.name}</span><br />
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
                                <span className="text-blue-600">{category.name}</span>
                            </h2>
                        }

                        <button
                            className="mb-2 whitespace-nowrap bg-blue-500 text-white px-3 py-2 rounded-md hover:drop-shadow-lg hover:scale-95"
                            onClick={() => addKRA(catIndex, category.include_kpis)}
                        >
                            Add KRA
                        </button>
                    </div>


                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200 font-open-sans">
                                <th className="p-1.5 border">No.</th>
                                <th className="p-1.5 border">KRA</th>
                                <th className="p-1.5 border">Actions</th>
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
                                            <td className="p-2 w-full">
                                                <textarea
                                                    type="text"
                                                    value={kra.text}
                                                    onChange={(e) => handleKRAChange(catIndex, kraIndex, "text", e.target.value)}
                                                    placeholder="KRA Description"
                                                    className="p-2 h-14 border border-gray-400 w-full rounded"
                                                />
                                            </td>


                                            <td className=" gap-1 w-fit h-full mx-auto">
                                                <div className=" flex gap-2 justify-center items-center">
                                                    {
                                                        category.include_kpis == "Y"
                                                        &&
                                                        <button
                                                            className=" bg-green-500 whitespace-nowrap text-white px-3 py-2 text-sm rounded w-fit hover:drop-shadow-lg hover:scale-95"
                                                            onClick={() => addKPI(catIndex, kraIndex)}
                                                        >
                                                            Add KPI
                                                        </button>
                                                    }

                                                    <button
                                                        className="bg-red-500 whitespace-nowrap text-white  px-3 py-2 text-sm rounded w-fit hover:drop-shadow-lg hover:scale-95"
                                                        onClick={() => removeKRA(catIndex, kraIndex)}
                                                    >
                                                        Remove KRA
                                                    </button>
                                                </div>
                                            </td>



                                        </tr>

                                        {kra.kpis.length > 0 && (
                                            <tr>
                                                <td colSpan="3">
                                                    <table className="w-full border mt-2">
                                                        <thead>
                                                            <tr className="bg-gray-200 text-base font-open-sans">
                                                                <th className="px-2 border p-1.5">KPI</th>
                                                                <th className="px-2 border">Target Date</th>
                                                                <th className="px-2 border">Quarter</th>
                                                                <th className="px-2 border">Weightage</th>
                                                                <th className="px-2 border">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {kra.kpis.map((kpi, kpiIndex) => (
                                                                <tr className="">
                                                                    <td className="p-1.5 w-full border">

                                                                        <textarea
                                                                            value={kpi.name}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "name", e.target.value)}
                                                                            placeholder="KPI Description"
                                                                            className="p-2 h-11 border rounded border-gray-400 w-full text-sm"
                                                                        />
                                                                    </td>
                                                                    <td className="px-2 border text-center">
                                                                        <input
                                                                            disabled={finance == "" || finance == null}
                                                                            type="date"
                                                                            min={minDate} max={maxDate}
                                                                            value={kpi.date || ""}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "date", e.target.value)}
                                                                            className="p-1 m-0 border border-gray-400 rounded py-2 w-fit text-sm"
                                                                        />
                                                                    </td>
                                                                    <td className="px-2 border text-center">
                                                                        {/* <select
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
                                                                        </select> */}
                                                                        <p className=" text-center rounded p-2 w-full text-sm">{kpi.quarter}</p>
                                                                    </td>
                                                                    <td className="px-2 border text-center">
                                                                        <input
                                                                            onWheel={(e) => e.target.blur()}
                                                                            type="number"
                                                                            value={kpi.number || ""}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "number", e.target.value)}
                                                                            placeholder="0"
                                                                            className="p-2 text-sm border w-16 rounded border-gray-400"
                                                                        />
                                                                    </td>
                                                                    <td className="w-fit border text-center">
                                                                        <button
                                                                            className="bg-red-500 text-white w-fit px-3 py-1 rounded hover:drop-shadow-lg hover:scale-95 "
                                                                            onClick={() => removeKPI(catIndex, kraIndex, kpiIndex)}
                                                                        >
                                                                            -
                                                                        </button>

                                                                    </td>
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

                {/* {
                    ((categories[0].total >= categoryLimits[0].min && categories[0].total <= categoryLimits[0].max) &&
                        (categories[1].total >= categoryLimits[1].min && categories[1].total <= categoryLimits[1].max) &&
                        (categories[2].total >= categoryLimits[2].min && categories[2].total <= categoryLimits[2].max)) &&
                        totalKPIs == 100

                        ? <button onClick={() => submitForm()}
                            className=" bg-green-500 whitespace-nowrap text-white px-3 py-1 rounded button-ani"
                        >
                            Submit
                        </button>
                        : <button
                            className=" bg-red-500 whitespace-nowrap text-white px-3 py-1 rounded button-ani"
                        >
                            Submit
                        </button>

                } */}

                <button onClick={() => submitForm()}
                    className=" bg-green-500 whitespace-nowrap text-white px-3 py-1 rounded button-ani"
                >
                    Submit
                </button>

            </div>
        </div>
    );
};

export default AddForm2;



{/* <td className="p-2 border">
{kra.kpis.map((kpi, kpiIndex) => (
    <div key={kpi.id} className="flex items-center mb-2">
        <textarea
            type="text"
            value={kpi.name}
            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "name", e.target.value)}
            placeholder="KPI Name"
            className="p-2 border w-full"
        />
        <input
            type="date"
            value={kra.date}
            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "date", e.target.value)}
            className="p-2 border w-full ml-2"
        />
        <input
            type="number"
            value={kpi.number == 0 ? "" : kpi.number}
            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "number", e.target.value)}
            placeholder="0"
            className="p-2 border w-20 ml-2"
        />
        <button
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => removeKPI(catIndex, kraIndex, kpiIndex)}
        >
            -
        </button>
    </div>
))}
<button
    className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
    onClick={() => addKPI(catIndex, kraIndex)}
>
    Add KPI
</button>
</td> */}
