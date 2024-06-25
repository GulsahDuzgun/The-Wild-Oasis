import styled from "styled-components";
import { useRecentBookings } from "../bookings/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "../bookings/useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { allBookings, loadingAllBookings } = useRecentBookings();
  const { confirmedStays, allStays, loadingAllStays, numDays } =
    useRecentStays();
  const { cabins, isLoading: loadingCabins } = useCabins();

  if (loadingAllBookings || loadingAllStays || loadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={allBookings}
        confirmedStays={confirmedStays}
        allStays={allStays}
        allCabins={cabins.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={allBookings} />
    </StyledDashboardLayout>
  );
}
