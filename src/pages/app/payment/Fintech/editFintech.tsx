import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doupdatefintech } from "../../../../redux/paymentSchema/action/ActionReducer";
import Link from "next/link";
import { Button } from "@mui/material";

const updateFintech = (props: any) => {
  const router = useRouter();
  const { fint_entity_id, fint_code, fint_name }: any = router.query;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();

  type FormValue = {
    fint_entity_id: number;
    fint_code: string;
    fint_name: string;
  };

  const handleRegistration = (data: any) => {
    dispatch(doupdatefintech(data));
    router.push("/app/payment");
  };

  const registerOptions = {
    fint_entity_id: { required: "bank_entity_id is required" },
    fint_code: { required: "bank_code is required" },
    fint_name: { required: "bank_name" },
  };

  return (
    <>
      <div className="m-32  bg-white p-10 rounded-md">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <input
            type="hidden"
            {...register("fint_entity_id", registerOptions.fint_entity_id)}
            defaultValue={fint_entity_id}
          />
          <div className="flex flex-col">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                FINTECH CODE
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                {...register("fint_code", registerOptions.fint_code)}
                defaultValue={fint_code}
                placeholder="Fintech Code"
                autoComplete="off"
              />
              <p className="text-red-500">
                {errors?.fint_code && errors.fint_code.message}
              </p>
            </label>
          </div>
          <div>
            <label className="block mt-4">
              <span className="block text-sm font-medium text-slate-700">
                FINTECH NAME
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                {...register("fint_name", registerOptions.fint_name)}
                type="text"
                placeholder="FINTECH NAME"
                defaultValue={fint_name}
                autoComplete="off"
              />
              <p className="text-red-500">
                {errors?.fint_name && errors.fint_name.message}
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
    </>
  );
};

updateFintech.Layout = "Admin";
export default updateFintech;
