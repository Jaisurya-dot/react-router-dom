import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Outlet } from 'react-router-dom'
import "./main.css"

const Mainlayout = () => {

    const [collapse, setCollapse] = useState(false)


    return (
        <div className="flex">
            <Sidebar collapse={collapse} setCollapse={setCollapse} />

            <div id='main'
                className={`bg-amber-50 w-full h-screen transition-all duration-300
                           ${collapse ? "ml-20" : "ml-64"}`}>
                <Topbar collapse={collapse} />
                <Outlet />
            </div>
        </div>
    )
}

export default Mainlayout
