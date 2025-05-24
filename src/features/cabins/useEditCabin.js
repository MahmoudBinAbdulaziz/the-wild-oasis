import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  // UseMutation should be awaited
  const mutation = useMutation({
    mutationFn: async ({ updatedCabin, id }) => {
      return await createEditCabin(updatedCabin, id);
    },
    onSuccess: () => {
      toast.success("Updated successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Return properly named properties
  return {
    isEditing: mutation.status === "pending",
    editCabin: mutation.mutate,
  };
}
