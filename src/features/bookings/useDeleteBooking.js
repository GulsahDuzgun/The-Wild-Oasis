import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingFunc, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("The booking was successfully deleted");
      queryClient.invalidateQueries({ active: "true" });
    },
    onError: () => {
      toast.error(`The booking was deleted`);
    },
  });

  return { deleteBookingFunc, isDeleting };
}
