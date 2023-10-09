import { useNavigate } from "react-router-dom";

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

function Body() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <InputField label="이메일" />
      <InputField label="비밀번호" />

      <button
        onClick={() => navigate("/")}
        className="flex self-center items-center justify-center rounded-md py-1 w-[200px] bg-[#4C4C4C] text-white mt-10"
      >
        로그인
      </button>
    </div>
  );
}

function InputField({ label }: { label: string }) {
  return (
    <div className="flex">
      <div className="w-[80px]">{label}</div>
      <input className="border-2 border-[#d6d6d6]" />
    </div>
  );
}
