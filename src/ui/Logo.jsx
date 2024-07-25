import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="./logo_lightmode.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
