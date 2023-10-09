import { useNavigate } from "react-router-dom";
import { BsHouseHeart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";

function Footer() {
  const navigator = useNavigate();
  return (
    <div className="flex min-w-[336px] w-[336px] bg-white h-12 items-center text-black font-medium fixed bottom-0 border-t-2 border-black">
      <div
        onClick={() => navigator("/")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        <BsHouseHeart size={28} />
      </div>
      <div
        onClick={() => navigator("/favorite")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        <GoHeart size={28} />
      </div>
      <div
        onClick={() => navigator("/basket")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        <HiOutlineShoppingCart size={28} />
      </div>
      <div
        onClick={() => navigator("/notification")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        <BiBell size={28} />
      </div>
      <div
        onClick={() => navigator("/history")}
        className="cursor-pointer w-1/5 h-full flex flex-1 justify-center items-center"
      >
        <IoDocumentTextOutline size={28} />
      </div>
    </div>
  );
}

export default Footer;
