import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export function useSettings() {
  const {
    status,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading: status === "pending", error, settings };
}
