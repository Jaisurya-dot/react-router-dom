import React, { useState } from "react";

const CreateCourse = () => {
    const [course, setCourse] = useState({
        title: "",
        description: "",
        duration: "",
        level: "",
        category: "",
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setCourse((prev) => ({
            ...prev,
            thumbnail: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(course);
    };

    return (

            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Create Course 📚
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        placeholder="Course Title"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Course Description"
                        rows="4"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    {/* Duration */}
                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 10 hours)"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />

                    {/* Level */}
                    <select
                        name="level"
                        value={course.level}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">Select Level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    {/* Category */}
                    <input
                        type="text"
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />

                    {/* Thumbnail */}
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded-lg bg-gray-50"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Create Course 🚀
                    </button>

                </form>
            </div>
      
    );
};

export default CreateCourse;