import React, { useState } from "react";
import { FaStickyNote, FaTrash, FaClock, FaPlus } from "react-icons/fa";

const NotesSection = ({ notes: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      title: "Self Note",
      content: newNote,
      timestamp: "Current Video Time",
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Your Notes</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Capture your learning moments</p>
        </div>
        <div className="bg-indigo-50 w-12 h-12 rounded-[20px] flex items-center justify-center text-indigo-400 shadow-inner">
           <FaStickyNote size={20} />
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Type your notes here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-6 pb-20 bg-gray-50/50 border border-gray-100 rounded-3xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold text-gray-800 placeholder-gray-300 resize-none"
        />
        <button
          onClick={addNote}
          className="absolute bottom-5 right-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-100 active:scale-95 active:shadow-sm"
        >
          <FaPlus className="text-xs" /> Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-300 font-bold text-sm py-10 uppercase tracking-widest">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="group p-6 bg-white border border-gray-50 rounded-3xl transition-all hover:bg-gray-50/50 hover:border-indigo-100 hover:shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white w-8 h-8 rounded-xl flex items-center justify-center text-indigo-400 border border-gray-100 shadow-sm">
                    <FaClock className="text-xs" />
                  </div>
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">At {note.timestamp}</span>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
              <p className="text-sm font-bold text-gray-700 leading-relaxed pr-8">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesSection;
