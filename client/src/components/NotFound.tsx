function NotFound({ content }: { content: string }) {
  return (
    <>
      <div
        className={`w-full h-full flex flex-col justify-center items-center`}
      >
        <img
          className="w-2/3"
          src={process.env.PUBLIC_URL + "/asset/img/notFound.png"}
          alt="not_found"
        />
        <div className="cursor-default font-semibold">{content}</div>
      </div>
    </>
  );
}

export default NotFound;
