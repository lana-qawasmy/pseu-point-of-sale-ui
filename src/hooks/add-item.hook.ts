import { useContext, useState } from "react";

import { defaultItemImage } from "../assets";
import { ItemNS } from "../types";
import { itemService } from "../services";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";
import { ItemsContext } from "../components/providers/items.provider";
interface imageState {
    state: boolean;
    value: string;
}

const useAddItem = (item: ItemNS.Item | undefined) => {
    const initialItem = item || undefined
    const [imageIcon, setImageIcon] = useState<imageState>({
        state: initialItem?.image ? true : false,
        value: initialItem?.image || defaultItemImage,
    });
    const user = useContext(UserContext);
    const itemsContext = useContext(ItemsContext)
    const { setNotification } = useNotification();
    const [uploadStatus, setUploadStatus] = useState({
        backgroundColor: "#adadaf",
        color: "black",
    });
    const [hideImagePopup, setHideImagePopup] = useState(true);
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let file;
        event.target.files ? (file = event.target.files[0]) : (file = "");
        try {
            const base64 = await convertBase64(file);
            base64 !== defaultItemImage &&
                setUploadStatus({
                    backgroundColor: "#2c64c6",
                    color: "white",
                });
            if (typeof base64 == "string") {
                setImageIcon({ state: true, value: base64 });
            } else {
                setNotification({ message: "Invalid image icon", status: "error" });
            }
        } catch (error) {
            setNotification({
                message: "image is invalid, try again",
                status: "error",
            });
            console.error(error);
        }
    };
    interface ItemInputElement extends HTMLInputElement {
        price: HTMLInputElement;
        itemName: HTMLInputElement;
        image: HTMLInputElement;
        barcode: HTMLInputElement;
        description: HTMLInputElement;
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as ItemInputElement;
        const price: Number = parseFloat(target.price.value);
        if (!imageIcon.state) {
            setNotification({
                message: "The image icon is required",
                status: "warning",
            });
            return;
        }
        const date = new Date()
        initialItem &&
            initialItem.priceHistory[initialItem.priceHistory.length - 1].price !== price &&
            initialItem.priceHistory.push({ date, price: price })
        const priceHistory =
            initialItem
                ? initialItem.priceHistory
                : [{ date, price: price }]
        try {
            let response;
            if (initialItem) {
                const newItem: ItemNS.Item = {
                    _id: initialItem._id,
                    name: target.itemName.value,
                    description: target.description.value,
                    image: imageIcon.value,
                    barcode: target.barcode.value,
                    addedBy: user.user?._id || "unknown",
                    priceHistory: priceHistory,
                };
                response = await itemService.updateItem(newItem, user.user?.token || '');
            }
            else {
                const newItem: ItemNS.Item = {
                    name: target.itemName.value,
                    description: target.description.value,
                    image: imageIcon.value,
                    barcode: target.barcode.value,
                    addedBy: user.user?._id || "unknown",
                    priceHistory: priceHistory,
                };
                response = await itemService.addItem(newItem, user.user?.token || '');
            }
            if (typeof response !== "boolean") {
                if (response.state) {
                    setNotification({
                        message: response.value.message,
                        status: "success",
                    });
                    target.itemName.value = "";
                    target.price.value = "";
                    target.description.value = "";
                    try {
                        let items = await itemService.getItems(user.user?.token as string, '');
                        if (items && itemsContext.setItems) {
                            itemsContext.setItems(items);
                        }
                        else {
                            setNotification({ message: 'Error fetching the items', status: 'error' });
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    setImageIcon(() => ({ state: false, value: defaultItemImage }));
                    target.barcode.value = "";
                    setUploadStatus({
                        backgroundColor: "#adadaf",
                        color: "black",
                    });
                } else {
                    setNotification({ message: response.value.message, status: "error" });
                }
            } else {
                setNotification({ message: "Internal server error", status: "error" });
            }
        } catch (error) {
            console.error(error);
            setNotification({ message: "server did not responded", status: "error" });
        }
    };

    return {
        imageIcon,
        uploadStatus,
        hideImagePopup,
        setImageIcon,
        setUploadStatus,
        setHideImagePopup,
        uploadImage,
        submitHandler,
    };
};

export default useAddItem;
