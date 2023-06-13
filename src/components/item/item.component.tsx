import './item.css';
import { ItemNS } from '../../types';
import { GoTrashcan } from 'react-icons/go';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
interface IProps {
    item: ItemNS.Item;
    Selected?: boolean;
    DeletedPrice?: number;
    OnDelete?: (userId: string, itemId: string) => void;
    OnSelect?: () => void;
    OnEdit?: () => void;
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
                        {
                            props.DeletedPrice &&
                            <span className='deletedItemPrice'>
                                {props.DeletedPrice.toFixed(2)}
                            </span>
                        }
                    </span>
                </div>
            </div>
            {
                props.OnDelete && <span className='goTrashCan'>
                    <GoTrashcan size={22} onClick={() => props.OnDelete && props.OnDelete(addedBy, _id as string)} color='#e0e2e8' />
                </span>
            }
            {
                (!props.Selected) && props.OnSelect &&
                <span className='grCheckbox'>
                    <GrCheckbox size={20} onClick={() => props.OnSelect && props.OnSelect()} color='#e0e2e8' />
                </span>
            }
            {
                props.Selected && props.OnSelect &&
                <span className='grCheckbox'>
                    <GrCheckboxSelected size={20} onClick={() => props.OnSelect && props.OnSelect()} color='#e0e2e8' />
                </span>
            }
            {
                props.OnEdit &&
                <span className='fiEdit'>
                    <FiEdit size={20} onClick={() => props.OnEdit && props.OnEdit()} color='#e0e2e8' />
                </span>
            }
        </div>
    );
};

export default Item;