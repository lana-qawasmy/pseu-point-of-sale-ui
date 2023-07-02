import { CollectionNS } from '../../../types';
import './collection-block.css';

interface IProps {
    Height?: number,
    Width?: number,
    OnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    index: number;
    collection: CollectionNS.ICollection;
    selectedCollectionId: string | null;
}

const CollectionBlock = (props: IProps) => {
    let style = {
        minHeight: `${props.Height || '100'}px`,
        minWidth: `${props.Width || '100'}px`,
    };
    return (
        <button
            className={`${props.selectedCollectionId && props.selectedCollectionId === props.collection._id ? 'focus' : 'collectionBlockContainer'}`}
            style={style} name={props.collection.name}
            onClick={e => props.OnClick && props.OnClick(e)}
        >
            <div className="iconWrapper">{props.collection.icon}</div>
            <div className="collectionText">{props.collection.name}</div>
        </button>
    );
};


export default CollectionBlock;