import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updatedSettingFunc, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings are updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatedSettingFunc, isLoading };
}
