import './order-card.css';
import { ItemNS } from '../../types';

interface IProps {
    item?: ItemNS.Item
}
const OrderCard = (props: IProps) => {
    return (
        <div>
            <img src={props.item?.image} alt={props.item?.name} />
            <div className='itemInfo'>
                <span>{props.item?.name}</span>
                <div className="priceQuantity">
                    <span># {props.item?.quantity}</span>
                    <span> {props.item?.priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })} $</span>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
