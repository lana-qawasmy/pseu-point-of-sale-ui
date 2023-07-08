import { OrderNS } from '../types/order.type';

const getOrders = (token: string, page: number, start: string, end: string, searchTerms?: string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/order/getOrders?page=${page}&startDate=${start}&endDate=${end}${searchTerms ? `&searchTerms=${searchTerms}` : ''}`, {
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

const getOrder = (orderId : string , token : string) => {
    try {
        return fetch(`${process.env.REACT_APP_SERVER_URL}/order/getOrder/${orderId}`, {
            method: 'GET',
            headers: {
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
}

const addOrder = (token: string, order: OrderNS.IOrder) => {
    const cashierName = order.cashierName;
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
                cashierName,
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
    getOrder
};