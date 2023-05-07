import './signup.css';
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="signupPageContainer">
            <div className="signupPageTitleContainer">
                <h1>Create Your Account</h1>
                <h2>Already have an account? <Link to={'/signin'}>Login</Link></h2>
            </div>
            <div className="signupPageBodyContainer">
                <form className="signupPageFormContainer" onSubmit={() => console.log("submitted!")}>
                    <div className="signupFormHeader">
                        <div className="userImageIcon"><div></div></div>
                        <div className="uploadImageButton"></div>
                    </div>
                    <div className="signupFormBody">
                        <div className="signupFormBody1"></div>
                        <div className="signupFormBody2"></div>
                        <div className="signupFormCheckbox">
                            <h3> <input type="checkbox" /> I agree to all statments included in the <span>terms of service</span></h3>
                        </div>
                    </div>
                </form>
                <div className="signupPageImage"></div>
            </div>
        </div>
    );
};
export default Signup;