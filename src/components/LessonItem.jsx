import React from "react";
import { FaTrash, FaCloudUploadAlt, FaVideo, FaFilePdf, FaFileAlt, FaLink } from "react-icons/fa";

const FILE_TYPES = [
  { label: "Video", value: "video", icon: FaVideo, accept: "video/*", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "PDF", value: "pdf", icon: FaFilePdf, accept: "application/pdf", color: "text-red-500", bg: "bg-red-50" },
  { label: "Document", value: "doc", icon: FaFileAlt, accept: ".doc,.docx,.txt", color: "text-orange-500", bg: "bg-orange-50" },
];

const LessonItem = ({ item, updateItem, removeItem }) => {
  const config = FILE_TYPES.find((f) => f.value === item.fileType);
  const Icon = config?.icon || FaFileAlt;

  return (
    <div className="group flex flex-col items-center gap-4 p-6 bg-white border border-gray-100 rounded-[32px] transition-all hover:bg-gray-50/50 hover:border-indigo-100 shadow-sm">
      <div className="flex w-full items-center gap-4">
        <div className={`p-4 rounded-2xl ${config?.bg} group-hover:bg-white transition-colors shadow-sm`}>
          <Icon className={`text-xl ${config?.color}`} />
        </div>

        <div className="flex-1">
          <input
            type="text"
            className="w-full bg-transparent outline-none font-black text-gray-800 placeholder-gray-200"
            placeholder={`Enter ${config?.label} lesson title`}
            value={item.fileName}
            onChange={(e) => updateItem({ fileName: e.target.value })}
          />
        </div>

        <button 
          onClick={removeItem} 
          className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-95"
          title="Delete Lesson"
        >
          <FaTrash size={16} />
        </button>
      </div>

      <div className="w-full flex items-center gap-3 bg-gray-50/50 p-3 rounded-2xl border border-gray-50">
        <FaLink className="text-gray-300 text-xs ml-2" />
        <input 
          type="text"
          className="flex-1 bg-transparent border-none text-[11px] font-bold text-gray-500 outline-none placeholder-gray-300"
          placeholder="Resource URL (e.g. YouTube, Drive, S3 link)"
          value={item.fileUrl}
          onChange={(e) => updateItem({ fileUrl: e.target.value })}
        />
      </div>
    </div>
  );
};

export default LessonItem;
export { FILE_TYPES };
