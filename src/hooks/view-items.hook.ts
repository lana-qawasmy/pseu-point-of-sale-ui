import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { ItemNS } from '../types';
import { itemService, collectionServices } from '../services';
import useNotification from './notification.hook';

const useViewItems = () => {
    const [itemsTable, setItemsTable] = React.useState<ItemNS.Item[]>([]);
    const [select, setSelect] = React.useState<boolean[]>([]);
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();

    const handleDelete = async (userId: string, itemId: string) => {
        const deleteItem = await itemService.deleteItem(userId, itemId, user.user?.token as string);
        if (deleteItem)
            getItems();
    };
    const handleChangeSelect = async (index: number, categoryId: string) => {
        let newSelect = [...select];
        newSelect[index] = !newSelect[index];
        setSelect(newSelect);
        let selectedIds = [...itemsTable];
        let filteredIds = selectedIds.filter((item, index) => newSelect[index] === true && item !== undefined).map((item) => item._id);
        console.log('selected ids: ', filteredIds);
        console.log('collection id: ', categoryId);
        if (categoryId !== '') {
            const x = await collectionServices.updateCollection(user.user?.token as string, categoryId, filteredIds);
            if (x) {
                console.log('item updated!!');
                console.log('here is X: ', x)
            }
        }
    };

    const getItems = React.useCallback(async () => {
        let items = await itemService.getItems(user.user?._id as string, user.user?.token as string);
        if (items) {
            setItemsTable(items);
            setSelect(itemsTable.map(() => false));
        }
        else {
            setNotification({ message: 'Error fetching the items', status: 'error' });
        }
        // eslint-disable-next-line
    }, []);

    React.useMemo(async () => {
        await getItems();
    }, [getItems]);
    const handleChangeCategory = (selectedCategoryItems: [string]) =>{
        let array = itemsTable;
        //continue 
    }
    return {
        itemsTable,
        select,
        handleChangeSelect,
        handleDelete,
        handleChangeCategory
    };
};

export default useViewItems;