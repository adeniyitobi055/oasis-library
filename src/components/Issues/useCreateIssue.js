import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIssue as createIssueApi } from "../../services/apiIssues";
import toast from "react-hot-toast";

export function useCreateIssue() {
  const queryClient = useQueryClient();

  const { mutate: createIssue, isPending: isCreating } = useMutation({
    mutationFn: createIssueApi,
    onSuccess: () => {
      toast.success("Issue successfully created");
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createIssue, isCreating };
}
