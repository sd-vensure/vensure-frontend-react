import { useDispatch, useSelector } from "react-redux";
import { closePAFModal } from "../store/user/userHelper";
import useModal from "../hooks/useModal";
import moment from "moment";

export default function UserInformationModal() {

    const { userinformation, setuserinformation } = useModal()

    const currentuser = useSelector((state) => state.user.current_user);
   

    const closeModal = () => {
        setuserinformation(false)
    };

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div id="style-7" className="relative  w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg md:text-xl font-semibold">
                            User Information
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
                                    <dt className="font-medium text-gray-900">Name</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.user_first_name}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Employee ID</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.emp_id}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Department</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.department_name}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Designation</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.designation}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Reporting To</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.departmenthead?.user_first_name}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Reporting ID</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{currentuser?.departmenthead?.emp_id}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Date of Joining</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{moment(currentuser?.doj).format("DD-MM-YYYY")}</dd>
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
