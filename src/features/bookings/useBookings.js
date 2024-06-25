import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterVal = searchParams.get("status");
  const sortByVal = searchParams.get("sortBy") || "startDate-desc";

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const filter =
    !filterVal || filterVal === "all"
      ? null
      : { field: "status", value: filterVal, method: "eq" };

  const [field, direction] = sortByVal.split("-");
  const sortBy = !sortByVal ? null : { field, direction };

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
    queryKey: ["bookings", filter, sortBy, currentPage],
  });

  const countPage = Math.ceil(count / BOOKINGS_PER_PAGE);

  if (currentPage <= countPage) {
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
    });
  }

  return { bookings, isLoading, count };
}
