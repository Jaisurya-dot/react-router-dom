import React, { useState } from "react";
import { FaPlay, FaFilePdf, FaChevronDown, FaChevronUp, FaCheckCircle, FaSearch, FaClock, FaListUl } from "react-icons/fa";

const CourseSidebar = ({ modules = [], currentLessonId, onSelectLesson }) => {
  const [openIds, setOpenIds] = useState(modules[0] ? { [modules[0]._id || modules[0].id]: true } : {});
  const [search, setSearch] = useState("");

  const toggleModule = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredModules = modules.map(mod => ({
    ...mod,
    fileList: (mod.fileList || []).filter(l => l.fileName.toLowerCase().includes(search.toLowerCase()))
  })).filter(mod => mod.fileList && mod.fileList.length > 0);

  const totalLessons = modules.reduce((acc, mod) => acc + (mod.fileList?.length || 0), 0);

  return (
    <div className="h-full bg-white border-l border-gray-100 shadow-sm flex flex-col pt-4">
      {/* SEARCH AND PROGRESS */}
      <div className="p-6 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Curriculum</h3>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">{modules.length} Modules • {totalLessons} Lessons</p>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner">
             <FaListUl size={14} />
          </div>
        </div>

        {/* <div className="relative group">
           <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-400 transition-colors text-xs" />
           <input 
             type="text"
             placeholder="Search lessons..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-inner"
           />
        </div> */}

        <div className="space-y-2">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Progress</span>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">0%</span>
           </div>
           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full shadow-sm" style={{ width: '0%' }}></div>
           </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pt-2">
        <div className="space-y-4">
          {filteredModules.map((mod, modIdx) => {
            const moduleId = mod._id || mod.id;
            return (
              <div key={moduleId} className="bg-gray-50/30 rounded-3xl border border-gray-50/50 overflow-hidden transition-all hover:bg-gray-50/50">
                <button
                  onClick={() => toggleModule(moduleId)}
                  className="w-full p-5 flex items-center justify-between text-left group transition-all bg-white/50 hover:bg-white"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Module {modIdx + 1}</span>
                    <span className="text-sm font-black text-gray-800 leading-snug group-hover:text-indigo-600 transition-colors">{mod.title}</span>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-transform duration-300 ${openIds[moduleId] ? "rotate-180 bg-indigo-50 text-indigo-400" : "text-gray-300 bg-white shadow-sm border border-gray-50"}`}>
                     <FaChevronDown className="text-[10px]" />
                  </div>
                </button>

                {openIds[moduleId] && (
                  <div className="p-3 space-y-1.5">
                    {(mod.fileList || []).map((file) => {
                      const fileId = file._id || file.id;
                      const isActive = currentLessonId === fileId;
                      const isVideo = file.fileType === 'video';
                      return (
                        <button
                          key={fileId}
                          onClick={() => onSelectLesson(file)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all group/item border-2
                            ${isActive ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-100' : 'bg-transparent border-transparent text-gray-500 hover:bg-white hover:shadow-sm'}`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/item:rotate-[360deg]
                            ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover/item:bg-indigo-50'}`}>
                             {isVideo ? (
                               <FaPlay className={`text-[9px] ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                             ) : (
                               <FaFilePdf className={`text-[9px] ${isActive ? 'text-white' : 'text-red-400'}`} />
                             )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>{file.fileName}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-gray-400 opacity-60'}`}>
                                  <FaClock className="text-[8px]" /> {file.duration || "N/A"}
                               </div>
                               <span className={`text-[8px] font-black uppercase px-2 rounded-md tracking-[0.1em] shadow-sm
                                 ${isActive ? 'bg-white/20 text-white' : isVideo ? 'bg-indigo-50 text-indigo-400' : 'bg-red-50 text-red-400'}`}>
                                  {file.fileType}
                               </span>
                            </div>
                          </div>
                          
                          {isActive && <FaCheckCircle className="text-sm text-white/40" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
