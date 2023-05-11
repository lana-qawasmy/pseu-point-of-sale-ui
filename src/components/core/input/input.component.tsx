import { ChangeEvent } from 'react';
import './input.css';

interface IProps {
    Type?: 'text' | 'textArea' | 'email';

    id?: string;
    name?: string;

    Color?: string;

    Required?: boolean;
    
    Height?: number;
    Width?: number;
    Radius?: number;

    Disabled?: boolean;

    PlaceHolder?: string;
    Label?: string;

    Status?: boolean;

    FontSize?: number;
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    
    onChange?(e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>): void;
}

const Input = (props: IProps) => {
    const style = {
        height: `${props.Height ? props.Height : props.Type === 'textArea' ? '80' : '50'}px`,
        width: `${props.Width ? props.Width : props.Type === 'textArea' ? '120' : '120'}px`,
        borderRadius: `${props.Radius ? props.Radius : '0'}px`,
        fontWeight: `${props.FontWeight ? props.FontWeight : 'normal'}`,
        fontSize: `${props.FontSize ? props.FontSize : '14'}px`,
        borderColor: `${props.Status === false
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
                    (props.Label)
                        ? <span className='label'>
                            {props.Label || ''}
                        </span>
                        : false
                }
                {
                    props.Required
                        ? <span className='required'>&nbsp;*</span>
                        : false

                }
            </span>
            {
                props.Type === 'textArea'
                    ? <textarea
                        id={props.id}
                        className={`textArea ${props.Status !== false ? 'valid' : 'invalid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                        required={props.Required}
                        name={props.name || ''}
                        onChange={e => (props.onChange && props.onChange(e))}
                    />
                    : <input
                        id={props.id}
                        className={`input ${props.Status !== false ? 'valid' : 'invalid'}`}
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder || ''}
                        type={props.Type}
                        required={props.Required}
                        name={props.name || ''}
                        onChange={e => (props.onChange && props.onChange(e))}
                    />
            }
        </div>
    );
};

export default Input;