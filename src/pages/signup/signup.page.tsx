import './signup.css';
import { Link } from "react-router-dom";
import { Button, Input } from '../../components/core';
import { useSignUp } from '../../hooks';

const Signup = () => {
    const { inputState, setInputState, addUser, uploadImage } = useSignUp();

    return (
        <div className="signupPageContainer">
            <div className="signupPageTitleContainer">
                <h1>Create Your Account</h1>
                <h2>Already have an account? <Link to={'/signin'}>Login</Link></h2>
            </div>
            <div className="signupPageBodyContainer">
                <form className="signupPageFormContainer">
                    <div className="signupFormHeader">
                        <div className="userImageIcon">
                            <label htmlFor='imageFile'>
                                <input
                                    type="file"
                                    id='imageFile'
                                    accept="image/png, image/gif, image/jpeg" onChange={e => { uploadImage(e); }}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="signupFormBody">
                        <div className="signupFormBody1">
                            <Input
                                Type='text'
                                id='nameInSignUp'
                                Label='Full Name'
                                PlaceHolder='Full Name'
                                name='name'
                                Required
                                Radius={15}
                                Height={30}
                                Width={160}
                                onChange={(e) => {
                                    setInputState((oldState) => ({
                                        ...oldState,
                                        name: {
                                            value: e.target.value,
                                            valid: true
                                        }
                                    }));
                                }}
                                Status={inputState.name.valid}
                            />
                            <Input
                                Label='Email'
                                name='email'
                                id='emailInSignUp'
                                Type='email'
                                PlaceHolder='Email'
                                Required Radius={15}
                                Height={30}
                                Width={160}
                                onChange={(e) => {
                                    setInputState((oldState) => ({
                                        ...oldState,
                                        email: {
                                            value: e.target.value,
                                            valid: true
                                        }
                                    }));
                                }}
                                Status={inputState.email.valid}
                            />
                        </div>
                        <div className="signupFormBody2">
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
                                    setInputState((oldState) => ({
                                        ...oldState,
                                        password: {
                                            value: e.target.value,
                                            valid: true
                                        }
                                    }));
                                }}
                                Status={inputState.password.valid}
                            />
                            <Input
                                id='passwordConfirmationInSignUp'
                                Label='Password Confirmation'
                                name='passwordConfirmation'
                                Type='text'
                                PlaceHolder='Confirm password'
                                Required Radius={15}
                                Height={30}
                                Width={360}
                                onChange={(e) => {
                                    setInputState((oldState) => ({
                                        ...oldState,
                                        passwordConfirmation: {
                                            value: e.target.value,
                                            valid: true
                                        }
                                    }));
                                }}
                                Status={inputState.passwordConfirmation.valid}
                            />
                        </div>
                        <div className="signupFormCheckbox">
                            <h3
                                onClick={(e) => {
                                    setInputState((oldState) => ({ ...oldState, checked: !inputState.checked }));
                                }}
                            >
                                <input
                                    id='checkboxInSignUp'
                                    type="checkbox"
                                    checked={inputState.checked}
                                    onChange={e => { }}
                                />
                                I agree to all statements included in the&nbsp;
                                <Link to={'/terms'}>terms of service</Link>
                            </h3>
                        </div>
                    </div>
                    <div className="registerButtonWrapper">
                        <Button
                            HtmlType='button'
                            FontWeight={'inherit'}
                            FontSize='16'
                            Ratio='40/10'
                            Width='130'
                            Radius='20'
                            onClick={e => addUser(e as any)}
                        >
                            Register
                        </Button>
                    </div>
                </form>
                <div className="signupPageImage"></div>
            </div>
        </div>
    );
};
export default Signup;