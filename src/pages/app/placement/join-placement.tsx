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
  doRequestClientBootcamp,
  doRequestCreateEmployeeBootcamp,
  doRequestCreateEmployeeInternal,
  doRequestGetFilterDepartment,
  doRequestGetFilterJobRole,
  doRequestGetFilterUserRole,
  doRequestGetForEmployee,
  doRequestJobType,
} from "@/redux/hrSchema/action/actionReducer";
import { Select } from "antd";

//

const JoinPlacement = (props: any) => {
  const { client, jobrole, department, jobtype, message, refresh } =
    useSelector((state: any) => state.TalentBootcampReducer);

  const [inputText, setInputText] = useState("");

  const [hire_date, sethire_date] = useState("");
  const [end_contarct, setend_contarct] = useState("");
  const [clientName, setClientName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const handleSearchChange = () => {
    setIsSearching(true);

    register("emp_entity_id");
    setValue("emp_entity_id", props.dataTalent.user_entity_id);
    register("emp_birth_date");
    setValue("emp_birth_date", props.dataTalent.user_birth_date);
    register("ecco_account_manager");
    setValue("ecco_account_manager", 7);
    register("emp_emp_entity_id");
    setValue("emp_emp_entity_id", 7);
    register("ecco_media_link");
    setValue("ecco_media_link", "tanda tanya");

    const filtered = client.filter((item: any) => {
      const clitName = item.clit_name?.toLowerCase() ?? "";
      const induName = item.indu_name?.toLowerCase() ?? "";

      return (
        clitName.includes(searchValue.toLowerCase()) ||
        induName.includes(searchValue.toLowerCase())
      );
    });

    setFilteredData(filtered);
    if (filtered.length > 0) {
      setClientName(filtered[0].clit_name);
      register("ecco_clit_id");
      setValue("ecco_clit_id", filtered[0].clit_id);
    }

    console.log("ini data", clientName);
  };

  const displayData = isSearching ? filteredData : client;

  const hireDate = (date: any) => {
    register("hireDate");
    sethire_date(date);

    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      const data_hire_date = formattedDate.split("/");
      const convertHireDate =
        data_hire_date[2] + "-" + data_hire_date[1] + "-" + data_hire_date[0];
      setValue("hireDate", convertHireDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const endContract = (date: any) => {
    register("endContract");
    setend_contarct(date);

    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      const data_hire_date = formattedDate.split("/");
      const convertHireDate =
        data_hire_date[2] + "-" + data_hire_date[1] + "-" + data_hire_date[0];

      setValue("endContract", convertHireDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const textField = (text: any) => {
    register("ecco_notes");
    setValue("ecco_notes", text);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doRequestClientBootcamp());
    dispatch(doRequestGetFilterJobRole());
    dispatch(doRequestGetFilterDepartment());
    dispatch(doRequestJobType());

    console.log(props.dataTalent);

    console.log("iniClient", client);
  }, [refresh]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  type FormValues = {
    emp_entity_id: number;
    ecco_contract_no: string;
    hireDate: string;
    endContract: string;
    emp_emp_number: string;
    emp_national_id: number;
    emp_birth_date: string;
    edhi_dept_id: number;
    emp_type: string;
    emp_emp_entity_id: number;
    ecco_notes: string;
    ecco_joty_id: number;
    ecco_account_manager: number;
    ecco_clit_id: number;
    ecco_status: string;
    ecco_media_link: string;
    talent_status: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    register;

    console.log("isi data placemnet", data);
    dispatch(doRequestCreateEmployeeBootcamp(data));
    props.closeModal();

    // const isiData: any = new FormData()

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
                  >
                    {props.dataTalent.user_first_name +
                      " " +
                      props.dataTalent.user_last_name}
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
                        defaultValue={searchValue}
                        onChange={handleChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Client ..."
                        required
                      />
                      <button
                        onClick={() => handleSearchChange()}
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>

                    <form onSubmit={handleSubmit(handleRegistration)}>
                      <div className="flex flex-wrap -mx-3 mt-3">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Client Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={clientName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-3">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Contract No
                          </label>
                          <input
                            {...register("ecco_contract_no")}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mt-3">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Employee Code
                          </label>
                          <input
                            {...register("emp_emp_number")}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-2 mt-5">
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
                      <div className="flex flex-wrap -mx-3 mb-2 mt-9">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Position
                          </label>
                          <select
                            {...register("ecco_joty_id")}
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            {(jobtype || []).map((dt: any, index: any) => (
                              <option key={dt.joty_id} value={dt.joty_id}>
                                {dt.joty_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Contract Status
                          </label>
                          <select
                            {...register("ecco_status")}
                            name="ecco_status"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option value={"onsite"}>Onsite</option>
                            <option value={"online"}>Online</option>
                            <option value={"hybrid"}>Hybrid</option>
                          </select>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Talent Status
                          </label>
                          <select
                            {...register("talent_status")}
                            name="talent_status"
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={"iddle"}>Iddle</option>
                            <option value={"placement"}>Placement</option>
                            <option value={"trial"}>Trial</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mt-1">
                        <div className="w-full px-3">
                          <div>
                            <TextField
                              onChange={(e) => textField(e.target.value)}
                              // ecco_notes

                              id="review"
                              variant="outlined"
                              label="Notes"
                              autoComplete="off"
                              className="w-full mt-5"
                              multiline
                              maxRows={4}
                              inputProps={{
                                maxLength: 1024,
                                "aria-valuemax": 1024,
                              }}
                              // {...register("review", { required: true })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-8 text-sm">
                        <button
                          type="submit"
                          className="p-1 mr-5 border-2 bg-cyan-400 hover:bg-blue-800 text-white"
                        >
                          Create Contract
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

export default JoinPlacement;
