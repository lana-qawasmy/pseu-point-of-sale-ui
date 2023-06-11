import './item.css';
import { ItemNS } from '../../types';
import { GoTrashcan } from 'react-icons/go';

interface IProps {
    item: ItemNS.Item;
    Selected?: boolean;
    DeletedPrice?: number;
    OnDelete: (userId: string, itemId: string) => void;
}

const Item = (props: IProps) => {
    const { _id, name, image, priceHistory, addedBy } = props.item;
    return (
        <div className={`mainItemContainer ${props.Selected ? 'isSelected' : ''}`}>
            <img src={image} alt="name" />
            <div className='infoWrapper'>
                <span className='itemName'>
                    {name}
                </span>
                <div className='itemPrice'>
                    <span className='currentItemPrice'>
                        {priceHistory[0].price.toFixed(2)}
                    </span>
                    {
                        props.DeletedPrice &&
                        <span className='deletedItemPrice'>
                            {props.DeletedPrice.toFixed(2)}
                        </span>
                    }
                </div>
            </div>
            <span className='goTrashCan'>
                <GoTrashcan size={22} onClick={() => props.OnDelete(addedBy, _id as string)} color='#e0e2e8' />
            </span>
        </div>
    );
};

export default Item;