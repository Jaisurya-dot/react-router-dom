import React from "react";

const Course = () => {
    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">

            {/* Image */}
            <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                alt="course"
                className="w-full h-44 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-[180px]">

                <div>
                    <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                        Full Stack Development
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-2">
                        Learn MERN stack from beginner to advanced with real projects.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-indigo-600 font-bold text-lg">₹1999</span>

                    <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-lg 
                         hover:bg-indigo-700 transition">
                        Enroll
                    </button>
                </div>

            </div>
        </div>

       
    );
};

export default Course;