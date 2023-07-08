import './button.css';
interface IProps {
    HtmlType: "button" | "submit",
    Title?: string;
    Type?: 'Primary' | 'Secondary' | 'Tertiary' | 'Danger' | 'Ghost',
    Ratio?: string,
    Width?: string,
    Disabled?: boolean,
    Radius?: string,
    Color?: string,
    FontSize?: string,
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    FontColor?: string,
    Border?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    children?: JSX.Element | string | any,
}

const Button = (props: IProps) => {
    let style = {
        aspectRatio: props.Ratio || "21/9",
        width: (props.Width || "60") + "px",
        borderRadius: (props.Radius) + "px",
        backgroundColor: (props.Color),
        color: (props.FontColor),
        fontWeight: (props.FontWeight),
        fontSize: (props.FontSize || "14") + "px",
        border: `${props.Border || ""}`,
    };
    return (
        <div className='buttonContainer' title={`${props.Title}`}>
            <button type={props.HtmlType}
                className={`${props.Type || 'Primary'}`}
                style={style}
                disabled={props.Disabled}
                onClick={e => { return props.onClick && props.onClick(e); }}>
                {props.children || "Button"}
            </button>
        </div>
    );
};

export default Button;