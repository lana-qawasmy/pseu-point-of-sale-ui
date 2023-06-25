import React from 'react';
import { SearchBar } from '../../components/core';
import { useParam } from '../../hooks';
import './orders-history.page.css';
const OrdersHistory = () => {
    const [oredersList, setOrdersList] = React.useState([]);
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
            <div className='orderBar'>
                <span>
                    Order NO.
                </span>
            </div>
        </div>
    );
};
export default OrdersHistory;