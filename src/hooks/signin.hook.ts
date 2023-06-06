import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useContext, useState } from "react";
import { UserContext } from "../components/providers/user.provider";

const useSignin = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [validLogin, setValidLogin] = useState<boolean>(true);
    const handleValidation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const user = await login(email, password);


        if (user?.length) {
            if (userContext.setUser) {
                userContext.setUser(user);
            }
            setValidLogin(true);
            navigate('/', { replace: true });
            return true;
        } else {
            setValidLogin(false);
            return false;
        }
    };

    return {
        validLogin,
        handleValidation
    };

};
export default useSignin;