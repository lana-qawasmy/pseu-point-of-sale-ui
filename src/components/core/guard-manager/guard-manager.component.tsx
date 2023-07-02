import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/user.provider';

interface IProps {
    children: React.ReactNode;
    role: string[],
}

const RoleGuard = (props: IProps) => {
    const user = React.useContext(UserContext);
    const navigate = useNavigate();
    React.useEffect(()=>{
        const match = props.role.includes(user.user?.role as string);
        if (!match) navigate('/', { replace: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.user])
    
    
    return (
        <div>
            {props.children}
        </div>

    );
};

export default RoleGuard;