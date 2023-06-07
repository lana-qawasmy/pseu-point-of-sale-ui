import { useContext, useEffect } from 'react';
import { UserContext } from '../../components/providers/user.provider';
import { useNavigate } from 'react-router-dom';

const ViewExistedItems = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.user) {
            navigate('/signup', { replace: true });
        }
    });
    return (
        <div>ViewExistedItems</div>
    );
};
export default ViewExistedItems;