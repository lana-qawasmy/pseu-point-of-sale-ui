import React, { useState } from "react";

const useEditRoles = () =>{
    const [search,setSearch] = useState<string>('');
    React.useMemo(()=>{
        console.log({search});
    },[search]);

    return{
        search,setSearch,
    }
}

export default useEditRoles;