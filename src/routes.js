import Login from "./views/Home/Login";
import Register from "./views/Home/Register";

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
]