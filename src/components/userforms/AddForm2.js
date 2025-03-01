import { useEffect, useState } from "react";

const AddForm2 = () => {
    const categoryLimits = [
        { min: 50, max: 80 },
        { min: 5, max: 25 },
        { min: 10, max: 20 },
    ];

    const [categories, setCategories] = useState([
        { id: 1, name: "Category 1", kras: [], total: 0 },
        { id: 2, name: "Category 2", kras: [], total: 0 },
        { id: 3, name: "Category 3", kras: [], total: 0 },
    ]);

    const [totalKPIs, settotalKPIs] = useState(0);

    // Handle KRA Input Change
    const handleKRAChange = (catIndex, kraIndex, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras[kraIndex][field] = value;
        setCategories(updatedCategories);
    };


    // Add KRA
    const addKRA = (catIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[catIndex].kras.push({
            id: Date.now(),
            text: "",
            date: "",
            kpis: [{ id: Date.now(), name: "", number: 0, quarter: "Q1" }],
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
            quarter: "Q1"
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
        else {
            updatedCategories[catIndex].kras[kraIndex].kpis[kpiIndex][field] = value;
        }

        setCategories(updatedCategories);

    };


    return (
        <div className="p-5">
            {categories.map((category, catIndex) => (
                <div key={category.id} className="mb-5 border p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center border">

                        <h2 className="text-lg font-semibold mb-2">
                            {category.name}<br />  (Total KPIs:

                            {
                                category.total >= categoryLimits[catIndex].min && category.total <= categoryLimits[catIndex].max
                                    ? <span className="text-green-500"> {category.total}</span>
                                    : <span className="text-red-500"> {category.total}</span>
                            }

                            /{categoryLimits[catIndex].min}-{categoryLimits[catIndex].max})
                        </h2>

                        <button
                            className="whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => addKRA(catIndex)}
                        >
                            Add KRA
                        </button>
                    </div>


                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">No.</th>
                                <th className="p-2 border">KRA</th>
                                <th className="p-2 border">Actions</th>
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
                                                    type="text"
                                                    value={kra.text}
                                                    onChange={(e) => handleKRAChange(catIndex, kraIndex, "text", e.target.value)}
                                                    placeholder="KRA Description"
                                                    className="p-2 h-12 border w-full"
                                                />
                                            </td>


                                            <td className="p-2 flex items-center gap-1 h-fit w-fit">

                                                <button
                                                    className=" bg-green-500 whitespace-nowrap text-white px-3 py-1 rounded"
                                                    onClick={() => addKPI(catIndex, kraIndex)}
                                                >
                                                    Add KPI
                                                </button>
                                                <button
                                                    className="bg-red-500 whitespace-nowrap text-white px-3 py-1 rounded w-fit"
                                                    onClick={() => removeKRA(catIndex, kraIndex)}
                                                >
                                                    Remove KRA
                                                </button>

                                            </td>

                                        </tr>

                                        {kra.kpis.length > 0 && (
                                            <tr>
                                                <td colSpan="3">
                                                    <table className="w-full border mt-2">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">KPI</th>
                                                                <th className="border max-w-fit">Target Date</th>
                                                                <th className="border w-fit">Quarter</th>
                                                                <th className="border w-fit">Weightage</th>
                                                                <th className="border w-fit">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {kra.kpis.map((kpi, kpiIndex) => (
                                                                <tr>
                                                                    <td className="p-2 border">

                                                                        <textarea
                                                                            value={kpi.name}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "name", e.target.value)}
                                                                            placeholder="KPI Name"
                                                                            className="h-12 border w-full"
                                                                        />
                                                                    </td>
                                                                    <td className="max-w-fit border text-center">
                                                                        <input
                                                                            type="date"
                                                                            value={kpi.date || ""}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "date", e.target.value)}
                                                                            className="p-1 m-0 border w-fit"
                                                                        />
                                                                    </td>
                                                                    <td className="max-w-fit border text-center">
                                                                        <select
                                                                            name="dropdown"
                                                                            value={kpi.quarter}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "quarter", e.target.value)}
                                                                            className="border p-2 w-fit my-2"
                                                                            required
                                                                        >
                                                                            <option value="Q1">Q1</option>
                                                                            <option value="Q2">Q2</option>
                                                                            <option value="Q3">Q3</option>
                                                                            <option value="Q4">Q4</option>
                                                                        </select>
                                                                    </td>
                                                                    <td className="w-fit border text-center">
                                                                        <input
                                                                            onWheel={(e) => e.target.blur()} 
                                                                            type="number"
                                                                            value={kpi.number || ""}
                                                                            onChange={(e) => handleKPIChange(catIndex, kraIndex, kpiIndex, "number", e.target.value)}
                                                                            placeholder="0"
                                                                            className="p-2 border w-16"
                                                                        />
                                                                    </td>
                                                                    <td className="w-fit border text-center">
                                                                        <button
                                                                            className="bg-red-500 text-white w-fit px-3 py-1 rounded"
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
            <h2 className="text-xl font-bold">
                Total KPIs across categories:
                {
                    totalKPIs == 100
                        ? <span className="text-green-500"> {totalKPIs}</span>
                        : <span className="text-red-500"> {totalKPIs}</span>
                }
                /100
            </h2>
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
