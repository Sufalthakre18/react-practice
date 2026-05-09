import { createContext } from "react";
import { Login } from "../services/api";

export const  AuthContext= createContext()

export const authContextFunction=({children})=>{
    
    const [user, setUser] = useState(null);

    



    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}