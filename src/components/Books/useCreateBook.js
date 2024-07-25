import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateBook } from "../../services/apiBooks";
import toast from "react-hot-toast";

function useCreateBook() {
  const queryClient = useQueryClient();

  const { mutate: createBook, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateBook,
    onSuccess: () => {
      toast.success("New book succesfully created");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createBook, isCreating };
}

export default useCreateBook;
