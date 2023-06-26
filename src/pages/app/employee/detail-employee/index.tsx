import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Content1 from "@/components/shared/content1";
import { useDispatch, useSelector } from "react-redux";
import { doRequestFindEmployee } from "@/redux/hrSchema/action/actionReducer";
import EditEmployee from "../edit-employee";
import Link from "next/link";
import { MyPage } from "@/components/types";

const DetailEmployee: MyPage = (props: any) => {
  const dispatch = useDispatch();

  const { detailEmployee, message, refresh } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [editEmployee, setEditEmployee] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    dispatch(doRequestFindEmployee(id));
    console.log("dataEmployee", detailEmployee);
  }, [refresh, router.isReady]);

  return (
    <>
      <Content1
        title="Employee Profile"
        fungsi1={() => setEditEmployee(true)}
        namafungsi1="Edit Profile"
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
              <div className="col-end-11 col-span-5">
                {/* <button  */}
                <Link
                  href={{
                    pathname:
                      "/app/employee/detail-employee/department-history",
                    query: {
                      id: detailEmployee.user_entity_id,
                    },
                  }}
                  className="ml-16 p-2 text-gray-600 border-b font-medium text-sm hover:text-blue-600 hover:border-blue-500"
                >
                  Department History
                </Link>
                <Link
                  href={{
                    pathname: "/app/employee/detail-employee/pay-history",
                    query: {
                      id: detailEmployee.user_entity_id,
                    },
                  }}
                  className="p-2 text-gray-600 border-b font-medium text-sm m-4 hover:text-blue-600 hover:border-blue-500"
                >
                  Salary History
                </Link>
              </div>
            </div>
          </div>
          <div className="static">
            <div className="border-2 border-gray-700 rounded-lg w-full absolute top-24">
              <div>
                <h1 className="text-2xl font-bold p-2">Employee Information</h1>
                {/* <h1 className='text-sm m-2'>
                  Ask talent to full fill application
                </h1> */}
              </div>
              <div className="border-double border-t-2 border-gray-700 ">
                <div className="px-4">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        User name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.user_name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Employee Code
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.emp_emp_number}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Employee Type
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.emp_type}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Department
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.dept_name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Job Role
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.joro_name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Periode
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {detailEmployee.emp_hire_date}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Notes
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        mana tau ada yang mau diganti hehe
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Attachments
                      </dt>
                      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                          role="list"
                          className="divide-y divide-gray-100 rounded-md border border-gray-200"
                        >
                          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">
                                  resume_back_end_developer.pdf
                                </span>
                                <span className="flex-shrink-0 text-gray-400">
                                  2.4mb
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">
                                  coverletter_back_end_developer.pdf
                                </span>
                                <span className="flex-shrink-0 text-gray-400">
                                  4.5mb
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <button
                onClick={() => router.push("/app/employee")}
                className="bg-blue-500 rounded-lg my-2 text-sm text-white font-medium absolute p-3 px-5 right-0"
              >
                Close
              </button>
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
DetailEmployee.Layout = "Admin";
export default DetailEmployee;
