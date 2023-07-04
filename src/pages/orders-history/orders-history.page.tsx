import './orders-history.page.css';
import { Button, SearchBar, Spinner } from '../../components/core';
import Order from '../../components/order/order.component';
import { useOrderHistory } from '../../hooks';
import { OrderNS } from '../../types/order.type';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const OrdersHistory = () => {
    const {
        params,
        ordersList,
        page,
        numberOfPages,
        loading,
        setPage,
        handleSearch,
        handleStartDateChange,
        handleEndDateChange,
    } = useOrderHistory();



    return (
        <div className='orderHistoryPage'>
            <h2>Order History</h2>
            <table className='ordersTable'>
                <thead>
                    <tr className='filterBarInOrderHistoryPage'>
                        <td className='searchBarInOrderHistoryPage'>
                            <SearchBar
                                Id='searchInOrderHistory'
                                Name='Search3'
                                Value={params.get("searchTerms") || ""}
                                Padding={12}
                                OnChange={handleSearch}
                                Placeholder='Search'
                                Radius={5}
                            />
                        </td>
                        <td className='dateSearchInOrderHistoryPage'>
                            <input
                                type="date"
                                min={'2000-01-01'}
                                max={params.get('endDate') || ''}
                                defaultValue={params.get('startDate') || ''}
                                onChange={(e) => handleStartDateChange(e)}
                            />
                            <strong>
                                To
                            </strong>

                            <input
                                type="date"
                                min={params.get('startDate') || ''}
                                max={new Date().toISOString().split('T')[0]}
                                defaultValue={params.get('endDate') || ''}
                                onChange={(e) => handleEndDateChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className='headerInOrdersTable'>
                        <th>Order No.</th>
                        <th>Cashier Name</th>
                        <th>Total</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody className={`${loading ? 'loading' : ''}`}>
                    {
                        loading ?
                            <span className='loading'><Spinner /></span>
                            : ordersList ?
                                ordersList.map((order: OrderNS.IOrder) => {
                                    return <Order
                                        key={order._id + 'orderPage'}
                                        orderNo={order.orderNumber as number}
                                        cashierName={order.cashierName}
                                        total={order.total}
                                        time={order.time as string}
                                        date={order.date as string}
                                    />;
                                }) :
                                <tr>
                                    <td className='emptyOrders'>
                                        There isn't any orders
                                    </td>
                                </tr>
                    }
                </tbody>
            </table>
            <div className='buttonsInOrdersTable' >
                <span
                    className={`arrow ${page === 0 ? 'disabled' : ''}`}
                    onClick={() => page !== 0 && setPage((currentPage) => currentPage - 1)}
                    onMouseOver={() => {
                        let x = document.getElementById('moveToPrevPageInHistoryPage');
                        if (x) {
                            x.style.fill = '#080961';
                        }
                    }}
                    onMouseLeave={() => {
                        let x = document.getElementById('moveToPrevPageInHistoryPage');
                        if (x) {
                            x.style.fill = '#adadaf';
                        }
                    }}
                >
                    <MdArrowBackIosNew color='#adadaf' id={'moveToPrevPageInHistoryPage'}/>
                </span>
                <span className='pageNumber'>
                    <strong>Page&nbsp;{page + 1}</strong>
                </span>
                <span
                    className={`arrow ${numberOfPages - 1 <= page ? 'disabled' : ''}`}
                    onClick={() => (numberOfPages - 1 > page) && setPage((currentPage) => currentPage + 1)}
                    onMouseOver={() => {
                        let x = document.getElementById('moveToNextPageInHistoryPage');
                        if (x) {
                            x.style.fill = '#080961';
                        }
                    }}
                    onMouseLeave={() => {
                        let x = document.getElementById('moveToNextPageInHistoryPage');
                        if (x) {
                            x.style.fill = '#adadaf';
                        }
                    }}
                >
                    <MdArrowForwardIos color='#adadaf'  id={'moveToNextPageInHistoryPage'}/>
                </span>
            </div>
        </div>
    );
};
export default OrdersHistory;