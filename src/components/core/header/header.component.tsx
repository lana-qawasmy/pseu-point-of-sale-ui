import './header.css';
import React from 'react';
import { UserContext } from '../../providers/user.provider';
import { useLocation } from 'react-router-dom';
import { defaultUserImage } from '../../../assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const userContext = React.useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    let match = true;
    match &&= location.pathname !== "/signin";
    match &&= location.pathname !== "/signup";
    match &&= location.pathname !== "/terms";
    return (
        <>
            {
                match ?
                    <div className='header'>
                        < div
                            className='userImage'
                            style={{ backgroundImage: `url('${userContext.user?.image || defaultUserImage}')` }}
                            onClick={() => navigate('/profile')}
                        />
                        < span className='userName' onClick={() => navigate('/profile')} >
                            {userContext.user?.fullName}
                        </span >
                    </div > : null
            }
        </>
    );


};

export default Header;