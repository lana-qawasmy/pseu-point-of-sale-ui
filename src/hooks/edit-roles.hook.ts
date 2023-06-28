import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import { UserNS } from "../types";
import { updateUser } from "../services";
import useNotification from "./notification.hook";
import { rolesServices } from "../services";
const useEditRoles = () =>{
    const {user} = useContext(UserContext);
    const [usersList, setUsersList] = useState<UserNS.User[]>([]);
    const [search,setSearch] = useState<string>('');
    const {setNotification} = useNotification()
    const getUsers = async()=>{
        const users = await rolesServices.getUsers(user?.token || '', search);
        setUsersList([...users]);
        console.log('Users: ', users);
    };
    const updateUserRole = async(user: UserNS.User) => {
        const updatedUser = await updateUser(user);
        if(updatedUser){
            setNotification({message: 'Role updated', status: 'success', autoClose: 2000});
        }else{
            setNotification({message: 'Something went wrong please try again', status: 'error', autoClose: 3000});
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search]);

    return{
        search,setSearch,
        usersList, 
        handleChangeRole,
    }
}

export default useEditRoles;