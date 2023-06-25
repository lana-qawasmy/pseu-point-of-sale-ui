import React from 'react';
import { SearchBar } from '../../components/core';
import { useParam } from '../../hooks';
import './orders-history.page.css';
import Order from '../../components/order/order.component';
const OrdersHistory = () => {
    const [ordersList, setOrdersList] = React.useState([]);
    const useParams = useParam();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useParams.setParams("searchTerms", e.target.value);
    };
    React.useMemo(() => {

    }, []);
    return (
        <div className='orderHistoryPage'>
            <h2>Order History</h2>
            <span className='searchBarInOrderHistoryPage'>
                <SearchBar
                    Id='searchInOrderHistory'
                    Name='Search3'
                    Value={useParams.params.get("searchTerms") || ""}
                    Padding={12}
                    OnChange={handleSearch}
                    Placeholder='Search'
                    Radius={5}
                />
            </span>
            <table className='ordersTable'>
                <tr className='headerInOrdersTable'>
                    <th>Order No.</th>
                    <th>Casher Name</th>
                    <th>Total</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                <Order
                    orderNo={15}
                    casherName='Momin'
                    total={15}
                    time={new Date().toLocaleTimeString()}
                    date={new Date().toLocaleDateString()}

                />
                <Order
                    orderNo={16}
                    casherName='Abdullah'
                    total={50.2}
                    time={new Date().toLocaleTimeString()}
                    date={new Date().toLocaleDateString()}
                />
            </table>
        </div>
    );
};
export default OrdersHistory;