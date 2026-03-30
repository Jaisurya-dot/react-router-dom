import React from "react";
import { useParams } from "react-router-dom";
import product from "../data.js";

const Productdetail = () => {
    const { id } = useParams();
   
    const prod = product.filter((item) => item.id == id)
    // dynamic id (optional)
    

    return (
        <div className="bg-gray-900 text-white min-h-screen px-6 py-16">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                {/* 🖼️ Product Image */}
                <div className="flex justify-center">
                    <img
                        src={prod[0].image}
                        alt="product"
                        className="rounded-2xl shadow-lg"
                    />
                </div>

                {/* 📦 Product Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        Product {id}
                    </h1>

                    <p className="text-gray-400 mb-6">
                        {prod[0].description}
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 text-green-400">
                        {prod[0].price}
                    </h2>

                    <div className="flex gap-4 mt-6">
                        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold">
                            Add to Cart
                        </button>
                        <button className="border border-gray-600 hover:border-blue-400 px-6 py-3 rounded-lg">
                            Buy Now
                        </button>
                    </div>

                    {/* ⭐ Extra Details */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-3">Features</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>High quality material</li>
                            <li>Long lasting performance</li>
                            <li>Modern design</li>
                            <li>Affordable price</li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Productdetail;