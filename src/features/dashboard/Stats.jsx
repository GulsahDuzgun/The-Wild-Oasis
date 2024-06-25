import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

export default function Stats({
  bookings,
  confirmedStays,
  allCabins,
  numDays,
}) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (allCabins * numDays);

  return (
    <>
      <Stat
        value={numBookings}
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
      ></Stat>
      <Stat
        value={formatCurrency(sales)}
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
      ></Stat>
      <Stat
        value={checkins}
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      ></Stat>
      <Stat
        value={Math.round(occupation * 100) + "%"}
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
      ></Stat>
    </>
  );
}
