import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { itemService } from "../services";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";
import { ItemsContext } from "../components/providers/items.provider";
import { ItemNS } from "../types";

const useParams = () => {
    const [params, setParams] = useSearchParams();
    const notification = useNotification();
    const itemsContext = useContext(ItemsContext)
    const userContext = useContext(UserContext)
    const setParamsOverride = (name: string, value: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name, value);
        if (value === '') {
            newParams.delete(name)
        }
        setParams(newParams);
    }

    const updateItems = async () => {
        try {
            const items: ItemNS.Item[] = await itemService.getItems(
                userContext.user?.token as string,
                params.get('searchTerms') || '')
            if (items && itemsContext.setItems) {
                itemsContext.setItems(items)
            }
        }
        catch (error) {
            notification.setNotification({ message: 'can not retrieve items list , please try again!', status: 'error' })
        }
    }
    useEffect(() => {
        updateItems()
        // eslint-disable-next-line 
    }, [params])

    return {
        params,
        setParams: setParamsOverride
    }


}

export default useParams