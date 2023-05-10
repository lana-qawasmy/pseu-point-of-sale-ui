import './signin.css'
import mainPic from '../../assets/main-page pic.svg'
import logo from '../../assets/partial-logo.png'
import Input from '../../components/core/input/input.component';
import PasswordInput from '../../components/core/password-input/password-input.component';
import Button from '../../components/core/button/button.component';
import { Link } from 'react-router-dom';
import { useSignin } from '../../hooks';

const Signin = () => {
    const signin = useSignin();
    return (
        <div className='signin'>
            <div className='signinWrapper'>
                <img src={logo} alt="" />
                <form className='signinForm' onSubmit={signin.handleValidation}>
                    <Input Height={40} Width={360} Radius={15} PlaceHolder='Email' name='email' />
                    <PasswordInput height={40} Width={360} Radius={15} Placeholder='Password' name='password' />
                    {!signin.validLogin && <span>Email or password is incorrect , please try again.</span>}
                    <Button
                        HtmlType='submit'
                        FontWeight={'inherit'}
                        FontSize='16'
                        Ratio='100/10'
                        Width='380'
                        Radius='20'
                    >
                        Login
                    </Button>
                </form>
                <p>
                    Don't have an account? 
                    <Link to={'/signup'}>Signup</Link>
                </p>
            </div>
            <img src={mainPic} alt="main pic" className='mainPic' />

        </div>
    );
};
export default Signin;