import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: userData, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    userData,
    isLoading,
    isAuthenticated: userData?.role === "authenticated",
  };
}
