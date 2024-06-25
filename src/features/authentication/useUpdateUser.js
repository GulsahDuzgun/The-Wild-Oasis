import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDataUpdate } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: userDataUpdateFunc, isLoading: userDataUpdateLoading } =
    useMutation({
      mutationFn: userDataUpdate,
      onSuccess: (updatedUserData) => {
        toast.success("Changes have been updated");
        queryClient.setQueryData(["user"], updatedUserData.user);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { userDataUpdateFunc, userDataUpdateLoading };
}
