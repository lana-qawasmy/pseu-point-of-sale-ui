import './input.css';

interface IProps {
    Type?: 'text' | 'textArea';

    Required?: boolean;

    Color?: string;

    Height?: number;
    Width?: number;
    Radius?: number;

    Disabled?: boolean;

    PlaceHolder?: string;
    Label?: string;

    Status?: 'valid' | 'invalid';

    FontSize?: number;
    FontWeight?: string;
}

const Input = (props: IProps) => {
    props = {
        ...props,
        Label: props.Label ? props.Label : '',
        Required: props.Required ? props.Required : false,
    };

    const style = {
        height: `${props.Height ? props.Height : props.Type === 'textArea' ? '80' : '40'}px`,
        width: `${props.Width ? props.Width : props.Type === 'textArea' ? '120' : '120'}px`,
        borderRadius: `${props.Radius ? props.Radius : '5'}px`,
        fontWeight: `${props.FontWeight ? props.FontWeight : 'normal'}`,
        fontSize: `${props.FontSize ? props.FontSize : '16'}px`,
        borderColor: `${props.Status === 'invalid'
            ? '#FF3030'
            : props.Color
                ? props.Color
                : '#0077B6'
            }`,
    };

    return (
        <div className='TextInputWrapper'>
            {
                props.Type === 'textArea'
                    ?
                    <textarea
                        className={`textArea ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder}
                    />
                    :
                    <input
                        className={`input ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder}
                    />
            }
        </div>
    );
};

export default Input;