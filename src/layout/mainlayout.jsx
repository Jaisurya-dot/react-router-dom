import React, { useState, Suspense } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router';
import "./main.css";

const Mainlayout = () => {
    const [collapse, setCollapse] = useState(false);

    return (
        <div className="flex">
            <Sidebar collapse={collapse} setCollapse={setCollapse} />

            <div id='main'
                className={`bg-gray-50 w-full min-h-screen transition-all duration-300
                           ${collapse ? "ml-20" : "ml-64"}`}>
                <Topbar collapse={collapse} />
                <Suspense fallback={
                    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default Mainlayout;
