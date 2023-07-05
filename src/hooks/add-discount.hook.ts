import React from "react";
import { useState } from "react"

export interface IInput{
    code: string,
    percentage: number,
    interval: number,
}

const useAddDiscount = () =>{
    const [input,setInput] = useState<IInput>({code: '', percentage: 0,interval: 0});
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const handleNumberInput = (value: string,inputName: string)=>{
        const num =parseInt(value)
        if(num >= 0){
            inputName === 'percentage'? 
            setInput((oldState) => ({...oldState,percentage: num})) 
            :
            setInput((oldState) => ({...oldState,interval: num})) 
        }
    }
    React.useMemo(()=>{
        if(input.code !== '' && input.interval !== 0 && input.percentage !==0){
            setDisableButton(false);
        }else
        setDisableButton(true);
    },[input])
    return{
        input,setInput,
        handleNumberInput,disableButton
    }
}


export default useAddDiscount