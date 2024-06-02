import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords don't match");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-white mb-4"
        >
          Change Password
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="New Password"
            type="password"
            name="password"
            label="New Password"
            className="w-full rounded"
            register={register("password", {
              required: "New Password is required!",
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Textbox
            placeholder="Confirm New Password"
            type="password"
            name="cpass"
            label="Confirm New Password"
            className="w-full rounded"
            register={register("cpass", {
              required: "Confirm New Password is required!",
            })}
            error={errors.cpass ? errors.cpass.message : ""}
          />
        </div>
        {isLoading ? (
          <div className="py-3">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-[#030637] px-8  rounded-xl text-sm font-semibold text-white sm:w-auto hover:bg-[black] hover:bg-opacity-60 "
              label="Save"
            />
            <button
              type="button"
              className="bg-white mx-4 px-5 text-sm font-semibold text-gray-900 sm:w-auto hover:bg-gray-400 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;
