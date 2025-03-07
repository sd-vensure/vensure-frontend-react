import { useLocation, Navigate, Outlet } from "react-router-dom"
// import useAuth from "../hooks/useAuth"
import React, { useState } from 'react'
import Layout from "./Layout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAuth from "../hooks/useAuth";
import PAFInformationModal from "../modals/PAFInformationModal";
import { useSelector } from "react-redux";
import TestingSideBAr from "./TestingSideBAr";
import PasswordUpdate from "../modals/PasswordUpdate";
import UserInformationModal from "../modals/UserInformationModal";
import useModal from "../hooks/useModal";


const RequireAuth = () => {

    // const { auth, setauth } = useState(true);
    // const [try1, settry1] = useState(true);
    const { auth, setauth, token } = useAuth();

    const {userinformation, setuserinformation}=useModal()

    const showPAFModal = useSelector((state) => state.user.paf_modal);

    const currentuser = useSelector((state) => state.user.current_user);
    

    let allowpasswordupdate="Y"

    const [openpasswordchange, setopenpasswordchange] = useState(true)

    //  const [auth, setauth] = useState(useAuth());

    // console.log(auth)
    // const location = useLocation();

    return (
        <>

            {
                token
                    ?
                    <>
                        {/* <Navbar /> */}
                        <div className='pt-20 md:pt-0 block md:flex bg-[#F5F7F8]'>

                            <div className=' sticky hidden md:block md:w-1/4 lg:w-1/5'>
                                {/* <Sidebar /> */}
                                <TestingSideBAr />
                            </div>

                            <div className='md:border bg-[#F5F7F8] max-h-screen w-full md:block md:w-3/4 lg:w-4/5 p-2 box-border overflow-auto relative'>
                                <Outlet />
                            </div>

                        </div>

                        {
                            showPAFModal && <PAFInformationModal />
                        }
                        
                        {
                            userinformation && <UserInformationModal />
                        }
                      
                        {
                            (openpasswordchange && currentuser && currentuser?.change_password=="Y") && <PasswordUpdate openpasswordchange={openpasswordchange} setopenpasswordchange={setopenpasswordchange}/>
                        }


                    </>
                    : <Navigate to="/login" replace />
            }
        </>
    )
}

export default RequireAuth