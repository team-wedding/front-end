
type InvitationTitleInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InvitationTitleInput = ({
  value,
  onChange,
}: InvitationTitleInputProps) => {
  return (
    <div className="flex justify-center m-5">
      <label htmlFor="title"></label>
      <input
        id="title"
        type="text"
        value={value}
        placeholder="제목을 입력해주세요"
        required
        onChange={onChange}
        className="px-2 py-2 text-xs text-center text-gray-600  bg-primary bg-opacity-10 rounded-2xl shadow-sm border-none placeholder-gray-400 placeholder-opacity-70 focus:outline-none focus-visible:ring-1 focus:ring-gray-300"
      ></input>
    </div>
  );
};

export default InvitationTitleInput;
