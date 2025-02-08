import React from 'react'
import {Routes,Route,Outlet} from "react-router-dom"

const Layout = () => {
    return (
        <>
                <Outlet/>
        </>
    )
}

export default Layout