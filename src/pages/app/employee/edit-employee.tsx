import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestGetFilterDepartment,
  doRequestGetFilterJobRole,
  doRequestUpdate,
} from "@/redux/hrSchema/action/actionReducer";

//

const EditEmployee = (props: any) => {
  const hireDate = (date: any) => {
    register("emp_hire_date");
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      const data_hire_date = formattedDate.split("/");
      const convertHireDate =
        data_hire_date[2] + "-" + data_hire_date[1] + "-" + data_hire_date[0];
      setValue("emp_hire_date", convertHireDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const dispatch = useDispatch();

  const { department, jobrole, message, refresh } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  useEffect(() => {
    dispatch(doRequestGetFilterDepartment());
    dispatch(doRequestGetFilterJobRole());

    register("emp_entity_id");
    setValue("emp_entity_id", props.data.user_entity_id);
  }, [refresh]);
  type FormValues = {
    emp_entity_id: number;
    emp_hire_date: string;
    emp_joro_id: number;
    edhi_dept_id: number;
    emp_type: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    register;
    console.log(data);
    dispatch(doRequestUpdate(data));

    // dispatch(doRequestCreateEmployeeInternal(isiData))
  };
  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <div className="mt-6 w-full">
                    <form onSubmit={handleSubmit(handleRegistration)}>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Job Role
                          </label>
                          <select
                            {...register("emp_joro_id")}
                            name="emp_joro_id"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            {jobrole.map((dt: any, index: any) => {
                              let jobRole = [];

                              if (dt.joro_name === props.data.joro_name) {
                                jobRole.push(
                                  <option
                                    selected
                                    key={dt.joro_id}
                                    value={dt.joro_id}
                                  >
                                    {dt.joro_name}
                                  </option>
                                );
                              } else {
                                jobRole.push(
                                  <option key={dt.joro_id} value={dt.joro_id}>
                                    {dt.joro_name}
                                  </option>
                                );
                              }
                              return jobRole;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Department
                          </label>

                          <select
                            {...register("edhi_dept_id")}
                            name="edhi_dept_id"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            {department.map((dt: any, index: any) => {
                              let dept = [];

                              if (dt.dept_name === props.data.dept_name) {
                                dept.push(
                                  <option
                                    selected
                                    key={dt.dept_id}
                                    value={dt.dept_id}
                                  >
                                    {dt.dept_name}
                                  </option>
                                );
                              } else {
                                dept.push(
                                  <option key={dt.dept_id} value={dt.dept_id}>
                                    {dt.dept_name}
                                  </option>
                                );
                              }
                              return dept;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Start Contract
                          </label>
                          <div className="flex">
                            <div>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  defaultValue={dayjs(props.data.emp_hire_date)}
                                  slotProps={{
                                    actionBar: {
                                      actions: ["clear"],
                                    },
                                  }}
                                  format="DD/MM/YYYY"
                                  // label="Mulai"
                                  className="w-full"
                                  onChange={hireDate}
                                />
                              </LocalizationProvider>
                              {/* <DatePicker selected={startDate} onChange={(a:any) => setStartDate(a)} /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Type
                          </label>
                          <select
                            {...register("emp_type")}
                            name="emp_type"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={"internal"}>Internal</option>
                            <option value={"outsource"}>Outsource</option>
                          </select>{" "}
                        </div>
                      </div>

                      <div className="absolute right-8 text-sm">
                        <button className="p-1 mr-5 border-2 bg-cyan-400 hover:bg-blue-800 text-white">
                          Update
                        </button>

                        <button
                          onClick={props.closeModal}
                          className="p-1 border-2 bg-cyan-400 hover:bg-blue-800 text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditEmployee;
