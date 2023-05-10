import './input.css';

interface IProps {
    Type?: 'text' | 'textArea' | 'email';

    Color?: string;

    Required?: boolean;

    Height?: number;
    Width?: number;
    Radius?: number;

    Disabled?: boolean;

    PlaceHolder?: string;
    Label?: string;
    name?: string;

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
                {
                    props.Required
                        ? <span className='required'>*</span>
                        : false

                }
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
                        name={props.name || 'textarea'}
                        className={`textArea ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                    />
                    : <input
                        name={props.name || 'input'}
                        className={`input ${props.Status ? props.Status : 'valid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                        type={props.Type}
                    />
            }
        </div>
    );
};

export default Input;