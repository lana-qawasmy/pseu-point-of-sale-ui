import './signup.css';
import { Link } from "react-router-dom";
import Input from '../../components/core/input/input.component';
import Button from '../../components/core/button/button.component';

const Signup = () => {
    return (
        <div className="signupPageContainer">
            <div className="signupPageTitleContainer">
                <h1>Create Your Account</h1>
                <h2>Already have an account? <Link to={'/signin'}>Login</Link></h2>
            </div>
            <div className="signupPageBodyContainer">
                <form className="signupPageFormContainer" onSubmit={(e) => {
                    e.preventDefault();
                    console.log("submitted!");
                }}>
                    <div className="signupFormHeader">
                        <div className="userImageIcon">
                            <label htmlFor='imageFile'>
                                <input
                                    type="file"
                                    id='imageFile'
                                    accept="image/png, image/gif, image/jpeg" />
                            </label >
                        </div>
                    </div>
                    <div className="signupFormBody">
                        <div className="signupFormBody1">
                            <Input
                                Type='text'
                                PlaceHolder='Full Name'
                                Required
                                Radius={15}
                                Height={30}
                                Width={190} />
                            <Input
                                Type='email'
                                PlaceHolder='Email'
                                Required Radius={15}
                                Height={30}
                                Width={190} />
                        </div>
                        <div className="signupFormBody2">
                            <Input
                                Type='text'
                                PlaceHolder='Password'
                                Required Radius={15}
                                Height={30}
                                Width={400} />
                            <Input
                                Type='text'
                                PlaceHolder='Confirm password'
                                Required Radius={15}
                                Height={30}
                                Width={400} />
                        </div>
                        <div className="signupFormCheckbox">
                            <h3>
                                <input type="checkbox" />
                                I agree to all statments included in the &nbsp;
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
                            Radius='20'>Register</Button>
                    </div>
                </form>
                <div className="signupPageImage"></div>
            </div>
        </div>
    );
};
export default Signup;