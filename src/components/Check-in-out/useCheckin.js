import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from "../../services/apiIssues";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (issueId) => updateIssue(issueId, { status: "checked-in" }),

    onSuccess: (data) => {
      toast.success(`Issue #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}
