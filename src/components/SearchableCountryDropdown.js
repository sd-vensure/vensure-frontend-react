
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "../store/user/userHelper";

const SearchableCountryDropdown = () => {

    const dispatch=useDispatch();
    const selectedcountry= useSelector((state) => state.user.countrydata);

    const [inputValue, setInputValue] = useState("");
    // const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
   
    const dropdownRef = useRef(null);

    const data = [
        "Malaysia",
        "Philippines",
        "Singapore"
    ]

    const addtoarray = (ele) => {
        const updatedArray = selectedcountry.includes(ele)
        ? selectedcountry.filter(item => item !== ele) // Remove item if it exists
        : [...selectedcountry, ele]; // Add item if it doesn't exist

        dispatch(setCountry(updatedArray))
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="h-auto relative my-2">
            <div 
                onClick={() => { setOpen(!open); setInputValue(""); }}
                className={`border bg-white w-full p-2 flex items-center justify-between rounded overflow-hidden
                    }`}
            >
                <div>

                    {
                        selectedcountry.length > 0
                            // ? data?.item.substring(0, 35) + "..."
                            ? selectedcountry.map((ele) =>
                                <span className="inline">{ele},</span>
                            )
                            : <span>Nothing Selected</span>
                    }
                </div>

                {
                    !open
                        ? <i class="ri-arrow-drop-down-line text-xl"></i>
                        : <i class="ri-arrow-drop-up-line text-xl"></i>
                }


            </div>


            <ul ref={dropdownRef}
                className={`z-50 absolute bg-white mt-1 w-full whitespace-break-spaces overflow-y-auto ${open ? "max-h-60" : "max-h-0"
                    } `}
            >
                <div className="border rounded-sm flex items-center px-2 sticky top-0 bg-white">

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="Search..."
                        className="w-full placeholder:text-gray-400 p-2 outline-none font-normal"
                    />
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                {

                    data
                        .filter((val) => {
                            return inputValue.trim().toLowerCase() === ""
                                ? val
                                : (String(val).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()) ||
                                    String(val).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()))

                        })
                        .map((itemir, ind) => (
                            <li
                                key={ind}
                                className={`border p-2 text-sm hover:bg-sky-600 hover:text-white
                                                ${selectedcountry.includes(itemir) &&
                                    ""
                                    }`}
                                onClick={() => { addtoarray(itemir) }}
                                value={itemir}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedcountry.includes(itemir) ? true : false}
                                    onClick={() => { addtoarray(itemir) }}
                                    className="cursor-pointer m-2"
                                />
                                {itemir}
                            </li>
                        ))
                }
            </ul>
        </div>
    );
};

export default SearchableCountryDropdown;