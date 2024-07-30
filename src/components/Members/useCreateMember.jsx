import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useCreateMember() {
  const queryClient = useQueryClient();

  const { mutate: createMember, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateMember,
    onSuccess: () => {
      toast.success("Member successfully created");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createMember, isCreating };
}
