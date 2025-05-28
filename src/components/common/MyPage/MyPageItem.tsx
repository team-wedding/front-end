import { useNavigate } from 'react-router';

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
      className="h-24 flex flex-row border border-black rounded-md px-2 cursor-pointer hover:shadow-lg shadow-md"
      onClick={() => navigate(href)}
    >
      <div className="flex items-center justify-center">
        <img className="mx-3 w-10" src={icon} alt="icon" />
      </div>
      <div className="flex flex-col gap-1 mx-3 items-start justify-center">
        <div className="text-base font-medium">{title}</div>
        <div className="text-xs text-gray-600">{detail}</div>
      </div>
    </div>
  );
}
