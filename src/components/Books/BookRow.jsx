import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Book = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Author = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Isbn = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Rack = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Category = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function BookRow() {
  return (
    <Table.Row>
      <Img />
      <Book>The 48 Laws of Power</Book>
      <Author>Robert Greene</Author>
      <Isbn>ISBN 0-061-96436-0</Isbn>
      <Rack>9</Rack>
      <Category>Psychology</Category>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle />

            <Menus.List>
              <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>

              <Modal.Open>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookRow;
