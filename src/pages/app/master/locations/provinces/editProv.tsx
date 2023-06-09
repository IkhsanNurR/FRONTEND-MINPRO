import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  reqUpdateCat,
  reqUpdateProv,
} from "@/redux/MasterBaruSchema/actions/actionReducer";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type FormValues = {
  prov_id: string;
  prov_code: string;
  prov_name: string;
  prov_country_code: string;
};

const EditProv = (props: any) => {
  console.log(props.dataProv?.country_code);
  const [selectedValue, setSelectedValue] = useState(
    props.dataProv?.country_code
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: FormValues) => {
    console.log("ini", data);
    dispatch(reqUpdateProv(data));
    props.closeModal();
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-50"
        onClose={() => null}
      >
        <div className="min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <Dialog.Title
                as="h3"
                className="pb-6 pt-3 text-center text-lg leading-6 text-gray-700 font-bold"
              >
                Edit Province
              </Dialog.Title>
              <form
                className="space-y-6"
                onSubmit={handleSubmit(handleRegistration)}
              >
                <div className="w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="hidden"
                    defaultValue={props.dataProv?.prov_id}
                    {...register("prov_id")}
                  />
                </div>
                <div className="flex items-center">
                  <label
                    className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                    htmlFor="inline-full-name"
                  >
                    Province Code
                  </label>
                  <div className="w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      defaultValue={props.dataProv?.prov_code}
                      placeholder="5 Digit Province Code"
                      {...register("prov_code", {
                        required: "Province Code is required",
                        pattern: {
                          value: /^[A-Z]{5}$/,
                          message: "Code must be 5 uppercase letters",
                        },
                      })}
                    />
                    {errors.prov_code && (
                      <div className="w-3/4 text-xs text-red-500">
                        {errors.prov_code.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                    htmlFor="inline-full-name"
                  >
                    Province Name
                  </label>
                  <div className="w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      defaultValue={props.dataProv?.prov_name}
                      placeholder="province name"
                      {...register("prov_name", {
                        required: "Province Code is required",
                      })}
                    />
                    {errors.prov_name && (
                      <div className="w-3/4 text-xs text-red-500">
                        {errors.prov_name.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                    htmlFor="inline-password"
                  >
                    Country
                  </label>
                  <div className="w-2/3">
                    <select
                      value={selectedValue}
                      {...register("prov_country_code")}
                      className="text-center rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900"
                      onChange={(e) => setSelectedValue(e.target.value)}
                    >
                      {props.dataCode?.map((ct: any) => (
                        <option key={ct.country_id} value={ct.country_code}>
                          {ct.country_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="mr-4 shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => props.closeModal()}
                  >
                    Cancel
                  </button>
                  <button
                    className="shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProv;
