import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddAccount,
  doRequestGetBank,
  doRequestGetFintech,
} from "../../../../redux/paymentSchema/action/ActionReducer";
import Content from "@/components/shared/content";
import { FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";

const AddFintech = (show: any) => {
    let { bank } = useSelector((state: any) => state.bankReducer);
    let { fintech } = useSelector((state: any) => state.fintechReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const {
      type,
      desc,
    }: any = router.query;

    type FormValue = {
        usac_user_entity_id: number;
        usac_account_number: string;
        usac_saldo: string;
        type: string;
        desc: string;
      };

  type Option = {
    label: string;
    value: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleRegistration = (data: any) => {
    const { usac_user_entity_id, usac_account_number, usac_saldo } = data;
    const newData = {
        usac_user_entity_id,
        usac_account_number,
        usac_saldo,
        usac_type: selectedType,
        bank_name: selectedDesc,
      };
    dispatch(doAddAccount(newData));
    router.push("/app/payment");
  };

  const registerOptions = {
    usac_user_entity_id: { required: "User ID is required" },
    usac_account_number: { required: "Account Number is required" },
    usac_saldo: { required: "Saldo is required" },
  };

  const [descOptions, setDescOptions] = useState<Option[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDesc, setSelectedDesc] = useState<string>("");

  const handleDescChange = (value: string) => {
    setSelectedDesc(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setSelectedDesc("");
  };

  const fetchData = () => {
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
  }

  useEffect(() => {
    fetchData();
    dispatch(doRequestGetBank());
    dispatch(doRequestGetFintech());
}, [selectedType]);

useEffect(() => { 
setSelectedType(type)
setSelectedDesc(desc)
},[type])

  return (
    <>
      <Content title={`CREATE USERS ACCOUNT`}>
        <div className="m-32  bg-white p-10 rounded-md">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="flex flex-col">
              <label className="block mt-4">
                <span className="block text-sm font-medium text-slate-700">
                  USER ID
                </span>
                <input
                  className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  type="number"
                  {...register(
                    "usac_user_entity_id",
                    registerOptions.usac_user_entity_id
                  )}
                  placeholder="User ID"
                  autoComplete="off"
                />
                <p className="text-red-500">
                  {errors?.usac_user_entity_id &&
                    errors.usac_user_entity_id.message}
                </p>
              </label>
            </div>

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
                  type="text"
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
      </Content>
    </>
  );
};

AddFintech.Layout = "Admin";
export default AddFintech;
