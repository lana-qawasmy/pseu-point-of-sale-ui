import { useContext, useState } from "react";
import logo from "../pages/add-item/imageIcon.svg";
import { addItem } from "../services/item.service";
import { ItemNS } from "../types";
import { UserContext } from '../components/providers/user.provider';

const useAddItem = () => {
    const [imageIcon, setImageIcon] = useState(logo);
    const [uploadStatus, setUploadStatus] = useState({
        backgroundColor: "#adadaf",
        color: "black",
    });
    const usercontext = useContext(UserContext);
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

        const base64: unknown = await convertBase64(file);
        base64 !== logo &&
            setUploadStatus({
                backgroundColor: "#2c64c6",
                color: "white",
            });
        setImageIcon(
            typeof base64 == "string" ? base64 : "../../../public/imageIcon.svg"
        );
    };
    interface ItemInputElement extends HTMLInputElement {
        price: HTMLInputElement;
        itemName: HTMLInputElement;
        image: HTMLInputElement;
        barcode: HTMLInputElement;
        description: HTMLInputElement;
    };
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as ItemInputElement;
        const price = parseFloat(target.price.value);
        const newItem: ItemNS.Item = {
            name: target.itemName.value,
            price: price,
            description: target.description.value,
            image: target.image.value,
            barcode: target.barcode.value,
            addedBy: sessionStorage.getItem("user") || "unknown",
            priceHistory: [{ date: new Date(), price: price }],
        };
        addItem(newItem , usercontext.user?.token || '');
    };
    return {
        imageIcon,
        setImageIcon,
        uploadStatus,
        setUploadStatus,
        hideImagePopup,
        setHideImagePopup,
        uploadImage,
        submitHandler,
    };
};

export default useAddItem;
