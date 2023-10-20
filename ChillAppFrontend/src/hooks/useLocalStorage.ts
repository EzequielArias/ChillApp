import { useDispatch } from "react-redux";
import { logout, login, loaded } from "../redux/slices";
import { GetUserAdapter } from "../adapter";
import { GetUser } from "../services";
import { useFetchAndLoad } from ".";
import { useLocation } from "react-router-dom";

export const useLocalStorage = () => {

        const location = useLocation();
        const dispatch = useDispatch();
        const { callEndpoint } = useFetchAndLoad()
        let token = localStorage.getItem('jwt');
       
        const getUserData = async ( jwtToken?  : string ) => {

            if(location.pathname.includes("/auth")){
                dispatch(loaded())
                return null;
            }

            try {

                const { data } = await callEndpoint(GetUser(token!))
                dispatch(login(GetUserAdapter( data )))
                dispatch(loaded())

                if(jwtToken){ // Si entra por el login o register
                    console.log('AGREGANDO TOKEN')
                    localStorage.setItem('jwt', jwtToken);
                    window.location.href = "/"
                    return true
                }

            } catch (error) {

                   dispatch(logout())
                   localStorage.removeItem('jwt');
                   if(location.pathname.includes("/auth")) return ""
                   else window.location.href = "/auth";

            }

        } 

       return {
        getUserData
       }
}
