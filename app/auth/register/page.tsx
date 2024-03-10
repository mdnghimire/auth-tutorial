import { LoginButton } from "@/components/auth/login-button";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <LoginButton asChild mode="modal">
      <RegisterForm />
    </LoginButton>
  );
};

export default RegisterPage;
