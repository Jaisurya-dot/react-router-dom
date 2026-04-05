import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Mainlayout from "../layout/mainlayout";

// Lazy loading pages
const Dashboard = lazy(() => import("../pages/Dashboard"));
const CreateCourse = lazy(() => import("../pages/CreateCourse"));
const WatchCourse = lazy(() => import("../pages/WatchCourse"));

const router = createBrowserRouter([
    {
        path: "/",
        Component: Mainlayout,
        children: [
            { 
                index: true, 
                Component: Dashboard 
            },
            { 
                path: "/CreateCourse", 
                Component: CreateCourse
            },
            { 
                path: "/EditCourse/:id", 
                Component: CreateCourse
            },
            { 
                path: "/Watch/:id", 
                Component: WatchCourse
            },
        ],
    },
]);

export default router;