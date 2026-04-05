import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust according to your backend PORT
});

// Example functions for Course API
export const fetchCourses = () => API.get("/courses");
export const fetchCourseById = (id) => API.get(`/courses/${id}`);
export const createCourse = (courseData) => API.post("/courses", courseData);
export const updateCourse = (id, updatedData) => API.put(`/courses/${id}`, updatedData);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

// Example functions for Module API
export const fetchModulesByCourse = (courseId) => API.get(`/modules/course/${courseId}`);
export const createModule = (moduleData) => API.post("/modules", moduleData);
export const updateModule = (id, updatedData) => API.put(`/modules/${id}`, updatedData);
export const deleteModule = (id) => API.delete(`/modules/${id}`);

// Comment/Discussion API
export const fetchCommentsByCourse = (courseId) => API.get(`/comments/course/${courseId}`);
export const addComment = (commentData) => API.post("/comments", commentData);
export const replyToComment = (replyData) => API.post("/comments/reply", replyData);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const likeComment = (id) => API.patch(`/comments/${id}/like`);
export const dislikeComment = (id) => API.patch(`/comments/${id}/dislike`);

// Notes API
export const fetchNotesByCourse = (courseId) => API.get(`/notes/course/${courseId}`);
export const addNote = (noteData) => API.post("/notes", noteData);
export const updateNote = (id, noteData) => API.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export default API;
