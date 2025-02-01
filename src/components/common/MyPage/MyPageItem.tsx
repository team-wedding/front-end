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
      className="h-24 flex flex-row border border-black rounded-md px-2 py-2 cursor-pointer"
      onClick={() => navigate(href)}>
      <div className="flex items-center justify-center"><img className="mx-2 w-12 h-12" src={icon} alt="icon" /></div>
      <div className="flex flex-col gap-2 mx-1 items-start justify-center">
        <div className="text-base font-medium">{title}</div>
        <div className="text-sm">{detail}</div>
      </div>
    </div>
  );
}
