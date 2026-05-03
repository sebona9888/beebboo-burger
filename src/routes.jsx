import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import NotFound from "./Pages/NotFound/NotFound";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Payment from "./Pages/Payment/Payment";
import AddBurger from "./Pages/AddBurger/AddBurger";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },   // ✅ fixed
            { path: "menu", element: <Menu /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout /> },
            { path: "payment", element: <Payment /> },
        ],
    },

    // Admin (no MainLayout)
    {
        path: "/admin",
        element: <AdminDashboard />,
    },
    {
        path: "/admin/add",
        element: <AddBurger />,
    },

    // 404
    {
        path: "*",
        element: <NotFound />,
    },
]);