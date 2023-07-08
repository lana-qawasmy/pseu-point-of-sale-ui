import './signup.css';
import { Link } from "react-router-dom";
import { Button, Input } from '../../components/core';
import { useSignUp } from '../../hooks';
import { PasswordAndConfirmation } from '../../components/signup';

import { mainPagePic } from '../../assets';

const Signup = () => {
    const { inputState, setInputState, addUser, uploadImage } = useSignUp();
    const style = {
        backgroundImage: `url(${inputState.image || mainPagePic})`,
        borderRadius: inputState.image ? '50%' : '',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: 'transparent',
        cursor: 'pointer',
    };

    return (
        <div className="signupPageContainer">
            <div className="signupPageTitleContainer">
                <h1>Create Your Account</h1>
                <h2>Already have an account? <Link title='SingIn page' to={'/signin'}>Login</Link></h2>
            </div>
            <div className="signupPageBodyContainer">
                <form className="signupPageFormContainer">
                    <div className="signupFormHeader">
                        <div className="userImageIcon">
                            <label
                                title='Profile image'
                                htmlFor='imageFile'
                                style={style}
                            >
                                <input
                                    type="file"
                                    id='imageFile'
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={e => { uploadImage(e); }}
                                >
                                </input>
                            </label>
                        </div>
                    </div>
                    <div className="signupFormBody">
                        <div className="signupFormBody1">
                            <Input
                                Type='text'
                                id='nameInSignUp'
                                Label='Full Name'
                                PlaceHolder='Arthur Moreno'
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
                                            valid: 'valid'
                                        }
                                    }));
                                }}
                                Status={inputState.name.valid === 'valid'}
                            />
                            <Input
                                Label='Email'
                                name='email'
                                id='emailInSignUp'
                                Type='email'
                                PlaceHolder='example@gmail.com'
                                Required Radius={15}
                                Height={30}
                                Width={160}
                                onChange={(e) => {
                                    setInputState((oldState) => ({
                                        ...oldState,
                                        email: {
                                            value: e.target.value,
                                            valid: 'valid'
                                        }
                                    }));
                                }}
                                Status={inputState.email.valid === 'valid'}
                            />
                        </div>
                        <div className="signupFormBody2">
                            <PasswordAndConfirmation
                                inputState={inputState}
                                setInputState={setInputState}
                            />
                        </div>
                        <div className="signupFormCheckbox">
                            <h3
                                title={`${inputState.checked ? 'Uncheck the terms' : 'check the terms'}`}
                                onClick={(e) => {
                                    setInputState((oldState) => ({ ...oldState, checked: !inputState.checked }));
                                }}
                            >
                                <input
                                    id='checkboxInSignUp'
                                    type="checkbox"
                                    checked={inputState.checked}
                                />
                                I agree to all statements included in the&nbsp;
                                <Link title='terms of service' to={'/terms'}
                                    target="_blank"
                                    rel="noreferrer"
                                >terms of service
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div className="registerButtonWrapper">
                        <Button
                            Title='Register'
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
            </div >
        </div >
    );
};
export default Signup;