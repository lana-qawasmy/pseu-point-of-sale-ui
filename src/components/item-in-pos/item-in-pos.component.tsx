import './item-in-pos.css';
import { CollectionNS, ItemNS } from '../../types';
import { GoLinkExternal } from 'react-icons/go';
import { NavigateFunction } from 'react-router-dom';
import { useNotification } from '../../hooks';
import { ItemsContext } from '../providers/items.provider';
import React from 'react';

interface IProps {
    selectedCategory: CollectionNS.ICollection | null;
    item: ItemNS.Item;
    DeletedPrice?: number;
    OnSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    navigate: NavigateFunction;
}

const ItemInPOS = (props: IProps) => {
    const { _id, name, image, priceHistory, quantity } = props.item;
    const notification = useNotification();
    const itemsContext = React.useContext(ItemsContext)
    const handleLinkClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        props.navigate(`/viewSingleItem/${_id}`, { replace: false });
    };

    return (
        <div
            id={_id + 'elementInPOS'}
            className={quantity ? 'mainItemInPOSContainer' : 'mainItemInPOSContainer soldOut'}
            onClick={(e) => {
                quantity && itemsContext.setItems && itemsContext.items &&
                    itemsContext.setItems(itemsContext.items?.map(
                        item => {
                            return item.name === name ? item : { ...item, quantity: quantity - 1 }
                        }))
                quantity
                    ? props.OnSelect(e)
                    : notification.setNotification({ message: 'This item is out of stock!', status: 'error' })
            }}
        >
            <div className='goExternalLink' onClick={(e) => handleLinkClick(e)}>
                <GoLinkExternal
                    id={'goExternalLink' + _id}
                    size={20}
                    color='#e0e2e8'
                    onMouseOver={() => {
                        let x = document.getElementById('goExternalLink' + _id);
                        if (x && x.firstChild) {
                            let y = x.firstChild as HTMLElement;
                            y.style.color = '#023e8a';
                        }
                    }}
                    onMouseLeave={() => {
                        let x = document.getElementById('goExternalLink' + _id);
                        if (x && x.firstChild) {
                            let y = x.firstChild as HTMLElement;
                            y.style.color = '#e0e2e8';
                        }
                    }}
                />
            </div>
            <div style={{ backgroundImage: `url('${image}')` }} className='itemImage' />
            <div className='infoWrapper'>
                <span className='itemName'>
                    <span className="name">{name}</span>
                    {
                        quantity
                            ? <span className='inStock'>In stock</span>
                            : <span className='outOfStock'>Out of stock</span>
                    }
                </span>
                <div className='itemPrice'>
                    <span className='currentItemPrice'>
                        {priceHistory[0].price && priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$ &nbsp;&nbsp;
                    </span>
                    {
                        props.DeletedPrice &&
                        <span className='deletedItemPrice'>
                            {props.DeletedPrice.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ItemInPOS;