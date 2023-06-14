import { useContext, useState, useMemo  } from "react";
import { UserContext } from "../components/providers/user.provider";
import { CollectionNS } from "../types";
import { collectionServices } from "../services";
import useNotification from "./notification.hook";


const useCategoryBar = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryFields, setNewCategoryFields] = useState({ emoji: '', name: '' });
    const [categoryList, setCategoryList] = useState<[CollectionNS.ICollection]>([{addedBy: '',icon: '',name: '',_id: '',items: ['']}]);
    const [selectedCategory, setSelectedCategory] = useState<boolean[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const userContext = useContext(UserContext);
    const { setNotification } = useNotification();
    const handleNewCategory = () => {
        setShowAddForm(true);
    };

    const handleCancelCategory = () => {
        setShowAddForm(false);
        setNewCategoryFields({ name: '', emoji: '' });
        console.log("hello ", newCategoryFields)
    };
    const handleSubmitNewCategory = async () => {
        const newCategory: CollectionNS.ICollection = {
            addedBy: userContext.user?._id as string,
            icon: newCategoryFields.emoji,
            name: newCategoryFields.name,
        };
        setShowAddForm(false);
        const addedItemRespons = await collectionServices.addCollection(newCategory, userContext.user?.token as string);
        setNotification({ message: addedItemRespons.value, status: addedItemRespons.state ? 'success' : 'error', autoClose: 2000 });
    };
    useMemo (async () => {
    const newCategoryList = await collectionServices.getCollections(userContext.user?.token as string);
    if (!newCategoryList) {
            setNotification({ message: 'Could not fetch categories', status: 'error' });
            setSelectedCategory([false]);
        }else{
            setCategoryList(newCategoryList);
            let array: any =[];
            array = categoryList.map((item)=>{return(
                false
            )});
            array.push(false);
            setSelectedCategory([...array]);
            console.log('new array: ' ,selectedCategory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showAddForm])
    const handlSelectedCategory = (index: number, id: string) =>{
        let array = [];
        array = categoryList.map((item)=>{return(
            false
        )});
        array[index] = true;
        setSelectedCategory([...array]);
        // console.log('new array: ', array);
        setCategoryId(id);
    };
    return ({
        handleNewCategory: handleNewCategory,
        handleCancelCategory: handleCancelCategory,
        handleSubmitNewCategory: handleSubmitNewCategory,
        showAddForm: showAddForm,
        setShowAddForm: setShowAddForm,
        newCategoryFields: newCategoryFields,
        setNewCategoryFields: setNewCategoryFields,
        categoryList: categoryList,
        setSelectedCategory: setSelectedCategory,
        selectedCategory: selectedCategory,
        handlSelectedCategory: handlSelectedCategory,
        categoryId: categoryId
    });
}

export default useCategoryBar;