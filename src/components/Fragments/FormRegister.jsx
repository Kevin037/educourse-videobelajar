import { ButtonPrimarySubmit, ButtonSecondary, ButtonSpan } from "../Elements/button";
import InputForm from "../Elements";
import PhoneInputForm from "../Elements/phone_input";
import { Card } from "../Elements/card";
import { HeadAuth } from "./Content";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

const FormRegister = () => {
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [no_hp, setNoHp] = useState('');
    
    const { currentUser, loading, error, register } = useUser();
  
    const handleSubmit = (e) => {
        let process = true;
        if (name === '' || email === '' || password === '' || confirmPassword === '' || no_hp === '') {
            alert('Semua field harus diisi');
            process = false;
        }
        if(password !== confirmPassword) {
            alert('Password dan konfirmasi password harus sama');
            process = false;
        }
      e.preventDefault();
      if (process) {
        register({ name, email, password, no_hp });
      }
    };

    useEffect(() => {
        if (currentUser) {
            window.location.href = "/login";   
        }
    },[currentUser])
    return (
    <div className="space p-10 overflow-sm-hidden">
            <Card varian={`max-w-xl mx-auto sm:px-6 lg:px-8`}>
            <HeadAuth 
                title="Pendaftaran Akun" 
                desc="Yuk, daftarkan akunmu sekarang juga!"
            />
            <form onSubmit={handleSubmit}>
                <InputForm label="Nama Lengkap *" type="text" placeholder="name" name="name" onChange={e => setName(e.target.value)} />
                <InputForm label="Email" type="text" placeholder="email@gmail.com" name="email" onChange={e => setEmail(e.target.value)} />
                <PhoneInputForm label="No. Hp *" type="number" name="phone" onChange={e => setNoHp(e.target.value)} />
                <InputForm label="Kata Sandi *" type="password" placeholder="***" name="password" onChange={e => setPassword(e.target.value)} />
                <InputForm label="Konfirmasi Kata Sandi *" type="password" placeholder="***" name="password" onChange={e => setConfirmPassword(e.target.value)} />
                <div className="mb-4 text-right">
                    <a className="text-sm">Lupa Password ?</a>
                </div>
                <ButtonPrimarySubmit type="submit">{loading ? "Mengirim..." : "Daftar"}</ButtonPrimarySubmit>
                <ButtonSecondary url="/login" varian="mt-2">Masuk</ButtonSecondary>
                <div className="separator mt-4 mb-4">atau</div>
                <ButtonSpan url="/"className="hover:bg-gray-50">
                    <img src="../assets/logos_google.svg" className="w-5 h-5" alt="Google" />
                    Daftar dengan Google
                </ButtonSpan>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </Card>
    </div>
    )
}

export default FormRegister