import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaReply, FaThumbsUp, FaThumbsDown, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { addComment, fetchCommentsByCourse, replyToComment, deleteComment, likeComment, dislikeComment } from "../api/api";
import { toast } from "react-toastify";

const CommentItem = ({ comment, onReply, onDelete, isActiveReply, replyContent, setReplyContent, handleReplySubmit, onLike, onDislike }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex gap-4 group">
      {/* AVATAR */}
      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0 uppercase border border-indigo-100">
        {comment.user ? comment.user.charAt(0) : "S"}
      </div>

      <div className="flex-1 space-y-1">
        {/* HEADER */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-gray-900">{comment.user || "Student"}</span>
          <span className="text-[12px] text-gray-500 font-medium">
            {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* CONTENT */}
        <p className="text-[14px] text-gray-800 leading-normal">{comment.content}</p>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => onLike(comment._id)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-indigo-600"
            >
              <FaThumbsUp size={14} />
            </button>
            <span className="text-[12px] text-gray-500 font-medium">{comment.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => onDislike(comment._id)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-red-500"
            >
              <FaThumbsDown size={14} />
            </button>
            <span className="text-[12px] text-gray-500 font-medium">{comment.dislikes || 0}</span>
          </div>
          <button 
            onClick={onReply}
            className="text-[12px] font-bold text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-full transition uppercase tracking-tight"
          >
            Reply
          </button>
          <button 
            onClick={() => onDelete(comment._id)}
            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-full transition text-gray-300 ml-auto"
          >
            <FaTrash size={12} />
          </button>
        </div>

        {/* REPLY INPUT */}
        {isActiveReply && (
          <div className="mt-3 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="w-6 h-6 rounded-full bg-gray-100 shrink-0 mt-2" />
            <div className="flex-1 space-y-3">
              <input 
                autoFocus
                placeholder="Add a reply..."
                className="w-full bg-transparent border-b border-gray-200 py-1 text-sm outline-none focus:border-gray-900 transition-all font-medium"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={onReply}
                  className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-100 rounded-full transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleReplySubmit(comment._id)}
                  className="px-4 py-2 text-[13px] font-bold bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
                  disabled={!replyContent.trim()}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REPLIES TOGGLE */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="pt-2">
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 text-indigo-600 text-[14px] font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-full transition"
            >
              {showReplies ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
            
            {showReplies && (
              <div className="mt-4 space-y-5 pl-4 ml-2 border-l border-gray-100">
                {comment.replies.map((reply, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-[10px] shrink-0 border border-gray-100">
                      {reply.user ? reply.user.charAt(0) : "S"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[12px] font-bold text-gray-900">{reply.user || "Student"}</span>
                        <span className="text-[11px] text-gray-400 font-medium">Just now</span>
                      </div>
                      <p className="text-[13px] text-gray-700 leading-normal">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection = () => {
  const { id: courseId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      const { data } = await fetchCommentsByCourse(courseId);
      setComments(data);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [courseId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      await addComment({ courseId, content: newComment });
      setNewComment("");
      loadComments();
      toast.success("Comment added");
    } catch (error) {
      toast.error("Error posting comment");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      await replyToComment({ commentId, content: replyContent });
      setReplyContent("");
      setActiveReplyId(null);
      loadComments();
      toast.success("Reply added");
    } catch (error) {
      toast.error("Error replying");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(id);
      loadComments();
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleLike = async (id) => {
    try {
      await likeComment(id);
      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeComment(id);
      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl px-4 py-8">
      {/* COUNT */}
      <h3 className="text-[20px] font-bold text-gray-900 mb-8 flex items-center gap-6">
        {comments.length} Comments
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer">
           <FaChevronDown size={12} className="mt-0.5" /> Sort by
        </div>
      </h3>

      {/* INPUT */}
      <div className="flex gap-4 mb-12">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-indigo-700/10">
          U
        </div>
        <form onSubmit={handleAddComment} className="flex-1 space-y-3 pt-1">
          <input 
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-gray-200 py-1 text-sm outline-none focus:border-gray-900 transition-all font-medium"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={() => setNewComment("")}
              className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!newComment.trim() || loading}
              className="px-4 py-2 text-[13px] font-bold bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentItem 
            key={comment._id} 
            comment={comment}
            onReply={() => setActiveReplyId(activeReplyId === comment._id ? null : comment._id)}
            onDelete={handleDelete}
            onLike={handleLike}
            onDislike={handleDislike}
            isActiveReply={activeReplyId === comment._id}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
