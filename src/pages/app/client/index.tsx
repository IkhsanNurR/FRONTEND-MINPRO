import Content1 from "@/components/shared/content1";
import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@/components/jobHireSchema/pagination";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MyPage } from "@/components/types";
import { doRequestGetClient } from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";

const Jobs: MyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { client, refresh } = useSelector((state: any) => state.ClientReducers);

  useEffect(() => {
    dispatch(doRequestGetClient());
  }, [refresh]);

  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const handleSearchChange = () => {
    setIsSearching(true);
    const filtered = client.filter(
      (item: any) =>
        item.clit_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.indu_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const displayData = isSearching ? filteredData : client;

  {
    /* UNTUK PAGING START */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  {
    /* UNTUK PAGING START END*/
  }

  type FormValues = {
    search: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Content1
        title="list client"
        // fungsi1={router.push("/app/client/new")}
        fungsi1={() => router.push("/app/client/new")}
        namafungsi1="tambah client"
      >
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="container">
              <div className="w-full lg:pb-6">
                <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
                  <div className="pb-2 lg:pb-0">
                    <h1>Search client</h1>
                  </div>

                  <div className="pb-2 lg:pb-0 lg:pl-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className=" text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem] "
                        placeholder="Client"
                        value={searchValue}
                        {...register("search")}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pb-2 lg:pb-0 lg:pl-4">
                    <button
                      className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500"
                      onClick={handleSearchChange}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>

              <div></div>

              {/* TABEL */}
              <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-center text-gray-900">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        INDUSTRY NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        EMPLOYEE MAX & MIN
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {(currentItems || []).map((dt: any, index: any) => (
                      <tr className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {dt.clit_name}
                        </th>
                        <td className="px-6 py-4">{dt.indu_name}</td>
                        <td className="px-6 py-4">
                          {dt.emra_range_min} - {dt.emra_range_max}
                        </td>

                        <td className="px-6 py-4">
                          <div className="w-full text-right">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <MoreVertIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-gray-700 hover:text-gray-400 sm:flex"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-7 -mt-[4rem] mr-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          href={{
                                            pathname: `client/edit/`,
                                            query: {
                                              clit_id: dt.clit_id,
                                            },
                                          }}
                                          className={`${
                                            active
                                              ? "bg-blue-400 text-white"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          Edit
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>

                                  <div className="px-1 py-1">
                                    {/* <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={() => {
                                            // setProdCatById(data);
                                            // setIsDelete(true);
                                          }}
                                          className={`${
                                            active
                                              ? "bg-blue-400 text-white"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          Delete
                                        </button>
                                      )}
                                    </Menu.Item> */}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              ></Pagination>
            </footer>
          </form>
        </div>
      </Content1>
    </div>
  );
};

Jobs.Layout = "Admin";
export default Jobs;
