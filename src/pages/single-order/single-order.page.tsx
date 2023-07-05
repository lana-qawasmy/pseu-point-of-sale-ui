import "./single-order.css";
import useSingleOrder from "../../hooks/single-order.hook";


const SingleOrder = () => {
    const { order } = useSingleOrder();

    return (
        <div className='singleOrderPage'>
            {order && order.cashierName}
        </div>
    );
};

export default SingleOrder;
