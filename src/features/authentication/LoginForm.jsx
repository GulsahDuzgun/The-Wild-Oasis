import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, reset } = useForm();

  const { loginFnc, isLoginLoading } = useLogin();

  function submitLoginInfo(data) {
    const { email, password } = data;

    if (!email || !password) return;

    loginFnc(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(submitLoginInfo)}>
      <FormRow isHorizantal={false} label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
          disabled={isLoginLoading}
          defaultValue={"caxamad240@luravel.com"}
        />
      </FormRow>
      <FormRow isHorizantal={false} label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          defaultValue={"test1234"}
          {...register("password", {
            min: {
              value: 8,
              message: "Password should be 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow isHorizantal={false}>
        <Button size="large" disabled={isLoginLoading}>
          {isLoginLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
