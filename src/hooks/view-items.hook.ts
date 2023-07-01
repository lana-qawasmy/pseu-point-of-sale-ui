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
    categories: CollectionNS.ICollection[];
    loading: {
        itemsLoading: boolean;
        categoriesLoading: boolean;
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
        items: initialItems, categories: [], loading: { categoriesLoading: false, itemsLoading: false }
    });
    const [selectedCategory, setSelectedCategory] = React.useState<CollectionNS.ICollection | null>(null);

    const [showAddForm, setShowAddForm] = React.useState(false);
    const [newCategoryFields, setNewCategoryFields] = React.useState({ emoji: "", name: "" });

    React.useEffect(() => {
        if (itemContext.items){
            setState((oldState) => ({
                ...oldState,
                items : getTableWithState(itemContext.items || [])
            }));
        }
        // eslint-disable-next-line 
    }, [itemContext.items]);

    const { setNotification } = useNotification();
    const useParams = useParam();

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
                categoriesLoading: true
            }
        }));
    };
    const stopLoadingItemsAndCollections = () => {
        setState((oldState) => ({
            ...oldState,
            loading: {
                itemsLoading: false,
                categoriesLoading: false
            }
        }));
    };

    const getTableWithState = (items: ItemNS.Item[]) => {
        let newItemTable: itemWithSelect[] = [];
        items.forEach((item: ItemNS.Item) => {
            let isSelected = selectedCategory?.items?.includes(item._id as string) || false;
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
                setNewCategoryFields({ name: newCategoryFields.name, emoji: "" });
            }
        });
        isMatch && setNewCategoryFields({ name: newCategoryFields.name, emoji: value });
    };

    const handleSubmitNewCategory = async () => {
        const newCategory: CollectionNS.ICollection = {
            addedBy: user.user?._id as string,
            icon: newCategoryFields.emoji,
            name: newCategoryFields.name,
        };
        setShowAddForm(false);
        const addedItemResponse = await collectionServices.addCollection(
            newCategory,
            user.user?.token as string
        );
        setNotification({
            message: addedItemResponse.value,
            status: addedItemResponse.state ? "success" : "error",
            autoClose: 2000,
        });
        setNewCategoryFields({ name: '', emoji: '' });

        loadingItemsAndCollections();
        const newState = await getItemsAndCollections();
        if (newState) {
            setState((oldState) => ({
                ...oldState,
                categories: newState?.categories,
                items: newState.newItemTable
            }));
        }
        stopLoadingItemsAndCollections();
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
                            categoriesLoading: false
                        }
                    }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeSelectItem = async (itemId: string | undefined, categoryId: string) => {
        loadingItemsAndCollections();
        if (selectedCategory !== null) {
            const message = await collectionServices.updateCollection(user.user?.token as string, categoryId, itemId);
            if (message) {
                setNotification({ message: message });
                const newCategory = await getCollection(categoryId);
                setSelectedCategory((oldState) => newCategory);
                const newCategoryList = state.categories.map((cat) => {
                    if (cat._id === newCategory._id)
                        return newCategory;
                    else
                        return cat;
                });
                setState((oldState) => ({
                    ...oldState,
                    items: getTableWithState(oldState.items.map(item => item.item)),
                    categories: newCategoryList,
                    loading: {
                        itemsLoading: false,
                        categoriesLoading: false,
                    }
                }));
            }
            else {
                setNotification({ message: 'Failed to update category', status: 'error' });
            }
        }
    };

    const getCollection = async (categoryId: string) => {
        try {
            const newCategory = await collectionServices.getCollection(user.user?.token as string, categoryId) || [];
            const newCategoryList = state.categories.map((category) => {
                if (category._id === categoryId)
                    return newCategory;
                else
                    return category;
            });
            setState((oldState) => ({
                ...oldState,
                categories: newCategoryList
            }));
            return newCategory;
        } catch (error) {
            setNotification({ message: 'Something went wrong please Refresh the page', status: 'warning' });
        }
    };

    const handleSelectedCategory = async (category: CollectionNS.ICollection | null) => {
        setSelectedCategory(category);

        const newItemTable = getTableWithState(state.items.map(item => item.item)) || [];

        setState((oldState) => ({
            ...oldState,
            items: newItemTable,
            loading: {
                itemsLoading: false,
                categoriesLoading: false
            },
        }));
    };


    const getItemsAndCollections = async () => {
        try {
            const categories: CollectionNS.ICollection[] = await collectionServices.getCollections(user.user?.token as string) || [];
            const selectedCat = categories.find(cat => cat._id === selectedCategory?._id);
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
                categories
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
                categories: newState.categories,
                items: newState.newItemTable,
                loading: {
                    itemsLoading: false,
                    categoriesLoading: false
                }
            }));
        }
        // eslint-disable-next-line
    }, [showAddForm]);

    React.useMemo(async () => {
        loadingItems();
        const newItems = await getItems();
        if (newItems) {
            setState((oldState) => ({
                ...oldState,
                items: newItems,
                loading: {
                    ...oldState.loading,
                    itemsLoading: false
                }
            }));
        }
        // eslint-disable-next-line
    }, [useParams.params]);

    React.useMemo(() => {
        setState((oldState) => ({
            ...oldState,
            items: getTableWithState(state.items.map(item => item.item)),
            loading: {
                categoriesLoading: false,
                itemsLoading: false,
            }
        }));
        // eslint-disable-next-line
    }, [selectedCategory]);

    return {
        itemsTable: state.items,
        categoryList: state.categories,
        itemsLoading: state.loading.itemsLoading,
        categoriesLoading: state.loading.categoriesLoading,

        useParams,
        selectedCategory,

        showAddForm,
        newCategoryFields,

        setShowAddForm,
        setNewCategoryFields,

        handleInputValidation,
        handleSubmitNewCategory,
        handleChangeSelectItem,
        handleDelete,
        handleSearch,
        handleSelectedCategory,
    };
};

export default useViewItems;
