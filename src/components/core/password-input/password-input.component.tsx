import { useState, useEffect } from 'react';
import './password-input.css';
import { Eye, EyeSlash } from 'phosphor-react';

interface IProps {
    height?: number,
    width?: number,
    disabled?: boolean,
    placeholder?: string,
    radius?: number;
    label?: string,
    status?: string,
    fontSize?: number,
    fontWeight?: string,
    getValue?: (value: string) => void
}

const PasswordInput = (props: IProps) => {
    const [showpassword, setShowPassword] = useState<boolean>();
    const [value, setValue] = useState<string>('');
    const [status, setStatus] = useState<string>();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    const styles = {
        height: (props.height + 'px') || '50px',
        width: (props.width + 'px') || '120px',
        fontSize: (props.fontSize + 'px') || '14px',
        fontWeight: (props.fontWeight + 'px') || 'normal',
        borderRadius: (props.radius + 'px') || '0px'
    };

    function password_validate(p: string) {
        return strongRegex.test(p);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.getValue && props.getValue(value)
        if (value === '')
            setStatus('none');
        else if (password_validate(value))
            setStatus('valid')
        else
            setStatus('invalid')
    }, [value]);

    return (
        <div className='passwordWrapper' >
            <label htmlFor="passwordInput">
                {props.label || ""}
            </label>
            <div className="inputDiv">
                <input
                    style={styles}
                    className={status}
                    type={
                        showpassword
                            ? 'text'
                            : 'password'
                    }
                    id='passwordInput'
                    disabled={props.disabled || false}
                    placeholder={props.placeholder || ""}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showpassword)} className='passwordInput'>
                    {
                        showpassword
                            ? <EyeSlash size={23} weight="fill" color='#023E8A' />
                            : <Eye size={23} weight="fill" color='#023E8A' />
                    }

                </button>
            </div>
        </div>
    );
};

export default PasswordInput;