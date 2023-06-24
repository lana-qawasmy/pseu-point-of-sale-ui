import { CollectionNS } from '../../../types';
import './category-block.css';

interface IProps {
    Height?: number,
    Width?: number,
    OnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    index: number;
    category: CollectionNS.ICollection;
    selectedCategoryId: string | null;
}

const CategoryBlock = (props: IProps) => {
    let style = {
        minHeight: `${props.Height || '100'}px`,
        minWidth: `${props.Width || '100'}px`,
    };
    return (
        <button
            className={`${props.selectedCategoryId && props.selectedCategoryId === props.category._id ? 'focus' : 'categoryBlockContainer'}`}
            style={style} name={props.category.name}
            onClick={e => props.OnClick && props.OnClick(e)}
        >
            <div className="iconWrapper">{props.category.icon}</div>
            <div className="categoryText">{props.category.name}</div>
        </button>
    );
};


export default CategoryBlock;