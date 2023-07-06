import "./single-order.css";
import useSingleOrder from "../../hooks/single-order.hook";
import { Order, OrderCard } from '../../components';
import { ItemNS } from '../../types';
import React, { useEffect } from "react";


const SingleOrder = () => {
    const { order } = useSingleOrder();
    const orderItems: ItemNS.Item[] = order?.items as ItemNS.Item[];
    const [subtotal , setSubtotal] = React.useState(0)
    useEffect(() => {
        let tempSubtotal = 0;
        if (order) {
            console.log('processing...')
            console.log(orderItems)
            orderItems.forEach(item => {
                const price = item.priceHistory[0].price
                tempSubtotal += (item.quantity * (price as number))
            })
            setSubtotal(tempSubtotal)
        }
    }, [order])
    return (
        <div className='singleOrderPage'>
            <div className="orderInfo">
                <h1>Order #{order?.orderNumber}</h1>
                <div className="wrapper">
                    <div className="left">
                        <span>Cachier : </span>
                        <span>Time : </span>
                        <span>Date : </span>
                        <span>Subtotal : </span>
                        <span>Disocunt code : </span>
                        <span>Tax(10%) : </span>
                        <span>Total : </span>
                    </div>
                    <div className="right">
                        <span className="name info">{order?.cashierName}</span>
                        <span className="info grey">{order?.time?.toString()}</span>
                        <span className="info grey">{new Date(order?.date || Date.now()).toLocaleDateString()}</span>
                        <span className="info">{subtotal} $</span>
                        <span className="info">{order?.discountCode || 'No discount!'}</span>
                        <span className="info">{subtotal * 0.1} $</span>
                        <span className="info">{order?.total.toString()} $</span>
                    </div>
                </div>
            </div>
            <div className="orderDetails">
                <h2>Order Details</h2>
                <div className='OrderItems'> <OrderCard item={orderItems[0]}/></div>
                <div className="itemsQuantity"># Items : {order?.items?.length} </div>
            </div>
        </div>
    );
};

export default SingleOrder;
