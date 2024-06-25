import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking = {}, isLoading } = useBooking();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    numNights,
    hasBreakfast,
    extrasPrice,
    // isPaid,
  } = booking;

  const [isConfirm, setIsConfirm] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);
  const { checkInFunc, isCheckInLoading } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setIsConfirm(booking.isPaid);
    setIsBreakfast(booking.hasBreakfast);
  }, [booking]);

  function handleCheckin() {
    if (!confirm) return;

    if (isBreakfast) {
      checkInFunc({
        bookingId,
        newFeaturesObj: {
          extrasPrice: totalBreakfastCost,
          hasBreakfast: true,
          totalPrice: totalPrice + totalBreakfastCost,
        },
      });
    } else {
      checkInFunc({ bookingId, newFeaturesObj: {} });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  const totalBreakfastCost = settings.breakfastPrice * numGuests * numNights;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          id="confirm"
          disabled={isConfirm || isCheckInLoading}
          checked={isConfirm}
          onChange={() => setIsConfirm((c) => !c)}
        >
          {!extrasPrice && isBreakfast
            ? `I confirm that 
            ${guests.fullName}
             has paid  ${formatCurrency(totalBreakfastCost)} for breakfast`
            : `I confirm that 
            ${guests.fullName}
             has paid the total amount of  
          ${
            !hasBreakfast && isBreakfast
              ? `${formatCurrency(totalPrice + totalBreakfastCost)}(
                  ${totalPrice} + ${totalBreakfastCost}
                )`
              : formatCurrency(totalPrice)
          }`}
        </Checkbox>
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={isBreakfast}
            disabled={isCheckInLoading}
            onChange={() => {
              setIsBreakfast((h) => !h);
              setIsConfirm(false);
            }}
          >
            Would you like to add breakfast for{" "}
            {formatCurrency(totalBreakfastCost)}?
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button
          disabled={!isConfirm || isCheckInLoading}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
