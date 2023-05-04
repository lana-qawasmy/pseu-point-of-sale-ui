import './button.css';
interface Iprops {
    HtmlType: "button" | "submit" ,
    Type?: string,
    Ratio?: string,
    Size?: string,
    Disabled?: boolean,
    Radius?: string,
    Color?: string,
    FontSize?: string,
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    FontColor?: string,
}

const Button = (props: Iprops) => {
    let style = {
        aspectRatio: props.Ratio || "21/9",
        width: (props.Size || "60") + "px",
        borderRadius: (props.Radius || "0") + "px",
        backgroundColor: (props.Color || "#0077B6"),
        color: (props.FontColor || "white"),
        fontWeight: (props.FontWeight) || "normal",
        fontSize: (props.FontSize || "14") + "px",

    }
    return (
        <div className='buttonContainer'> 
            <button type={props.HtmlType } className={`"button" ${props.Type}`} style={style}>add</button>
        </div>
    )
};

export default Button;