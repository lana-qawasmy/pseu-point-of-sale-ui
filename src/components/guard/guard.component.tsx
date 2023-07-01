import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/user.provider';

interface IProps {
    children: React.ReactNode;
}

const Guard = (props: IProps) => {
    const user = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user.user) {
            navigate('/signin', { replace: true });
        }
    });

    return (
        <div>
            {user.user && props.children}
        </div>
    );
};

export default Guard;