import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutFunc, isLoading: isLogoutLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // queryClient.invalidateQueries({ active: true });
      queryClient.removeQueries();
      toast.success(`Successfully has been logged out`);
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logoutFunc, isLogoutLoading };
}
