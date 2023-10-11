import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../api/authAPI";

function SignUp() {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="min-w-[336px] max-w-[336px] bg-[#F7F9FA] flex flex-col overflow-auto shadow-2xl py-16">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
}

export default SignUp;

function Header() {
  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold mb-16">
        Sign Up
      </div>
    </>
  );
}

interface FormData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  managementNumber: string;
  isClient: boolean;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Body() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    managementNumber: "",
    isClient: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const requestBody = {
        ...formData,
        managementNumber: formData.isClient
          ? undefined
          : formData.managementNumber,
      };

      await signUpAPI(requestBody);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
      <InputField
        label="이름"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <InputField
        label="닉네임"
        name="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
      />

      <div className="flex items-center gap-4">
        <div className="w-[80px]">고객 유형</div>
        <button
          className={
            formData.isClient ? "bg-[#4C4C4C] text-white px-2 rounded-md" : ""
          }
          onClick={() => setFormData((prev) => ({ ...prev, isClient: true }))}
        >
          고객
        </button>
        <button
          className={
            !formData.isClient ? "bg-[#4C4C4C] text-white px-2 rounded-md" : ""
          }
          onClick={() => setFormData((prev) => ({ ...prev, isClient: false }))}
        >
          사장
        </button>
      </div>

      {!formData.isClient && (
        <InputField
          label="관리번호"
          name="managementNumber"
          value={formData.managementNumber}
          onChange={handleInputChange}
        />
      )}

      <button
        onClick={handleSignUp}
        className="flex self-center items-center justify-center rounded-md py-1 w-[200px] bg-[#4C4C4C] text-white mt-10"
      >
        회원가입
      </button>
    </div>
  );
}

function InputField({ label, name, value, onChange }: InputFieldProps) {
  return (
    <div className="flex">
      <div className="w-[80px] flex items-center">{label}</div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-[#d6d6d6] px-2 py-1 rounded-md"
      />
    </div>
  );
}
