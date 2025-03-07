import { useDispatch, useSelector } from "react-redux";
import { closePAFModal } from "../store/user/userHelper";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../components/axiosapi";

export default function PasswordUpdate({openpasswordchange,setopenpasswordchange}) {
    
    const pafdetails = useSelector((state) => state.user.paf_selected);

    const currentuser = useSelector((state) => state.user.current_user);
    
    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [messageColor, setMessageColor] = useState('text-gray-500'); // Default to gray color

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        checkValidation(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkValidation(newPassword, e.target.value);
    };

    const checkValidation = (newPassword, confirmPassword) => {
        if (newPassword.length < 6) {
            setValidationMessage('Password must be at least 6 characters long.');
            setMessageColor('text-gray-500'); // Gray color for length check
            setIsButtonVisible(false);
        } else if (newPassword !== confirmPassword) {
            setValidationMessage('Passwords do not match.');
            setMessageColor('text-red-500'); // Red color for mismatch
            setIsButtonVisible(false);
        } else {
            setValidationMessage('Passwords match and are valid.');
            setMessageColor('text-green-500'); // Green color for success
            setIsButtonVisible(true);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const changepassword = await api.post(`user/updatepassword`,{"user_id":currentuser.user_id,"password":newPassword})

            if (changepassword.data.status) {
                toast.success(changepassword.data.message)
                closeModal();
            }
            else {
                toast.info(changepassword.data.message)
                
            }

        } catch (error) {
            toast.error(error.message)
        }

    };

    const closeModal = () => {
        setopenpasswordchange(false)
    };

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div id="style-7" className="relative  w-full max-w-md mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto py-4">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 pb-2 border-b">
                        <h3 className="text-lg md:text-xl font-semibold">
                            Change/Update Password
                        </h3>
                        <button onClick={closeModal} className="text-lg font-semibold">
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-base">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                    <div className="">
                                        <p className="text-blue-500 font-semibold">User ID: <span className="text-black font-normal">{currentuser.emp_id}</span></p>
                                    </div>
                                    <div className="">
                                        <p className="text-blue-500 font-semibold">New Password:</p>
                                        <input
                                            type="password"
                                            className="w-full drop-shadow-md rounded p-2"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                        />
                                    </div>
                                    <div className="">
                                        <p className="text-blue-500 font-semibold">Confirm Password:</p>
                                        <input
                                            type="text"
                                            className="w-full drop-shadow-md rounded p-2"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                    </div>

                                    <div className={`text-sm my-1 ${messageColor}`}>
                                        {validationMessage}
                                    </div>

                                    <button disabled={!isButtonVisible} type="submit" className={`${isButtonVisible?"bg-blue-600":"bg-red-600"} text-white rounded px-4 py-2 text-sm md:text-base`}>
                                        Update Password
                                    </button>
                                </form>

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
