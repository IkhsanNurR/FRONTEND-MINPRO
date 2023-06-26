import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestCreateEmployeeInternal,
  doRequestGetFilterDepartment,
  doRequestGetFilterJobRole,
  doRequestGetFilterUserRole,
  doRequestGetForEmployee,
  doRequestTalentJobPost,
} from "@/redux/hrSchema/action/actionReducer";

//

const CreateEmployee = (props: any) => {
  const [inputText, setInputText] = useState("");
  const [userId, setUserId] = useState(0);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [hire_date, sethire_date] = useState("");
  const [end_contarct, setend_contarct] = useState("");
  const [dataEmployee, setDataEmployee] = useState([]);

  const hireDate = (date: any) => {
    register("emp_hire_date");
    sethire_date(date);

    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");

      const data_hire_date = formattedDate.split("/");
      const convertHireDate =
        data_hire_date[2] + "-" + data_hire_date[1] + "-" + data_hire_date[0];
      setValue("emp_hire_date", convertHireDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const endContract = (date: any) => {
    register("emp_end_contract");
    setend_contarct(date);

    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      const end_contarct_date = formattedDate.split("/");
      const converEndContract =
        end_contarct_date[2] +
        "-" +
        end_contarct_date[1] +
        "-" +
        end_contarct_date[0];
      setValue("emp_end_contract", converEndContract); // Set the value of "StartPeriod" field in the form
    }
  };

  const dispatch = useDispatch();

  const {
    users,
    department,
    jobrole,
    userrole,
    employeeJobPost,
    message,
    refresh,
  } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    dispatch(doRequestGetForEmployee());
    dispatch(doRequestGetFilterDepartment());
    dispatch(doRequestGetFilterJobRole());
    dispatch(doRequestGetFilterUserRole());
    dispatch(doRequestTalentJobPost());

    // console.log('employejobpost',employeeJobPost);
  }, [refresh]);
  useEffect(() => {
    const employee: any = [...users, ...employeeJobPost];
    setDataEmployee(employee);
    console.log("isiDataEmployee", dataEmployee);
  }, [users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const buttonSearch = () => {
    const filteredEmployees = dataEmployee.filter((data: any) => {
      if (data.user_name === inputText) {
        // emp_entity_id

        register("emp_entity_id");
        setValue("emp_entity_id", data.user_entity_id);

        register("user_role");
        setValue("user_role", 13);
        register("emp_birth_date");
        setValue("emp_birth_date", data.user_birth_date);
        setfirst_name(data.user_first_name);
        setlast_name(data.user_last_name);
        setBirthDate(data.user_birth_date);
        // setCity(data.user_demographic.City);
        // setProvince(data.user_demographic.Province);
        setEmail(data.pmail_address);
        setNumber(data.uspo_number);
        setUserId(data.user_entity_id);

        return true;
      }
      return false;
    });
  };

  // const {  register,handleSubmit } = useForm<FormValues>();

  type FormValues = {
    emp_entity_id: number;
    emp_hire_date: string;
    emp_end_contract: string;
    emp_emp_number: string;
    emp_national_id: number;
    emp_birth_date: string;
    emp_joro_id: number;
    edhi_dept_id: number;
    emp_marital_status: string;
    emp_gender: string;
    emp_salaried_flag: string;
    user_role: number;
    emp_vacation_hours: number;
    emp_sickleave_hours: number;
    emp_current_flag: number;
    emp_type: string;
    emp_emp_entity_id: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    register;

    // console.log(data.user_role);

    // const data_hire_date = data.hireDate.split("/");
    // const convertHireDate =
    //   data_hire_date[2] + "-" + data_hire_date[1] + "-" + data_hire_date[0];
    // console.log(convertHireDate);

    // const end_contarct_date = data.endContract.split("/");
    // const converEndContract =
    //   end_contarct_date[2] +
    //   "-" +
    //   end_contarct_date[1] +
    //   "-" +
    //   end_contarct_date[0];
    // console.log(converEndContract);

    console.log("isiii", data);

    dispatch(doRequestCreateEmployeeInternal(data));
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
                  >
                    {props.talentId}
                  </Dialog.Title>
                  <div className="mt-6 w-full">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        defaultValue={inputText}
                        onChange={handleChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Employee by Username..."
                        required
                      />
                      <button
                        onClick={() => buttonSearch()}
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>

                    <form onSubmit={handleSubmit(handleRegistration)}>
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            value={first_name}
                            disabled
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={last_name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={email}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Phone Number
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            value={number}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Birthdate
                          </label>

                          <input
                            {...register("emp_birth_date")}
                            name="emp_birth_date"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            value={birthdate}
                            disabled
                          />
                        </div>
                        {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            City
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            value={city}
                            disabled
                          />
                        </div> */}
                        {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Province
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-zip"
                            type="text"
                            value={province}
                            disabled
                          />
                        </div> */}
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Employee NUmber
                          </label>
                          <input
                            {...register("emp_emp_number")}
                            name="emp_emp_number"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="codex123..."
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            National Number
                          </label>
                          <input
                            {...register("emp_national_id")}
                            name="emp_national_id"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="337..."
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Job Role
                          </label>
                          <select
                            {...register("emp_joro_id")}
                            name="emp_joro_id"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            {(jobrole || []).map((dt: any, index: any) => (
                              <option key={dt.joro_id} value={dt.joro_id}>
                                {dt.joro_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Department
                          </label>

                          <select
                            {...register("edhi_dept_id")}
                            name="edhi_dept_id"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            {(department || []).map((dt: any, index: any) => (
                              <option key={dt.dept_id} value={dt.dept_id}>
                                {dt.dept_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-2 mt-9">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Marital Status
                          </label>
                          <select
                            {...register("emp_marital_status")}
                            name="emp_marital_status"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={"M"}>Married</option>
                            <option value={"S"}>Single</option>
                          </select>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Gender
                          </label>
                          <select
                            {...register("emp_gender")}
                            name="emp_gender"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={"M"}>Male</option>
                            <option value={"F"}>Female</option>
                          </select>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Salaried Flag
                          </label>
                          <select
                            {...register("emp_salaried_flag")}
                            name="emp_salaried_flag"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={"0"}>Hourly</option>
                            <option value={"1"}>Salaried</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-2 mt-9">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            User Role
                          </label>
                          {/* <select
                                                        {...register('user_role')} name="user_role" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        {(userrole || []).map((dt: any, index: any) => (
                                                            <option key={dt.role_id} value={dt.role_id}>
                                                                {dt.role_name}
                                                            </option>
                                                        ))}
                                                    </select> */}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Vacation Hours
                          </label>
                          <input
                            {...register("emp_vacation_hours")}
                            name="emp_vacation_hours"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            placeholder="/Hours"
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Sickleave Hours
                          </label>
                          <input
                            {...register("emp_sickleave_hours")}
                            name="emp_sickleave_hours"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            placeholder="/Hours"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Hire Date
                          </label>
                          <div className="flex">
                            <div>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
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
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            End Contract
                          </label>
                          <div className="flex">
                            <div>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  slotProps={{
                                    actionBar: {
                                      actions: ["clear"],
                                    },
                                  }}
                                  format="DD/MM/YYYY"
                                  // label="Mulai"
                                  className="w-full"
                                  onChange={endContract}
                                />
                              </LocalizationProvider>
                              {/* <DatePicker selected={startDate} onChange={(a:any) => setStartDate(a)} /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Current Flag
                          </label>
                          <select
                            {...register("emp_current_flag")}
                            name="emp_current_flag"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option value={0}>Inactive</option>
                            <option value={1}>Active</option>
                          </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Type
                          </label>
                          <select
                            {...register("emp_type")}
                            name="emp_type"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option value={"internal"}>Internal</option>
                            <option value={"outsource"}>Outsource</option>
                          </select>
                        </div>
                      </div>
                      {/* <input
                          type="hidden"
                          value={7}
                          {...register("emp_emp_entity_id")}
                        /> */}
                      <div className="absolute right-8 text-sm">
                        <button className="p-1 mr-5 border-2 bg-cyan-400 hover:bg-blue-800 text-white">
                          Create Employee
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

export default CreateEmployee;
