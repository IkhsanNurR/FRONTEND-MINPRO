import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Content1 from "@/components/shared/content1";
import { useDispatch, useSelector } from "react-redux";
import {
  doCreateSalary,
  doRequestFindEmployee,
} from "@/redux/hrSchema/action/actionReducer";
import EditEmployee from "../edit-employee";
import Link from "next/link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, set } from "date-fns";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { MyPage } from "@/components/types";

const Salary: MyPage = (props: any) => {
  const dispatch = useDispatch();

  const { detailEmployee, message, refresh } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [editEmployee, setEditEmployee] = useState(false);

  const [rupiah, setRupiah] = useState("");

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    dispatch(doRequestFindEmployee(id));

    console.log("dataEmployee", detailEmployee);
    register("ephi_entity_id");
    setValue("ephi_entity_id", detailEmployee.user_entity_id);
  }, [refresh, router.isReady]);

  // const convertRupiah =  (rupiah:any)  =>{

  //         const rupiahValue = rupiah.target.value
  //         const convert = rupiahValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  // }

  const dateSalary = (date: any) => {
    register("ephi_rate_change_date");

    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");

      const dateSalary = formattedDate.split("/");
      const convertDateSalary =
        dateSalary[2] + "-" + dateSalary[1] + "-" + dateSalary[0];
      setValue("ephi_rate_change_date", convertDateSalary); // Set the value of "StartPeriod" field in the form
    }
  };

  type FormValues = {
    ephi_entity_id: number;
    ephi_rate_change_date: string;
    ephi_rate_salary: number;
    ephi_pay_frequence: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    register;
    console.log("dataSalary", data);

    dispatch(doCreateSalary(data));

    router.push("/app/employee/");
  };

  return (
    <>
      <Content1
        title="Employee Profile"
        fungsi1={() => router.back()}
        namafungsi1="Back"
      >
        <div>
          <div className="flex left-0 top-6 mb-4">
            <img
              src={`http://localhost:3001/public/users/image/${detailEmployee.user_photo}`}
              alt="profile"
              className="h-20 w-20 object-cover object-center rounded-full"
            />
            <div className="grid grid-cols-10 gap-4 ml-6 left-24 top-6">
              <div className="col-start-1 col-end-3">
                <h1>
                  {detailEmployee.user_first_name +
                    " " +
                    detailEmployee.user_last_name}
                </h1>
                <h1>{detailEmployee.uspo_number}</h1>
                <h1>{detailEmployee.pmail_address}</h1>
              </div>
            </div>
          </div>
          <div className="static">
            <div className="border-2 border-gray-700 rounded-lg w-full absolute top-24 ">
              <div>
                <h1 className="text-2xl font-bold p-2">Employee Wages</h1>
              </div>
              <form onSubmit={handleSubmit(handleRegistration)}>
                <div className="border-double border-t-2 border-gray-700 ">
                  <div className="px-4">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Paid
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <input
                            {...register("ephi_rate_salary")}
                            type="currency"
                            // value={rupiah}
                            // onChange={convertRupiah}
                            className="bg-gray-50 border border-gray-300 
                                                            focus:border-blue-500 block w-full p-2.5 
                                                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Rupiah"
                            required
                          />
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          salary month
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
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
                                onChange={dateSalary}
                              />
                            </LocalizationProvider>
                            {/* <DatePicker selected={startDate} onChange={(a:any) => setStartDate(a)} /> */}
                          </div>
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Salary Frequence
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <select
                            {...register("ephi_pay_frequence")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          >
                            <option selected>Choose Frequence</option>
                            <option value={1}>Monthly</option>
                            <option value={2}>Weekly</option>
                          </select>
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 text-right ">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                            Create Salary
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </form>

              {/* <button onClick={() => router.push('/app/employee')} className='bg-blue-500 rounded-lg my-2 text-sm text-white font-medium absolute p-3 px-5 right-0'>Close</button> */}
            </div>
          </div>
        </div>

        {editEmployee ? (
          <EditEmployee
            show={editEmployee}
            closeModal={(): any => setEditEmployee(false)}
            data={detailEmployee}
          />
        ) : (
          ""
        )}
      </Content1>
    </>
  );
};

Salary.Layout = "Admin";

export default Salary;
