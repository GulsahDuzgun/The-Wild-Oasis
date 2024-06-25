import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    userData: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { register, handleSubmit, reset } = useForm();
  const { userDataUpdateFunc, userDataUpdateLoading } = useUpdateUser();

  function updateUserAvatar(data) {
    const { fullName, avatar } = data;

    if (!fullName) return;

    userDataUpdateFunc(
      { fullName, avatar: avatar?.length === 0 ? null : avatar?.[0] },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  function handleCancel() {
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(updateUserAvatar)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          id="fullName"
          type="text"
          disabled={userDataUpdateLoading}
          defaultValue={currentFullName}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={userDataUpdateLoading}
          {...register("avatar")}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={userDataUpdateLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={userDataUpdateLoading}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
