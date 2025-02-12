
import React, { useEffect, useRef, useState } from "react";

const SearchableStakeholderDropdown = ({ stakeholders, selectedstakeholders, setselectedstakeholders }) => {


    const [inputValue, setInputValue] = useState("");
    // const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);
    

    const addtoarray = (ele) => {
        const updatedArray = selectedstakeholders.find((stakeholder) => stakeholder.stakeholder_id === ele.stakeholder_id ? true : false)
            ? selectedstakeholders.filter(item => item !== ele) // Remove item if it exists
            : [...selectedstakeholders, ele]; // Add item if it doesn't exist

        setselectedstakeholders(updatedArray)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
                // setOpen(!open)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="h-auto relative my-2">
            <div
                 onClick={()=>{setOpen(!open);setInputValue("");}}
                className={`border bg-white w-full p-2 flex items-center justify-between rounded overflow-hidden
                    }`}
            >
                <div>

                    {
                        selectedstakeholders.length > 0
                            // ? data?.item.substring(0, 35) + "..."
                            ? <span>Stakeholder's Selected</span>
                            : <span>Nothing Selected</span>
                    }
                </div>

                {
                    !open
                        ? <i class="ri-arrow-drop-down-line text-xl"></i>
                        : <i class="ri-arrow-drop-up-line text-xl"></i>
                }


            </div>


            <ul 
                className={`border z-50 bg-white mt-1 w-full whitespace-break-spaces overflow-y-auto ${open ? "absolute max-h-60" : " absolute max-h-0"
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
                    stakeholders
                        .filter((val) => {
                            return inputValue.trim().toLowerCase() === ""
                                ? val
                                : (String(val.stakeholder_name).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()) ||
                                    String(val.stakeholder_designation).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()))

                        })
                        .map((itemir, ind) => (
                            <li
                                key={ind}
                                className={`border p-2 text-sm hover:bg-sky-600 hover:text-white
                                                ${selectedstakeholders.find(
                                    (stakeholder) => stakeholder.stakeholder_id === itemir.stakeholder_id
                                ) &&
                                    ""
                                    }`}
                                onClick={() => { addtoarray(itemir) }}
                                value={itemir}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedstakeholders.find((stakeholder) => stakeholder.stakeholder_id === itemir.stakeholder_id ? true : false)}
                                    onClick={() => { addtoarray(itemir) }}
                                    className="cursor-pointer m-2"
                                />
                                {itemir.stakeholder_name}-{itemir.stakeholder_designation}
                            </li>
                        ))
                }
            </ul>

            <p className="text-sm text-cyan-800 mt-3">Selected Stakeholders:
                {
                    selectedstakeholders.length == 0
                    && <span className="text-black"> None</span>

                }</p>


            {

                <ul>
                    {selectedstakeholders.map((ele, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{ele.stakeholder_name} - {ele.stakeholder_designation}</span>
                            <button className="text-red-700"
                                onClick={(e) => {e.preventDefault();addtoarray(ele)}}
                                style={{ marginLeft: 'auto', padding: '5px 10px', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default SearchableStakeholderDropdown;