import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'
import { useEffect } from 'react';

const TestingSideBAr = () => {

    const [openIndex, setOpenIndex] = useState(null);

    // Function to handle opening and closing of dropdowns
    const toggleDropdown = (index, isOpen) => {
        setOpenIndex(isOpen ? index : null); // Open the new one, close others
    };

    useEffect(() => {
        console.log(openIndex, "this is openindex")
    }, [openIndex])


    return (
        <div className="max-h-screen min-h-screen bg-gray-800 text-white flex flex-col">
            {/* Logo Section */}
            <div className="p-4 text-xl font-bold text-center">
                <img src="your-logo-url" alt="Logo" className="w-12 mx-auto" />
                <h1 className="text-white mt-2">MyApp</h1>
            </div>

            {/* Menu Buttons */}
            <div className="flex flex-col space-y-2 mt-6 px-4 overflow-y-auto overflow-scroll scrollbar-hide">



                <li key={0} className='list-none'>
                    <details
                        className="group"
                        open={openIndex === 0} // Open only if this dropdown is selected
                        onToggle={(e) => toggleDropdown(0, e.target.open)} // Ensure only one stays open
    
                    >
                        <summary
                            className="flex cursor-pointer items-center justify-between transition-all hover:pl-5 rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            <span>Teams</span>
                            <ChevronDown className={`h-4 w-5 transition-transform ${openIndex === 0 ? '-rotate-180' : 'rotate-0'}`} />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Banned Users
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Calendar
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>
              
                <li key={1} className='list-none'>
                    <details
                        className="group"
                        open={openIndex === 1} // Open only if this dropdown is selected
                        onToggle={(e) => toggleDropdown(1, e.target.open)} // Ensure only one stays open
    
                    >
                        <summary
                            className="flex cursor-pointer items-center justify-between transition-all hover:pl-5 rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            <span>Teams</span>
                            <ChevronDown className={`h-4 w-5 transition-transform ${openIndex === 1 ? '-rotate-180' : 'rotate-0'}`} />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Banned Users
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Calendar
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>

                <li className='list-none'>
                    <details
                        className="group [&_summary::-webkit-details-marker]:hidden"
                        open={openIndex === 1}
                        onClick={() => toggleDropdown(1)}
                    >
                        <summary
                            className="flex cursor-pointer items-center justify-between transition-all hover:pl-5 rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                        >
                            <span>Other Dropdown</span>
                            <ChevronDown className={`h-4 w-5 transition-transform ${openIndex === 1 ? '-rotate-180' : 'rotate-0'}`} />
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Option 1
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-all hover:pl-5 block rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 px-4 py-2 text-base font-medium text-white drop-shadow-sm"
                                >
                                    Option 2
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>

            </div>

            {/* User Information Section */}
            <div className="mt-auto p-4 bg-gray-700">
                <div className="flex items-center space-x-3">
                    <img
                        src="your-profile-pic-url"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <p className="text-sm">John Doe</p>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestingSideBAr
