import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaPlus, FaTrash, FaStickyNote, FaSearch, FaSlidersH, FaFilter } from "react-icons/fa";
import { addNote, fetchNotesByCourse, deleteNote } from "../api/api";
import { toast } from "react-toastify";

const NotesSection = ({ currentLesson }) => {
  const { id: courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    try {
      const { data } = await fetchNotesByCourse(courseId);
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [courseId]);

  // Handle Automated Filtering (By Current Lesson)
  useEffect(() => {
    let result = [...notes];

    // Filter by current lecture automatically
    if (currentLesson) {
      result = result.filter(n => n.lessonTitle === currentLesson.fileName);
    }

    // Always sort by newest for simple list
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredNotes(result);
  }, [notes, currentLesson]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setLoading(true);
      await addNote({
        courseId,
        content: newNote,
        lessonTitle: currentLesson?.fileName || "General",
        timestamp: "0:00",
      });
      setNewNote("");
      loadNotes();
      toast.success("Note saved!");
    } catch (error) {
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-4">
         <div className="bg-indigo-600 w-1 pt-6 pb-6 rounded-full" />
         <h3 className="text-xl font-black text-gray-900 tracking-tight">Lecture Notes</h3>
      </div>

      {/* CREATE NOTE INPUT */}
      <form onSubmit={handleAddNote} className="group relative bg-white p-6 rounded-[35px] border border-gray-100 shadow-lg shadow-indigo-50/50">
         <textarea
           className="w-full bg-transparent p-2 text-gray-800 outline-none font-bold text-base placeholder-gray-300 min-h-[100px] resize-none"
           placeholder={`Create a new note at ${currentLesson?.fileName || 'this lecture'}...`}
           value={newNote}
           onChange={(e) => setNewNote(e.target.value)}
           disabled={loading}
         />
         <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
            <button 
              type="submit"
              disabled={loading || !newNote.trim()}
              className="bg-gray-900 hover:bg-indigo-600 disabled:bg-gray-200 text-white px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              Save Note
            </button>
         </div>
      </form>

      {/* NOTES LIST */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-24">
             <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center mx-auto mb-6">
                <FaStickyNote className="text-gray-200 text-3xl" />
             </div>
             <h4 className="text-gray-400 font-black uppercase tracking-widest text-xs">No notes found</h4>
             <p className="text-gray-300 text-sm mt-1 font-bold">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note._id} className="relative bg-white p-8 rounded-[35px] border border-gray-50 flex flex-col gap-6 transition-all hover:border-indigo-100 hover:shadow-xl group">
              <div className="flex items-start justify-between">
                 <div className="flex items-start gap-5">
                    <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-gray-900 transition flex items-center gap-2">
                       {note.timestamp}
                    </button>
                    <div className="pt-1">
                       <h5 className="text-[11px] font-black uppercase tracking-widest text-indigo-400 mb-1">{note.lessonTitle}</h5>
                       <p className="text-[10px] font-bold text-gray-300">Saved on {new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => handleDeleteNote(note._id)}
                   className="text-gray-100 hover:text-red-500 hover:bg-red-50 p-3 rounded-2xl transition opacity-0 group-hover:opacity-100"
                 >
                   <FaTrash size={16} />
                 </button>
              </div>

              <div className="text-gray-700 font-bold leading-relaxed whitespace-pre-wrap pl-2.5 border-l-4 border-gray-50 group-hover:border-indigo-50 transition-colors">
                {note.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesSection;
