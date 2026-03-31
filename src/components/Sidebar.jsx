import React from 'react'
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
import { FaBook, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapse, setCollapse }) => {


    const handleClick = () => {
        setCollapse(!collapse)
    }


    return (
        <div
            className={`bg-black h-screen fixed top-0 left-0  ${collapse ? "w-20" : "w-64"} 
                          transition-all duration-300 ease-in-out`}
        >
            {/* Toggle */}
            <TbLayoutSidebarLeftCollapseFilled
                className="text-white text-2xl absolute top-10 right-8 cursor-pointer hover:scale-110 transition"
                onClick={handleClick}
            />

            {/* Menu */}
            <ul className="mt-24 px-4 space-y-4">

                {/* Dashboard */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative group flex items-center gap-3 p-2 rounded cursor-pointer transition
                        ${isActive ? "bg-gray-700 text-white" : "text-white hover:bg-gray-800"}`
                    }>
                    <MdDashboard className="text-xl" />
                    {!collapse && <span>Dashboard</span>}

                    {collapse && (
                        <span className="absolute left-14 bg-gray-700 text-white text-xs px-2 py-1 rounded 
                         opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            Dashboard
                        </span>
                    )}
                </NavLink>

                {/* Courses */}
                <NavLink
                    to="/CreateCourse"
                    className={({ isActive }) =>
                        `relative group flex items-center gap-3 p-2 rounded cursor-pointer transition
                         ${isActive ? "bg-gray-700 text-white" : "text-white hover:bg-gray-800"}`
                    }>
                    <FaBook className="text-xl" />
                    {!collapse && <span>Courses</span>}

                    {collapse && (
                        <span className="absolute left-14 bg-gray-700 text-white text-xs px-2 py-1 rounded 
                                         opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            Courses
                        </span>
                    )}
                </NavLink>

                {/* Students */}
                <NavLink
                    to="/students"
                    className={({ isActive }) =>
                        `relative group flex items-center gap-3 p-2 rounded cursor-pointer transition
                         ${isActive ? "bg-gray-700 text-white" : "text-white hover:bg-gray-800"}`
                    }>
                    
                    <FaUserGraduate className="text-xl" />
                    {!collapse && <span>Students</span>}

                    {collapse && (
                        <span className="absolute left-14 bg-gray-700 text-white text-xs px-2 py-1 rounded 
                                         opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            Students
                        </span>
                    )}
                </NavLink>

                {/* Instructors */}
                <NavLink
                    to="/instructors"
                    className={({ isActive }) =>
                        `relative group flex items-center gap-3 p-2 rounded cursor-pointer transition
                          ${isActive ? "bg-gray-700 text-white" : "text-white hover:bg-gray-800"}`
                    }>
                    
                    <FaChalkboardTeacher className="text-xl" />
                    {!collapse && <span>Instructors</span>}

                    {collapse && (
                        <span className="absolute left-14 bg-gray-700 text-white text-xs px-2 py-1 rounded 
                                           opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            Instructors
                        </span>
                    )}
                </NavLink>

            </ul>

        </div>
    )


}

export default Sidebar
