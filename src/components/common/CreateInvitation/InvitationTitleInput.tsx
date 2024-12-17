import React from 'react';

type InvitationTitleInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InvitationTitleInput: React.FC<InvitationTitleInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex justify-center m-4">
      <label htmlFor="title"></label>
      <input
        id="title"
        type="text"
        value={value}
        placeholder="제목을 입력해주세요"
        required
        onChange={onChange}
        className="px-4 py-2 text-xs text-center text-slate-500  bg-sky-200 bg-opacity-30 rounded-xl shadow-sm border-none placeholder-slate-500 placeholder-opacity-60 focus:outline-none focus-visible:ring-1 focus:ring-slate-400"
      ></input>
    </div>
  );
};

export default InvitationTitleInput;
