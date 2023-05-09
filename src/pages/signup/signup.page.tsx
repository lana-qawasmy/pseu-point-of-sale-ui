import './signup.css';
import { Link } from "react-router-dom";
import Input from '../../components/core/input/input.component';
import Button from '../../components/core/button/button.component';

const Signup = () => {

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let file 
        event.target.files? file = event.target.files[0] : file = '';

        const base64 = await convertBase64(file);
        console.log(base64);
    };
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
                                    accept="image/png, image/gif, image/jpeg" onChange={e=>{uploadImage(e)}}/>
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
                                Width={160} />
                            <Input
                                Type='email'
                                PlaceHolder='Email'
                                Required Radius={15}
                                Height={30}
                                Width={160} />
                        </div>
                        <div className="signupFormBody2">
                            <Input
                                Type='text'
                                PlaceHolder='Password'
                                Required Radius={15}
                                Height={30}
                                Width={360} />
                            <Input
                                Type='text'
                                PlaceHolder='Confirm password'
                                Required Radius={15}
                                Height={30}
                                Width={360} />
                        </div>
                        <div className="signupFormCheckbox">
                            <h3>
                                <input type="checkbox" />
                                I agree to all statements included in the &nbsp;
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