import styled from "styled-components";
import { useDeleteMember } from "./useDeleteMember";
import { useMember } from "./useMember";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import MemberDataBox from "./MemberDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateMembershipForm from "./CreateMembershipForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function MemberDetail() {
  const { deleteMember, isDeleting } = useDeleteMember();
  const { isPending, member } = useMember();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!member) return <Empty resourceName="member" />;

  const { id: memberId, status } = member;

  const statusToTagName = {
    unconfirmed: "blue",
    "in-active": "red",
    active: "green",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Member #{memberId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <MemberDataBox member={member} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="edit">
            <Button>Edit book</Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Button variation="danger">Delete member</Button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateMembershipForm memberToEdit={member} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="member"
              onConfirm={() =>
                deleteMember(memberId, { onSettled: () => navigate(-1) })
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

export default MemberDetail;
