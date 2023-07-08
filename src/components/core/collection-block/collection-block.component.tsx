import { AiOutlineClose } from 'react-icons/ai';
import { CollectionNS } from '../../../types';
import './collection-block.css';
import { useState } from 'react';

interface IProps {
    Height?: number,
    Width?: number,
    OnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    index: number;
    collection: CollectionNS.ICollection;
    selectedCollectionId: string | null;
    handleDeleteCollection?: (collection: CollectionNS.ICollection) => void;
    Title?: string;
}

const CollectionBlock = (props: IProps) => {
    let style = {
        minHeight: `${props.Height || '100'}px`,
        minWidth: `${props.Width || '100'}px`,
    };
    const [displayACK, setDisplayACK] = useState(false);
    return (
        <button
            title={props.Title || ''}
            className={`${props.selectedCollectionId && props.selectedCollectionId === props.collection._id ? 'focus' : 'collectionBlockContainer'}`}
            style={style} name={props.collection.name}
            onClick={e => props.OnClick && props.OnClick(e)}
        >
            {
                props.handleDeleteCollection &&
                <span className='deleteIcon'
                    onClick={(e) => {
                        e.stopPropagation();
                        setDisplayACK(true);
                    }}
                >
                    <AiOutlineClose />
                    {
                        displayACK &&
                        <div className='deleteACK'>
                            <span className='ACKButton'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDisplayACK(false);
                                }}>
                                No
                            </span>

                            <span
                                className='ACKButton'
                                onClick={() => props.handleDeleteCollection &&
                                    props.handleDeleteCollection(props.collection)
                                }
                            >
                                Yes
                            </span>
                        </div>
                    }
                </span>

            }
            <div className="iconWrapper">{props.collection.icon}</div>
            <div className="collectionText">{props.collection.name}</div>
        </button>
    );
};


export default CollectionBlock;