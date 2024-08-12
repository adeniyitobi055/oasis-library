import { useQuery } from "@tanstack/react-query";
import { getMember } from "../../services/apiMembers";
import { useParams } from "react-router-dom";

export function useMember() {
  const { memberId } = useParams();

  const {
    isPending,
    data: member,
    error,
  } = useQuery({
    queryKey: ["members", memberId],
    queryFn: () => getMember(memberId),
  });

  return { isPending, member, error };
}
