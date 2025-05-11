import Authlayout from "../Layouts/AuthLayout";
import FormRegister from "../Fragments/FormRegister";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <Authlayout title="Register" type="register" navType="auth">
            <FormRegister></FormRegister>
        </Authlayout>
    );
}

export default RegisterPage