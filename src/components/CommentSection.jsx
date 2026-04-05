import React, { useState } from "react";
import { FaCommentAlt, FaTrash, FaPlus, FaCheckCircle } from "react-icons/fa";

const CommentSection = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "Current Student (You)",
      text: newComment,
      time: "Just now",
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Community Discussion</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Connect with other learners</p>
        </div>
        <div className="bg-indigo-50 w-12 h-12 rounded-[20px] flex items-center justify-center text-indigo-400 shadow-inner">
           <FaCommentAlt size={20} />
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Ask a question or share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-6 pb-20 bg-gray-50/50 border border-gray-100 rounded-3xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold text-gray-800 placeholder-gray-300 resize-none"
        />
        <button
          onClick={addComment}
          className="absolute bottom-5 right-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-100 active:scale-95 active:shadow-sm"
        >
          <FaPlus className="text-xs" /> Share Thought
        </button>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-300 font-bold text-sm py-10 uppercase tracking-widest">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group p-6 bg-white border border-gray-50 rounded-3xl transition-all hover:bg-gray-50/50 hover:border-indigo-100 hover:shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-400 flex items-center justify-center font-black text-lg border border-indigo-100 shadow-sm transition-transform group-hover:scale-105 group-hover:rotate-6">
                    {comment.user[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800 flex items-center gap-2 tracking-tight">
                      {comment.user}
                      {comment.user.includes("You") && <FaCheckCircle className="text-indigo-400 text-[10px]" title="Instructor" />}
                    </h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{comment.time}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-700 leading-relaxed pr-8">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
