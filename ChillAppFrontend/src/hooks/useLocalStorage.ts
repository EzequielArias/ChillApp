import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, login } from "../redux/slices";
import { GetUserAdapter } from "../adapter";
import { GetUser } from "../services";
import { useFetchAndLoad } from ".";

export const useLocalStorage = async ( jwtToken?  : string ) => {
        const dispatch = useDispatch();

        let token = localStorage.getItem('jwt');

        const { callEndpoint } = useFetchAndLoad();

        const { data } = await callEndpoint(GetUserAdapter(GetUser( token! )))

        if(jwtToken){// Si entra por el login o register
            localStorage.setItem('jwt', jwtToken);
            return true
        }
        
        if(!token || !data.error){ // Si se carga desde cualquier lugar y el token esta vencido
            dispatch(logout())
            localStorage.removeItem('jwt');
            return redirect('/auth');
        }

    dispatch(login( data ))
    return true;
    
}
