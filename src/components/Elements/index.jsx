import { forwardRef, useEffect, useState } from "react";
import Label from "../Elements/label";
import { Input } from "./input";

const InputForm = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const {name,type,placeholder,label, onChange} = props
    const [typeValue,setTypeValue] = useState(type);
    useEffect(() => {
        if (name == "password") {
            if(showPassword){
                setTypeValue("text")
            }
            else{
                setTypeValue("password")
            }   
        }
    },[showPassword])
    return (
        <div className="mb-6 relative">
        <Label>{label}</Label>
        <Input name={name} type={typeValue} placeholder={placeholder} ref={ref} onChange={onChange}></Input>
        {type == "password" && <span className="absolute right-3 top-9 cursor-pointer text-gray-500" 
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? 
                <img
                    alt="Your Company"
                    src='../assets/hide.png'
                    className="h-5 w-auto"
                /> : 
                <img
                    alt="Your Company"
                    src='assets/show.png'
                    className="h-5 w-auto"
                />}
            </span>}
        </div>
    )   
});

export default InputForm