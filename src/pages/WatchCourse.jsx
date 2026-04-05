import React, { useState } from "react";
import COURSE_DATA from "../data/courseData";
import CourseSidebar from "../components/CourseSidebar";
import NotesSection from "../components/NotesSection";
import CommentSection from "../components/CommentSection";
import { FaGraduationCap, FaArrowLeft, FaMaximize, FaVolumeHigh, FaExpand } from "react-icons/fa6";
import { Link } from "react-router";

const WatchCourse = () => {
  const [currentLesson, setCurrentLesson] = useState(COURSE_DATA.modules[0].lessons[0]);
  const [activeTab, setActiveTab] = useState("comments");

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
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Educational Journey • {COURSE_DATA.instructor}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">{COURSE_DATA.title}</h1>
            </div>
          </div>
        </header>

        {/* THE PLAYER BOX */}
        <main className="p-8">
          <div className="relative group w-full aspect-video bg-black rounded-[40px] shadow-2xl overflow-hidden shadow-indigo-100 border border-gray-100">
            {currentLesson.type === 'video' ? (
              <video
                key={currentLesson.url}
                className="w-full h-full object-cover"
                controls
                autoPlay
              >
                <source src={currentLesson.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-indigo-900">
                 <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center mb-6">
                    <FaExpand className="text-indigo-400 text-3xl" />
                 </div>
                 <h2 className="text-2xl font-black mb-2">{currentLesson.title}</h2>
                 <p className="text-indigo-300 font-bold uppercase tracking-widest text-xs">PDF Document Content Viewer</p>
                 <button className="mt-8 bg-indigo-600 px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-black/20 hover:bg-white hover:text-indigo-600 transition-all">Download Resouce</button>
              </div>
            )}
          </div>

          {/* BELOW PLAYER TITLE */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
             <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2 underline decoration-indigo-200 decoration-4 underline-offset-8 decoration-dotted">
                   {currentLesson.title}
                </h3>
                <p className="text-gray-400 font-bold text-sm">Welcome to this session! We'll explore {currentLesson.title.toLowerCase()} in depth.</p>
             </div>
             <div className="flex items-center gap-3">
                <button className="bg-gray-50 text-gray-400 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm">Previous</button>
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-indigo-100 active:scale-95 transition-all">Next Lesson</button>
             </div>
          </div>

          {/* INTERACTION TABS (Notes / Comments) */}
          <div className="mt-16 space-y-8">
             <div className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-3xl w-fit border border-gray-100 shadow-sm ml-4">
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
                    ${activeTab === "comments" ? "bg-white text-indigo-600 shadow-lg shadow-gray-200" : "text-gray-400 hover:text-gray-600"}`}
                >
                   Discussions
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
                    ${activeTab === "notes" ? "bg-white text-indigo-600 shadow-lg shadow-gray-200" : "text-gray-400 hover:text-gray-600"}`}
                >
                   Personal Notes
                </button>
             </div>

             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                {activeTab === "comments" ? <CommentSection comments={COURSE_DATA.comments} /> : <NotesSection notes={COURSE_DATA.notes} />}
             </div>
          </div>
          
          <div className="h-20" /> {/* Extra space at bottom */}
        </main>
      </div>

      {/* RIGHT: PLAYLIST SIDEBAR */}
      <div className="w-[380px] h-screen hidden xl:block shadow-2xl z-10">
        <CourseSidebar
          modules={COURSE_DATA.modules}
          currentLessonId={currentLesson.id}
          onSelectLesson={setCurrentLesson}
        />
      </div>
    </div>
  );
};

export default WatchCourse;
