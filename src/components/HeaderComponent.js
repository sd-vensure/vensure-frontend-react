import { useState } from "react";
import { Link } from "react-router-dom"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HeaderComponent({ tabs, settabs, setselectedoption, selectedoption,headertext }) {

    // const [tabs, settabs] = useState([
    //     { name: 'Client Information', number: '2', current: true },
    //     { name: 'Links Generated', number: '1', current: false }
    // ]);

    const handlechange = (tab) => {
        // console.log(JSON.stringify(tab))
        if (tab) {
            let fountobj = tabs.find(tt => tt.name == tab)
            setselectedoption(fountobj.number);

            settabs(prevItems =>
                prevItems.map(item =>
                    item.name === fountobj.name
                        ? { ...item, current: true }
                        : { ...item, current: false }
                )
            );
        }

    }

    return (
        <div className="relative border-gray-200 pb-5 mb-1 sm:pb-0">
            <div className="md:flex md:items-center md:justify-between">
                <h3 className="text-xl font-semibold leading-6 text-cyan-800">{headertext}</h3>
               
            </div>
            <div className="mt-5">
                <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        defaultValue={tabs.find((tab) => tab.current)?.name}  // Safe optional chaining for .name
                        onChange={(e) => { e.preventDefault(); handlechange(e.target.value) }}
                        className="block w-full rounded-md  border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 cursor-pointer"
                    >
                        {
                            tabs.map((tab) => (
                                <option value={tab.name} key={tab.name}>
                                    {tab.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-6">
                        {tabs.map((tab) => (
                            <p
                                key={tab.name}
                                aria-current={tab.current ? 'page' : undefined}
                                onClick={(e) => { e.preventDefault(); handlechange(tab.name) }}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium cursor-pointer',
                                )}
                            >
                                {tab.name}
                            </p>
                        ))}
                    </nav>
                </div>
            </div>
        </div >
    )
}