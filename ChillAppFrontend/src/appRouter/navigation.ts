
import { AdminDashboard, Home, NotFound, Auth, Query_Result } from "../pages";

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
    { path : '/admin-dashboard', isAdmin : true, isAuthenticated : true, name : 'admin-dashboard', element : AdminDashboard},
    { path : '*', isAdmin : false, isAuthenticated : false, name : 'not-found', element : NotFound},
    { path : '/auth', isAdmin : false, isAuthenticated : false, name : 'authentication', element : Auth },
    { path : '/query-result', isAdmin : false, isAuthenticated : true, name : 'query-result', element : Query_Result}
]
