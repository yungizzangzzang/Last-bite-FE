import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";
import { BiCamera } from "react-icons/bi";

function RegisterItem() {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Header />
        <Body />
        <div
          className={`min-w-[336px] w-[336px] fixed bottom-12 h-12 flex justify-center items-center`}
        >
          <button
            onClick={() => navigate(-1)}
            className="w-full h-10 text-white bg-[#FF385C]"
          >
            핫딜 등록하기
          </button>
        </div>
        <OwnerFooter />
      </Layout>
    </>
  );
}

export default RegisterItem;

function Header() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className={styles.header}>
      <AiOutlineArrowLeft />
      핫딜 등록
    </div>
  );
}

function Body() {
  const handleFileUpload = (e: any) => {
    console.log(e.target.files[0]);
  };

  return (
    <div
      className={`overflow-auto flex flex-col items-center gap-4 ${styles.headerMargin} mb-[80px]`}
    >
      <label className="flex flex-col justify-center items-center my-6 border-2 border-[#d6d6d6] w-[120px] h-[120px] cursor-pointer">
        <input type="file" className="hidden" onChange={handleFileUpload} />
        <BiCamera size={56} />
        <div>사진 0 / 1</div>
      </label>
      <InputField label="메뉴이름" placeholder="메뉴 이름을 입력해주세요" />
      <InputField label="메뉴 설명" placeholder="메뉴 설명을 입력해주세요" />
      <InputField label="기존 가격" placeholder="기존 가격을 입력해주세요" />
      <InputField label="할인 가격" placeholder="할인 가격을 입력해주세요" />
      <InputField label="할인 수량" placeholder="할인 수량을 입력해주세요" />
      <InputField
        label="할인 시작 시간"
        placeholder="시작 시간을 입력해주세요"
      />
      <InputField
        label="할인 마감 시간"
        placeholder="마감 시간을 입력해주세요"
      />
    </div>
  );
}

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex px-6">
      <div className="w-[100px]">{label}</div>
      <input
        className="border-[#d6d6d6] px-2 border-2"
        placeholder={placeholder}
      />
    </div>
  );
}
