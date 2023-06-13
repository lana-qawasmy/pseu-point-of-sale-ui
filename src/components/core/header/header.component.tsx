import './header.css';
import React from 'react';
import { UserContext } from '../../providers/user.provider';
import { useLocation } from 'react-router-dom';
import { defaultUserImage } from '../../../assets';

const Header = () => {
    const userContext = React.useContext(UserContext);
    const location = useLocation();
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
                        />
                        < span className='userName' > {userContext.user?.fullName}</span >
                    </div > : null
            }
        </>
    );


};

export default Header;