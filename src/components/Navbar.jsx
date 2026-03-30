import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-amber-300 h-13 flex items-center justify-center">
            <ul className="flex gap-8" >
                <Link to="/1">
                    <li>home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>

                <Link to="/contact">
                    <li>contact</li>
                </Link>

                <Link to="/product">
                    <li>Product</li>
                </Link>

                
                 
            </ul>
        </div>
    );
};

export default Navbar;
