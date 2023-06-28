import React from 'react';
import { useNotification } from '.';
import { orderService } from '../services';
import { UserContext } from '../components/providers/user.provider';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface dateRange {
    start: string;
    end: string;
}

const useOrderHistory = () => {
    const [ordersList, setOrdersList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const [dateRange, setDateRange] = React.useState<dateRange>({ start: '2000-01-01', end: new Date().toISOString().split('T')[0] });
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
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParamsOverride("searchTerms", e.target.value);
    };
    //
    const getOrders = async (start: string, end: string, searchTerms?: string) => {
        console.log({ start });
        console.log({ end });
        console.log({ searchTerms });

        try {
            const orders = await orderService.getOrders(user.user?.token as string, page, start, end, searchTerms);
            setOrdersList(orders.orders);
            setNumberOfPages(orders.numberOfPages);
        } catch (error) {
            console.error(error);
            setNotification({ message: 'Something went wrong, error fetching items', status: 'error' });
        }
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const start = e.currentTarget.value;
        setDateRange((currentDates) => ({ ...currentDates, start: start }));
    };
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const end = e.currentTarget.value;
        setDateRange((currentDates) => ({ ...currentDates, end: end }));
    };

    React.useMemo(async () => {
        const search = params.get('searchTerms');
        if (search === undefined)
            await getOrders(dateRange.start, dateRange.end);
        else
            await getOrders(dateRange.start, dateRange.end, search || '');
        // eslint-disable-next-line
    }, [page, dateRange, params]);

    React.useEffect(() => {
        if (user.user === undefined)
            navigate('/signin', { replace: false });
    }, [user, navigate]);

    return {
        params,
        ordersList,
        page,
        numberOfPages,
        dateRange,
        setPage,
        handleSearch,
        handleStartDateChange,
        handleEndDateChange,
    };
};

export default useOrderHistory;
