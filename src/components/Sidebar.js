import React, { useState } from 'react'
import logo from '../provision.gif'
// import api from './axiosapi';
import useAuth from '../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom"
import Loader from './Loader';
import useModal from '../hooks/useModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Sidebar = () => {

    const api=useAxiosPrivate();

    const [loading, setloading] = useState(false);

    const { setauth, adminname, setadminname,token,settoken,auth } = useAuth();

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const nav = useNavigate();

    // const handlelogout = async (e) => {
    //     setloading(true);
    //     e.preventDefault();

    //     try {
    //         await api.post('user/logout').then(function (response) {
    //             localStorage.removeItem("user_id");
    //             localStorage.removeItem("level");
    //             localStorage.removeItem("name");
    //             localStorage.removeItem("contact");
    //             setloading(false);
    //             setauth({});
    //             setadminname("");
    //             setmodal(true);
    //             setmodalmessage({
    //                 "text1": "Success",
    //                 "text2": "Logged out successfully"
    //             });
    //             nav("/login", { replace: true });
    //         })

    //     } catch (error) {
    //         setloading(false)
    //         setmodal(true);
    //         setmodalmessage({
    //             "text1": "Error",
    //             "text2": "No server response."
    //         });
    //     }


    // }

    const clearCookie=()=> {
        document.cookie = `refreshJwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    const logoutuser =async () => {

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
        <div className="hidden min-h-screen md:flex flex-col justify-between border-e bg-gradient-to-r from-slate-700 to-slate-800">


            <div className="px-4 py-4 bg-gradient-to-r from-slate-700 to-slate-800">
                {/* <span
                    className="grid h-14 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                >
                </span> */}

                <div className='sticky left-0 top-0 bg-gradient-to-r from-slate-700 to-slate-800 z-50'>

                    <span className="my-2 grid h-14 w-full place-content-center rounded-lg text-xs ">
                        <Link to="/">
                            <img srcSet={logo} className='h-14' />
                        </Link>
                    </span>

                    <span className=" w-full h-[1px] bg-white block"></span>

                </div>

                <ul className="mt-6 space-y-1">
                    {/* <li>
                        <a
                            href="#"
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            General
                        </a>
                    </li> */}

                    {/* <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> Drug </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        to="/dashboard/add-drug"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Add Drug
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/view-drug"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        View Drugs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/add-innovator"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Add Innovator
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/view-innovator"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        View Innovator
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li> */}



                    {/* <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> PAF </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        to="/dashboard/add-paf"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Add PAF
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/view-paf"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        View PAF
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link
                                        to="/dashboard/add-stakeholder"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Add Stakeholder
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/dashboard/view-stakeholder"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        View Stakeholder
                                    </Link>
                                </li>

                            </ul>
                        </details>
                    </li> */}

                    {/* <li>
                        <Link
                            to="/drug"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                        >
                            Drug and Innovator
                        </Link>
                    </li> */}
                    
                    {/* <li className=''>
                        <Link
                            to="/paf"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            PAF and Stakeholder
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link
                            to="/department"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            Departments
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            to="/userforms"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            KRA Form
                        </Link>
                    </li>
                   
                    <li>
                        <Link
                            to="/hrview"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            HR View
                        </Link>
                    </li>
                    
                    
                    <li>
                        <Link
                            to="/viewdepartmentform"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                            Department Forms
                        </Link>
                    </li>

                     {/*

                    <li>
                        <a
                            href="#"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                        >
                            Invoices
                        </a>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> Account </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Details
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Security
                                    </a>
                                </li>

                                {/* <li>
                                    <form action="#">
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </li> 
                             </ul>
                        </details>
                    </li>  */}

                    <li>
                        <button
                            onClick={() => { logoutuser() }}
                            className="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 "
                        >
                            Logout
                        </button>
                    </li>

                </ul>
            </div>

            <div className="sticky inset-x-0 px-4 bottom-0 bg-gradient-to-r from-slate-700 to-slate-800">
                <a href="#" className="flex items-center gap-2 bg-transparent py-4 px-1 border-t ">
                    <img
                        alt="Man"
                        // src="https://booleanstrings.com/wp-content/uploads/2021/10/profile-picture-circle-hd.png"
                        // src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png"
                        // src=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyn0e-gettCXTQ16GKlj5vjgpzS9u0KwmtDQW-3T8L_dvIrImur-O6u0bN5Jjmu1Kg1A&usqp=CAU"
                        // src="https://icons-for-free.com/download-icon-facebook+profile+user+profile+icon-1320184041317225686_512.png"
                        // src="https://img.freepik.com/premium-vector/accoun-vector-icon-with-long-shadow-white-illustration-isolated-blue-round-background-graphic-web-design_549897-771.jpg"
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                            {/* <strong className="block font-medium text-sm text-white">{localStorage.getItem("user_id")}</strong> */}
                            <strong className="block font-medium text-sm text-white">{auth?.user_first_name}</strong>

                            {/* <span className='text-white'> +91 {localStorage.getItem("contact")}</span> */}
                            {/* <span className='text-white'> +91 {auth?.user_contact}</span> */}
                        </p>
                    </div>
                </a>
            </div>



        </div>
    )
}

export default Sidebar