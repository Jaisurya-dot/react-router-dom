import React from "react";
import { Link } from "react-router";
import {
  FaGraduationCap,
  FaEdit,
  FaTrash,
  FaStar,
  FaPlay,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { deleteCourse } from "../api/api";
import { toast } from "react-toastify";

const Course = ({ course, onUpdate }) => {
  if (!course) return null;

  const handleDelete = async () => {
    if (!window.confirm("Delete this course permanently?")) return;

    try {
      await deleteCourse(course._id);
      toast.success("Course deleted");
      onUpdate && onUpdate();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const isFree = !course.price || course.price === 0;

  return (
    <div className="group bg-white rounded-[10px] border border-gray-100 overflow-hidden 
    shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={
            course.thumbnail ||
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
          }
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <FaPlay className="text-indigo-600 ml-1" />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest text-indigo-600">
          {course.category || "Development"}
        </div>

        {/* ACTIONS */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleDelete}
            className="w-10 h-10 bg-white/20 hover:bg-red-500 text-white rounded-xl flex items-center justify-center backdrop-blur"
          >
            <FaTrash size={14} />
          </button>

          <Link
            to={`/EditCourse/${course._id}`}
            className="w-10 h-10 bg-white/20 hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center backdrop-blur"
          >
            <FaEdit size={14} />
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-4">

        {/* TITLE */}
        <h2 className="text-lg font-black text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition">
          {course.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 font-bold text-xs line-clamp-3 leading-relaxed">
          {course.description || "Start your journey today with this comprehensive course covering fundamental concepts and advanced techniques."}
        </p>



        {/* FOOTER */}
        <div className="flex items-center justify-between mt-2">
          
          {/* PRICE */}
          <div>
            {isFree ? (
              <span className="text-green-500 font-black text-lg">
                Free
              </span>
            ) : (
              <span className="text-gray-900 font-black text-lg">
                ₹{course.price}
              </span>
            )}
          </div>

          {/* CTA */}
          <Link
            to={`/Watch/${course._id}`}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-900 transition-all active:scale-95"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;