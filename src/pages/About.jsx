import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/contact")
    },5000)
    
    
    return (
        <div className="bg-gray-900 text-white min-h-screen px-6 py-16">

            {/* 🔥 Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">About Me</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    I am a passionate developer focused on building modern web applications using React and full-stack technologies.
                </p>
            </div>

            {/* ⚡ Content Section */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* 🧑‍💻 Image */}
                <div className="flex justify-center">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="profile"
                        className="rounded-2xl shadow-lg"
                    />
                </div>

                {/* 📝 Info */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Who am I?</h2>
                    <p className="text-gray-400 mb-4">
                        I’m a full-stack developer who loves creating user-friendly and scalable web applications. I enjoy solving real-world problems through code.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>React.js & Frontend Development</li>
                        <li>Node.js & Backend APIs</li>
                        <li>Python & FastAPI</li>
                        <li>MongoDB & Databases</li>
                    </ul>
                </div>

            </div>

            {/* 🎯 CTA */}
            <div className="text-center mt-16">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold">
                    Contact Me
                </button>
            </div>

        </div>
    );
};

export default About;