import { Link } from "react-router-dom";
import Formlogin from "../Fragments/FormLogin";
import Authlayout from "../Layouts/AuthLayout";

const LoginPage = () => {
    return (
        <Authlayout title="Login" type="login" navType="auth" userPhoto={false}>
            <Formlogin></Formlogin>
        </Authlayout>
    );
}

export default LoginPage