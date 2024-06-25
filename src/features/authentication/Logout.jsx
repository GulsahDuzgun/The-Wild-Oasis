import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { logoutFunc, isLogoutLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLogoutLoading} onClick={logoutFunc}>
      {isLogoutLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
