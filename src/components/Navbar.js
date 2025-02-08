import React, { useState } from 'react'
import logo from '../logo_square.jpg'
import api from './axiosapi';
import useAuth from '../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom"
import Loader from './Loader';
import useModal from '../hooks/useModal';


const Navbar = () => {

    const barsclicked = () => {
        console.log("hello")
        const myElement = document.getElementById("menu-items");
        const cross_icon = document.getElementById("cross-icon");
        const bars_icon = document.getElementById("bars-icon");

        myElement.classList.toggle("hidelist");
        cross_icon.classList.toggle("hidelist");
        bars_icon.classList.toggle("hidelist");


    }

    const { modal, setmodal, modalmessage, setmodalmessage } = useModal();

    const [loading, setloading] = useState(false);

    const { setauth, adminname, setadminname } = useAuth();

    const nav = useNavigate();



    const handlelogout = async (e) => {
        setloading(true);
        e.preventDefault();

        try {
            await api.post('user/logout').then(function (response) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("level");
                localStorage.removeItem("name");
                localStorage.removeItem("contact");
                setloading(false);
                setauth({});
                // setadminname("");
                setmodal(true);
                setmodalmessage({
                    "text1": "Success",
                    "text2": "Logged out successfully"
                });
                nav("/login", { replace: true });
            })

        } catch (error) {
            setloading(false)
            setmodal(true);
            setmodalmessage({
                "text1": "Error",
                "text2": "No server response."
            });
        }


    }


    return (

        <>
            {
                loading
                    ? <Loader />
                    : <></>
            }

            <header className="bg-gradient-to-r from-blue-800 to-indigo-800 fixed w-full py-2 md:hidden z-50">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 overflow-auto">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link className="block text-teal-600" to="/">
                                <span className="sr-only">Home</span>
                                <img srcSet={logo} className='h-14 w-14' />
                            </Link>
                        </div>


                        <div className="flex items-center gap-4">


                            <div className="block md:hidden">
                                <button onClick={barsclicked}
                                    className="rounded p-2 text-white text-lg transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        id='bars-icon'
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 hidelist"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        id='cross-icon'
                                    >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='menu-items' className='hidelist border absolute w-full min-h-screen top-20 bg-white transition ease-in-out md:hidden z-50'>
                    <ul className=''>
                        <li>
                            <text className="block mx-2 my-1 py-2 pl-3 pr-4 text-xl">Hello,{localStorage.getItem("user_id")}</text>
                        </li>

                        <li>
                            <Link onClick={barsclicked} to="/" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Home</Link>
                        </li>

                        {
                            localStorage.getItem("level") == "level4"
                                ? <>
                                    <li>
                                        <Link onClick={barsclicked} to="/expenseformdirect" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Add Expense</Link>
                                    </li>
                                    <li>
                                        <Link onClick={barsclicked} to="/moneytransferdirect" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Money Transfer</Link>

                                    </li></>
                                : <></>
                        }


                        {
                            localStorage.getItem("level") != "level1" && localStorage.getItem("level") != "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="expense" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">New Expense</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") != "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="transfer" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Transfer Money</Link>
                                </li>
                                : <></>
                        }



                        {
                            localStorage.getItem("level") != "level1" && localStorage.getItem("level") != "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="reportexpense" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Expense Report</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") != "level1" && localStorage.getItem("level") != "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="reportrecieve" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Recieved Report</Link>
                                </li>
                                : <></>
                        }


                        {
                            localStorage.getItem("level") != "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="reportsent" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Sent Report</Link>
                                </li>

                                : <></>
                        }

                        {/* {
                            localStorage.getItem("level") == "level1"
                                ? <li>
                                    <Link onClick={barsclicked} to="addsite" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Add Site</Link>
                                </li>
                                : <></>
                        } */}

                        <li>
                            <Link onClick={barsclicked} to="allsite" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">All Sites</Link>
                        </li>


                        {
                            localStorage.getItem("level") == "level1"
                                ?
                                <>
                                    <li>
                                        <Link onClick={barsclicked} to="sitemoney" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Add Site Money</Link>
                                    </li>
                                    {/* <li>
                                        <Link onClick={barsclicked} to="sitemoneyhistory" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Site Money History</Link>
                                    </li> */}
                                </>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") != "level3" || localStorage.getItem("name") == "Avinash" || localStorage.getItem("name") == "Sumeet"
                                ? <li>
                                    <Link onClick={barsclicked} to="/reportpeople" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Report People</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") == "level2" || localStorage.getItem("level") == "level4"
                                ? <li>
                                    <Link onClick={barsclicked} to="/allpeoplebalance" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">People Balances</Link>
                                </li>
                                : <></>
                        }


                        {
                            localStorage.getItem("level") != "level3"
                                ? <li>
                                    <Link onClick={barsclicked} to="/siteexpenses" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Site Expense Report</Link>
                                </li>
                                : <></>
                        }


                        {
                            localStorage.getItem("name") == "BLP" || localStorage.getItem("name") == "Bank" || localStorage.getItem("name") == "View" || localStorage.getItem("name") == "Sumeet" || localStorage.getItem("name") == "Avinash" || localStorage.getItem("name") == "MK"
                                ? <li>
                                    <Link onClick={barsclicked} to="/sitewisereport" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Site Entries Report</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") == "level4" || localStorage.getItem("level") == "level2" || localStorage.getItem("level") != "level3" || localStorage.getItem("name") == "Sumeet"
                                ? <li>
                                    <Link onClick={barsclicked} to="/vendortransfer" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Vendor Transfer</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("name") == "Sumeet" || localStorage.getItem("name") == "BLP" || localStorage.getItem("name") == "View"
                                ? <li>
                                    <Link onClick={barsclicked} to="/expenseformvendor" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Vendor Expense</Link>
                                </li>
                                : <></>
                        }

                        {
                            localStorage.getItem("level") == "level1"
                                ? <>
                                    <li>
                                        <Link onClick={barsclicked} to="/profitloss" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Profit/Loss</Link>
                                    </li>
                                    <li>
                                        <Link onClick={barsclicked} to="/miscratio" className="block text-base mx-2 my-1 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:border-0 hover:text-white md:p-0 ">Misc. Ratio</Link>
                                    </li>
                                </>
                                : <></>
                        }










                        <li className='w-full px-1 relative mb-1 box-border'>
                            <span className='block mx-2 top-0 border box-border'></span>
                        </li>

                        <li className=''>
                            <a onClick={handlelogout} className=" text-left block rounded text-base mx-2 my-1 py-2 pl-3 pr-4 text-red-600 hover:bg-red-600 hover:shadow-red-500/40 md:border-0 hover:text-white md:p-0 ">Logout</a>
                        </li>
                    </ul>
                </div >
            </header >


        </>

    )
}

export default Navbar