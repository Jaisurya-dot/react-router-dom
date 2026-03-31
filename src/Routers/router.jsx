import { createBrowserRouter } from "react-router";
import Mainlayout from "../layout/mainlayout";
import Dashboard from "../pages/Dashboard";
import CreateCourse from "../pages/CreateCourse";

 
const router = createBrowserRouter([
    {
        path: "/",
        Component: Mainlayout,
        children: [
            { index: true, Component: Dashboard },
            { path: "/CreateCourse", Component: CreateCourse},
        ],
    },
]);

export default router