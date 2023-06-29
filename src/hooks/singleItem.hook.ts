import { useParams, useNavigate } from 'react-router-dom';
import { itemService } from '../services';
import { useContext } from 'react';
import { UserContext } from '../components/providers/user.provider';
import useNotification from './notification.hook';
import React from 'react';
const useSingleItem = () =>{
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const {user} = useContext(UserContext);
    const {setNotification} = useNotification();
    const getItem = async () =>{
        const item = await itemService.getItem(user?.token || '',id || '');
        if(typeof(item) === 'object'){
            console.log(item);
        }else{
            setNotification({message: item, status: 'error', autoClose: 2000});
            navigate('/');
        }
    }
    React.useMemo(()=>{
        getItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(id);

    return{
        id,
    }

}

export default useSingleItem;