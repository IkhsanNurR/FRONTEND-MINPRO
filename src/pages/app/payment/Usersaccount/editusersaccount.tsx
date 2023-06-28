import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestGetBank,
  doRequestGetFintech,
  doupdateUsersaccount,
} from "../../../../redux/paymentSchema/action/ActionReducer";
import Link from "next/link";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const editUsersAccount = (props: any) => {
  let { bank } = useSelector((state: any) => state.bankReducer);
  let { fintech } = useSelector((state: any) => state.fintechReducer);
  const router = useRouter();
  const {
    usac_user_entity_id,
    usac_account_number,
    usac_saldo,
    type,
    desc,
  }: any = router.query;
  const [optionsLoading, setOptionsLoading] = useState<boolean>(false);
  const [descOptions, setDescOptions] = useState<Option[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDesc, setSelectedDesc] = useState<string>("");
  const dispatch = useDispatch();

  type Option = {
    label: string;
    value: string;
  };

  type FormValue = {
    usac_user_entity_id: number;
    usac_account_number: string;
    usac_saldo: string;
    type: string;
    desc: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();

  const handleDescChange = (value: string) => {
    setSelectedDesc(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setSelectedDesc("");
  };

  const handleRegistration = (data: any) => {
    const { usac_user_entity_id, usac_account_number, usac_saldo } = data;
    const newData = {
      usac_user_entity_id,
      usac_account_number,
      usac_saldo,
      usac_type: selectedType,
      bank_name: selectedDesc,
    };
    dispatch(doupdateUsersaccount(newData));
    router.push("/app/payment");
  };

  const registerOptions = {
    usac_user_entity_id: { required: "User ID is required" },
    usac_account_number: { required: "Account Number is required" },
    usac_saldo: { required: "Saldo is required" },
  };

  const fetchData = async () => {
    setOptionsLoading(true);
    if (selectedType === "debet" || selectedType === "credit card") {
      const options = (bank || []).map((item: any) => ({
        label: item.bank_name,
        value: item.bank_name,
      }));
      setDescOptions(options);
    } else if (selectedType === "payment") {
      const options = (fintech || []).map((item: any) => ({
        label: item.fint_name,
        value: item.fint_name,
      }));
      setDescOptions(options);
    }
    setOptionsLoading(false);
  };

  useEffect(() => {
    fetchData();
    dispatch(doRequestGetBank());
    dispatch(doRequestGetFintech());
  }, [selectedType]);

  useEffect(() => {
    setSelectedType(type);
    setSelectedDesc(desc);
  }, [type, desc]);

  return (
    <>
      <div className="m-32  bg-white p-10 rounded-md">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <input
            type="hidden"
            {...register(
              "usac_user_entity_id",
              registerOptions.usac_user_entity_id
            )}
            defaultValue={usac_user_entity_id}
          />

          <div className="flex flex-col">
            <label className="block mt-4">
              <span className="block text-sm font-medium text-slate-700">
                Account Number
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="number"
                {...register(
                  "usac_account_number",
                  registerOptions.usac_account_number
                )}
                defaultValue={usac_account_number}
                placeholder="Account Number"
                autoComplete="off"
              />
              <p className="text-red-500">
                {errors?.usac_account_number &&
                  errors.usac_account_number.message}
              </p>
            </label>
          </div>

          <div className="flex flex-col">
            <label className="block mt-4">
              <span className="block text-sm font-medium text-slate-700">
                Saldo
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                {...register("usac_saldo", registerOptions.usac_saldo)}
                defaultValue={usac_saldo}
                type="number"
                placeholder="Saldo"
                autoComplete="off"
              />
              <p className="text-red-500">
                {errors?.usac_saldo && errors.usac_saldo.message}
              </p>
            </label>
          </div>

          <FormControl className="flex justify-between mt-4">
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={selectedType}
              onChange={(event) => handleTypeChange(event.target.value)}
              disabled
            >
              <MenuItem value="debet">debet</MenuItem>
              <MenuItem value="credit card">credit card</MenuItem>
              <MenuItem value="payment">payment</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="flex justify-between mt-4">
            <InputLabel id="desc-select-label">Desc</InputLabel>
            <Select
              labelId="desc-select-label"
              id="desc-select"
              value={selectedDesc}
              onChange={(event) => handleDescChange(event.target.value)}
              disabled
            >
              {descOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Submit
            </button>
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

editUsersAccount.Layout = "Admin";
export default editUsersAccount;
