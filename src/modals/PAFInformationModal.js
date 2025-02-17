import { useDispatch, useSelector } from "react-redux";
import { closePAFModal } from "../store/user/userHelper";

export default function PAFInformationModal() {
    const pafdetails = useSelector((state) => state.user.paf_selected);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(closePAFModal());
    };

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div id="style-7" className="relative  w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg md:text-xl font-semibold">
                            PAF Details: <span className="text-blue-900">{pafdetails.paf_unique}</span>
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
                                        <dt className="font-medium text-gray-900">Status</dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                        {pafdetails.paf_approved_status=="Pending" && <span className='text-red-600'>Pending</span>}
                                        {pafdetails.paf_approved_status=="Accepted" && <span className='text-green-600'>Accepted</span>}
                                        {pafdetails.paf_approved_status=="Rejected" && <span className='text-red-600'>Rejected</span>}
                                        </dd>
                                </div>

                                {[
                                    { label: "Client", value: pafdetails.client_name },
                                    { label: "Drug Name", value: pafdetails.drug_name },
                                    { label: "Drug API", value: pafdetails.drug_api },
                                    { label: "Innovator", value: pafdetails.drug_innovator },
                                    { label: "Brief Scope", value: pafdetails.brief_scope },
                                    { label: "API Sources", value: pafdetails.api_sources },
                                    { label: "SKU", value: pafdetails.sku },
                                    { label: "Import License API", value: pafdetails.import_license_api },
                                    { label: "Import License RLD", value: pafdetails.import_license_rld },
                                    
                                ].map((item, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">{item.label}</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{item.value}</dd>
                                    </div>
                                ))}

                                {/* Dynamic Fields */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Compositions</dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        <ul className="list-disc list-inside">
                                            {pafdetails.compositions &&
                                                JSON.parse(pafdetails.compositions)?.map((v, i) => (
                                                    <li key={i} className="text-sm text-left">{v}</li>
                                                ))}
                                        </ul>
                                    </dd>
                                </div>


                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Driving Market</dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        <ul className="list-disc list-inside">
                                            {pafdetails.driving_market &&
                                                JSON.parse(pafdetails.driving_market)?.map((v, i) => (
                                                    <li key={i} className="text-sm text-left">{v}</li>
                                                ))}
                                        </ul>
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Stakeholders</dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        <ul className="list-disc list-inside">
                                            {pafdetails.stakeholders &&
                                                JSON.parse(pafdetails.stakeholders)?.map((v, i) => (
                                                    <li key={i} className="text-sm text-left">{v.stakeholder_name}-{v.stakeholder_designation}</li>
                                                ))}
                                        </ul>
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">Created By</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{pafdetails.paf_created_by}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">Approved By</dt>
                                        <dd className="text-gray-700 sm:col-span-2">{pafdetails.paf_approved_by || "-"}</dd>
                                </div>


                            </dl>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end p-4 border-t">
                        <button className="bg-blue-600 text-white rounded px-4 py-2 text-sm md:text-base" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        </>
    );
}
