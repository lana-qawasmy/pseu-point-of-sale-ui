import { useContext, useState } from "react";
import { UserContext } from "../components/providers/user.provider";
import { CollectionNS } from "../types";
import { collectionServices } from "../services";
import useNotification from "./notification.hook";


const useCategoryBar = () =>{
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryFields, setNewCategoryFields] = useState({ emoji: '', name: '' });
    const userContext = useContext(UserContext);
    const {setNotification} = useNotification();
    const handleNewCategory = () => {
        setShowAddForm(true);
    };

    const handleCancelCategory =() => {
        setShowAddForm(false);
        setNewCategoryFields({ name: '', emoji: '' });
        console.log("hello ", newCategoryFields)
    };
    const handleSubmitNewCategory = async () => {
        const newCategory : CollectionNS.ICollection ={
            addedBy: userContext.user?._id as string,
            icon: newCategoryFields.emoji,
            name: newCategoryFields.name,
        };
        setShowAddForm(false);
        const addedItemRespons = await collectionServices.addCollection(newCategory, userContext.user?.token as string);
        setNotification({message: addedItemRespons.value, status: addedItemRespons.state? 'success' : 'error', autoClose: 2000});
    };
    return({
        handleNewCategory: handleNewCategory,
        handleCancelCategory: handleCancelCategory,
        handleSubmitNewCategory: handleSubmitNewCategory,
        showAddForm : showAddForm,
        setShowAddForm: setShowAddForm,
        newCategoryFields: newCategoryFields,
        setNewCategoryFields: setNewCategoryFields
    });
}

export default useCategoryBar;