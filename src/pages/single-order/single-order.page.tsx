import "./single-order.css";
import useSingleOrder from "../../hooks/single-order.hook";
import { OrderCard } from '../../components';
import { formatPrice } from '../../hooks';


const SingleOrder = () => {
    const { order, orderItems, splitDate, splitTime, subtotal, itemsNo } = useSingleOrder();
    return (
        <div className='singleOrderPage'>
            <div className="orderInfo">
                <h1>Order #{order?.orderNumber}</h1>
                <div className="wrapper">
                    <div className="left">
                        <span title='Cashier'>Cashier : </span>
                        <span title='Time'>Time : </span>
                        <span title='Date'>Date : </span>
                        <span title='Subtotal'>Subtotal : </span>
                        <span title='Discount code'>Discount code : </span>
                        <span title='Tax'>Tax(10%) : </span>
                        <span title='Total' style={{ fontSize: '24px', fontWeight: "bolder" }}>Total : </span>
                    </div>
                    <div className="right">
                        <span title={'Cashier name'} className="name info">{order?.cashierName}</span>
                        <span title='Time' className="info grey">{splitTime}</span>
                        <span title='Date' className="info grey">{splitDate}</span>
                        <span title='Subtotal' className="info">{formatPrice(subtotal)} $</span>
                        <span title='Discount code' className="info" style={{ color: 'rgb(239, 71, 111' }} >{order?.discountCode || 'No discount!'}</span>
                        <span title='Tax' className="info">{formatPrice(subtotal * 0.1)} $</span>
                        <span title='Total' className="info" >{formatPrice(order?.total as number || 0)} $</span>
                    </div>
                </div>
            </div>
            <div className="orderDetails">
                <h2 title='Order details'>Order Details</h2>
                <div className='OrderItems'> {
                    orderItems && orderItems.map(item =>
                        <OrderCard item={item} key={item._id} />
                    )}
                </div>
                <div title='Number of items' className="itemsQuantity"># of items : {itemsNo} </div>
            </div>
        </div>
    );
};

export default SingleOrder;
