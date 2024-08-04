import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.9rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 25em;
  outline: none;
  z-index: 1000;

  &:disabled {
    background-color: var(--color-grey-200);
  }
`;

export default StyledDatePicker;
