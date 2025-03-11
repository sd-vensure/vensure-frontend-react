import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../provision.gif'
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useSelector } from 'react-redux';
import useModal from '../hooks/useModal';

const TestingSideBAr = () => {

    const api = useAxiosPrivate()

    const { setauth, adminname, setadminname, token, settoken, auth } = useAuth();

    const currentuser = useSelector((state) => state.user.current_user);

    const { userinformation, setuserinformation } = useModal()


    const [openIndex, setOpenIndex] = useState(null);

    // Function to handle opening and closing of dropdowns
    const toggleDropdown = (index, isOpen) => {
        setOpenIndex(isOpen ? index : null); // Open the new one, close others
    };

    // useEffect(() => {
    //     console.log(openIndex, "this is openindex")
    // }, [openIndex])

    const nav = useNavigate()

    const logoutuser = async () => {

        try {
            await api.post('user/logout').then(function (response) {
                // localStorage.setItem("token", "")
                localStorage.setItem("token", "")
                setauth({});
                settoken(null)
                nav("/login", { replace: true });
            })

        } catch (error) {
            // setloading(false)
            // setmodal(true);
            // setmodalmessage({
            //     "text1": "Error",
            //     "text2": "No server response."
            // });
        }



    }


    return (
        <div className="max-h-screen font-open-sans min-h-screen bg-gray-800 text-white flex flex-col">
            {/* Logo Section */}
            <div className="p-4 text-xl font-bold text-center">
                <Link to="/">
                    <img srcSet={logo} className='h-14' />
                </Link>

                <span className=" w-full h-[1px] mt-3 bg-white block"></span>

            </div>


            {/* Menu Buttons */}
            <div className="flex flex-col space-y-2 px-4 overflow-y-auto overflow-scroll scrollbar-hide">



                <li key={0} className='list-none'>
                    <details
                        className="group"
                        open={openIndex === 0} // Open only if this dropdown is selected
                        onToggle={(e) => toggleDropdown(0, e.target.open)} // Ensure only one stays open

                    >
                        <summary
                            className="flex cursor-pointer items-center justify-between transition-all hover:pl-5 rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            <span>KRAs</span>
                            <ChevronDown className={`h-4 w-5 transition-transform ${openIndex === 0 ? '-rotate-180' : 'rotate-0'}`} />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <Link
                                    to="/addkra"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Add KRA
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/viewkra"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    View KRA
                                </Link>
                            </li>


                        </ul>
                    </details>
                </li>

                {

                    currentuser && currentuser.roles.includes("ViewDepartmentForm") &&

                    <li className='list-none'>
                        <Link
                            to="/viewdepartmentform"
                            className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            Department Forms
                        </Link>
                    </li>
                }

                {
                    currentuser && currentuser.roles.includes("ViewDepartmentForm") &&
                    <li className='list-none'>
                        <Link
                            to="/viewformsforobtained"
                            className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            Pending Assignmemt
                        </Link>
                    </li>
                }


                {
                    currentuser && currentuser.roles.includes("MyEdit") &&
                    <li className='list-none'>
                        <Link
                            to="/myeditrequests"
                            className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            My Edit Requests
                        </Link>
                    </li>

                }

                {
                    currentuser && currentuser.roles.includes("HRView") &&
                    <li className='list-none'>
                        <Link
                            to="/hrview"
                            className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            HR View
                        </Link>
                    </li>
                }

                {
                    currentuser && currentuser.roles.includes("HREdit") &&
                    <li className='list-none'>
                        <Link
                            to="/hreditrequests"
                            className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            Edit Requests
                        </Link>
                    </li>
                }






                <li key={1} className='list-none'>
                    <details
                        className="group"
                        open={openIndex === 1} // Open only if this dropdown is selected
                        onToggle={(e) => toggleDropdown(1, e.target.open)} // Ensure only one stays open

                    >
                        <summary
                            className="flex cursor-pointer items-center justify-between transition-all hover:pl-5 rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            <span>Help</span>
                            <ChevronDown className={`h-4 w-5 transition-transform ${openIndex === 1 ? '-rotate-180' : 'rotate-0'}`} />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">

                            <li className='list-none'>
                                <Link
                                    to="/question"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Ask Query
                                </Link>
                            </li>

                            {
                                currentuser && currentuser.roles.includes("HRView") &&
                                <li className='list-none'>
                                    <Link
                                        to="/allquestion"
                                        className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                    >
                                        All Queries
                                    </Link>
                                </li>
                            }

<li className='list-none'>
                                <a
                                    target="blank"
                                    href={process.env.NODE_ENV=="production"?"http://192.168.1.200:8080/KRA-KPI-Instructions.pdf":"http://localhost:3000/KRA-KPI-Instructions.pdf"}
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    About
                                </a>
                            </li>


                        </ul>
                    </details>
                </li>





                {/* <li className='list-none'>
                    <Link
                        to="/userforms"
                        className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                    >
                        KRA Forms
                    </Link>
                </li> */}


                <li className='list-none'>
                    <button onClick={logoutuser}
                        className=" w-full text-left transition-all hover:pl-5 block rounded-lg hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/70 hover:text-white drop-shadow-sm px-4 py-2 text-base font-medium text-red-600"
                    >
                        Logout
                    </button>
                </li>

            </div>

            {/* User Information Section */}
            <div onClick={() => { setuserinformation(!userinformation) }} className="cursor-pointer mt-auto p-4 bg-gray-700">
                <div className="flex items-center space-x-3">
                    <img
                        alt="Man"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyn0e-gettCXTQ16GKlj5vjgpzS9u0KwmtDQW-3T8L_dvIrImur-O6u0bN5Jjmu1Kg1A&usqp=CAU"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <strong className="block font-medium text-sm text-white">{auth?.user_first_name}</strong>
                        <span className='text-white text-sm'>{auth?.emp_id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestingSideBAr
