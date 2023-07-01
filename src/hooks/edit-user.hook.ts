import { useState } from "react";
import useNotification from "./notification.hook";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import image from "../assets/profile-Icon.jpg";
import { updateUser, updatePassword } from "../services";
import { UserNS } from "../types";
export interface IEditUserState {
    name: string;
    email: string;
    password: { value: string; valid: "valid" | "invalid" | "none"; };
    passwordConfirmation: { value: string; valid: "valid" | "invalid" | "none"; };
    image?: string;
}
export interface IPasswords {
    old: string;
    new: string;
    confirmed: string;
}

const useEditUser = () => {
    const [showImageButtons, setShowImageButtons] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean[]>([
        false,
        false,
        false,
    ]);
    const [showPasswordContainer, setShowPasswordContainer] =
        useState<boolean>(false);
    const [passwords, setPasswords] = useState<IPasswords>({
        old: "",
        new: "",
        confirmed: "",
    });
    const [showPasswordAlert, setShowPasswordAlert] = useState<boolean[]>([
        false,
        false,
        false,
    ]);
    const { user, setUser } = useContext(UserContext);
    const { setNotification } = useNotification();
    const initialState: IEditUserState = {
        email: user?.email || "",
        name: user?.fullName || "",
        password: { value: "", valid: "valid" },
        passwordConfirmation: { value: "", valid: "valid" },
        image: user?.image === "" ? image : user?.image,
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
        file = event.target.files ? event.target.files[0] : "";
        try {
            const base64 = (await convertBase64(file)) as string;
            setInputState((oldState) => ({ ...oldState, image: base64 }));
        } catch (error) {
            console.error(error);
            setNotification({
                message: "image is invalid, try again",
                status: "error",
            });
        }
    };

    const deleteImage = () => {
        setInputState((oldState) => ({ ...oldState, image: image }));
    };
    const handlePassword = (value: string, index: 0 | 1 | 2) => {
        const strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        ); // eslint-disable-line
        const valid = strongRegex.test(value);
        if (passwords.new !== passwords.confirmed) {
            setShowPasswordAlert([showPasswordAlert[0], true, showPasswordAlert[2]]);
        } else {
            setShowPasswordAlert([showPasswordAlert[0], false, showPasswordAlert[2]]);
        }
        if (passwords.new === passwords.old && passwords.new !== "") {
            setShowPasswordAlert([showPasswordAlert[0], showPasswordAlert[1], true]);
        } else {
            setShowPasswordAlert([showPasswordAlert[0], showPasswordAlert[1], false]);
        }
        if (index === 1) {
            if (valid)
                setShowPasswordAlert([
                    false,
                    showPasswordAlert[1],
                    showPasswordAlert[2],
                ]);
            else
                setShowPasswordAlert([
                    true,
                    showPasswordAlert[1],
                    showPasswordAlert[2],
                ]);
            setPasswords((oldState) => ({ ...oldState, new: value }));
            if (passwords.old === value) {
                setShowPasswordAlert([showPasswordAlert[0], showPasswordAlert[1], true]);
            }
        }
        if (index === 2) {
            if (!strongRegex.test(passwords.new))
                setShowPasswordAlert([true, showPasswordAlert[1], showPasswordAlert[2]]);
            else
                setShowPasswordAlert([false, showPasswordAlert[1], showPasswordAlert[2]]);

            if (value !== passwords.new) {
                setShowPasswordAlert([showPasswordAlert[0], true, showPasswordAlert[2]]);
            } else {
                setPasswords((oldState) => ({ ...oldState, confirmed: value }));
                setShowPasswordAlert([showPasswordAlert[0], false, showPasswordAlert[2]]);;
            }
        }
        if (index === 0) {
            setPasswords((oldState) => ({ ...oldState, old: value }));
        }
    };
    const handleSaveInfo = async () => {
        const updatedUser: UserNS.User = {
            fullName: inputState.name,
            _id: user?._id || '',
            image: inputState.image,
            email: inputState.email,
            password: user?.password || '',
            role: user?.role
        };
        const resp = await updateUser(updatedUser);
        if (typeof (resp) === 'object') {
            setUser && setUser(resp);
            setNotification({ message: 'Information updated successfully', status: 'success', autoClose: 2000 });
        } else {
            setNotification({ message: resp, status: 'error', autoClose: 2000 });
        }
    };
    const handleSavePassword = async () => {
        const _id = user?._id || '';
        const newPassword = await updatePassword({ old: passwords.old, new: passwords.new, _id: _id });
        if (typeof (newPassword) === "object") {
            setNotification({ message: 'Password updated successfully', status: 'success', autoClose: 2000 });

        } if (typeof (newPassword) === "string") {
            setNotification({ message: newPassword, status: 'error', autoClose: 2000 });
        }
    };
    return {
        uploadImage,
        inputState,
        setInputState,
        deleteImage,
        showImageButtons,
        setShowImageButtons,
        showPasswordContainer,
        setShowPasswordContainer,
        showPassword,
        setShowPassword,
        handlePassword,
        showPasswordAlert,
        handleSaveInfo,
        handleSavePassword,
        passwords
    };
};

export default useEditUser;
