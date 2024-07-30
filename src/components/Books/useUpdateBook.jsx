import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateBook } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useUpdateBook() {
  const queryClient = useQueryClient();

  const { mutate: editBook, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBookData, id }) => createUpdateBook(newBookData, id),
    onSuccess: () => {
      toast.success("Book successfully edited");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => toast.error("err.message"),
  });

  return { editBook, isEditing };
}
