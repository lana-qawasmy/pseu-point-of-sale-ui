import './header.css';
import React from 'react';
import { UserContext } from '../../providers/user.provider';
import { useLocation } from 'react-router-dom';
import defaultIcon from '../../../assets/signupUserIcon-svg.svg';

const Header = () => {
    const userContext = React.useContext(UserContext);
    const location = useLocation();
    return (
        <>
            {
                location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/terms"
                    ?
                    <div className='header'>
                        <div className='userImage' style={{ backgroundImage: `url('${userContext.user?.image || defaultIcon}')` }} />
                        <span className='userName'>{userContext.user?.fullName}</span>
                    </div>
                    :
                    <></>
            }

        </>
    );
};

export default Header;