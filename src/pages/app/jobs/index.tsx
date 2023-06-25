import Content1 from "@/components/shared/content1";
import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@/components/jobHireSchema/pagination";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Link from "next/link";
import DeleteJobPost from "./delete";

import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestGetJobPost,
  doRequestUpdateStatus,
} from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import { MyPage } from "@/components/types";

const Jobs: MyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const [postById, setPostById] = useState("");

  /* DISPATCH START */
  let { job_post, refresh } = useSelector(
    (state: any) => state.JobPostReducers
  );

  useEffect(() => {
    dispatch(doRequestGetJobPost());
  }, [refresh]);

  /* DISPATCH END */

  /* FILTER START */

  const [selectedValue, setSelectedValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchChange = () => {
    setIsSearching(true);
    let filtered = job_post;
    if (selectedValue !== "all") {
      filtered = filtered.filter((item: { jopo_open: string }) =>
        item.jopo_open.toLowerCase().includes(selectedValue.toLowerCase())
      );
    }

    if (searchValue) {
      filtered = filtered.filter(
        (item: { jopo_title: string; indu_name: string }) =>
          item.jopo_title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.indu_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const displayData = isSearching ? filteredData : job_post;

  /* FILTER START */

  /* UNTUK PAGING START */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  /* UNTUK PAGING START END*/

  const handlePublishChange = (event: any, data: any) => {
    // console.log('IDIDID',data,'EVENT',event.target.checked)
    const status = event.target.checked ? "publish" : "draft";

    const union = { id: data, status: status };
    console.log(union);
    dispatch(doRequestUpdateStatus(union));
  };

  return (
    <div>
      {isDelete ? (
        <DeleteJobPost
          show={isDelete}
          postById={postById}
          closeModal={() => setIsDelete(false)}
        />
      ) : (
        ""
      )}

      <Content1
        title="jobs posting"
        namafungsi1="Posting Job"
        fungsi1={() => router.push("./jobs/new")}
      >
        <div className="container">
          <div className="w-full lg:pb-6">
            <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
              <div className="pb-2 lg:pb-0">
                <h1>Search by Category</h1>
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
                    placeholder="Title, Experience, Industry, Category"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="pb-4 lg:pb-0 lg:pl-4">
                <select
                  className="text-sm rounded-lg ring-1 block w-full p-2.5"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option value="all">Semua</option>
                  <option value="1">Open</option>
                  <option value="0">Closed</option>
                </select>
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

          {/* TABEL */}
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-900">
              <thead className="text-xs te  xt-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    TITLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    START END DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    UP TO SALARY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EXPERIENCE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    INDUSTRY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PUBLISH
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
                      {dt.jopo_title}
                    </th>
                    <td className="px-6 py-4">
                      {dt.jopo_start_date}
                      <br></br>
                      {dt.jopo_end_date}
                    </td>
                    <td className="px-6 py-4">IDR {dt.jopo_max_salary}</td>
                    <td className="px-6 py-4">
                      {dt.jopo_min_experience} - {dt.jopo_max_experience} Tahun
                    </td>
                    <td className="px-6 py-4">{dt.indu_name}</td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center  cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={dt.jopo_status === "publish"}
                          onChange={(event) =>
                            handlePublishChange(event, dt.jopo_entity_id)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
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
                                        pathname: "jobs/edit",
                                        query: {
                                          id: dt.jopo_entity_id,
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
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        setPostById(dt.jopo_entity_id);
                                        setIsDelete(true);
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
                                </Menu.Item>
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
        {/* <div className="h-16 bg-transparent">

        </div> */}
        <div className="lg:fixed lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 py-5">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          ></Pagination>
        </div>
      </Content1>
    </div>
  );
};

Jobs.Layout = "Admin";
export default Jobs;
