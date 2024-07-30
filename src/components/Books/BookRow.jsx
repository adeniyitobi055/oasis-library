import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import styled from "styled-components";
import { useCreateBook } from "./useCreateBook";
import { useDeleteBook } from "./useDeleteBook";
import CreateBookForm from "./CreateBookForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Img = styled.img`
  display: block;
  width: 6.5rem;
  /* height: 4rem; */
  aspect-ratio: 3 / 2.3;
  object-position: center;
  object-fit: contain;
  transform: scale(1.5) translateX(-7px);
`;

const Book = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Author = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Isbn = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Rack = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Category = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Description = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function BookRow({ book }) {
  const { isCreating, createBook } = useCreateBook();

  const {
    id: bookId,
    name,
    isbn,
    rackNum,
    category,
    author,
    image,
    description,
  } = book;

  function handleDuplicate() {
    createBook({
      name: `Copy of ${name}`,
      isbn,
      rackNum,
      category,
      author,
      image,
      description,
    });
  }

  const { isDeleting, deleteBook } = useDeleteBook();

  return (
    <Table.Row>
      <Img src={image} />
      <Book>{name}</Book>
      <Author>{author}</Author>
      <Isbn>{isbn}</Isbn>
      <Rack>{rackNum}</Rack>
      <Category>{category}</Category>
      <Description>{description}</Description>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookId} />

            <Menus.List id={bookId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateBookForm bookToEdit={book} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="books"
                disabled={isDeleting}
                onConfirm={() => deleteBook(bookId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookRow;
