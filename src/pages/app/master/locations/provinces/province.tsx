import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import EditProv from "./editProv";
import AddProv from "./addProvince";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { reqDelProv } from "@/redux/MasterBaruSchema/actions/actionReducer";

const Province = (props: any) => {
  const dispatch = useDispatch();
  console.log(props);
  const [dataCode, setDataCode] = useState("");
  const [dataProv, setDataProv] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const handleDelete = async (data: string) => {
    console.log("prov", { data });
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
        dispatch(reqDelProv(data));
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
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="border font-bold text-lg">Province</div>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b  bg-blue-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Province Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Province Code
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    <div className="flex justify-end pr-7 ">
                      <button
                        className="flex items-center shadow w-auto bg-green-500 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold  px-4 py-2 rounded"
                        onClick={() => {
                          setIsAdd(true);
                          setDataCode(props.country);
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
                {props.prov &&
                  props.prov[0]?.map((prov: any, index: any) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-neutral-100 dark:bg-neutral-200"
                          : "bg-white dark:bg-neutral-100"
                      }
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {prov.prov_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {prov.prov_code}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex justify-end">
                          <div className="pt-2 shadow w-auto bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold px-3 rounded-md">
                            <div className="flex items-center">
                              <BsPencil className="mr-1" />
                              <span className="font-bold">
                                <button
                                  onClick={() => {
                                    setDataCode(props.country);
                                    setDataProv(prov);
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
                                  onClick={() => handleDelete(prov.prov_id)}
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
      {isEdit ? (
        <EditProv
          show={isEdit}
          closeModal={() => setIsEdit(false)}
          dataCode={dataCode}
          dataProv={dataProv}
        />
      ) : (
        ""
      )}
      {isAdd ? (
        <AddProv
          show={isAdd}
          closeModal={() => setIsAdd(false)}
          dataCode={dataCode}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Province;
