import React from 'react';
import { useNotification, useParam } from '.';
import { orderService } from '../services';
import { UserContext } from '../components/providers/user.provider';
import { useSearchParams } from 'react-router-dom';


const useOrderHistory = () => {
    const [ordersList, setOrdersList] = React.useState([]);
    const [page, setPage] = React.useState(0);

    const [params, setParams] = useSearchParams();
    const setParamsOverride = (name: string, value: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name, value);
        if (value === '') {
            newParams.delete(name);
        }
        setParams(newParams);
    };
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParamsOverride("searchTerms", e.target.value);
    };

    const getOrders = async () => {
        try {
            const orders = await orderService.getOrders(user.user?.token as string, page);
            setOrdersList(orders);
        } catch (error) {
            console.error(error);
            setNotification({ message: 'Something went wrong, error fetching items', status: 'error' });
        }
    };

    React.useMemo(async () => {
        await getOrders();
        // eslint-disable-next-line
    }, []);


    return {
        params,
        ordersList,
        handleSearch,
    };
};

export default useOrderHistory;
