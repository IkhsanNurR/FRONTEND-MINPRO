import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu, Switch, Transition } from "@headlessui/react";
import { AiOutlineSearch, AiOutlineInteraction } from "react-icons/ai";
import {
  BsThreeDotsVertical,
  BsTrash3,
  BsPencil,
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
// import SwitchAction from '../placement/switch-action';
import { MyPage } from "@/components/types";
import Content from "@/components/shared/content";
import Content1 from "@/components/shared/content1";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { doRequestGetEmployee } from "@/redux/hrSchema/action/actionReducer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateEmployee from "./create-employee";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentsIcon from "@mui/icons-material/Payments";
import Link from "next/link";

const Placement: MyPage = (props: any) => {
  const { employee, message, refresh } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [detail, setDetail] = useState(false);
  const [dataTalent, setDataTalent] = useState();
  const [dataEmployee, setDataEmployee] = useState();

  const dispatch = useDispatch();

  // const detailEmployee = (data : any) =>{
  //   setDetail(true)
  //   setDataTalent(data)
  //   console.log("DATTTTTAAAA",data);
  //   router.push(`employee/${data.user_entity_id}`)
  // }

  const router = useRouter();

  const [isAction, setIsAction] = useState(false);
  const [isCreateEmployee, setIsCreateEmployee] = useState(false);
  const [dataInput, setDataInput] = useState("");
  const [filterData, setFilteredData] = useState();
  const [searchValue, setSearchValue] = useState(false);

  // let currentPage = 0
  let allPage = 10;

  let pageRow = Math.ceil(employee.length / 10);

  const [slicePageStart, setSlicePageStart] = useState(0);
  const [slicePageEnd, setSlicePageEnd] = useState(1);

  const buttonDetail = (emp_entity: any): any => {
    router.push({
      pathname: "employee/detail-employee",
      query: { id: emp_entity },
    });
  };

  const createDataEmployee = (): any => {
    setIsCreateEmployee(true);
  };

  // const handleSearchChange = () => {
  //   setCurrentPage(1)
  //   setIsSearching(true);
  //   const searched = job_post.filter((item: any) => {
  //     const jopoTitle = item.jopo_title?.toLowerCase() ?? '';
  //     const jopoMinExperience = typeof item.jopo_min_experience === 'string' ? item.jopo_min_experience.toLowerCase() : '';
  //     const clitInduCode = item.clit_indu_code?.toLowerCase() ?? '';

  //     return (
  //       jopoTitle.includes(searchValue.toLowerCase()) ||
  //       jopoMinExperience.includes(searchValue.toLowerCase()) ||
  //       clitInduCode.includes(searchValue.toLowerCase())
  //     );
  //   });

  //   const filtered = searchFilter
  //   ? searched.filter((item: any) => item.jopo_open === searchFilter)
  //   : searched;

  //   setFilteredData(filtered);
  // };

  const changeColor = (pageid: any): any => {
    let hitung = 0;

    // currentPage = pageid
    // hitung = (currentPage - 1) * 10
    // console.log(currentPage);
    // setSlicePageEnd(currentPage)
    // setSlicePageStart(hitung)

    console.log("iniawal");
    console.log(slicePageStart);
    console.log("iniakhir");
    console.log(slicePageEnd);
  };

  // const renderPage = (): any => {
  //   const page = []
  //   for (let i: number = 1; i <= pageRow; i++) {
  //     page.push(
  //       <a onClick={() => changeColor(i)}
  //         href="#"
  //         className={`${currentPage === i
  //           ? "bg-indigo-500 text-white focus-visible:outline-indigo-600"
  //           : "bg-white text-black"
  //           } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-solid border-gray-300`}

  //       >
  //         {i}
  //       </a>

  //     )
  //   }

  //   return page

  // }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPage = employee ? Math.ceil(employee.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = employee ? employee?.slice(startIndex, endIndex) : 0;

  const isDisabled = currentPage === 1;
  const isDisabledr = currentPage === totalPage;

  useEffect(() => {
    dispatch(doRequestGetEmployee());
    console.log(employee);
    // setDataEmployee(employee)
  }, [refresh]);

  //currentItems, itemsPerPage,
  return (
    <>
      <Content1
        title="Employee"
        fungsi1={() => createDataEmployee()}
        namafungsi1="Create Employee"
      >
        <div className="flex justify-center w-full h-14 border-solid border-2 pt-2">
          <div className="relative right-20">Search By Category</div>
          <form>
            <div className="relative right-16">
              <div className="absolute inset-y-0 left-2 flex items-center pl-1 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                type="search"
                className="block w-full p-1 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="talent name, technology"
                required
              ></input>
              {/* <select className="text-white absolute left-56 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 ">
                <option selected>Status</option>
                <option value="US">On Bootcamp</option>
                <option value="CA">Idle</option>
                <option value="FR">Trial</option>
                <option value="DE">Placement</option>
              </select> */}
              <button
                type="submit"
                className="text-white absolute left-96 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 "
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="pt-2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400 border-black">
              <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Position</th>
                  <th className="text-center">Employee Code</th>
                  <th className="text-center">Employee Type</th>
                  <th></th>
                </tr>
              </thead>

              {(currentItems || []).map((dt: any, index: any) => (
                <tr className="border-2 ">
                  <td className="text-center">
                    {dt.user_first_name + " " + dt.user_last_name}
                  </td>
                  <td className="text-center">{dt.joro_name}</td>
                  <td className="text-center">{dt.emp_emp_number}</td>
                  <td className="text-center">{dt.emp_type}</td>
                  <td className="text-right">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          <BsThreeDotsVertical
                            className="ml-2 -mr-1 text-gray-700 hover:text-gray-400 sm:flex"
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
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={{
                                    pathname: "employee/detail-employee",
                                    query: {
                                      id: dt.user_entity_id,
                                    },
                                  }}
                                  className={`${
                                    active
                                      ? "bg-violet-500 text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <AccountCircleIcon
                                      className="mr-2 h-5 w-5 text-violet-400"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <AccountCircleIcon
                                      className="mr-2 h-5 w-5 text-neutral-600"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Detail
                                </Link>

                                // <button
                                //   onClick={()=>detailEmployee(dt)}
                                //   className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                //     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                //   {active ? (
                                //     <AccountCircleIcon
                                //       className="mr-2 h-5 w-5 text-violet-400"
                                //       aria-hidden="true" />) : (
                                //     <AccountCircleIcon
                                //       className="mr-2 h-5 w-5 text-neutral-600"
                                //       aria-hidden="true" />)}
                                //   Detail
                                // </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  // onClick={() => { getIdDelete(dt.id_product) }}
                                  className={`${
                                    active
                                      ? "bg-violet-500 text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <PaymentsIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PaymentsIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Salary
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
              <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{endIndex}</span> of{" "}
                    <span className="font-medium">
                      {employee ? employee.length : 0}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      // href="#"
                      className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                      disabled={isDisabled}
                    >
                      <span className="sr-only">Previous</span>
                      <BsArrowLeftShort
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    {Array.from({ length: totalPage }).map(
                      (_: any, index: any) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;

                        return (
                          <button
                            key={pageNumber}
                            // href="#"
                            className={`relative inline-flex items-center ${
                              isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-offset-0"
                            } px-4 py-2 text-sm font-semibold`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                    )}
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                    <button
                      // href="/${nextPage}"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                      disabled={isDisabledr}
                    >
                      <span className="sr-only">Next</span>
                      <BsArrowRightShort
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div> */}
            {/* <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{allPage}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* {renderPage()} 
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div> */}
          </div>
        </div>
        {isCreateEmployee ? (
          <CreateEmployee
            show={isCreateEmployee}
            closeModal={(): any => setIsCreateEmployee(false)}
          />
        ) : (
          ""
        )}
        {/* {detail?<DetailEmployee talentData={dataTalent} />:''} */}
      </Content1>
    </>
  );
};
Placement.Layout = "Admin";
export default Placement;
