import React, { useEffect, useState } from "react";
import { UserContext } from "../components/providers/user.provider";
import { CollectionNS, ItemNS } from "../types";
import useNotification from "./notification.hook";
import { useBarcode, useParam } from ".";
import { collectionServices, itemService } from "../services";
import { useNavigate } from "react-router-dom";

interface IState {
    items: ItemNS.Item[];
    collections: CollectionNS.ICollection[];
    loading: {
        itemsLoading: boolean;
        collectionsLoading: boolean;
    };
}

const usePOSView = () => {
    const user = React.useContext(UserContext);
    const [selectedCollection, setSelectedCollection] = React.useState<CollectionNS.ICollection | null>(null);
    const navigate = useNavigate();
    const [state, setState] = React.useState<IState>({
        items: [],
        collections: [],
        loading: {
            collectionsLoading: false,
            itemsLoading: false
        },
    });

    const [selectedItems, setSelectedItems] = React.useState<
        { item: ItemNS.Item; number: number }[]
    >([]);
    const [price, setPrice] = useState<number>(0);
    const barcode = useBarcode();
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
                collectionsLoading: true
            }
        }));
    };
    const stopLoadingItemsAndCollections = (items: ItemNS.Item[], collections: CollectionNS.ICollection[]) => {
        setState((oldState) => ({
            ...oldState,
            items: items,
            collections: collections,
            loading: {
                itemsLoading: false,
                collectionsLoading: false
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
    }

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
            let collections = await collectionServices.getCollections(user.user?.token as string);
            stopLoadingItemsAndCollections(items, collections);
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line
    }, [useParams.params, selectedCollection]);


    const handleSelectedItems = (item: ItemNS.Item) => {
        if (!(selectedItems.length > 0)) {
            setSelectedItems([{ item: item, number: 1 }]);
        } else {
            let tempArray = [...selectedItems];
            const isThere = tempArray.findIndex((tempItem) => tempItem.item === item);
            if (isThere === -1) {
                setSelectedItems([...tempArray, { item: item, number: 1 }]);
            } else {
                tempArray[isThere] = {
                    item: item,
                    number: tempArray[isThere].number + 1,
                };
                setSelectedItems([...tempArray]);
            }
        }
    };

    useEffect(() => {
        let newPrice = 0;
        for (let i = 0; i < selectedItems.length; i++) {
            newPrice +=
                selectedItems[i].number *
                (selectedItems[i].item.priceHistory[0].price as number);
            setPrice(newPrice);
        }
        if (selectedItems.length === 0) {
            setPrice(0);
        }
    }, [selectedItems]);

    useEffect(() => {
        let newArray = state.items;
        const item = newArray.filter((item) => { return item.barcode === barcode.result });
        if (item.length === 1) {
            handleSelectedItems(item[0]);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barcode.result])



    return {
        selectedCollection,
        itemsLoading: state.loading.itemsLoading,
        collectionsLoading: state.loading.collectionsLoading,
        itemsTable: state.items,
        collectionsList: state.collections,
        selectedItems,
        price,
        useParams,
        navigate,
        handleSelectedCollection,
        handleSearch,
        handleSelectedItems,
        setSelectedItems,
    };
};

export default usePOSView;