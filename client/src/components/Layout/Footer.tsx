import React from "react";

function Footer() {
  return (
    <div className="flex min-w-[672px] h-10 bg-rose-400 items-center text-white font-medium fixed bottom-0 border-t-2 border-black">
      <Item category="홈" />
      <Item category="단골가게" />
      <Item category="장바구니" />
      <Item category="알림" />
      <Item category="주문내역" />
    </div>
  );
}

export default Footer;

interface ItemProps {
  category: string;
}

function Item({ category }: ItemProps): JSX.Element {
  return (
    <div className="w-1/5 h-full flex flex-1 justify-center items-center">
      {category}
    </div>
  );
}
