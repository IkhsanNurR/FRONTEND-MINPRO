import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import AddCountry from "./AddCountry";
import Swal from "sweetalert2";
import { reqDelCountry } from "@/redux/MasterBaruSchema/actions/actionReducer";
import { useDispatch } from "react-redux";
import EditCountry from "./EditCountry";

const Country = (props: any) => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isData, setIsData] = useState("");

  const handleDelete = async (data: string) => {
    console.log("1", { data });
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        dispatch(reqDelCountry(data));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Cancelled", "Your file is safe.", "info");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire("Error!", "Failed to delete data. Please try again.", "error");
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="border font-bold text-lg">Country</div>
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b  bg-blue-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Country Code
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Country Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-right">
                      <div className="flex justify-end pr-7 ">
                        <button
                          className="flex items-center shadow w-auto bg-green-500 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold  px-4 py-2 rounded"
                          onClick={() => {
                            setIsAdd(true);
                          }}
                        >
                          <GrAddCircle className="mr-1"></GrAddCircle>
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.country?.map((cont: any, index: any) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-neutral-100 dark:bg-neutral-200"
                          : "bg-white dark:bg-neutral-100"
                      }
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {cont.country_code}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {cont.country_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex justify-end">
                          <div className="pt-2 shadow w-auto bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold px-3 rounded-md">
                            <div className="flex items-center">
                              <BsPencil className="mr-1" />
                              <span className="font-bold">
                                <button
                                  onClick={() => {
                                    setIsData(cont);
                                    setIsEdit(true);
                                  }}
                                >
                                  Edit
                                </button>
                              </span>
                            </div>
                          </div>
                          <span className="px-0.5"></span>

                          <div className="py-2 shadow w-auto bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold  px-3 rounded-md">
                            <div className="flex items-center">
                              <TiDeleteOutline className="mr-1" />
                              <span className="font-bold">
                                <button
                                  onClick={() =>
                                    handleDelete(cont.country_code)
                                  }
                                >
                                  Delete
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isAdd ? (
        <AddCountry show={isAdd} closeModal={() => setIsAdd(false)} />
      ) : (
        ""
      )}
      {isEdit ? (
        <EditCountry
          show={isEdit}
          closeModal={() => setIsEdit(false)}
          data={isData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Country;
