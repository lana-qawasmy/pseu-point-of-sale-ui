import React from "react"
import { ItemNS } from "../../types";

interface IProps {
    children: React.ReactNode;
}

interface IState {
    setItems?: React.Dispatch<React.SetStateAction<ItemNS.Item[] | undefined>>,
    items?: ItemNS.Item[];
}

export const ItemsContext: React.Context<IState> = React.createContext({});

const ItemsProvider = (props: IProps) => {
    const [items, setItems] = React.useState<ItemNS.Item[]>();
    return (
        <ItemsContext.Provider value={{ items: items || [], setItems: setItems }}>
            {props.children}
        </ItemsContext.Provider>
    );
}
export default ItemsProvider;