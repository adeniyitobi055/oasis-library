import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUpdateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";
import { addDays } from "date-fns";

export function useActivateMember() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: activate, isPending: isActivating } = useMutation({
    mutationFn: (memberId) =>
      createUpdateMember(
        {
          status: "active",
          isPaid: true,
          issueDate: new Date(),
          expiryDate: addDays(new Date(), 30),
        },
        memberId
      ),

    onSuccess: (data) => {
      toast.success(`Member #${data.id} successfully activated`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => {
      toast.error("There was an error during activation");
    },
  });

  return { activate, isActivating };
}
