import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../services/apiMembers";

export function useMembers() {
  const {
    isPending,
    data: members,
    error,
  } = useQuery({ queryKey: ["members"], queryFn: getMembers });

  return { isPending, members, error };
}
