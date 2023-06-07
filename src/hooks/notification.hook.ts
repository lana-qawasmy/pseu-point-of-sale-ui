import { useState } from 'react';
import { toast } from 'react-toastify';
export interface INotification {
    message: string,
    status: 'info' | 'error' | 'warning' | 'success' | ''
}


const useNotification = () => {
    const [notification, setNotification] = useState<INotification>({ message: 'Welcome', status: '' });
    const showNotification = (notification: INotification) => {
        setNotification(notification);
        return new Promise(() => {
            notify(notification);
        })
    }
    const notify = (notification: INotification) => {

            switch (notification.status) {
                case 'info':
                    toast.info(notification.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'error':
                    toast.error(notification.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'warning':
                    toast.warn(notification.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'success':
                    toast.success(notification.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                default:
                    break;

            }
    };
    return {
        setNotification: showNotification,
        notification: notification
    }
};

export default useNotification;