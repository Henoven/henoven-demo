import Login from "./views/Home/Login";
import Register from "./views/Home/Register";
import MainPage from "./views/MainPage/MainPage";

export default [
    {
        path: "/",
        label: "Inicio",
        component: Login
    },
    {
        path: "/register",
        label: "Registro",
        component: Register
    },
    {
        path: "/mainPage",
        label: "MainPage",
        component: MainPage
    },
]