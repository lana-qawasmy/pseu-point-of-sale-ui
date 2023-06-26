import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";

import { rolesServices } from "../services";
const useEditRoles = () =>{
    const {user, setUser} = useContext(UserContext);
    
    const [search,setSearch] = useState<string>('');
    React.useMemo(async()=>{
        console.log({search});
         console.log('Users: ',await rolesServices.getUsers(user?.token || ''))
    },[search]);

    return{
        search,setSearch,
    }
}

export default useEditRoles;