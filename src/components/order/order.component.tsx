import { reverse } from 'dns';
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
    const timeArray = time.split(':');
    const splitTime = timeArray[0] + ':' + timeArray[1] + ' ' + timeArray[2][3] + timeArray[2][4];
    let splitDate = date.split('T')[0].split('-').reverse().join('/');
    return (
        <tr className='orderContainer'>
            <td>{orderNo}</td>
            <td>{cashierName}</td>
            <td>{total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$</td>
            <td className='silver'>{splitTime}</td>
            <td className='silver'>{splitDate}</td>
        </tr>
    );
};

export default Order;