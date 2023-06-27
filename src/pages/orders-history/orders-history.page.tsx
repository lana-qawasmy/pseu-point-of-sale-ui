import './orders-history.page.css';
import { Button, SearchBar } from '../../components/core';
import Order from '../../components/order/order.component';
import { useOrderHistory } from '../../hooks';
import { OrderNS } from '../../types/order.type';

const OrdersHistory = () => {
    const {
        params,
        ordersList,
        page,
        numberOfPages,
        setPage,
        handleSearch,
    } = useOrderHistory();
    return (
        <div className='orderHistoryPage'>
            <h2>Order History</h2>
            <span className='searchBarInOrderHistoryPage'>
                <SearchBar
                    Id='searchInOrderHistory'
                    Name='Search3'
                    Value={params.get("searchTerms") || ""}
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
                {
                    ordersList?.map((order: OrderNS.IOrder) => {
                        return <Order
                            key={order._id + 'orderPage'}
                            orderNo={order.orderNumber as number}
                            cashierName={order.cashierName}
                            total={order.total}
                            time={order.time as string}
                            date={order.date as string}
                        />;
                    })
                }
                <tr className='buttonsInOrdersTable' >
                    <Button
                        HtmlType='button'
                        Radius={'3'}
                        Ratio='10/4'
                        Width='120'
                        Disabled={page === 0}
                        Color='#080961'
                        onClick={() => setPage((currentPage) => currentPage - 1)}
                    >
                        Previous Page
                    </Button>
                    <span className='pageNumber'>
                        Page:
                        <span>
                            &nbsp;{page}
                        </span>
                    </span>
                    <Button
                        Color='#080961'
                        HtmlType='button'
                        Radius={'3'}
                        Ratio='10/4'
                        Width='120'
                        Type='Primary'
                        Disabled={numberOfPages - 1 === page}
                        onClick={() => setPage((currentPage) => currentPage + 1)}
                    >
                        Next Page
                    </Button>
                </tr>
            </table>
        </div>
    );
};
export default OrdersHistory;