import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import { UserNS } from "../types";
import { updateUser } from "../services";

import { rolesServices } from "../services";
const useEditRoles = () =>{
    const {user} = useContext(UserContext);
    const [usersList, setUsersList] = useState<UserNS.User[]>([]);
    const [search,setSearch] = useState<string>('');
    const getUsers = async()=>{
        const users = await rolesServices.getUsers(user?.token || '', search);
        setUsersList([...users]);
        console.log('Users: ', users);
    };
    const updateUserRole = async(user: UserNS.User) => {
        const updatedUser = await updateUser(user);
        console.log({updatedUser});
    }
    const handleChangeRole = (value: string, user: UserNS.User, index: number) =>{
        console.log('whaaat');
        let newUser = user;
        if(value === 'cashier') newUser.role = 'cashier';
        else newUser.role = 'manager';
        updateUserRole(newUser);
        let newArray = [...usersList];
        newArray[index] = newUser;
        setUsersList([...newArray]);
        console.log("users List: ",usersList)
    };
    React.useMemo(async()=>{
        console.log({search});
        getUsers();
    },[search]);

    return{
        search,setSearch,
        usersList,setUsersList,
        handleChangeRole
    }
}

export default useEditRoles;