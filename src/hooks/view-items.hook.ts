import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { ItemNS } from '../types';
import { itemService } from '../services';
import useNotification from './notification.hook';

const useViewItems = () => {
    const [itemsTable, setItemsTable] = React.useState<ItemNS.Item[]>([]);
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();

    const getItems = React.useCallback(async () => {
        let items = await itemService.getItems(user.user?._id as string, user.user?.token as string);
        if (items) {
            setItemsTable(items);
        }
        else {
            setNotification({ message: 'Error fetching the items', status: 'error' });
        }
        // eslint-disable-next-line
    }, []);

    React.useMemo(async () => {
        await getItems();
    }, [getItems]);

    return {
        itemsTable,
    };
};

export default useViewItems;