import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue as deleteIssueApi } from "../../services/apiIssues";
import toast from "react-hot-toast";

export function useDeleteIssue() {
  const queryClient = useQueryClient();

  const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
    mutationFn: deleteIssueApi,
    onSuccess: () => {
      toast.success("Issue successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteIssue, isDeleting };
}
