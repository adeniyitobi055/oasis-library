import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useUpdateMember() {
  const queryClient = useQueryClient();

  const { mutate: editMember, isLoading: isEditing } = useMutation({
    mutationFn: ({ newMemberData, id }) =>
      createUpdateMember(newMemberData, id),
    onSuccess: () => {
      toast.success("Member data successfully updated");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editMember, isEditing };
}
