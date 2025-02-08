import React from 'react'
import useModal from '../hooks/useModal';

const Logout = () => {

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const bclick = () => {
        setmodal(false);
    }


    return (
        <>
            <div className="m-2 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
                <div className="relative w-full my-2 mx-auto sm:w-[350px] md:w-[450px]">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between py-2 px-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">
                                {modalmessage.text1}
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative px-3 py-2 flex-auto">
                            <p className="my-1 text-slate-500 text-base leading-relaxed">
                                {modalmessage.text2}
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end px-3 py-2 rounded-b">
                            <button className="text-white rounded bg-blue-800 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={bclick}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default Logout