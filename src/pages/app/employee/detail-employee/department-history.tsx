import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Content1 from "@/components/shared/content1";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestDepartmentHistory,
  doRequestFindEmployee,
} from "@/redux/hrSchema/action/actionReducer";
import EditEmployee from "../edit-employee";
import { MyPage } from "@/components/types";
import dayjs from "dayjs";

const DepartmentHistory: MyPage = (props: any) => {
  const dispatch = useDispatch();

  const { detailEmployee, departmentHistory, message, refresh } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [editEmployee, setEditEmployee] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // dispatch({type:"RESET_STATE"})
    if (router.isReady) {
      // Code using query
      console.log(router.query);
      const { id }: any = router.query;
      dispatch(doRequestFindEmployee(id));
      dispatch(doRequestDepartmentHistory(id));
      console.log("dataemployee", detailEmployee);
      // this will set the state before component is mounted
    }
  }, [router.isReady]);

  // if (!id) {
  //     return (
  //         <div className="relative flex min-h-screen flex-col justify-center items-center">
  //             Loading
  //         </div>
  //     )
  // }

  return (
    <>
      <Content1
        title="Department History"
        fungsi1={() => router.back()}
        namafungsi1="back"
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
            <div className="border-2 border-gray-700 rounded-lg w-full absolute top-24">
              <div>
                <h1 className="text-2xl font-bold p-2">Summary</h1>
              </div>
              <div className="border-double border-t-2 border-gray-700 ">
                <div className="px-4">
                  <dl className="divide-y divide-gray-100">
                    {(departmentHistory || []).map((dt: any, index: any) => (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {dt.dept_name}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-1 sm:mt-0">
                          {dayjs(dt.edhi_start_date).format("DD/MM/YYYY")}
                        </dd>
                        <dt className="mt-1 text-sm leading-6 text-gray-700 col-span-1 sm:mt-0">
                          {dayjs(dt.edhi_end_date).format("DD/MM/YYYY")}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
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
DepartmentHistory.Layout = "Admin";
export default DepartmentHistory;
