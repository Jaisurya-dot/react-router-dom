const COURSE_DATA = {
  id: "course-101",
  title: "Advanced Web Development with React & Redux",
  instructor: "Jaisurya Selvam",
  modules: [
    {
      id: "mod-1",
      title: "Prerequisites & Environment",
      lessons: [
        { id: "les-1", title: "Installation & Setup", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "05:20" },
        { id: "les-2", title: "Setting up Redux Toolkit", type: "video", url: "https://www.w3schools.com/html/movie.mp4", duration: "12:15" },
        { id: "les-3", title: "Architecture Diagram", type: "pdf", url: "#", duration: "Page 1" },
      ],
    },
    {
      id: "mod-2",
      title: "State Management Deep Dive",
      lessons: [
        { id: "les-4", title: "Reducers vs Actions", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "15:40" },
        { id: "les-5", title: "Store Configuration Tips", type: "video", url: "https://www.w3schools.com/html/movie.mp4", duration: "08:10" },
      ],
    },
    {
      id: "mod-3",
      title: "Performance Optimization",
      lessons: [
        { id: "les-6", title: "Memoization & Selectors", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "20:05" },
        { id: "les-7", title: "Code Splitting & Lazy Loading", type: "video", url: "https://www.w3schools.com/html/movie.mp4", duration: "11:30" },
      ],
    },
  ],
  comments: [
    { id: "c-1", user: "John Doe", text: "This course is amazing! Very detailed.", time: "2 hours ago" },
    { id: "c-2", user: "Jane Smith", text: "Could you explain the selector part again?", time: "5 hours ago" },
  ],
  notes: [
    { id: "n-1", title: "Redux Setup Tip", content: "Always use configureStore from RTK.", timestamp: "02:15" }
  ]
};

export default COURSE_DATA;
