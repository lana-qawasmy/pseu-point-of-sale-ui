import { useNavigate } from 'react-router-dom';
import './order.css';

interface IProps {
    _id: string;
    orderNo: number;
    cashierName: string;
    total: number;
    time: string;
    date: string;
}

const Order = (props: IProps) => {
    const { _id, orderNo, cashierName, total, time, date } = props;
    const timeArray = time.split(':');
    const splitTime = timeArray[0] + ':' + timeArray[1] + ' ' + timeArray[2][3] + timeArray[2][4];
    let splitDate = date.split('T')[0].split('-').reverse().map((dateComponent) => (dateComponent[0] === '0') ? dateComponent[1] : dateComponent).join('/');
    const navigate = useNavigate();
    return (
        <tr
            title={`Order number ${orderNo}`}
            className='orderContainer'
            onClick={() => navigate(`/viewSingleOrder/${_id}`, { replace: false })}
        >
            <td>{orderNo}</td>
            <td>{cashierName.toLowerCase()}</td>
            <td>{total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$</td>
            <td className='upperSilver'>{splitTime}</td>
            <td className='upperSilver'>{splitDate}</td>
        </tr>
    );
};

export default Order;