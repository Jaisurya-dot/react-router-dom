import React, { useState } from 'react'

const Topbar = ({ collapse }) => {

    const [open , setOpen] = useState(false)
   
    const handleClick = () => {
        setOpen(!open)
    }
    return (

        <div className='text-black h-16 bg-amber-200 flex flex-col items-end justify-center relative '>

            <div className='profile absolute right-7'>
                
                <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_Zuz3haRHrSz0f3bnMlUTGa14Qc7Z5LLQ3-l04P98hv9CMXQU"
                    alt="helo"
                    className='rounded-4xl w-10 h-10 object-fit'
                    onClick={handleClick}
                />

                
                {open && (
                    // dropdown
                    <div className="absolute right-0 mt-3 w-40   z-50 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Profile
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Settings
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                            Logout
                        </button>
                    </div>
                )}


            </div>
        </div>

    )
}

export default Topbar
