import { useContext, useEffect } from 'react';
import { UserContext } from '../../components/providers/user.provider';
import { useNavigate } from 'react-router-dom';

const OrdersHistory = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.user) {
            navigate('/signup', { replace: true });
        }
    });

    return (
        <div>OrdersHistory</div>
    );
};
export default OrdersHistory;