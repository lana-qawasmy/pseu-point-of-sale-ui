import { OrderNS } from '../types/order.type';

const getOrders = (token: string, page: number) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/order/getOrders?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(async (response) => {
                return await response.json();
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    } catch (error) {
        console.error(error);
        return false;
    }
};

const addOrder = (token: string, order: OrderNS.IOrder) => {
    const casherName = order.casherName;
    const discountCode = order.discountCode;
    const items = order.items;
    const tax = order.tax;
    const total = order.total;

    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/order/addOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                casherName,
                discountCode,
                items,
                tax,
                total
            }),
        })
            .then(async (response) => {
                return await response.json();
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    } catch (error) {
        console.error(error);
        return false;
    }
};

// eslint-disable-next-line
export default {
    getOrders,
    addOrder,
};