import React, { useEffect, useState } from 'react';
import Course from '../components/Course';
import { fetchCourses } from '../api/api';
import { sendFrontendDummyData } from '../api/sendDummyData';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSeedData = async () => {
    const result = await sendFrontendDummyData();
    if (result.success) {
      toast.success(result.message);
      getCourses(); // Refresh the list
    } else {
      toast.error(result.message);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Active Courses</h1>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Manage your educational platform</p>
        </div>
        {/* <button 
          onClick={handleSeedData}
          className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100 active:scale-95"
        >
          Seed Dummy Data
        </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Course key={course._id || course.id} course={course} onUpdate={getCourses} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-[20px] border border-dashed border-gray-100 shadow-inner">
            <p className="text-gray-400 font-bold mb-4">No courses available yet.</p>
            <button 
              onClick={handleSeedData}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-indigo-100 hover:bg-gray-900 transition-all active:scale-95"
            >
              Populate with Dummy Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
