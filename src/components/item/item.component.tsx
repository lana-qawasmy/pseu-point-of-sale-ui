import './item.css';
import { ItemNS } from '../../types';
import React from 'react';

interface IProps {
    item: ItemNS.Item;
}

const Item = (props: IProps) => {
    const { _id, name, image, barcode, description, priceHistory } = props.item;

    console.log({ priceHistory });

    return (
        <div className='mainItemContainer'>
            <img src={image} alt="name" />
            <div className='infoWrapper'>
                <span className='itemName'>
                    {name}
                </span>
                <span className='itemPrice'>
                    {/* {priceHistory[0].price.toString()} */}
                </span>
            </div>
        </div>
    );
};

export default Item;