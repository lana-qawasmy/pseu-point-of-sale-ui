import { useState } from "react";
import useNotification from "./notification.hook";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import image from "../assets/profile-Icon.jpg";
export interface IEditUserState {
    name: string;
    email: string
    password: { value: string; valid: 'valid' | 'invalid' | 'none'; };
    passwordConfirmation: { value: string; valid: 'valid' | 'invalid' | 'none'; };
    image?: string;
}


const useEditUser = () =>{
    const [showImageButtons, setShowImageButtons] = useState<boolean>(false);
    // const user = useContext(UserContext);
    const {user, setUser} = useContext(UserContext);
    const {setNotification} = useNotification();
    const initialState: IEditUserState = {
        email: user?.email || '',
        name: user?.fullName || '',
        password: { value: '', valid: 'valid' },
        passwordConfirmation: { value: '', valid: 'valid' },
        image: user?.image === ""?
        image
        :
        user?.image,
    };
    const [inputState, setInputState] = useState<IEditUserState>(initialState);
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                return resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                return reject(error);
            };
        });
    };

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let file;
        file = event.target.files ? event.target.files[0] : '';
        try {
            const base64 = await convertBase64(file) as string;
            setInputState((oldState) => ({ ...oldState, image: base64 }));
        } catch (error) {
            console.error(error);
            setNotification({
                message: "image is invalid, try again",
                status: "error",
            });
        }
    };

    const deleteImage = () =>{
        setInputState((oldState) => ({ ...oldState, image: image }));
    }

    return {
        uploadImage,
        inputState, setInputState,
        deleteImage,
        showImageButtons, setShowImageButtons
    }
};

export default useEditUser;