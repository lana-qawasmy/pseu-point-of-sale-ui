import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useState } from "react";

const useSignin = () => {
    const navigate = useNavigate();
    const [validLogin, setValidLogin] = useState<boolean>(true);
    const handleValidation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted')
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const user = await login(email, password);
        console.log(user);
        if (user?.length) {
            setValidLogin(true)
            navigate('/' , {replace : true})
            return true;
        } else {
            setValidLogin(false)
            return false;
        }
    }

    return {
        validLogin,
        handleValidation
    }

}
export default useSignin;