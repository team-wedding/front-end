const RsvpExample = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex flex-col items-center gap-5">
        <div className=" text-xs font-medium">
          아래의 예시처럼 참석 여부 팝업이 제공됩니다.
        </div>
        <img
          className="w-48 border-2 border-gray-400 rounded-lg"
          src="/src/assets/ModalExample1.png"
          alt=""
        />
        <img
          className="w-48 border-2 border-gray-400 rounded-lg"
          src="/src/assets/ModalExample2.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default RsvpExample;
