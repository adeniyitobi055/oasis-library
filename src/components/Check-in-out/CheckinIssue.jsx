import styled from "styled-components";
import { useIssue } from "../Issues/useIssue";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import IssueDataBox from "../Issues/IssueDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

/* const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`; */

function CheckinIssue() {
  const { isPending, issue } = useIssue();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isPending) return <Spinner />;

  const { id: issueId } = issue;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in issue #{issueId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <IssueDataBox issue={issue} />

      <ButtonGroup>
        <Button onClick={() => checkin(issueId)} disabled={isCheckingIn}>
          Check in issue #{issueId}
        </Button>
        <Button onClick={moveBack} variation="secondary">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinIssue;
