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
        dateRange,
        setPage,
        handleSearch,
        handleStartDateChange,
        handleEndDateChange,
    } = useOrderHistory();



    return (
        <div className='orderHistoryPage'>
            <h2>Order History</h2>
            <table className='ordersTable'>
                <tr className='filterBarInOrderHistoryPage'>
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
                    <span className='dateSearchInOrderHistoryPage'>
                        <input
                            type="date"
                            min={'2000-01-01'}
                            max={dateRange.end}
                            onChange={(e) => handleStartDateChange(e)}
                        />
                        <span>
                            &nbsp;&nbsp;To&nbsp;&nbsp;
                        </span>
                        <input
                            type="date"
                            min={dateRange.start}
                            max={new Date().toISOString().split('T')[0]}
                            onChange={(e) => handleEndDateChange(e)}
                        />
                    </span>
                </tr>
                <tr className='headerInOrdersTable'>
                    <th>Order No.</th>
                    <th>Cashier Name</th>
                    <th>Total</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                {
                    ordersList.length > 0 ?
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
                        : <div className='emptyOrders'>
                            There isn't any orders
                        </div>
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
                        <strong>Page:&nbsp;{page + 1}</strong>
                    </span>
                    <Button
                        Color='#080961'
                        HtmlType='button'
                        Radius={'3'}
                        Ratio='10/4'
                        Width='120'
                        Type='Primary'
                        Disabled={numberOfPages - 1 <= page}
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