import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { itemService, collectionServices } from '../services';
import useNotification from './notification.hook';
import { useParam } from '.';
import { ItemsContext } from '../components/providers/items.provider';

const useViewItems = () => {
    const itemsTable = React.useContext(ItemsContext)
    const [select, setSelect] = React.useState<boolean[]>([]);
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();
    const useParams = useParam();

    const handleDelete = async (userId: string, itemId: string) => {
        try {
            const deleteItem = await itemService.deleteItem(userId, itemId, user.user?.token as string);
            if (deleteItem)
                getItems();
        } catch (error) {
            console.error(error);
        }
    };
    const handleChangeSelect = async (index: number, categoryId: string) => {
        let newSelect = [...select];
        newSelect[index] = !newSelect[index];
        setSelect(newSelect);
        let selectedIds = itemsTable.items ? [...itemsTable.items] : []
        let filteredIds = selectedIds.filter((item, index) => newSelect[index] === true && item !== undefined).map((item) => item._id);
        if (categoryId !== '') {
            await collectionServices.updateCollection(user.user?.token as string, categoryId, filteredIds);
        }
    };

    const getItems = React.useCallback(async () => {
        try {
            let items = await itemService.getItems(user.user?.token as string, useParams.params.get('searchTerms') || '');
            if (items && itemsTable.setItems && itemsTable.items) {
                itemsTable.setItems(items);
                setSelect(itemsTable.items.map(() => false));
            }
            else {
                setNotification({ message: 'Error fetching the items', status: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line
    }, [useParams.params]);

    const handleChangeCategory = (selectedCategoryItems: [string]) => {
        let array: boolean[] = [];
        array.length = itemsTable.items?.length || 0;
        array.fill(false, 0, itemsTable.items?.length || 0);
        array = array.map((item, index) => {
            return selectedCategoryItems.includes(itemsTable.items ? itemsTable.items[index]._id || '' : '') || false;
        });
        setSelect([...array]);
    };
    React.useMemo(async () => {
        await getItems();
    }, [getItems]);
    return {
        itemsTable: itemsTable.items || [],
        select,
        handleChangeSelect,
        handleDelete,
        handleChangeCategory
    };
};

export default useViewItems;