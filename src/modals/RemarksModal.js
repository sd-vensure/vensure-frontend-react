import { useDispatch, useSelector } from "react-redux";
import { closePAFModal, delQueryAnswer, remarksModalClose } from "../store/user/userHelper";
import useModal from "../hooks/useModal";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../components/axiosapi";
import { useNavigate } from "react-router-dom";

export default function RemarksModal({ valuestopass, setvaluestopass, categories, setCategories }) {

    const handleKPIChange = (value, name) => {
        const updatedCategories = [...categories];
        updatedCategories[valuestopass.catindex].kras[valuestopass.kraindex].kpis[valuestopass.kpiindex][name] = value;
        setCategories(updatedCategories)
    }

    const closeModal = () => {
        setvaluestopass({
            "catindex": null,
            "kraindex": null,
            "kpiindex": null,
            "modalstate": false,
            "usertext": false,
            "designatedtext": false
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div id="style-7" className="relative  w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg md:text-xl font-semibold">
                            Remarks
                        </h3>
                        <button onClick={closeModal} className="text-lg font-semibold">
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">


                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">User Remarks</dt>
                                    <dd className="text-gray-700 sm:col-span-2 w-full">
                                        <textarea
                                            disabled={!valuestopass.usertext}
                                            className="p-1 w-full" onChange={(e) => { handleKPIChange(e.target.value, "user_remarks") }}
                                            value={categories[valuestopass.catindex].kras[valuestopass.kraindex].kpis[valuestopass.kpiindex].user_remarks} />
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Designated Person Remarks</dt>
                                    <dd className="text-gray-700 sm:col-span-2 w-full">
                                        <textarea
                                            disabled={!valuestopass.designatedtext}
                                            className="p-1 w-full" onChange={(e) => { handleKPIChange(e.target.value, "designated_remarks") }}
                                            value={categories[valuestopass.catindex].kras[valuestopass.kraindex].kpis[valuestopass.kpiindex].designated_remarks}
                                        />
                                    </dd>


                                </div>

                            </dl>
                        </div>
                    </div>


                </div>
            </div>

            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        </>
    );
}
