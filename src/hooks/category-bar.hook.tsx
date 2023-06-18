import { useContext, useState, useMemo } from "react";
import { UserContext } from "../components/providers/user.provider";
import { CollectionNS } from "../types";
import { collectionServices } from "../services";
import useNotification from "./notification.hook";

const useCategoryBar = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryFields, setNewCategoryFields] = useState({
        emoji: "",
        name: "",
    });
    const [categoryList, setCategoryList] = useState<[CollectionNS.ICollection]>([
        { addedBy: "", icon: "", name: "", _id: "", items: [""] },
    ]);
    const [selectedCategory, setSelectedCategory] = useState<boolean[]>([]);
    const [categoryId, setCategoryId] = useState<string>("");
    const userContext = useContext(UserContext);
    const { setNotification } = useNotification();
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

        isMatch &&
            setNewCategoryFields({ name: newCategoryFields.name, emoji: value });
    };

    const getCollections = async () => {
        try {
            const newCategoryList = await collectionServices.getCollections(
                userContext.user?.token as string
            );
            if (!newCategoryList) {
                setSelectedCategory([false]);
            } else {
                setCategoryList(newCategoryList);
                let array: any = [];
                array = categoryList.map((item) => {
                    return false;
                });
                array.push(false);
                setSelectedCategory([...array]);
            }
        } catch (error) {
            setNotification({ message: 'Something went wrong please Refresh the page', status: 'warning' });
        }
    };

    const handleSubmitNewCategory = async () => {
        const newCategory: CollectionNS.ICollection = {
            addedBy: userContext.user?._id as string,
            icon: newCategoryFields.emoji,
            name: newCategoryFields.name,
        };
        setShowAddForm(false);
        const addedItemResponse = await collectionServices.addCollection(
            newCategory,
            userContext.user?.token as string
        );
        setNotification({
            message: addedItemResponse.value,
            status: addedItemResponse.state ? "success" : "error",
            autoClose: 2000,
        });
        setNewCategoryFields({ name: '', emoji: '' });
        await getCollections();
    };
    useMemo(async () => {
        await getCollections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAddForm]);



    const handleSelectedCategory = async (index: number, id: string) => {
        let array = [];
        array = categoryList.map((item) => {
            return false;
        });
        array[index] = true;
        setSelectedCategory([...array]);
        setCategoryId(id);
        const newCategoryList = await collectionServices.getCollections(
            userContext.user?.token as string
        );
        setCategoryList(newCategoryList);
    };
    return {
        handleInputValidation: handleInputValidation,
        handleSubmitNewCategory: handleSubmitNewCategory,
        showAddForm: showAddForm,
        setShowAddForm: setShowAddForm,
        newCategoryFields: newCategoryFields,
        setNewCategoryFields: setNewCategoryFields,
        categoryList: categoryList,
        setSelectedCategory: setSelectedCategory,
        selectedCategory: selectedCategory,
        handleSelectedCategory: handleSelectedCategory,
        categoryId: categoryId,
    };
};

export default useCategoryBar;
