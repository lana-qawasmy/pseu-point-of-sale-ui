import { useEffect, useState } from 'react';

export interface INotification{
    message: string,
    status: 'info' | 'error' | 'warning' | 'success' |''
}


const useNotification = ()=>{
    const [notification, setNotification] = useState<INotification>({message: '', status: ''});
    useEffect(()=>{
        console.log('notification from hook: ', notification);
    }, [notification])
    return{
        setNotification: setNotification,
        notification: notification
    }
};

export default useNotification;