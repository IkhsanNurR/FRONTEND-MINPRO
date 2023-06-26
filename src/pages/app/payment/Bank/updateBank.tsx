import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { doupdatebank } from "../../../../redux/paymentSchema/action/ActionReducer";
import Link from "next/link";
import { Button } from "@mui/material";
import Content from "@/components/shared/content";

const updateBank = (props: any) => {
  const router = useRouter();
  const { bank_entity_id, bank_code, bank_name }: any = router.query;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();
  type FormValue = {
    bank_entity_id: number;
    bank_code: string;
    bank_name: string;
  };
  const handleRegistration = (data: any) => {
    dispatch(doupdatebank(data));
    router.push("/app/payment");
  };

  const registerOptions = {
    bank_entity_id: { required: "bank_entity_id is required" },
    bank_code: { required: "bank_code is required" },
    bank_name: { required: "bank_name" },
  };

  return (
    <>
      <Content title={`UPDATE BANK`}>
        <div className="m-32  bg-white p-10 rounded-md">
          <form onSubmit={handleSubmit(handleRegistration)}>
                <input
                  type="hidden"
                  {...register(
                    "bank_entity_id",
                    registerOptions.bank_entity_id
                  )}
                  defaultValue={bank_entity_id}
                />
            <div className="flex flex-col">
              <label className="block">
                <span className="block text-sm font-medium text-slate-700">
                  BANK CODE
                </span>
                <input
                  id="bank_code"
                  className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  type="number"
                  {...register("bank_code", registerOptions.bank_code)}
                  defaultValue={bank_code}
                  placeholder="Bank Code"
                  autoComplete="off"
                />
                <p className="text-red-500">
                  {errors?.bank_code && errors.bank_code.message}
                </p>
              </label>
            </div>
            <div>
              <label className="block mt-4">
                <span className="block text-sm font-medium text-slate-700">
                  BANK NAME
                </span>
                <input
                  className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  {...register("bank_name", registerOptions.bank_name)}
                  placeholder="BANK NAME"
                  defaultValue={bank_name}
                />
                <p className="text-red-500">
                  {errors?.bank_name && errors.bank_name.message}
                </p>
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                type="submit"
                className="justify-center rounded-md border border-transparent
                        bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
                        focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
                        focus-visible:ring-offset-2"
              >
                Submit
              </Button>
              <Link
                href="/app/payment"
                className="justify-center rounded-md border border-transparent
                          bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
                          focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
                          focus-visible:ring-offset-2"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </Content>
    </>
  );
};

updateBank.Layout = "Admin";
export default updateBank;
