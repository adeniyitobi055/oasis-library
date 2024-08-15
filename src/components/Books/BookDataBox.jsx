import {
  HiMiniPencil,
  HiOutlineBookOpen,
  HiOutlineChatBubbleBottomCenterText,
  HiTableCells,
  HiViewColumns,
} from "react-icons/hi2";
import styled from "styled-components";
import DataItem from "../../ui/DataItem";
import { format } from "date-fns";
import { Image } from "../../ui/Image";

const StyledBookDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 6rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    margin-left: 4px;
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Book = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookDataBox({ book }) {
  const {
    created_at,
    author,
    name,
    isbn,
    rackNum,
    category,
    description,
    image,
  } = book;

  return (
    <StyledBookDataBox>
      <Header>
        <div>
          <HiOutlineBookOpen />
          <p>{name}</p>
        </div>

        <p>{isbn}</p>
      </Header>

      <Section>
        <Book>{image && <Image src={image} alt={`Image of ${name}`} />}</Book>

        {author && (
          <DataItem icon={<HiMiniPencil />} label="Author">
            {author}
          </DataItem>
        )}
        {category && (
          <DataItem icon={<HiViewColumns />} label="Category">
            {category}
          </DataItem>
        )}

        {rackNum && (
          <DataItem icon={<HiTableCells />} label="Rack Number">
            {rackNum}
          </DataItem>
        )}

        {description && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Description"
          >
            {description}
          </DataItem>
        )}
      </Section>

      <Footer>
        <p>Acquired {format(new Date(created_at), "EEE, MMM dd yyyy")}</p>
      </Footer>
    </StyledBookDataBox>
  );
}

export default BookDataBox;
