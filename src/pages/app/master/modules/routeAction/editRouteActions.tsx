import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { reqUpdateRouteAction } from "@/redux/MasterBaruSchema/actions/actionReducer";

const EditRA = (props: any) => {
  console.log(props.data.roac_module_name);
  const [selectedValue, setSelectedValue] = useState(
    props.data.roac_module_name
  );
  const dispatch = useDispatch();

  type FormValues = {
    roac_id: number;
    roac_name: string;
    roac_orderby: string;
    roac_display: boolean;
    roac_module_name: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: FormValues) => {
    let roac_displayOI = 0;
    if (data.roac_display === true) {
      roac_displayOI = 1;
    }

    const editNilai = {
      roac_id: data.roac_id,
      roac_name: data.roac_name,
      roac_orderby: data.roac_orderby,
      roac_display: roac_displayOI,
      roac_module_name: data.roac_module_name,
    };

    console.log("ini", editNilai);
    dispatch(reqUpdateRouteAction(editNilai));
    props.closeModal();
  };
  return (
    <div>
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
                  Edit Route Actions
                </Dialog.Title>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(handleRegistration)}
                >
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="hidden"
                    defaultValue={props.data.roac_id}
                    {...register("roac_id")}
                  />
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Route Name
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        defaultValue={props.data.roac_name}
                        {...register("roac_name")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Module
                    </label>
                    <div className="w-2/3">
                      <select
                        value={selectedValue}
                        {...register("roac_module_name")}
                        className=" text-gray-700 bg-gray-200  rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        {props.dataModule?.map((dt: any) => (
                          <option
                            key={dt.module_name}
                            value={dt.module_name}
                            defaultValue={dt.module_name}
                          >
                            {dt.module_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Display
                    </label>
                    <div className="w-2/3">
                      <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-blue-500 dark:checked:after:bg-blue-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        defaultChecked={
                          props.data.roac_display === "1" ? true : false
                        }
                        {...register("roac_display")}
                      />
                    </div>
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Order By
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        defaultValue={props.data.roac_orderby}
                        {...register("roac_orderby")}
                        min={1}
                      />
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
    </div>
  );
};

export default EditRA;
