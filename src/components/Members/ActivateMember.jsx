import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import MemberDataBox from "./MemberDataBox";
import { useActivateMember } from "./useActivateMember";
import { useMember } from "./useMember";
import styled from "styled-components";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function ActivateMember() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isPending, member } = useMember();
  const { activate, isActivating } = useActivateMember();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(member?.isPaid ?? false), [member]);

  if (isPending) return <Spinner />;

  const { id: memberId, price, fullName, isPaid } = member;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Activate member #{memberId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <MemberDataBox member={member} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isActivating}
          id="confirm"
        >
          I confirm that {fullName} has paid the total amount of{" "}
          {formatCurrency(price)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={() => activate(memberId)}
          disabled={!confirmPaid || isActivating}
        >
          Activate member #{memberId}
        </Button>
        <Button onClick={moveBack} variation="secondary">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ActivateMember;
