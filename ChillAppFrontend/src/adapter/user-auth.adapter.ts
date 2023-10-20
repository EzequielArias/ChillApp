
export interface AuthResponse {
    user : {
        id: string;
        name: string;
        email: string;
        isAdmin? : boolean;
    },
    token : string;
}

export const AuthAdapter = ( data : AuthResponse ) => {

    return {
        user : {
            id : data.user.id,
            name : data.user.name,
            email : data.user.email,
            isAdmin : data.user.isAdmin ? true : false
        },

        token : data.token
    }
}

export const GetUserAdapter = ( data : any ) => {

    if(data.error) return data

    return {
        user : {
            id : data.user._id,
            name : data.user.name,
            email : data.user.email,
        }, 
    }
}