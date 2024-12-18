import { useLocation, useNavigate } from "react-router"
import HomeIcon from "../../icons/HomeIcon"
import PlusIcon from "../../icons/PlusIcon"
import UserIcon from "../../icons/UserIcon"


const Footer: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (

    <div className="flex flex-row  items-center size-full w-full max-w-md justify-between">
      <button onClick={() => navigate("/splash")}>
        <HomeIcon active={location.pathname == "/splash"} />
      </button>
      <button onClick={() => navigate("/")}>
        <PlusIcon active={location.pathname == "/"} />
      </button>
      <button onClick={() => navigate("/splash")}>
        <UserIcon active={location.pathname == "/mypage"} />
      </button>
    </div>
  )
}

export default Footer