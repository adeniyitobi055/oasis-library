import styled from "styled-components";
// import { GiOpenBook } from "react-icons/gi";
// import { GiBookAura } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
// import { GiBlackBook } from "react-icons/gi";

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  /* border: 3px solid var(--color-brand-900);
  border-radius: var(--border-radius-lg); */
`;

/* const Img = styled.img`
  height: 10rem;
  width: auto;
`; */

const StyledLogoIcon = styled.div`
  height: 8.5rem;
  width: auto;
  font-size: 2rem;
  font-weight: 500;
`;

const StyledLogoText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-800);
`;

function Logo() {
  return (
    <StyledLogo>
      {/* <Img src="./logo_lightmode.png" alt="Logo" /> */}
      <StyledLogoIcon>
        <GiBookCover
          style={{ fontSize: "90px", color: "var(--color-brand-900)" }}
        />
      </StyledLogoIcon>
      <StyledLogoText>the oasis library</StyledLogoText>
    </StyledLogo>
  );
}

export default Logo;
