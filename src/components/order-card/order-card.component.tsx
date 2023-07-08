import './order-card.css';
import { ItemNS } from '../../types';

interface IProps {
    item?: ItemNS.Item
}
const OrderCard = (props: IProps) => {
    return (
        <div className='orderCard' >
            <img src={props.item?.image} alt={props.item?.name} />
            <div className='itemInfo'>
                <span style={{ fontWeight: 'bolder', fontSize: '20px', textTransform: 'capitalize' }}>{props.item?.name}</span>
                <span>#{props.item?.quantity}</span>
                <span>${props.item?.priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}</span>
            </div>
        </div>
    );
};

export default OrderCard;
