import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { status, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isLoading: status === "pending",
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
