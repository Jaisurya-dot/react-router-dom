import React from "react";
import { FaTrash, FaCloudUploadAlt, FaVideo, FaFilePdf, FaFileAlt } from "react-icons/fa";

const FILE_TYPES = [
  { label: "Video", value: "video", icon: FaVideo, accept: "video/*", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "PDF", value: "pdf", icon: FaFilePdf, accept: "application/pdf", color: "text-red-500", bg: "bg-red-50" },
  { label: "Document", value: "doc", icon: FaFileAlt, accept: ".doc,.docx,.txt", color: "text-orange-500", bg: "bg-orange-50" },
];

const LessonItem = ({ item, updateItem, removeItem }) => {
  const config = FILE_TYPES.find((f) => f.value === item.type);
  const Icon = config?.icon || FaFileAlt;

  return (
    <div className="group flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-100 rounded-3xl transition-all hover:bg-gray-50/50 hover:border-indigo-100">
      <div className={`p-3 rounded-2xl ${config?.bg} group-hover:bg-white transition-colors shadow-sm`}>
        <Icon className={`text-lg ${config?.color}`} />
      </div>

      <div className="flex-1 w-full">
        <input
          type="text"
          className="w-full bg-transparent outline-none font-bold text-sm text-gray-700"
          placeholder={`Enter ${config?.label} lesson title`}
          value={item.title}
          onChange={(e) => updateItem({ title: e.target.value })}
        />
        {item.file && (
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Ready: {item.file.name}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
        <label className="flex items-center gap-2 cursor-pointer bg-gray-100/50 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 group/upload">
          <FaCloudUploadAlt className="text-sm" />
          <span>{item.file ? "Change" : "Upload"}</span>
          <input
            type="file"
            hidden
            accept={config?.accept}
            onChange={(e) => updateItem({ file: e.target.files[0] })}
          />
        </label>

        <button 
          onClick={removeItem} 
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
          title="Delete Lesson"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default LessonItem;
export { FILE_TYPES };
