import React from "react";
import { FaPlay, FaFilePdf, FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const CourseSidebar = ({ modules, currentLessonId, onSelectLesson }) => {
  const [openIds, setOpenIds] = React.useState({ [modules[0]?.id]: true });

  const toggleModule = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full bg-white border-l border-gray-100 shadow-sm flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
         <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
         <h3 className="text-xl font-black text-gray-900 tracking-tight">Course Content</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="space-y-6">
          {modules.map((mod, modIdx) => (
            <div key={mod.id} className="space-y-2">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between text-left group transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-0.5">Module {modIdx + 1}</span>
                  <span className="text-sm font-black text-gray-800 leading-snug group-hover:text-indigo-600">{mod.title}</span>
                </div>
                {openIds[mod.id] ? <FaChevronUp className="text-xs text-gray-300" /> : <FaChevronDown className="text-xs text-gray-300" />}
              </button>

              {openIds[mod.id] && (
                <div className="space-y-2.5 pt-2 ml-1 border-l-2 border-indigo-50 pl-4">
                  {mod.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all group/item
                          ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-[1.02]' : 'hover:bg-gray-50 text-gray-500'}`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors
                          ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover/item:bg-white group-hover/item:shadow-sm'}`}>
                           {lesson.type === 'video' ? (
                             <FaPlay className={`text-[10px] ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                           ) : (
                             <FaFilePdf className={`text-[10px] ${isActive ? 'text-white' : 'text-red-400'}`} />
                           )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>{lesson.title}</p>
                          <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${isActive ? 'text-white/70' : 'text-gray-400 opacity-60'}`}>
                             {lesson.duration}
                          </p>
                        </div>
                        {isActive && <FaCheckCircle className="text-sm text-white/50" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
