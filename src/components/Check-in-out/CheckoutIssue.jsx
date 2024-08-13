import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import IssueDataBox from "../Issues/IssueDataBox";
import { useIssue } from "../Issues/useIssue";
import { useCheckOut } from "./useCheckout";

function CheckoutIssue() {
  const { isPending, issue } = useIssue();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckOut();

  if (isPending) return <Spinner />;

  const { id: issueId } = issue;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check out issue #{issueId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <IssueDataBox issue={issue} />

      <ButtonGroup>
        <Button onClick={() => checkout(issueId)} disabled={isCheckingOut}>
          Check out issue #{issueId}
        </Button>
        <Button onClick={moveBack} variation="secondary">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckoutIssue;
