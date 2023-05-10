import './input.css';

interface IProps {
    Type?: 'text' | 'textArea' | 'email';
    Color?: string;
    Name?: string;
    Required?: boolean;

    Height?: number;
    Width?: number;
    Radius?: number;

    Disabled?: boolean;

    PlaceHolder?: string;
    Label?: string;

    Status?: 'valid' | 'invalid';

    FontSize?: number;
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

const Input = (props: IProps) => {
    const style = {
        height: `${props.Height ? props.Height : props.Type === 'textArea' ? '80' : '50'}px`,
        width: `${props.Width ? props.Width : props.Type === 'textArea' ? '120' : '120'}px`,
        borderRadius: `${props.Radius ? props.Radius : '0'}px`,
        fontWeight: `${props.FontWeight ? props.FontWeight : 'normal'}`,
        fontSize: `${props.FontSize ? props.FontSize : '14'}px`,
        borderColor: `${props.Status === 'invalid'
            ? '#FF3030'
            : props.Color
                ? props.Color
                : '#2c64c6'
            }`,
    };

    return (
        <div className='TextInputWrapper'>
            <span className='inputLabelAndRequired'>
                        <span className='required' 
                        style={props.Required?{color: "red"}:{color: "transparent"}}>*</span>
                {
                    (props.Label)
                        ? <span className='label'>
                            {props.Label || ''}
                        </span>
                        : false
                }
            </span>
            {
                props.Type === 'textArea'
                    ? <textarea
                        className={`textArea ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                        name={props.Name}
                        required={props.Required}
                    />
                    : <input
                        className={`input ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                        type={props.Type}
                        name={props.Name}
                        required={props.Required}
                    />
            }
        </div>
    );
};

export default Input;