import './button.css';
interface Iprops {
    HtmlType: "button" | "submit",
    Type?: 'Primary' | 'Secondary' | 'Tertiary' | 'Danger' | 'Ghost',
    Ratio?: string,
    Size?: string,
    Disabled?: boolean,
    Radius?: string,
    Color?: string,
    FontSize?: string,
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    FontColor?: string,
    Border?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: Iprops) => {
    let style = {
        aspectRatio: props.Ratio || "21/9",
        width: (props.Size || "60") + "px",
        borderRadius: (props.Radius) + "px",
        backgroundColor: (props.Color),
        color: (props.FontColor),
        fontWeight: (props.FontWeight),
        fontSize: (props.FontSize || "14") + "px",
        border: `${props.Border || ""}`,
    }
    return (
        <div className='buttonContainer'>
            <button type={props.HtmlType}
                className={`${props.Type || 'Primary'}`}
                style={style}
                disabled={props.Disabled}
                onClick={e => {return props.onClick && props.onClick(e)}}>add</button>
        </div>
    )
};

export default Button;