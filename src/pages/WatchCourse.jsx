import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { fetchCourseById } from "../api/api";
import CourseSidebar from "../components/CourseSidebar";
import NotesSection from "../components/NotesSection";
import CommentSection from "../components/CommentSection";
import { FaGraduationCap, FaArrowLeft, FaExpand } from "react-icons/fa6";
import { FaComments, FaStickyNote } from "react-icons/fa";

const WatchCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("comments");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchCourseById(id);
        setCourse(data);
        
        // Check if there are modules and files to select a default lesson
        if (data.modules && data.modules.length > 0 && data.modules[0].fileList && data.modules[0].fileList.length > 0) {
          setCurrentLesson(data.modules[0].fileList[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 text-red-500 font-bold p-8 text-center">
      {error}
    </div>
  );

  if (!course) return null;

  return (
    <div className="flex h-screen bg-white">
      {/* LEFT: MAIN PLAYER AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        {/* PLAYER HEADER */}
        <header className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="w-12 h-12 bg-gray-50 text-gray-400 flex items-center justify-center rounded-[20px] transition hover:bg-indigo-50 hover:text-indigo-600 shadow-sm">
              <FaArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <FaGraduationCap className="text-indigo-600 text-lg" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Educational Journey • {course.instructor}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">{course.title}</h1>
            </div>
          </div>
        </header>

        {/* THE PLAYER BOX */}
        <main className="p-8">
          <div className="relative group w-full aspect-video bg-black rounded-[40px] shadow-2xl overflow-hidden shadow-indigo-100 border border-gray-100">
            {currentLesson ? (
              currentLesson.fileType === 'video' ? (
                <video
                  key={currentLesson.fileUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                >
                  <source src={currentLesson.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white bg-indigo-900">
                  <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center mb-6">
                    <FaExpand className="text-indigo-400 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">{currentLesson.fileName}</h2>
                  <p className="text-indigo-300 font-bold uppercase tracking-widest text-xs">{currentLesson.fileType.toUpperCase()} Document Content Viewer</p>
                  <a 
                    href={currentLesson.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 bg-indigo-600 px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-black/20 hover:bg-white hover:text-indigo-600 transition-all inline-block"
                  >
                    View / Download Resouce
                  </a>
                </div>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                No lesson selected
              </div>
            )}
          </div>

          {/* BELOW PLAYER TITLE */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2 underline decoration-indigo-200 decoration-4 underline-offset-8 decoration-dotted">
                {currentLesson ? currentLesson.fileName : "Select a lesson"}
              </h3>
              <p className="text-gray-400 font-bold text-sm">
                {currentLesson ? `Welcome to this session! We'll explore ${currentLesson.fileName.toLowerCase()} in depth.` : "Please select a lesson from the sidebar to begin."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-gray-50 text-gray-400 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm">Previous</button>
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-indigo-100 active:scale-95 transition-all">Next Lesson</button>
            </div>
          </div>
          <div className="mt-16 space-y-8">
            {/* TAB SWITCH */}
            <div className="flex items-center gap-2 p-2 bg-gray-50/60 rounded-3xl w-fit border border-gray-100 shadow-sm ml-4 backdrop-blur">
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300
                  ${activeTab === "comments" ? "bg-white text-indigo-600 shadow-lg shadow-gray-200 scale-105" : "text-gray-400 hover:text-gray-600 hover:bg-white/50"}`}
              >
                <FaComments className={`text-sm transition-all ${activeTab === "comments" ? "text-indigo-500" : ""}`} />
                <span>Discussions</span>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300
                  ${activeTab === "notes" ? "bg-white text-indigo-600 shadow-lg shadow-gray-200 scale-105" : "text-gray-400 hover:text-gray-600 hover:bg-white/50"}`}
              >
                <FaStickyNote className={`text-sm transition-all ${activeTab === "notes" ? "text-indigo-500" : ""}`} />
                <span>Personal Notes</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              {activeTab === "comments" ? (
                <CommentSection />
              ) : (
                <NotesSection currentLesson={currentLesson} />
              )}
            </div>
          </div>
          <div className="h-20" />
        </main>
      </div>

      {/* RIGHT: PLAYLIST SIDEBAR */}
      <div className="w-[380px] h-screen hidden xl:block shadow-2xl z-10">
        <CourseSidebar
          modules={course.modules || []}
          currentLessonId={currentLesson ? (currentLesson._id || currentLesson.id) : null}
          onSelectLesson={setCurrentLesson}
        />
      </div>
    </div>
  );
};

export default WatchCourse;
