import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: allBookings, isLoading: loadingAllBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["all-bookings", `last-${numDays}`],
  });

  return { allBookings, loadingAllBookings };
}
