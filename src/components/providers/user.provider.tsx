import React, { useState } from "react";
import { UserNS } from "../../types";

interface IProps {
    children: React.ReactNode;
}

interface IState {
    setUser?: React.Dispatch<React.SetStateAction<UserNS.User | undefined>>,
    user?: UserNS.User;
}

export const UserContext: React.Context<IState> = React.createContext({});
const UserProvider = (props: IProps) => {
    const [user, setUser] = useState<UserNS.User>();

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    );

};
export default UserProvider;