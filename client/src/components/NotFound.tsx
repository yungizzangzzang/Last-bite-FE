function NotFound() {
  return (
    <>
      <div
        className={`w-full h-full flex flex-col justify-center items-center`}
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/notFound.png"}
          alt="not_found"
        />
        <div className="cursor-default">장바구니에 담긴 상품이 없어요!</div>
      </div>
    </>
  );
}

export default NotFound;
