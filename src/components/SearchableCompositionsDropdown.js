
import React, { useEffect, useState } from "react";

const SearchableCompositionsDropdown = ({compositions,selectedcompositions,setselectedcompositions}) => {

    
    const [inputValue, setInputValue] = useState("");
    // const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    const addtoarray = (ele) => {
        const updatedArray = selectedcompositions.includes(ele)
        ? selectedcompositions.filter(item => item !== ele) // Remove item if it exists
        : [...selectedcompositions, ele]; // Add item if it doesn't exist

        setselectedcompositions(updatedArray)
    };

    return (
        <div className="h-auto relative my-2">
            <div
                onClick={() => { setOpen(!open); setInputValue(""); }}
                className={`border bg-white w-full p-2 flex items-center justify-between rounded overflow-hidden
                    }`}
            >
                <div>

                    {
                        selectedcompositions.length > 0
                            // ? data?.item.substring(0, 35) + "..."
                            ? selectedcompositions.map((ele) =>
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


            <ul
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

                        compositions
                        .filter((val) => {
                            return inputValue.trim().toLowerCase() === ""
                                ? val
                                : (String(val.composition_name).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()) ||
                                    String(val.composition_name).trim().toLowerCase().includes(String(inputValue).trim().toLowerCase()))

                        })
                        .map((itemir, ind) => (
                            <li
                                key={ind}
                                className={`border p-2 text-sm hover:bg-sky-600 hover:text-white
                                                ${selectedcompositions.includes(itemir.composition_name) &&
                                    "bg-sky-600 text-white"
                                    }`}
                                onClick={() => { addtoarray(itemir.composition_name) }}
                                value={itemir.composition_name}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedcompositions.includes(itemir.composition_name) ? true : false}
                                    onClick={() => { addtoarray(itemir.composition_name) }}
                                    className="cursor-pointer m-2"
                                />
                                {itemir.composition_name}
                            </li>
                        ))
                }
            </ul>
        </div>
    );
};

export default SearchableCompositionsDropdown;