import React, { useState } from "react";
import { UserNS } from "../../types";

interface IProps {
    children: React.ReactNode;
}
interface IUserContext {
    user?: UserNS.User,
    token?: string
}
interface IState {
    setUser?: React.Dispatch<React.SetStateAction<IUserContext | undefined>>,
    user?: IUserContext;
}

export const UserContext: React.Context<IState> = React.createContext({});
const UserProvider = (props: IProps) => {
    const [user, setUser] = useState<IUserContext>();

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    );

};
export default UserProvider;