import './order-card.css';
import { ItemNS } from '../../types';

interface IProps {
    item?: ItemNS.Item;
}
const OrderCard = (props: IProps) => {
    const price = props.item?.priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 }) || '';
    const priceClass = price.length > 12 ? 'smallPrice' : '';
    return (
        <div className='orderCard' >
            <div title={`${props.item?.name} page`} className='image' style={{ backgroundImage: `url('${props.item?.image}')` }}></div>
            <div className='itemInfo'>
                <span title={`${props.item?.name} page`} style={{ fontWeight: 'bolder', fontSize: '20px', textTransform: 'capitalize' }}>{props.item?.name}</span>
                <span title={`Quantity`}>#{props.item?.quantity}</span>
                <span title={`Price`} className={priceClass}>${props.item?.priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}</span>
            </div>
        </div>
    );
};

export default OrderCard;
