import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLightMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { lightMode, toggleLightMode } = useLightMode();

  return (
    <ButtonIcon onClick={toggleLightMode}>
      {lightMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
