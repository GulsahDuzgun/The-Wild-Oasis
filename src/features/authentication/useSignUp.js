import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUpFunc, isLoading: isSingUpLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpUser({ email, password, fullName }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("User has successfully been created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUpFunc, isSingUpLoading };
}
