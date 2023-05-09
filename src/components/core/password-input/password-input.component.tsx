import { useEffect } from 'react';
import './password-input.css';
import { Eye, EyeSlash } from 'phosphor-react';
import { usePassword } from '../../../hooks';

interface IProps {
    height?: number,
    Width?: number,
    Disabled?: boolean,
    Placeholder?: string,
    Radius?: number;
    Label?: string,
    FontSize?: number,
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    getValue?: (value: string) => void;
}

const PasswordInput = (props: IProps) => {
    const password = usePassword();

    const styles = {
        height: (props.height + 'px') || '50px',
        width: (props.Width + 'px') || '120px',
        fontSize: (props.FontSize + 'px') || '14px',
        fontWeight: (props.FontWeight + 'px') || 'normal',
        borderRadius: (props.Radius + 'px') || '0px'
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.getValue && props.getValue(password.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password.value]);

    return (
        <div className='passwordWrapper' >
            <label htmlFor="passwordInput">
                {props.Label || ""}
            </label>
            <div className="inputDiv">
                <input
                    style={styles}
                    className={password.status}
                    type={
                        password.showpassword
                            ? 'text'
                            : 'password'
                    }
                    id='passwordInput'
                    disabled={props.Disabled || false}
                    placeholder={props.Placeholder || ""}
                    value={password.value}
                    onChange={e => password.setValue(e.target.value)}
                />
                <button onClick={() => password.setShowPassword(!password.showpassword)} className='passwordInput'>
                    {
                        password.showpassword
                            ? <EyeSlash size={23} weight="fill" color='#023E8A' />
                            : <Eye size={23} weight="fill" color='#023E8A' />
                    }

                </button>
            </div>
        </div>
    );
};

export default PasswordInput;