import { useDispatch, useSelector } from "react-redux";
import { closePAFModal, delQueryAnswer } from "../store/user/userHelper";
import useModal from "../hooks/useModal";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../components/axiosapi";
import { useNavigate } from "react-router-dom";

export default function QueryAnswerModal() {

    const dispatch = useDispatch();

    const showquestionmodal = useSelector((state) => state.user.query_answer);

    const [answergiven, setanswergiven] = useState("")

    const closeModal = () => {
        dispatch(delQueryAnswer());
    };

    const navigate=useNavigate()

    const submitform = async () => {
        try {
            
            let insertdata = await api.put("/userform/answerquery", { "answer": answergiven, "query_id": showquestionmodal.query_id })

            if(insertdata.data.status)
            {
                // navigate("/");
                dispatch(delQueryAnswer());
                toast.success(insertdata.data.message)
            }
            else{
                toast.info(insertdata.data.status)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div id="style-7" className="relative  w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg md:text-xl font-semibold">
                            Query and Answer
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
                                    <dt className="font-medium text-gray-900">Question</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{showquestionmodal.question}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Answer</dt>
                                    {
                                        showquestionmodal.typeofview == "View"
                                            ? <dd className="text-gray-700 sm:col-span-2">{showquestionmodal.answer || "-"}</dd>
                                            : <dd className="text-gray-700 sm:col-span-2 w-full">
                                                <textarea className="p-1 w-full" onChange={(e) => { setanswergiven(e.target.value) }} value={showquestionmodal.answer} />
                                            </dd>
                                    }

                                </div>



                            </dl>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 p-4 border-t">
                        <button className="bg-blue-600 text-white rounded px-4 py-2 text-sm md:text-base" onClick={closeModal}>
                            Close
                        </button>
                        {

                            showquestionmodal.typeofview != "View" &&
                            <button className="bg-green-600 text-white rounded px-4 py-2 text-sm md:text-base" onClick={() => submitform()}>
                                Submit
                            </button>
                        }
                    </div>
                </div>
            </div>

            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        </>
    );
}
