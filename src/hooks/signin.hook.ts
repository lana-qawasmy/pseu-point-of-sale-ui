import { login } from "../services/signin.service";

const useSignin = () => {

    const handleValidation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted')
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        return await login(email, password);
    }

    return {
        handleValidation
    }

}
export default useSignin;