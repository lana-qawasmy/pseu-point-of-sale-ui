import React, { useEffect, useState } from "react";
import { UserContext } from "../components/providers/user.provider";
import { CollectionNS, ItemNS } from "../types";
import useNotification from "./notification.hook";
import { useBarcode, useParam } from ".";
import { collectionServices, itemService } from "../services";
import { useNavigate } from "react-router-dom";

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
  const [selectedCategory, setSelectedCategory] =
    React.useState<CollectionNS.ICollection | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<
    { item: ItemNS.Item; number: number }[]
  >([]);
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();
  const [state, setState] = React.useState<IState>({
    items: [],
    categories: [],
    loading: {
      categoriesLoading: false,
      itemsLoading: false,
    },
  });
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
        categoriesLoading: true,
      },
    }));
  };
  const stopLoadingItemsAndCollections = (
    items: ItemNS.Item[],
    collections: CollectionNS.ICollection[]
  ) => {
    setState((oldState) => ({
      ...oldState,
      items: items,
      categories: collections,
      loading: {
        itemsLoading: false,
        categoriesLoading: false,
      },
    }));
  };

  const handleSelectedCategory = async (
    category: CollectionNS.ICollection | null
  ) => {
    setSelectedCategory(category);
  };

  const getItems = async () => {
    if (user.user) {
      try {
        let items = await itemService.getItems(
          user.user?.token as string,
          useParams.params.get("searchTerms") || ""
        );
        if (items) {
          return items;
        } else {
          setNotification({
            message: "Error fetching the items",
            status: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getItemsForACollection = async () => {
    try {
      const items = await collectionServices.getCollectionItems(
        user.user?.token as string,
        (selectedCategory && (selectedCategory._id as string)) || "",
        useParams.params.get("searchTerms") || ""
      );
      return items;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedItems = (item: ItemNS.Item) => {
    console.log('in progress...')
    setState((oldState) => ({
      ...oldState,
      items: state.items.map(thisItem => (item.name !== thisItem.name ? thisItem : { ...thisItem, quantity: thisItem.quantity - 1 })),
    }));
    if (!(selectedItems.length > 0)) {
      setSelectedItems([{ item: item, number: 1 }]);
    } else {
      let tempArray = [...selectedItems];
      const isThere = tempArray.findIndex((tempItem) => tempItem.item.name === item.name);
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
  }, [selectedItems, state.items]);

  useEffect(() => {
    let newArray = state.items;
    const item = newArray.filter((item) => { return item.barcode === barcode.result });
    if (item.length === 1) {
      handleSelectedItems(item[0]);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcode.result])

  React.useMemo(async () => {
    loadingItemsAndCollections();
    let items: ItemNS.Item[];
    try {
      if (selectedCategory !== null) {
        items = (await getItemsForACollection()) || [];
      } else {
        items = await getItems();
      }
      let categories = await collectionServices.getCollections(
        user.user?.token as string
      );
      stopLoadingItemsAndCollections(items, categories);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line
  }, [useParams.params, selectedCategory]);

  return {
    selectedCategory,
    itemsLoading: state.loading.itemsLoading,
    categoriesLoading: state.loading.categoriesLoading,
    itemsTable: state.items,
    categoriesList: state.categories,
    useParams,
    navigate,
    handleSelectedCategory,
    handleSearch,
    handleSelectedItems,
    selectedItems,
    setSelectedItems,
    price,
  };
};

export default usePOSView;