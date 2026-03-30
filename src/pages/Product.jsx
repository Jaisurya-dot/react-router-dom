import React from "react";
import { Link } from "react-router-dom";
import product from "../data.js";

const Product = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen px-6 py-16">

            {/* 🔥 Heading */}
            <h1 className="text-4xl font-bold text-center mb-12">
                Our Products
            </h1>

            {/* 🛍️ Product Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {product.map((product) => (
                    <Link to={`/productDetail/${product.id}`} key={product.id}>

                        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">

                            {/* 🖼️ Image */}
                            <img
                                src={`${product.image}?auto=format&fit=crop&w=400&q=80`}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />

                            {/* 📦 Info */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">
                                    {product.name}
                                </h2>

                                <p className="text-gray-400 text-sm mb-3">
                                    {product.description.substring(0, 60)}...
                                </p>

                                <p className="text-blue-400 font-bold">
                                    ₹{product.price}
                                </p>
                            </div>

                        </div>

                    </Link>
                ))}

            </div>

        </div>
    );
};

export default Product;