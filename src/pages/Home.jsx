import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {

    const { id } = useParams()
    
    // const navigate = useNavigate()
    // setTimeout(() => {
    //     navigate("/about")
    // }, 2000)
    




    return (







        <div className="bg-gray-900 text-white min-h-screen">

            {/* 🔥 Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-24 px-6">
                <h1 className="text-5xl font-bold mb-6">
                    Build Your Future 🚀{ id}
                </h1>
                <p className="text-gray-400 max-w-xl mb-8">
                    Learn, build, and grow with modern web development. Create powerful apps using React, Node.js, and more.
                </p>
                <div className="flex gap-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold">
                        Get Started
                    </button>
                    <button className="border border-gray-600 hover:border-blue-400 px-6 py-3 rounded-lg">
                        Learn More
                    </button>
                </div>
            </section>

            {/* ⚡ Features Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Features
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">Fast Development</h3>
                        <p className="text-gray-400">
                            Build applications quickly using modern tools and frameworks.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
                        <p className="text-gray-400">
                            Fully responsive UI that works on all devices.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
                        <h3 className="text-xl font-semibold mb-3">Easy to Learn</h3>
                        <p className="text-gray-400">
                            Beginner-friendly structure to help you grow faster.
                        </p>
                    </div>

                </div>
            </section>

            {/* 🎯 CTA Section */}
            <section className="text-center py-20 px-6 bg-gray-800">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Start?
                </h2>
                <p className="text-gray-400 mb-6">
                    Join now and start building amazing projects today.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold">
                    Join Now
                </button>
            </section>

            {/* 📌 Footer */}
            <footer className="text-center py-6 text-gray-500 text-sm">
                © 2026 Your Brand. All rights reserved.
            </footer>

        </div>
    );
};

export default Home;