import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiCamera } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAPI } from "../axios";
import Layout from "../components/Layout/Layout";
import OwnerFooter from "../components/Layout/OwnerFooter";
import { styles } from "../utils/style";

function RegisterItem() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || !Cookies.get("Authorization")) {
      if (
        window.confirm("로그인이 필요한 페이지입니다. 로그인 하시겠습니까?")
      ) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);
  const [item, setItem] = useState({
    name: "",
    content: "",
    prevPrice: 0,
    price: 0,
    count: 0,
    startTime: 0,
    endTime: 0,
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: any) => {
    setItem((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("content", item.content);
    formData.append("prevPrice", String(item.prevPrice));
    formData.append("price", String(item.price));
    formData.append("count", String(item.count));
    formData.append("startTime", String(item.startTime));
    formData.append("endTime", String(item.endTime));
    if (item.image) {
      formData.append("image", item.image);
    }
    try {
      await postAPI("/items", formData);
      toast.success("핫딜 상품 등록 완료!");
      navigate(-1);
    } catch (error) {
      toast.error("핫딜 상품 등록에 실패하였습니다.");
      console.error("핫딜상품 등록에 실패하였습니다.", error);
    }
  };

  return (
    <>
      <Layout>
        <Header />
        <Body
          item={item}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
        />
        <div
          className={`min-w-[336px] w-[336px] fixed bottom-[52px] h-12 flex justify-center items-center`}
        >
          <button
            onClick={handleSubmit}
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

interface BodyProps {
  item: {
    name: string;
    content: string;
    prevPrice: number;
    price: number;
    count: number;
    startTime: number;
    endTime: number;
    image: File | null;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Body({ item, handleInputChange, handleFileUpload }: BodyProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const updatedHandleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e);

    if (e.target.files && e.target.files[0]) {
      setPreviewURL(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div
      className={`overflow-auto flex flex-col items-center gap-4 ${styles.headerMargin} mb-[80px]`}
    >
      <label className="flex flex-col justify-center items-center my-6 border-2 border-[#d6d6d6] w-[120px] h-[120px] rounded-md cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={updatedHandleFileUpload}
        />
        {previewURL ? (
          <img
            src={previewURL}
            alt="Preview"
            className="w-full h-full rounded-md"
          />
        ) : (
          <>
            <BiCamera size={56} />
            <div>사진 0 / 1</div>
          </>
        )}
      </label>
      <InputField
        label="메뉴 이름"
        placeholder="메뉴 이름을 입력해주세요"
        name="name"
        value={item.name}
        onChange={handleInputChange}
      />
      <InputField
        label="메뉴 설명"
        placeholder="메뉴 설명을 입력해주세요"
        name="content"
        value={item.content}
        onChange={handleInputChange}
      />
      <InputField
        label="기존 가격"
        placeholder="기존 가격을 입력해주세요"
        name="prevPrice"
        value={String(item.prevPrice)}
        onChange={handleInputChange}
      />
      <InputField
        label="할인 가격"
        placeholder="할인 가격을 입력해주세요"
        name="price"
        value={String(item.price)}
        onChange={handleInputChange}
      />
      <InputField
        label="할인 수량"
        placeholder="할인 수량을 입력해주세요"
        name="count"
        value={String(item.count)}
        onChange={handleInputChange}
      />
      <InputField
        label="할인 시작 시간"
        placeholder="시작 시간을 입력해주세요"
        name="startTime"
        value={String(item.startTime)}
        onChange={handleInputChange}
      />
      <InputField
        label="할인 마감 시간"
        placeholder="마감 시간을 입력해주세요"
        name="endTime"
        value={String(item.endTime)}
        onChange={handleInputChange}
      />
    </div>
  );
}

function InputField({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex px-6">
      <div className="w-[100px] flex items-center ">{label}</div>
      <input
        name={name}
        className="border-[#d6d6d6] px-2 border-2 py-1 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
