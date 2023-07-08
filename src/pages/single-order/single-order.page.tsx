import "./single-order.css";
import useSingleOrder from "../../hooks/single-order.hook";
import { OrderCard } from '../../components';
import { formatPrice } from '../../hooks';


const SingleOrder = () => {
    const { order, orderItems, splitDate, splitTime, subtotal , itemsNo } = useSingleOrder();
    return (
        <div className='singleOrderPage'>
            <div className="orderInfo">
                <h1>Order #{order?.orderNumber}</h1>
                <div className="wrapper">
                    <div className="left">
                        <span>Cashier : </span>
                        <span>Time : </span>
                        <span>Date : </span>
                        <span>Subtotal : </span>
                        <span>Discount code : </span>
                        <span>Tax(10%) : </span>
                        <span style={{ fontSize: '24px', fontWeight: "bolder" }}>Total : </span>
                    </div>
                    <div className="right">
                        <span className="name info">{order?.cashierName}</span>
                        <span className="info grey">{splitTime}</span>
                        <span className="info grey">{splitDate}</span>
                        <span className="info">{formatPrice(subtotal)} $</span>
                        <span className="info" style={{color: 'rgb(239, 71, 111'}} >{order?.discountCode || 'No discount!'}</span>
                        <span className="info">{formatPrice(subtotal * 0.1)} $</span>
                        <span className="info" >{formatPrice(order?.total as number || 0)} $</span>
                    </div>
                </div>
            </div>
            <div className="orderDetails">
                <h2>Order Details</h2>
                <div className='OrderItems'> {
                    orderItems && orderItems.map(item =>
                        <OrderCard item={item} key={item._id} />
                    )}
                </div>
                <div className="itemsQuantity"># of items : {itemsNo} </div>
            </div>
        </div>
    );
};

export default SingleOrder;
