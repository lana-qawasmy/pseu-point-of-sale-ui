import './item.css';
import { CollectionNS, ItemNS } from '../../types';
import { PopUp } from '../core';
import {ItemForm} from '../'
import { GoTrashcan } from 'react-icons/go';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import React from 'react';
interface IProps {
    item: ItemNS.Item;
    Selected?: boolean;
    DeletedPrice?: number;
    Editable?: boolean;
    OnDelete?: (userId: string, itemId: string) => void;
    OnSelect?: () => void;
    selectedCategory: CollectionNS.ICollection | null;
}

const Item = (props: IProps) => {
    const { _id, name, image, priceHistory, addedBy } = props.item;
    const [displayACK, setDisplayACK] = React.useState(false);
    const [edit , setEdit] = React.useState<boolean>(false)
    return (
        <div className={`mainItemContainer ${props.Selected ? 'isSelected' : ''}`}>
             {edit &&
                <PopUp setDisplayPopup={setEdit}>
                    <ItemForm edit setEdit={setEdit} item={props.item} />
                </PopUp>
            }

            <div style={{ backgroundImage: `url('${image}')` }} className='itemImage' />
            <div className='infoWrapper'>
                <span className='itemName'>
                    {name}
                </span>
                <div className='itemPrice'>
                    <span className='currentItemPrice'>
                        {priceHistory[0].price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$ &nbsp;&nbsp;
                    </span>
                    {
                        props.DeletedPrice &&
                        <span className='deletedItemPrice'>
                            {props.DeletedPrice.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 1 })}$
                        </span>
                    }
                </div>
            </div>
            {
                props.OnDelete && <span className='goTrashCan'>
                    <GoTrashcan
                        size={22}
                        id={_id + '1'}
                        onMouseOver={() => {
                            let x = document.getElementById(_id + '1');
                            if (x) {
                                x.style.color = '#023e8a';
                                x.style.stroke = '#023e8a';
                            }
                        }}
                        onMouseLeave={() => {
                            let x = document.getElementById(_id + '1');
                            if (x) {
                                x.style.color = '#e0e2e8';
                                x.style.stroke = '#e0e2e8';
                            }
                        }}
                        onClick={() => setDisplayACK(!displayACK)}
                    />
                </span>
            }
            {
                displayACK &&
                <div className='deleteACK'>

                    <button className='ACKButton' onClick={() => setDisplayACK(false)}>
                        No
                    </button>

                    <button className='ACKButton' onClick={() => props.OnDelete && props.OnDelete(addedBy, _id as string)}>
                        Yes
                    </button>

                </div>
            }
            {
                (!props.Selected) && props.OnSelect && props.selectedCategory !== null &&
                <span className='grCheckbox'>
                    <GrCheckbox
                        size={20}
                        id={_id + '2'}
                        onMouseOver={() => {
                            let x = document.getElementById(_id + '2');
                            if (x && x.firstChild) {
                                let y = x.firstChild as HTMLElement;
                                y.style.stroke = '#023e8a';
                            }
                        }}
                        onMouseLeave={() => {
                            let x = document.getElementById(_id + '2');
                            if (x && x.firstChild) {
                                let y = x.firstChild as HTMLElement;
                                y.style.stroke = '#e0e2e8';
                            }
                        }}
                        onClick={() => props.OnSelect && props.OnSelect()} color='#e0e2e8'
                    />
                </span>
            }
            {
                props.Selected && props.OnSelect && props.selectedCategory !== null &&
                <span className='grCheckbox'>
                    <GrCheckboxSelected
                        size={20}
                        color='#023e8a'
                        onClick={() => props.OnSelect && props.OnSelect()}
                    />
                </span>
            }
            {
                props.Editable &&
                <span className='fiEdit'>
                    <FiEdit
                        size={20}
                        id={_id + '3'}
                        onMouseOver={() => {
                            let x = document.getElementById(_id + '3');
                            if (x && x.firstChild) {
                                let y = x as HTMLElement;
                                if (y.getElementsByTagName('path').length > 0) {
                                    let yy = y.getElementsByTagName('path')[0].style;
                                    yy.stroke = '#023e8a';
                                    yy = y.getElementsByTagName('path')[1].style;
                                    yy.stroke = '#023e8a';
                                }
                            }
                        }}
                        onMouseLeave={() => {
                            let x = document.getElementById(_id + '3');
                            if (x && x.firstChild) {
                                let y = x as HTMLElement;
                                if (y.getElementsByTagName('path').length > 0) {
                                    let yy = y.getElementsByTagName('path')[0].style;
                                    yy.stroke = '#e0e2e8';
                                    yy = y.getElementsByTagName('path')[1].style;
                                    yy.stroke = '#e0e2e8';
                                }
                            }
                        }}
                        onClick={() => setEdit(true)} color='#e0e2e8' />
                </span>
            }

        </div>
    );
};

export default Item;