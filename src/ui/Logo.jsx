import styled from "styled-components";
import { useLightMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { lightMode } = useLightMode();
  return (
    <StyledLogo>
      <Img
        src={lightMode ? "img/logo-light.png" : "img/logo-dark.png"}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
