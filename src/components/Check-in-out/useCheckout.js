import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateIssue } from "../../services/apiIssues";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (issueId) => updateIssue(issueId, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Issue #${data.id} successfully checkedout`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}
