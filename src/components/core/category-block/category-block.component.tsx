import './category-block.css';

interface IProps {
    Height?: number,
    Width?: number,
    OnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    Name: string,
    Icon: String,
}

const CategoryBlock = (props: IProps) => {
    let style = {
        height: `${props.Height || '100'}px`,
        width: `${props.Width || '100'}px`,
    }
    return (
        <button className="categoryBlockContainer" style={style} name={props.Name} onClick={e => props.OnClick && props.OnClick(e)}>
            <div className="iconWrapper">{props.Icon}</div>
            <div className="categoryText">{props.Name}</div>
        </button>
    )
};


export default CategoryBlock;