function NotFound({ content }: { content: string }) {
  return (
    <>
      <div
        className={`w-full h-full flex flex-col justify-center items-center`}
      >
        <img
          src={process.env.PUBLIC_URL + "/asset/img/notFound.png"}
          alt="not_found"
        />
        <div className="cursor-default">{content}</div>
      </div>
    </>
  );
}

export default NotFound;
