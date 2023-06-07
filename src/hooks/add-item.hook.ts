import { useContext, useState } from "react";
import logo from "../assets/imageIcon.svg";
import { itemService } from "../services";
import { ItemNS } from "../types";
import { UserContext } from '../components/providers/user.provider';
interface imageState {
    state: boolean;
    value: string;
}

const useAddItem = () => {
    const [imageIcon, setImageIcon] = useState<imageState>({ state: false, value: logo });
    const user = useContext(UserContext);

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

        const base64: unknown = await convertBase64(file);
        base64 !== logo &&
            setUploadStatus({
                backgroundColor: "#2c64c6",
                color: "white",
            });
        if (typeof base64 == "string") {
            setImageIcon({ state: true, value: base64 });
        }
        else {
            alert('Invalid image icon');
        }
    };
    interface ItemInputElement extends HTMLInputElement {
        price: HTMLInputElement;
        itemName: HTMLInputElement;
        image: HTMLInputElement;
        barcode: HTMLInputElement;
        description: HTMLInputElement;
    };
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as ItemInputElement;
        const price = parseFloat(target.price.value);
        if (!imageIcon.state) {
            alert('The image icon is required');
            return;
        }
        const newItem: ItemNS.Item = {
            name: target.itemName.value,
            price: price,
            description: target.description.value,
            image: imageIcon.value,
            barcode: target.barcode.value,
            addedBy: user.user?._id || "unknown",
            priceHistory: [{ date: new Date(), price: price }],
        };
        const item = await itemService.addItem(newItem);
        if (item) {
            alert(item.message);
        }
        else {
            alert('Internal sever error');
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
