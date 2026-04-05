import React from "react";
import { FaImage, FaCloudUploadAlt, FaRocket, FaTerminal } from "react-icons/fa";

const CourseThumbnailAside = ({ preview, onChange, onSubmit, isPublishing }) => {
  return (
    <aside className="space-y-8 sticky top-8">
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-indigo-900">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
          Course Image
        </h2>
        
        <label className={`relative group w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300
          ${preview ? 'border-solid border-indigo-100 bg-white' : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-indigo-400 cursor-pointer shadow-inner'}`}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                   <FaCloudUploadAlt size={24} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">Replace Thumbnail</p>
              </div>
            </>
          ) : (
            <div className="text-center p-6 bg-white/30 rounded-2xl border border-gray-50/50">
              <div className="bg-indigo-50 text-indigo-500 w-14 h-14 flex items-center justify-center rounded-3xl mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                <FaImage size={28} />
              </div>
              <p className="font-black text-gray-800 text-sm">Upload Thumbnail</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Recommended: 1600x900px</p>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={onChange}
            disabled={isPublishing}
          />
        </label>

        <div className="mt-8 space-y-4">
          <button 
            onClick={onSubmit}
            disabled={isPublishing}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3 group
              ${isPublishing ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            {isPublishing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="uppercase tracking-[0.2em] text-[11px]">Forging Course...</span>
              </div>
            ) : (
              <>
                <FaRocket className="text-sm group-hover:animate-pulse" />
                <span>Publish Course</span>
              </>
            )}
          </button>
          <button 
            disabled={isPublishing}
            className={`w-full bg-white hover:bg-gray-50 text-gray-600 font-black py-4 rounded-2xl border border-gray-100 transition shadow-sm active:scale-95
              ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save Progress
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-50">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-2">
            <FaTerminal className="text-xs" /> Technical Specs
          </h4>
          <ul className="space-y-2">
            <li className="text-[11px] text-gray-500 font-bold flex items-center gap-2 transition-colors hover:text-indigo-600">
               <span className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></span>
               Max 5MB file size
            </li>
            <li className="text-[11px] text-gray-500 font-bold flex items-center gap-2 transition-colors hover:text-indigo-600">
               <span className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></span>
               Support .jpg, .png, .webp
            </li>
            <li className="text-[11px] text-gray-500 font-bold flex items-center gap-2 transition-colors hover:text-indigo-600">
               <span className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></span>
               Videos: .mp4 (recommended)
            </li>
          </ul>
        </div>
      </section>
    </aside>
  );
};

export default CourseThumbnailAside;
