import styled from "styled-components";
import { useDeleteIssue } from "./useDeleteIssue";
import { useIssue } from "./useIssue";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import IssueDataBox from "./IssueDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function IssueDetails() {
  const { isDeleting, deleteIssue } = useDeleteIssue();
  const { isPending, issue } = useIssue();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!issue) return <Empty resourceName="issue" />;

  const { status, id: issueId } = issue;

  const statusToTagName = {
    pending: "red",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Issue #{issueId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <IssueDataBox issue={issue} />

      <ButtonGroup>
        {status === "pending" && (
          <Button onClick={() => navigate(`/checkout/${issueId}`)}>
            Check out
          </Button>
        )}

        {status === "checked-out" && (
          <Button onClick={() => navigate(`/checkin/${issueId}`)}>
            Check in
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete issue</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="issue"
              onConfirm={() =>
                deleteIssue(issueId, { onSettled: () => navigate(-1) })
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

export default IssueDetails;
