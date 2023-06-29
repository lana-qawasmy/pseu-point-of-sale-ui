import React from 'react';
import { UserContext } from '../components/providers/user.provider';
import { CollectionNS, ItemNS } from '../types';
import useNotification from './notification.hook';
import { useParam } from '.';
import { collectionServices, itemService } from '../services';
import { useNavigate } from 'react-router-dom';


interface IState {
    items: ItemNS.Item[];
    categories: CollectionNS.ICollection[];
    loading: {
        itemsLoading: boolean;
        categoriesLoading: boolean;
    };
}

const usePOSView = () => {
    const user = React.useContext(UserContext);
    const [selectedCollection, setSelectedCollection] = React.useState<CollectionNS.ICollection | null>(null);
    const navigate = useNavigate();
    const [state, setState] = React.useState<IState>({
        items: [],
        categories: [],
        loading: {
            categoriesLoading: false,
            itemsLoading: false
        },
    });

    const { setNotification } = useNotification();
    const useParams = useParam();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useParams.setParams("searchTerms", e.target.value);
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
    const stopLoadingItemsAndCollections = (items: ItemNS.Item[], collections: CollectionNS.ICollection[]) => {
        setState((oldState) => ({
            ...oldState,
            items: items,
            categories: collections,
            loading: {
                itemsLoading: false,
                categoriesLoading: false
            }
        }));
    };



    const handleSelectedCollection = async (collection: CollectionNS.ICollection | null) => {
        setSelectedCollection(collection);
    };


    const getItems = async () => {
        try {
            let items = await itemService.getItems(user.user?.token as string, useParams.params.get('searchTerms') || '');
            if (items) {
                return items;
            }
            else {
                setNotification({ message: 'Error fetching the items', status: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getItemsForACollection = async () => {
        try {
            const items = await collectionServices.getCollectionItems(
                user.user?.token as string,
                (selectedCollection && selectedCollection._id as string) || '',
                useParams.params.get('searchTerms') || '');
            return items;
        } catch (error) {
            console.error(error);
        }
    };

    React.useMemo(async () => {
        loadingItemsAndCollections();
        let items: ItemNS.Item[];
        try {
            if (selectedCollection !== null) {
                items = await getItemsForACollection() || [];
            }
            else {
                items = await getItems();
            }
            let categories = await collectionServices.getCollections(user.user?.token as string);
            stopLoadingItemsAndCollections(items, categories);
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line
    }, [useParams.params, selectedCollection]);

    return {
        selectedCollection,
        itemsLoading: state.loading.itemsLoading,
        categoriesLoading: state.loading.categoriesLoading,
        itemsTable: state.items,
        categoriesList: state.categories,
        useParams,
        navigate,
        handleSelectedCollection,
        handleSearch,
    };
};

export default usePOSView;