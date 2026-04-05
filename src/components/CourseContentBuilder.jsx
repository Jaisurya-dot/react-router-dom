import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaCloudUploadAlt, FaListUl, FaTerminal } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import CourseMetadataForm from "./CourseMetadataForm";
import CourseThumbnailAside from "./CourseThumbnailAside";
import LessonItem, { FILE_TYPES } from "./LessonItem";
import { createCourse, updateCourse, createModule as createModuleApi, fetchCourseById } from "../api/api";

const CourseContentBuilder = () => {
  const { id } = useParams(); // Check if editing
  const navigate = useNavigate();

  // --- STATE FOR GENERAL INFO ---
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    instructor: "Admin/Instructor",
    price: 0,
  });

  // --- STATE FOR CURRICULUM ---
  const [modules, setModules] = useState([]);
  const [openModules, setOpenModules] = useState({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // ------------------------
  // DATA LOADING (EDIT MODE)
  // ------------------------
  useEffect(() => {
    if (id) {
      const loadCourse = async () => {
        try {
          setIsEditMode(true);
          const { data } = await fetchCourseById(id);
          setCourseInfo({
            title: data.title,
            category: data.category,
            description: data.description,
            thumbnail: data.thumbnail,
            instructor: data.instructor,
            price: data.price || 0,
          });

          // Map backend modules to frontend modules structure
          if (data.modules) {
             const mappedModules = data.modules.map(mod => ({
                id: mod._id,
                title: mod.title,
                items: mod.fileList.map(file => ({
                   id: Math.random(), // frontend unique key
                   fileName: file.fileName,
                   fileType: file.fileType,
                   fileUrl: file.fileUrl
                }))
             }));
             setModules(mappedModules);
          }
        } catch (error) {
          toast.error("Failed to load course for editing");
          console.error(error);
        }
      };
      loadCourse();
    }
  }, [id]);

  // ------------------------
  // HANDLERS
  // ------------------------
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseInfo({
        ...courseInfo,
        thumbnail: URL.createObjectURL(file), // Temporary
      });
    }
  };

  const addModule = () => {
    const moduleId = Date.now();
    setModules([...modules, { id: moduleId, title: "", items: [] }]);
    setOpenModules((prev) => ({ ...prev, [moduleId]: true }));
  };

  const removeModule = (mid) => setModules(modules.filter((m) => m.id !== mid));
  const updateModuleTitle = (mid, title) => setModules(modules.map((m) => (m.id === mid ? { ...m, title } : m)));
  const toggleModule = (mid) => setOpenModules((prev) => ({ ...prev, [mid]: !prev[mid] }));

  const addItem = (moduleId, type) => {
    setModules(modules.map((m) => m.id === moduleId ? { ...m, items: [...m.items, { id: Date.now(), fileName: "", fileType: type, fileUrl: "" }] } : m));
  };

  const updateItem = (moduleId, itemId, updates) => {
    setModules(modules.map((m) => m.id === moduleId ? { ...m, items: m.items.map((i) => i.id === itemId ? { ...i, ...updates } : i) } : m));
  };

  const removeItem = (moduleId, itemId) => {
    setModules(modules.map((m) => m.id === moduleId ? { ...m, items: m.items.filter((i) => i.id !== itemId) } : m));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    if (!courseInfo.title || !courseInfo.description) {
      toast.error("Please provide course title and description.");
      return;
    }

    try {
      setIsPublishing(true);
      
      let courseId = id;

      if (isEditMode) {
        // Update existing
        await updateCourse(courseId, courseInfo);
        // Note: For simplicity, we are only updating metadata. 
        // Syncing complex nested modules on edit would require a more advanced differ logic.
        toast.info("Updating course metadata...");
      } else {
        // Create NEW
        const courseResponse = await createCourse(courseInfo);
        courseId = courseResponse.data._id;
      }

      // Re-link or create modules if they belong to a new flow
      // (For this project scope, we create/overwrite modules on publish)
      const modulePromises = modules.map((mod, index) => {
        return createModuleApi({
          courseId: courseId,
          title: mod.title || `Module ${index + 1}`,
          order: index,
          fileList: mod.items.map(item => ({
            fileName: item.fileName || "Untitled Lesson",
            fileUrl: item.fileUrl || "https://example.com",
            fileType: item.fileType,
          }))
        });
      });

      await Promise.all(modulePromises);

      toast.success(isEditMode ? "Course updated!" : "Course published!");
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <header className="mb-10 px-4">
         <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Course Factory</h1>
         </div>
         <p className="text-gray-400 font-bold ml-5">Build your dreams, one module at a time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <CourseMetadataForm info={courseInfo} setInfo={setCourseInfo} />

          <section className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-3">
                 <FaListUl className="text-indigo-400 text-lg" />
                 Course Content
              </h2>
              <button
                onClick={addModule}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                <FaPlus size={12} /> Add Module
              </button>
            </div>

            {modules.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-100 rounded-[40px] py-20 text-center shadow-inner group hover:border-indigo-200 transition-all">
                <div className="bg-indigo-50 w-20 h-20 rounded-[30px] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                   <FaCloudUploadAlt size={40} className="text-indigo-400 opacity-50" />
                </div>
                <p className="font-black text-gray-800 text-lg">Curriculum Empty</p>
                <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Start by adding your first educational module</p>
              </div>
            ) : (
              <div className="space-y-6">
                {modules.map((module, idx) => (
                  <div key={module.id} className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden transition-all hover:shadow-xl hover:border-indigo-100">
                    <div className="flex items-center gap-4 p-6 bg-gray-50/50 backdrop-blur-sm border-b border-gray-50">
                      <div className="bg-white text-indigo-600 border border-indigo-50 w-10 h-10 flex items-center justify-center rounded-2xl text-sm font-black shadow-sm">
                        {idx + 1}
                      </div>
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none font-black text-gray-800 outline-none text-lg placeholder-gray-200"
                        placeholder="Module Identity (e.g. Fundamental Concepts)"
                        value={module.title}
                        onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                      />
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleModule(module.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-indigo-50 rounded-2xl transition shadow-sm border border-gray-100"
                        >
                          {openModules[module.id] ? <FaChevronUp className="text-indigo-400 text-xs" /> : <FaChevronDown className="text-indigo-400 text-xs" />}
                        </button>
                        <button 
                          onClick={() => removeModule(module.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 text-red-300 hover:text-red-500 rounded-2xl transition shadow-sm border border-gray-100"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>

                    {openModules[module.id] && (
                      <div className="p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="space-y-4">
                          {module.items.length === 0 && (
                             <p className="text-center py-6 text-[10px] uppercase font-black tracking-widest text-gray-300 bg-gray-50/30 rounded-3xl border border-dashed border-gray-100">Add content using the buttons below</p>
                          )}
                          {module.items.map((item) => (
                            <LessonItem
                              key={item.id}
                              item={item}
                              updateItem={(upd) => updateItem(module.id, item.id, upd)}
                              removeItem={() => removeItem(module.id, item.id)}
                            />
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-50">
                          <span className="text-[10px] font-black text-gray-300 mr-4 uppercase tracking-[0.2em] flex items-center gap-2">
                             <FaTerminal className="text-xs" /> Forge Content:
                          </span>
                          {FILE_TYPES.map((t) => (
                            <button
                              key={t.value}
                              onClick={() => addItem(module.id, t.value)}
                              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 bg-white border border-gray-100 rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group"
                            >
                              <t.icon size={11} className="group-hover:rotate-[360deg] transition-transform duration-500" /> {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
          <CourseThumbnailAside 
            preview={courseInfo.thumbnailPreview} 
            onChange={handleThumbnailChange} 
            onSubmit={handlePublish}
            isPublishing={isPublishing}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContentBuilder;