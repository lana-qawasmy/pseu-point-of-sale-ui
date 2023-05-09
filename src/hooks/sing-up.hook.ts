import { useState } from 'react';
import { UserNS } from '../types';
import { userService } from '../services';
import { useNavigate } from 'react-router-dom';

interface IFormEvent {
    preventDefault(): void;
    target: {
        name: {
            value: string;
            validity: {
                valid: boolean;
            };
        },
        email: {
            value: string;
            validity: {
                valid: boolean;
            };
        },
        password: {
            value: string;
            validity: {
                valid: boolean;
            };
        },
        passwordConfirmation: {
            value: string;
            validity: {
                valid: boolean;
            };
        },
    };
}

interface ISignupState {
    name: { value: string; valid: boolean; };
    email: { value: string; valid: boolean; };
    password: { value: string; valid: boolean; };
    passwordConfirmation: { value: string; valid: boolean; };
    image?: string;
}

const initialState: ISignupState = {
    email: { value: '', valid: true },
    name: { value: '', valid: true },
    password: { value: '', valid: true },
    passwordConfirmation: { value: '', valid: true }
};

const useSignUp = () => {
    const [inputState, setInputState] = useState<ISignupState>(initialState);
    const navigate = useNavigate();

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
        const base64 = await convertBase64(file) as string;
        setInputState((oldState) => ({ ...oldState, image: base64 }));
    };

    const handleSubmitError = (event: IFormEvent) => {
        switch (event.target.name as any) {
            case 'name': {
                setInputState((oldState) => ({ ...oldState, name: { ...oldState.name, valid: false } }));
                break;
            }
            case 'email': {
                setInputState((oldState) => ({ ...oldState, email: { ...oldState.email, valid: false } }));
                break;
            }
            case 'password': {
                setInputState((oldState) => ({ ...oldState, password: { ...oldState.password, valid: false } }));
                break;
            }
            case 'passwordConfirmation': {
                setInputState((oldState) => ({ ...oldState, passwordConfirmation: { ...oldState.passwordConfirmation, valid: false } }));
                break;
            }
        }
    };


    const addUser = async (event: IFormEvent) => {
        event.preventDefault();
        setInputState((oldState) => (
            {
                ...oldState,
                name: { ...oldState.name, valid: event.target.name.validity.valid },
                email: { ...oldState.email, valid: event.target.email.validity.valid },
                password: { ...oldState.password, valid: event.target.password.validity.valid },
                passwordConfirmation: {
                    ...oldState.passwordConfirmation,
                    valid: event.target.passwordConfirmation.validity.valid && (oldState.password.value === oldState.passwordConfirmation.value)
                }
            }
        ));

        let match: boolean = true;
        match &&= (inputState.name.valid);
        match &&= (inputState.email.valid);
        match &&= (inputState.password.valid);
        match &&= (inputState.passwordConfirmation.valid);

        if (match) {
            const user: UserNS.User = {
                _id: '',
                fullName: inputState.name.value,
                email: inputState.email.value,
                password: inputState.password.value,
                image: inputState.image || '',
            };
            try {
                const addUser = await userService.createUser(user);
                if (addUser) {
                    navigate('/existedItems', { replace: true });
                }
                else {
                    alert('User is not created, please try again');
                }
            } catch (error) {
                console.error(error);
                alert('User is not created, please try again');
            }
        }
    };


    return {
        inputState,
        setInputState,
        handleSubmitError,
        uploadImage,
        addUser,
    };
};

export default useSignUp;