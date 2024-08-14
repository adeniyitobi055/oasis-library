import styled from "styled-components";
import { useDeleteBook } from "./useDeleteBook";
import { useUpdateBook } from "./useUpdateBook";
import { useBook } from "./useBook";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookDataBox from "./BookDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateBookForm from "./CreateBookForm";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookDetails() {
  const { deleteBook, isDeleting } = useDeleteBook();
  const { editBook, isEditing } = useUpdateBook();
  const { isPending, book } = useBook();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!book) return <Empty resourceName="book" />;

  const { id: bookId, name } = book;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">{name}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookDataBox book={book} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="edit">
            <Button>Edit Book</Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Button variation="danger">Delete Book</Button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateBookForm bookToEdit={book} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="book"
              onConfirm={() =>
                deleteBook(bookId, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookDetails;
