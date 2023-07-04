import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { CollectionNS, ItemNS } from '../types';
import { itemService, collectionServices } from '../services';
import useNotification from './notification.hook';
import { useParam } from '.';
import { ItemsContext } from '../components/providers/items.provider';

interface itemWithSelect {
    item: ItemNS.Item;
    selected: boolean;
}

interface IState {
    items: itemWithSelect[];
    collections: CollectionNS.ICollection[];
    loading: {
        itemsLoading: boolean;
        collectionsLoading: boolean;
    };
}

const useViewItems = () => {
    const user = React.useContext(UserContext);
    const itemContext = React.useContext(ItemsContext);
    const initialItems: itemWithSelect[] = itemContext.items?.map(item => {
        const newItems: itemWithSelect = { item: item, selected: false };
        return newItems || [];
    }) || [];
    const [state, setState] = React.useState<IState>({
        items: initialItems, collections: [], loading: { collectionsLoading: true, itemsLoading: true }
    });
    const [selectedCollection, setSelectedCollection] = React.useState<CollectionNS.ICollection | null>(null);

    const [showAddForm, setShowAddForm] = React.useState(false);
    const [newCollectionFields, setNewCollectionFields] = React.useState({ emoji: "", name: "" });

    const { setNotification } = useNotification();
    const useParams = useParam();
    React.useEffect(() => {
        if (itemContext.items) {
            setState((oldState) => ({
                ...oldState,
                items: getTableWithState(itemContext.items || [])
            }));
        }
        // eslint-disable-next-line 
    }, [itemContext.items]);

    const loadingItems = () => {
        setState((oldState) => ({
            ...oldState,
            loading: {
                ...oldState.loading,
                itemsLoading: true,
            }
        }));
    };
    const loadingItemsAndCollections = () => {
        setState((oldState) => ({
            ...oldState,
            loading: {
                itemsLoading: true,
                collectionsLoading: true
            }
        }));
    };

    const getTableWithState = (items: ItemNS.Item[]) => {
        let newItemTable: itemWithSelect[] = [];
        items.forEach((item: ItemNS.Item) => {
            let isSelected = selectedCollection?.items?.includes(item._id as string) || false;
            newItemTable.push({ item: item, selected: isSelected });
        });
        return newItemTable;
    };

    const handleInputValidation = (value: string) => {
        const regexPattern = /^[\u{1F000}-\u{1FFFF}]$/u;
        const isMatch = regexPattern.test(value);

        const inputElement = document.getElementById("emojiInput");
        inputElement?.addEventListener("keydown", (event) => {
            if (event.key === "Backspace") {
                event.preventDefault();
                setNewCollectionFields({ name: newCollectionFields.name, emoji: "" });
            }
        });
        isMatch && setNewCollectionFields({ name: newCollectionFields.name, emoji: value });
    };

    const handleSubmitNewCollection = async () => {
        const newCollection: CollectionNS.ICollection = {
            addedBy: user.user?._id as string,
            icon: newCollectionFields.emoji,
            name: newCollectionFields.name,
        };
        setShowAddForm(false);
        const addedItemResponse = await collectionServices.addCollection(
            newCollection,
            user.user?.token as string
        );
        setNotification({
            message: addedItemResponse.value,
            status: addedItemResponse.state ? "success" : "error",
            autoClose: 2000,
        });
        setNewCollectionFields({ name: '', emoji: '' });

        loadingItemsAndCollections();
        const newState = await getItemsAndCollections();
        if (newState) {
            setState((oldState) => ({
                ...oldState,
                collections: newState?.collections,
                items: newState.newItemTable,
                loading: {
                    collectionsLoading: false,
                    itemsLoading: false
                }
            }));
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useParams.setParams("searchTerms", e.target.value);
    };

    const handleDelete = async (userId: string, itemId: string) => {
        loadingItems();
        try {
            const deleteItem = await itemService.deleteItem(userId, itemId, user.user?.token as string);
            if (deleteItem) {
                const newItems = await getItems();
                if (newItems) {
                    setState((oldState) => ({
                        ...oldState,
                        items: newItems,
                        loading: {
                            itemsLoading: false,
                            collectionsLoading: false
                        }
                    }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeSelectItem = async (itemId: string | undefined, collectionId: string) => {
        loadingItemsAndCollections();
        if (selectedCollection !== null) {
            const message = await collectionServices.updateCollection(user.user?.token as string, collectionId, itemId);
            if (message) {
                setNotification({ message: message });
                const newCollection = await getCollection(collectionId);
                setSelectedCollection((oldState) => newCollection);
                const newCollectionList = state.collections.map((cat) => {
                    if (cat._id === newCollection._id)
                        return newCollection;
                    else
                        return cat;
                });
                setState((oldState) => ({
                    ...oldState,
                    items: getTableWithState(oldState.items.map(item => item.item)),
                    collections: newCollectionList,
                    loading: {
                        itemsLoading: false,
                        collectionsLoading: false,
                    }
                }));
            }
            else {
                setNotification({ message: 'Failed to update collection', status: 'error' });
            }
        }
    };

    const getCollection = async (collectionId: string) => {
        try {
            const newCollection = await collectionServices.getCollection(user.user?.token as string, collectionId) || [];
            const newCollectionList = state.collections.map((collection) => {
                if (collection._id === collectionId)
                    return newCollection;
                else
                    return collection;
            });
            setState((oldState) => ({
                ...oldState,
                collections: newCollectionList
            }));
            return newCollection;
        } catch (error) {
            setNotification({ message: 'Something went wrong please Refresh the page', status: 'warning' });
        }
    };

    const handleSelectedCollection = async (collection: CollectionNS.ICollection | null) => {
        setSelectedCollection(collection);

        const newItemTable = getTableWithState(state.items.map(item => item.item)) || [];

        setState((oldState) => ({
            ...oldState,
            items: newItemTable,
            loading: {
                itemsLoading: false,
                collectionsLoading: false
            },
        }));
    };


    const getItemsAndCollections = async () => {
        try {
            const collections: CollectionNS.ICollection[] = await collectionServices.getCollections(user.user?.token as string) || [];
            const selectedCat = collections.find(cat => cat._id === selectedCollection?._id);
            const items: ItemNS.Item[] = await itemService.getItems(user.user?.token as string, useParams.params.get('searchTerms') || '') || [];
            let newItemTable: itemWithSelect[] = [];
            if (items) {
                items.forEach((item: ItemNS.Item) => {
                    let isSelected = selectedCat?.items?.includes(item._id as string);
                    newItemTable.push({ item: item, selected: isSelected as boolean });
                });
            }
            else {
                setNotification({ message: 'Error fetching the items', status: 'error' });
            }
            return {
                newItemTable,
                collections
            };
        } catch (error) {
            console.error(error);
        }
    };

    const getItems = async () => {
        try {
            let items = await itemService.getItems(user.user?.token as string, useParams.params.get('searchTerms') || '');
            if (items) {
                const newItemTable = getTableWithState(items);
                return newItemTable;
            }
            else {
                setNotification({ message: 'Error fetching the items', status: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    React.useMemo(async () => {
        loadingItemsAndCollections();
        const newState = await getItemsAndCollections();
        if (newState) {
            setState((oldState) => ({
                ...oldState,
                collections: newState.collections,
                items: newState.newItemTable,
                loading: {
                    itemsLoading: false,
                    collectionsLoading: false
                }
            }));
        }
        // eslint-disable-next-line
    }, [showAddForm, useParams.params, selectedCollection]);

    return {
        itemsTable: state.items,
        collectionList: state.collections,
        itemsLoading: state.loading.itemsLoading,
        collectionsLoading: state.loading.collectionsLoading,

        useParams,
        selectedCollection,

        showAddForm,
        newCollectionFields,

        setShowAddForm,
        setNewCollectionFields,

        handleInputValidation,
        handleSubmitNewCollection,
        handleChangeSelectItem,
        handleDelete,
        handleSearch,
        handleSelectedCollection,
    };
};

export default useViewItems;
