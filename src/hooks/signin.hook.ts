import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useContext, useState } from "react";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";

const useSignin = () => {
   const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [validLogin, setValidLogin] = useState<boolean>(true);
  const {setNotification} = useNotification();
 
 
  const handleValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    
    try {
      const user = await login(email, password);
      if (user) {
            if (userContext.setUser) {
                userContext.setUser(user);
            }
    
        
        setValidLogin(true);
        setNotification({message:`Welcome ${user[0].fullName}`, status: 'info'});
        navigate("/", { replace: true });
        return true;
      } else if(user == null) {
          setNotification({message: "server time out", status: 'error'});
          return false;
        } else{
          setValidLogin(false);
          return false;
      }
    } catch (error) {
        console.error(error);
        setNotification({message: "server time out", status: 'error'});
    }
  };

  return {
    validLogin,
    handleValidation,
  };
};
export default useSignin;
