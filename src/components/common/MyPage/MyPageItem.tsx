import { useNavigate } from "react-router";

interface Props {
  icon: string;
  title: string;
  detail: string;
  href: string;
}

export default function MyPageItem({ icon, title, detail, href }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row border border-black rounded-md px-2 py-4 items-center justify-around cursor-pointer"
      onClick={() => navigate(href)}>
      <img src={icon} alt="icon" />
      <div className="flex flex-col gap-2">
        <div className="text-base">{title}</div>
        <div className="text-xs">{detail}</div>
      </div>
    </div>
  );
}
