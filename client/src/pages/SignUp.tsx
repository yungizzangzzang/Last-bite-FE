import React, { useState } from "react";

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

function Body() {
  const [isClient, setIsClient] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <InputField label="이메일" />
      <InputField label="비밀번호" />
      <InputField label="이름" />
      <InputField label="닉네임" />

      <div className="flex items-center gap-4">
        <div className="w-[100px]">고객 유형</div>
        <button
          className={isClient ? "bg-[#4C4C4C] text-white px-2 rounded-md" : ""}
          onClick={() => setIsClient(true)}
        >
          고객
        </button>
        <button
          className={!isClient ? "bg-[#4C4C4C] text-white px-2 rounded-md" : ""}
          onClick={() => setIsClient(false)}
        >
          사장
        </button>
      </div>

      {!isClient && <InputField label="관리번호" />}

      <button className="flex self-center items-center justify-center rounded-md py-1 w-[200px] bg-[#4C4C4C] text-white mt-10">
        회원가입
      </button>
    </div>
  );
}

function InputField({ label }: { label: string }) {
  return (
    <div className="flex">
      <div className="w-[100px]">{label}</div>
      <input className="border-2 border-[#d6d6d6]" />
    </div>
  );
}
