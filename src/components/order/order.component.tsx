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
            <td>{total.toFixed(2).toString()}$</td>
            <td>{time}</td>
            <td>{date}</td>
        </tr>
    );
};

export default Order;