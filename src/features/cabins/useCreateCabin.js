import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCabin) => {
      console.log("🔍 Mutation called with:", newCabin); // Debugging log
      const result = await createEditCabin(newCabin);
      console.log("✅ Mutation result:", result); // Debugging log
      return result;
    },
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      console.error("❌ Mutation Error:", err.message);
      toast.error(err.message);
    },
  });

  return {
    isCreating: mutation.status === "pending",
    createCabin: mutation.mutate,
  };
}
