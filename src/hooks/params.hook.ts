import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { itemService } from "../services";
import { UserContext } from "../components/providers/user.provider";

const useParams = () => {
    const [params, setParams] = useSearchParams();
    const userContext = useContext(UserContext)
    const setParamsOverride = (name: string, value: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name, value);
        if (value === '') {
            newParams.delete(name)
        }
        setParams(newParams);
    }
    useEffect(() => {
        itemService.getItems(
            userContext.user?._id as string,
            userContext.user?.token as string,
            params.get('searchTerms') || '')
        // eslint-disable-next-line 
    }, [params])

    return {
        params,
        setParams: setParamsOverride
    }


}

export default useParams