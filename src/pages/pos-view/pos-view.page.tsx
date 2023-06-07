import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/providers/user.provider';

const PosView = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.user) {
            navigate('/signup', { replace: true });
        }
    });
    return (
        <div>PosView</div>
    );
};
export default PosView;