import React from "react";
import { Link } from "react-router";
import { FaGraduationCap } from "react-icons/fa";

const Course = () => {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden 
                hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 group">

            {/* Image */}
            <div className="relative overflow-hidden aspect-video">
                <img
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                    alt="course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-50">
                   Bestseller
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-[220px]">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                       <FaGraduationCap className="text-indigo-600 text-xs" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Computer Science</span>
                    </div>
                    <h2 className="text-xl font-black mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        Full Stack Development
                    </h2>
                    <p className="text-gray-400 font-bold text-xs line-clamp-2 leading-relaxed">
                        Master the MERN stack through hands-on projects and deep-dive theory.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-gray-900">₹1,999</span>
                    <div className="flex gap-2">
                        <Link 
                           to="/Watch/1"
                           className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95 border border-indigo-100 shadow-sm"
                        >
                            Watch
                        </Link>
                        <button className="bg-gray-950 text-white px-5 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200 active:scale-95">
                            Enroll
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;