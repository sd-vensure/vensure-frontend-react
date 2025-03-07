import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../axiosapi";
import ViewParticularForm from "./ViewParticularForm";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewParticularFormNew = () => {


    const [data, setdata] = useState([]);

    const currentuser = useSelector((state) => state.user.current_user);
    const userform = useSelector((state) => state.user.user_form);

    const [finance, setfinance] = useState(userform.financial_year);


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
        { category_id: 4, category_name: "Training", kras: [], total: 0, include_kpis: "N" }

    ]);

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
        // const distinctCategories = data
        //     .reduce((unique, item) => {
        //         // Find if the category already exists in the unique array
        //         let existingCategory = unique.find(category => category.category_id === item.category_id);

        //         // If the category doesn't exist, create it and add to unique array
        //         if (!existingCategory) {
        //             existingCategory = {
        //                 category_id: item.category_id,
        //                 category_name: item.category_name,
        //                 kras: [],
        //                 total: 0
        //             };
        //             unique.push(existingCategory); // Add new category to unique array
        //         }

        //         // Check if the current item has a kra_id and kpi_id is null
        //         if (item.kra_id && item.kpi_id === null) {
        //             const kraObject = {
        //                 id: item.kra_id,
        //                 text: item.kra_text,
        //                 date: "", // Populate with empty string or any other date as needed
        //                 kpis:[]
        //             };

        //             // Push the kraObject to the kras array of the existing category
        //             existingCategory.kras.push(kraObject);
        //         }

        //         return unique; // Return the accumulated unique array
        //     }, []);

        let distinctCategories = data
            .reduce((unique, item) => {
                // Find if the category already exists in the unique array
                let existingCategory = unique.find(category => category.category_id === item.category_id);

                // If the category doesn't exist, create it and add to unique array
                if (!existingCategory) {
                    existingCategory = {
                        category_id: item.category_id,
                        category_name: item.category_name,
                        include_kpis: item.include_kpi,
                        kras: [],
                        total: 0
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
                        target: item.kpi_target, // KPI Target
                        obtained: item.kpi_obtained, // KPI Obtained Value
                        completion: item.kpi_complete // KPI Completion Status
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
            setCategories(distinctCategories);
        }

    }

    useEffect(() => {
        setDataAsRequired();
    }, [data])



    return (
        <div className="">

            <p className='text-xl md:text-2xl text-center w-full text-white p-3 md:p-5 mb-4 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/40'>KRA Form</p>

            <div class="flow-root mb-5 border p-4 rounded-lg shadow-lg">
                <dl class="-my-3 divide-y divide-gray-100 text-base">
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">User Name</dt>
                        <dd class="text-gray-900 sm:col-span-2">{userform?.user_first_name}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">Employee ID</dt>
                        <dd class="text-gray-900 sm:col-span-2">{userform?.emp_id}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">Department</dt>
                        <dd class="text-gray-900 sm:col-span-2">{userform?.department_name}</dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">Designation</dt>
                        <dd class="text-gray-900 sm:col-span-2">{userform?.designation}</dd>
                    </div> 
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">Date of Joining</dt>
                        <dd class="text-gray-900 sm:col-span-2">{moment(userform?.doj).format("DD-MM-YYYY")}</dd>
                    </div> 
                    <div class="grid grid-cols-1 gap-1 py-1.5 sm:grid-cols-4 sm:gap-4">
                        <dt class="font-medium text-blue-600">Financial</dt>
                        <dd class="text-gray-900 sm:col-span-2">{userform?.financial_year}</dd>
                    </div> 
                </dl>
            </div>

            {categories.map((category, catIndex) => (
                <div key={category.category_id} className="mb-5 border p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">

                        {
                            categoryLimits[catIndex].max > 0
                            &&

                            <h2 className="text-lg font-semibold mb-2">
                                <span className="text-blue-600">{category.category_name}</span><br />
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
                            <h2 className="text-lg font-semibold mb-2">
                                <span className="text-blue-600">{category.category_name}</span>
                            </h2>
                        }

                    </div>

                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">No.</th>
                                <th className="p-2 border">KRA</th>

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
                                                {kra.text}
                                            </td>

                                        </tr>

                                        {kra.kpis.length > 0 && (
                                            <tr>
                                                <td colSpan="2">
                                                    <table className="w-full border mt-2">
                                                        <thead>
                                                            <tr className="bg-gray-200">
                                                                <th className="border p-2">KPI</th>
                                                                <th className="border p-2 whitespace-nowrap max-w-fit">Target Date</th>
                                                                <th className="border p-2 w-fit">Quarter</th>
                                                                <th className="border p-2 w-fit">Weightage</th>
                                                                <th className="border whitespace-nowrap p-2 w-fit">Completion Date</th>
                                                                <th className="border p-2 w-fit">Obtained</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {kra.kpis.map((kpi, kpiIndex) => (
                                                                <tr>
                                                                    <td className="p-2 border">
                                                                        {kpi.name}
                                                                    </td>
                                                                    <td className="max-w-fit border text-center">
                                                                        {kpi.target ? moment(kpi.target).format("DD-MM-YYYY") : "-"}
                                                                    </td>
                                                                    <td className="max-w-fit border text-center">
                                                                        {kpi.quarter}
                                                                    </td>
                                                                    <td className="w-fit border text-center">
                                                                        {kpi.number ? kpi.number : 0}
                                                                    </td>
                                                                    <td className="max-w-fit border text-center">
                                                                        {kpi.completion ? moment(kpi.completion).format("DD-MM-YYYY") : "-"}
                                                                    </td>
                                                                    <td className="w-fit border text-center">
                                                                        {kpi.obtained ? kpi.obtained : "-"}
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



            </div>
        </div>
    );
};

export default ViewParticularFormNew;

