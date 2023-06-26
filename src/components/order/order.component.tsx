import './order.css';

interface IProps {
    orderNo: number;
    cashierName: string;
    total: number;
    time: string;
    date: string;
}

const Order = (props: IProps) => {
    const { orderNo, cashierName, total, time, date } = props;
    return (
        <tr className='orderContainer'>
            <td>{orderNo}</td>
            <td>{cashierName}</td>
            <td>{total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$</td>
            <td>{time}</td>
            <td>{date}</td>
        </tr>
    );
};

export default Order;