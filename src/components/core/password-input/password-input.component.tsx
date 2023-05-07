import { useState } from 'react';
import './password-input.css';
import { Eye , EyeSlash } from 'phosphor-react';

interface IProps {
    height?: number,
    width?: number,
    disabled?: boolean,
    placeholder?: string,
    label?: string,
    status?: string,
    fontSize?: number,
    fontWeight?: string,
}

const PasswordInput = (props: IProps) => {
    const [showpassword, setShowPassword] = useState<boolean>();
    const styles = {
        height: (props.height + 'px') || '50px',
        width: (props.width + 'px') || '120px',

    };

    return (
        <div className='passwordWrapper' >
            <label htmlFor="passwordInput">
                {props.label || ""}
            </label>
            <div className="inputDiv">
                <input
                    type={
                        showpassword
                        ? 'text'
                        : 'password'
                    }
                    id='passwordInput'
                    style={styles}
                    disabled={props.disabled || false}
                    placeholder={props.placeholder || ""}
                />
                <button onClick = {() => setShowPassword (!showpassword)} className='passwordInput'>
                    {
                        showpassword
                        ? <EyeSlash size={25} weight="fill" color= '#023E8A' />
                        : <Eye size={25} weight="fill" color='#023E8A' />
                    }
                
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;