import './signup.css';
import { Link } from "react-router-dom";
import { Button, Input } from '../../components/core';
import { useSignUp } from '../../hooks';

const Signup = () => {
    const { inputState, setInputState, handleSubmitError, addUser, uploadImage } = useSignUp();

    return (
        <div className="signupPageContainer">
            <div className="signupPageTitleContainer">
                <h1>Create Your Account</h1>
                <h2>Already have an account? <Link to={'/signin'}>Login</Link></h2>
            </div>
            <div className="signupPageBodyContainer">
                <form
                    className="signupPageFormContainer"
                    onSubmit={e => addUser(e as any)}
                    onInvalid={e => handleSubmitError(e as any)}
                >
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
                                PlaceHolder='Full Name'
                                name='name'
                                Required
                                Radius={15}
                                Height={30}
                                Width={160}
                                onChange={(e) => {
                                    setInputState((oldState) => ({ ...oldState, name: { value: e.target.value, valid: true } }));
                                }}
                                Status={inputState.name.valid}
                            />
                            <Input
                                name='email'
                                Type='email'
                                PlaceHolder='Email'
                                Required Radius={15}
                                Height={30}
                                Width={160}
                                onChange={(e) => {
                                    setInputState((oldState) => ({ ...oldState, email: { value: e.target.value, valid: true } }));
                                }}
                                Status={inputState.email.valid}
                            />
                        </div>
                        <div className="signupFormBody2">
                            <Input
                                name='password'
                                Type='text'
                                PlaceHolder='Password'
                                Required Radius={15}
                                Height={30}
                                Width={360}
                                onChange={(e) => {
                                    setInputState((oldState) => ({ ...oldState, password: { value: e.target.value, valid: true } }));
                                }}
                                Status={inputState.password.valid}
                            />
                            <Input
                                name='passwordConfirmation'
                                Type='text'
                                PlaceHolder='Confirm password'
                                Required Radius={15}
                                Height={30}
                                Width={360}
                                onChange={(e) => {
                                    setInputState((oldState) =>
                                        ({ ...oldState, passwordConfirmation: { value: e.target.value, valid: e.target.validity.valid } }));
                                }}
                                Status={inputState.passwordConfirmation.valid}
                            />
                        </div>
                        <div className="signupFormCheckbox">
                            <h3>
                                <input type="checkbox" />
                                I agree to all statements included in the&nbsp;
                                <Link to={'/terms'}>terms of service</Link>
                            </h3>
                        </div>
                    </div>
                    <div className="registerButtonWrapper">
                        <Button
                            HtmlType='submit'
                            FontWeight={'inherit'}
                            FontSize='16'
                            Ratio='40/10'
                            Width='130'
                            Radius='20'
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