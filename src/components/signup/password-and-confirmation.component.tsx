import { ISignupState } from '../../hooks/sing-up.hook';
import { Input } from '../core';

interface IProps {
    inputState: ISignupState;
    setInputState: React.Dispatch<React.SetStateAction<ISignupState>>;
}

const PasswordAndConfirmation = (props: IProps) => {
    return (
        <>
            <Input
                id='passwordInSignUp'
                name='password'
                Type='text'
                Label='Password'
                PlaceHolder='Password'
                Required Radius={15}
                Height={30}
                Width={360}
                onChange={(e) => {
                    props.setInputState((oldState) => ({
                        ...oldState,
                        password: {
                            value: e.target.value,
                            valid: 'valid'
                        }
                    }));
                }}
                Status={props.inputState.password.valid === 'valid'}
            />
            <Input
                id='passwordConfirmationInSignUp'
                Label='Confirm password'
                name='passwordConfirmation'
                Type='text'
                PlaceHolder='Confirm password'
                Required Radius={15}
                Height={30}
                Width={360}
                onChange={(e) => {
                    props.setInputState((oldState) => ({
                        ...oldState,
                        passwordConfirmation: {
                            value: e.target.value,
                            valid: 'valid'
                        }
                    }));
                }}
                Status={props.inputState.passwordConfirmation.valid === 'valid'}
            />
        </>
    );
};

export default PasswordAndConfirmation;