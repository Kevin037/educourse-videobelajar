import InputForm from "../Elements";
import { ButtonPrimarySubmit, ButtonSecondary, ButtonSpan } from "../Elements/button";
import { Card } from "../Elements/card";
import { HeadAuth } from "./Content";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const Formlogin = () => {
    const token = localStorage.getItem("token");
        const [email, setEmail]     = useState('');
        const [password, setPassword] = useState('');
        
        const { user, loading, login } = useAuth();
      
        const HandleLogin = (e) => {
          e.preventDefault();
          login({ email, password });
        };
    
        useEffect(() => {
            if (user) {
                window.location.href = "/login";   
            }
        },[user])

    useEffect(() => {
        if(token !== null) {
            window.location.href = "/";
        }
    },[token])

    return (
        <div className="space p-10 overflow-sm-hidden">
            <Card varian={`max-w-sm mx-auto sm:px-6 lg:px-8`}>
                <HeadAuth 
                    title="Masuk ke Akun" 
                    desc="Yuk, lanjutin belajarmu di videobelajar."
                />
                <form onSubmit={HandleLogin}>
                    <InputForm label="Email" type="text" placeholder="email@gmail.com" name="email" onChange={e => setEmail(e.target.value)} />
                    <InputForm label="Password" type="password" placeholder="***" name="password" onChange={e => setPassword(e.target.value)} />
                    <div className="mb-4 text-right">
                        <a className="text-sm">Lupa Password ?</a>
                    </div>
                    <ButtonPrimarySubmit type="submit">{loading ? "Memuat..." : "Masuk"}</ButtonPrimarySubmit>
                    <ButtonSecondary url="/register" varian="mt-2">Daftar</ButtonSecondary>
                    <div className="separator mt-4 mb-4">atau</div>
                    <ButtonSpan type="submit" varian="hover:bg-gray-50">
                        <img src="../assets/logos_google.svg" className="w-5 h-5" alt="Google" />
                        Daftar dengan Google
                    </ButtonSpan>
                </form>
            </Card>
        </div>
    )
}

export default Formlogin