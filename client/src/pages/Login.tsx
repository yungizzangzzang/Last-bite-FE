import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../axios";

function Login() {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="min-w-[336px] max-w-[336px] bg-[#F7F9FA] flex flex-col overflow-auto shadow-2xl py-28">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
}

export default Login;

function Header() {
  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold mb-16">
        Login
      </div>
    </>
  );
}
interface FormData {
  email: string;
  password: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Body() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      await postAPI("/auth/login", formData);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <InputField
        label="이메일"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <InputField
        label="비밀번호"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />

      <button
        onClick={handleLogin}
        className="flex self-center items-center justify-center rounded-md py-1 w-[200px] bg-[#4C4C4C] text-white mt-10"
      >
        로그인
      </button>
    </div>
  );
}

function InputField({ label, name, value, onChange }: InputFieldProps) {
  return (
    <div className="flex">
      <div className="w-[80px]">{label}</div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-[#d6d6d6]"
      />
    </div>
  );
}