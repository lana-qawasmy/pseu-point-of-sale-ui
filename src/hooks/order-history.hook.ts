import React from 'react';
import { useNotification } from '.';
import { orderService } from '../services';
import { UserContext } from '../components/providers/user.provider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OrderNS } from '../types/order.type';

interface IState {
    orders: OrderNS.IOrder[];
    loading: boolean;
}

const useOrderHistory = () => {
    const [ordersList, setOrdersList] = React.useState<IState>({ orders: [], loading: true });
    const [page, setPage] = React.useState(0);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    // const [dateRange, setDateRange] = React.useState<dateRange>({ start: '2000-01-01', end: new Date().toISOString().split('T')[0] });
    const navigate = useNavigate();

    // search params
    const [params, setParams] = useSearchParams();
    const setParamsOverride = (name: string, value: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name, value);
        if (value === '') {
            newParams.delete(name);
        }
        setParams(newParams);
    };
    const setParamsOverride2 = (name1: string, value1: string, name2: string, value2: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name1, value1);
        newParams.set(name2, value2);
        if (value1 === '') {
            newParams.delete(name1);
        }
        if (value2 === '') {
            newParams.delete(name2);
        }
        setParams(newParams);
    };
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParamsOverride("searchTerms", e.target.value);
    };
    //
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const start = e.currentTarget.value;
        setParamsOverride('startDate', start);
    };
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const end = e.currentTarget.value;
        setParamsOverride('endDate', end);
    };
    const getOrders = async (start: string, end: string, searchTerms?: string) => {
        try {
            const orders = await orderService.getOrders(user.user?.token as string, page, start, end, searchTerms);
            setOrdersList({ orders: orders.orders, loading: false });
            setNumberOfPages(orders.numberOfPages);
        } catch (error) {
            console.error(error);
            setNotification({ message: 'Something went wrong, error fetching items', status: 'error' });
        }
    };


    React.useMemo(async () => {
        const date = new Date().toISOString().split('T')[0];
        const search = params.get('searchTerms');
        setOrdersList((oldState) => ({ ...oldState, loading: true }));
        if (search === undefined)
            await getOrders(params.get('startDate') || '2000-01-01', params.get('endDate') || date);
        else
            await getOrders(params.get('startDate') || '2000-01-01', params.get('endDate') || date, search || '');
        // eslint-disable-next-line
    }, [page, params]);

    React.useEffect(() => {
        if (user.user === undefined)
            return navigate('/signin', { replace: false });
        const date = new Date().toISOString().split('T')[0];
        setParamsOverride2('startDate', new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0], 'endDate', date);
        // eslint-disable-next-line
    }, [user, navigate]);

    return {
        params,
        ordersList: ordersList.orders,
        loading: ordersList.loading,
        page,
        numberOfPages,
        setPage,
        handleSearch,
        handleStartDateChange,
        handleEndDateChange,
    };
};

export default useOrderHistory;
