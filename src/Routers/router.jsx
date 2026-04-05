import { createBrowserRouter } from "react-router";
import Mainlayout from "../layout/mainlayout";
import Dashboard from "../pages/Dashboard";
import CreateCourse from "../pages/CreateCourse";
import WatchCourse from "../pages/WatchCourse";

 
const router = createBrowserRouter([
    {
        path: "/",
        Component: Mainlayout,
        children: [
            { index: true, Component: Dashboard },
            { path: "/CreateCourse", Component: CreateCourse},
            { path: "/Watch/:id", Component: WatchCourse},
        ],
    },
]);

export default router