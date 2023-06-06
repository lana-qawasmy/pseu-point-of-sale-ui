import { useEffect } from 'react';
import './password-input.css';
import { Eye, EyeSlash } from 'phosphor-react';
import { usePassword } from '../../../hooks';

interface IProps {
    id?: string,
    height?: number,
    Width?: number,
    Disabled?: boolean,
    Required?: boolean,
    Placeholder?: string,
    name?: string,
    Radius?: number;
    Label?: string,
    FontSize?: number,
    state?: 'none' | 'valid' | 'invalid',
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    getValue?: (value: string, status: 'valid' | 'invalid' | 'none') => void;
}

const PasswordInput = (props: IProps) => {
    const password = usePassword();

    const styles = {
        height: (props.height + 'px') || '50px',
        width: ((props.Width || 120)) + 'px',
        fontSize: (props.FontSize + 'px') || '14px',
        fontWeight: (props.FontWeight + 'px') || 'normal',
        borderRadius: (props.Radius + 'px') || '0px'
    };
    const eyeStyle = { bottom: ((props.height || 50) / 3.2) + 'px', left: ((props.Width || 120) * 0.93) + 'px' };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.getValue && props.getValue(password.value, password.status || 'valid');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password.value]);

    return (
        <div className='passwordWrapper' >
            <label htmlFor="passwordInput">
                {props.Label || ""}
                {props.Required
                    ? <span
                        style={{ color: 'red', fontSize: '16px', fontWeight: '300', textShadow: 'none' }}
                    > *</span>
                    : ''
                }
            </label>
            <div className="inputDiv">
                <input
                    id={props.id}
                    name={props.name || 'password'}
                    style={styles}
                    className={props.state || password.status}
                    type={
                        password.showPassword
                            ? 'text'
                            : 'password'
                    }
                    disabled={props.Disabled || false}
                    placeholder={props.Placeholder || ""}
                    value={password.value}
                    onChange={e => password.setValue(e.target.value)}
                />
                <button
                    onClick={() => password.setShowPassword(!password.showPassword)}
                    className='passwordInput'
                    style={eyeStyle}
                    type='button'
                >
                    {
                        password.showPassword
                            ? <EyeSlash size={23} weight="fill" color='#023E8A' />
                            : <Eye size={23} weight="fill" color='#023E8A' />
                    }

                </button>
            </div>
        </div>
    );
};

export default PasswordInput;