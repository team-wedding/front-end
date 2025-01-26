interface Props {
  icon: string;
  title: string;
  detail: string;
}

export default function MyPageItem({ icon, title, detail }: Props) {
  return (
    <div className="flex flex-row border  border-black rounded-md px-2 py-4 items-center justify-around">
      <img src={icon} alt="icon" />
      <div className="flex flex-col">
        <div>{title}</div>
        <div>{detail}</div>
      </div>
    </div>
  );
}
