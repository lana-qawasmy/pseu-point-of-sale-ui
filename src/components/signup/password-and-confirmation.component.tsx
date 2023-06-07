import { ISignupState } from '../../hooks/sing-up.hook';
import { PasswordInput } from '../core';

interface IProps {
    inputState: ISignupState;
    setInputState: React.Dispatch<React.SetStateAction<ISignupState>>;
}

const PasswordAndConfirmation = (props: IProps) => {
    const setPassword = (value: string, status: 'valid' | 'invalid' | 'none') => {
        props.setInputState((oldState) => ({
            ...oldState,
            password: {
                value: value,
                valid: status
            }
        }));
    };

    const setPasswordConfirmation = (value: string, status: 'valid' | 'invalid' | 'none') => {
        props.setInputState((oldState) => ({
            ...oldState,
            passwordConfirmation: {
                value: value,
                valid: status
            }
        }));
    };

    return (
        <>
            <PasswordInput
                id='passwordInSignUp'
                name='password'
                Placeholder='Password'
                Label='Password'
                Radius={15}
                height={30}
                Width={360}
                Required
                getValue={setPassword}

            />
            <PasswordInput
                id='passwordConfirmationInSignUp'
                name='passwordConfirmation'
                Placeholder='Confirm Password'
                Label='Confirm Password'
                Radius={15}
                height={30}
                Width={360}
                Required
                getValue={setPasswordConfirmation}

            />
        </>
    );
};

export default PasswordAndConfirmation;