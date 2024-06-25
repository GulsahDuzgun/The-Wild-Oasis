import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOutLoading, checkOutFnc } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => {
        checkOutFnc(bookingId);
      }}
      disabled={checkOutLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
