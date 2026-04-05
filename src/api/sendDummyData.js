import { createCourse, createModule } from "./api";

const DUMMY_PROJECTS = [
  {
    course: {
      title: "Mastering the MERN Stack",
      description: "Build powerful, scalable web applications using MongoDB, Express, React, and Node.js.",
      instructor: "Jaisurya Selvam",
      category: "Full Stack",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 2499
    },
    modules: [
      {
        title: "Introduction to MongoDB",
        fileList: [
          { fileName: "Database Basics", fileType: "video", fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { fileName: "Schema Design", fileType: "pdf", fileUrl: "https://example.com/mongodb.pdf" }
        ]
      },
      {
        title: "Advanced React Patterns",
        fileList: [
          { fileName: "Custom Hooks", fileType: "video", fileUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  },
  {
    course: {
      title: "UI/UX for Developers",
      description: "Design beautiful interfaces and improve user experience with modern UI/UX principles.",
      instructor: "Admin",
      category: "Design",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c",
      price: 1999
    },
    modules: [
      {
        title: "Typography & Color Theory",
        fileList: [
          { fileName: "Brand Identity Guide", fileType: "pdf", fileUrl: "https://example.com/design.pdf" }
        ]
      }
    ]
  }
];

export const sendFrontendDummyData = async () => {
  try {
    for (const project of DUMMY_PROJECTS) {
      // 1. Create the Course
      const courseResponse = await createCourse(project.course);
      const courseId = courseResponse.data._id;
      
      console.log(`Created Course: ${project.course.title} (ID: ${courseId})`);

      // 2. Create the Modules for this course
      for (const mod of project.modules) {
        await createModule({
          courseId: courseId,
          title: mod.title,
          fileList: mod.fileList,
          order: project.modules.indexOf(mod)
        });
        console.log(`-- Added Module: ${mod.title}`);
      }
    }
    return { success: true, message: "Frontend dummy data sent successfully!" };
  } catch (error) {
    console.error("Error sending dummy data:", error);
    return { success: false, message: error.response?.data?.message || "Failed to send dummy data." };
  }
};
