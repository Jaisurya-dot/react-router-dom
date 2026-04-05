import React from "react";

const CourseMetadataForm = ({ info, setInfo }) => {
  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-indigo-900">
        <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
        Basic Information
      </h2>
      
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Course Title</label>
          <input
            type="text"
            placeholder="e.g. Master React & Redux"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold text-gray-800"
            value={info.title}
            onChange={(e) => setInfo({ ...info, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Category</label>
            <div className="relative group">
              <select
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none appearance-none transition-all font-bold text-gray-800 cursor-pointer"
                value={info.category}
                onChange={(e) => setInfo({ ...info, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-indigo-400 transition-colors">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Price (₹)</label>
            <input
              type="number"
              placeholder="e.g. 1999"
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold text-gray-800"
              value={info.price}
              onChange={(e) => setInfo({ ...info, price: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Course Description</label>
          <textarea
            rows="5"
            placeholder="What will students learn in this course?"
            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold text-gray-800 resize-none"
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseMetadataForm;
