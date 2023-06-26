import './order.css';

interface IProps {
    orderNo: number;
    casherName: string;
    total: number;
    time: string;
    date: string;
}

const Order = (props: IProps) => {
    const { orderNo, casherName, total, time, date } = props;
    return (
        <tr className='orderContainer'>
            <td>{orderNo}</td>
            <td>{casherName}</td>
            <td>{total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$</td>
            <td>{time}</td>
            <td>{date}</td>
        </tr>
    );
};

export default Order;