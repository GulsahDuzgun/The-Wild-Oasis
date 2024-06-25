import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { data: settings, isLoading } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings, isLoading };
}

//useQuery for get, useMutation for updates
