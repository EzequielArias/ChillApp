
import { AdminDashboard, Home } from "../pages";

type JSXcomponents = () => JSX.Element;

interface RoutesList {
    path : string;
    isAdmin : boolean;
    isAuthenticated : boolean;
    element : JSXcomponents;
    name : string;
}

export const nav : RoutesList[] = [
    { path : '/', isAdmin : false, isAuthenticated : false, name : 'home', element : Home },
    { path : '/admin-dashboard', isAdmin : true, isAuthenticated : true, name : 'admin-dashboard', element : AdminDashboard}
]
