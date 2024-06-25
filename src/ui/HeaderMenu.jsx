import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

export default function HeaderMenu() {
  const navigate = useNavigate();

  const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
  `;

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
