import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUpFunc, isSingUpLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function handleFormSubmit(data) {
    const { email, password, fullName } = data;
    signUpFunc({ email, password, fullName });
  }

  // function handleFormSubmitErr(data) {
  //   // console.error(data);
  // }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSingUpLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSingUpLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSingUpLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSingUpLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (currValue) =>
              currValue === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          disabled={isSingUpLoading}
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>

        <Button disabled={isSingUpLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
