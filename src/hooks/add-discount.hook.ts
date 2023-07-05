import React from "react";
import { useState } from "react"
import { DiscountNS } from "../types";
import { discountService } from "../services";
import { useContext } from "react";
import { UserContext } from "../components/providers/user.provider";
import useNotification from "./notification.hook";
export interface IInput{
    code: string,
    percentage: number,
    interval: number,
}

const useAddDiscount = () =>{
    const {user} = useContext(UserContext);
    const {setNotification} = useNotification();
    const [input,setInput] = useState<DiscountNS.Discount>({code: '', value: 0,daysInterval: 0});
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const handleNumberInput = (value: string,inputName: string)=>{
        const num =parseInt(value)
        if(num >= 0){
            inputName === 'percentage'? 
            setInput((oldState) => ({...oldState,value: num})) 
            :
            setInput((oldState) => ({...oldState,daysInterval: num})) 
        }
    }
    React.useMemo(()=>{
        if(input.code !== '' && input.daysInterval !== 0 && input.value !==0){
            setDisableButton(false);
        }else
        setDisableButton(true);
    },[input]);

   const  handlSave = async() =>{
    if(input.code !== '' && input.daysInterval !== 0 && input.value !==0){
        try {
            const response = await discountService.addDiscount(input,user?.token || '');
            if(response.success === true){
                setNotification({message: response.message, status: 'success', autoClose: 2000});
            }else{
                setNotification({message: response.message, status: 'error', autoClose: 2000});
            }
            emptyInputs();
        } catch (error) {
            console.error(error);
            setNotification({message: 'Server response timeout', status: 'error', autoClose: 2000});
        }
    }
   }
   const emptyInputs = () =>{
    setInput({value: 0,code: '',daysInterval: 0});
   }
    return{
        input,setInput,
        handleNumberInput,disableButton,
        handlSave,emptyInputs
    }
}


export default useAddDiscount