import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { ItemNS } from '../types';
import { itemService } from '../services';

const useViewItems = () => {
    const [itemsTable, setItemsTable] = React.useState<ItemNS.Item[]>([]);
    const user = React.useContext(UserContext);



    React.useEffect(() => {
        // const items = itemService.getItems(user.user?._id, user.user.token);
    });

    return {};
};

export default useViewItems;