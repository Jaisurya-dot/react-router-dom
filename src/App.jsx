import React from 'react';
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from './Routers/router';

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default App;
