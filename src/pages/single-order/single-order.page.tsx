import "./single-order.css";
import useSingleOrder from "../../hooks/single-order.hook";


const SingleOrder = () => {
    const { order } = useSingleOrder();
    return (
        <div className='singleOrderPage'>
            <div className="orderInfo">
                <h1>Order #{order?.orderNumber}</h1>
                <div className="wrapper">
                    <div className="left">
                        <span>Cachier : </span>
                        <span>Time : </span>
                        <span>Date : </span>
                        <span>Disocunt code : </span>
                        <span>Total : </span>
                    </div>
                    <div className="right">
                        <span className="name info">{order?.cashierName}</span>
                        <span className="info grey">{order?.time?.toString()}</span>
                        <span className="info grey">{new Date(order?.date || Date.now()).toLocaleDateString()}</span>
                        <span className="info">{order?.discountCode || 'No discount!'}</span>
                        <span className="info">{order?.total.toString()} $</span>
                    </div>
                </div>
            </div>
            <div className="orderDetails">
                <h2>Order Details </h2>
            </div>
        </div>
    );
};

export default SingleOrder;
