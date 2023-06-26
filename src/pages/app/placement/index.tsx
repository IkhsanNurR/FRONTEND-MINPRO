import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu, Switch, Transition } from "@headlessui/react";
import { AiOutlineSearch, AiOutlineInteraction } from "react-icons/ai";
import { BsThreeDotsVertical, BsTrash3, BsPencil } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
// import SwitchAction from "./switch-action";
import { MyPage } from "@/components/types";
import Content from "@/components/shared/content";
import Content1 from "@/components/shared/content1";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  doRequestGetEmployee,
  doRequestTalent,
} from "@/redux/hrSchema/action/actionReducer";
import JoinPlacement from "./join-placement";

const Placement: MyPage = (props: any) => {
  // const {employee,message,refresh} = useSelector((state:any)=>state.EmployeeReducer)
  const { talent, message, refresh } = useSelector(
    (state: any) => state.TalentBootcampReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doRequestTalent());

    console.log(talent);
    console.log("kkk");
  }, [refresh]);

  const router = useRouter();

  const [isAction, setIsAction] = useState(false);
  const [joinPlacement, setJoinPlacement] = useState(false);
  const [isId, setIsId] = useState(0);
  const [dataTalent, setDataTalent] = useState();

  function StarRating({ rating }: { rating: number }) {
    const totalStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    return (
      <div className="flex">
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={index} className="mr-1 mb-3 text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="mr-1 mb-3 text-yellow-500" />}
        {Array.from(
          { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
          (_, index) => (
            <FaStar
              key={index + fullStars + (hasHalfStar ? 1 : 0)}
              className="mr-1 text-gray-400"
            />
          )
        )}
      </div>
    );
  }

  let currentPage = 0;
  let allPage = 10;

  // let pageRow = Math.ceil(talent.length/10)
  let pageRow = 2;

  const [slicePageStart, setSlicePageStart] = useState(0);
  const [slicePageEnd, setSlicePageEnd] = useState(1);

  const buttonDetail = (idTalent: any): any => {
    setIsId(idTalent);
    router.push(`placement/detail/`);
  };

  const openJoin = (id_user_talent: any) => {
    setJoinPlacement(true);
    setDataTalent(id_user_talent);
  };

  const changeColor = (pageid: any): any => {
    let hitung = 0;

    currentPage = pageid;
    hitung = (currentPage - 1) * 10;
    console.log(currentPage);
    setSlicePageEnd(currentPage);
    setSlicePageStart(hitung);

    console.log("iniawal");
    console.log(slicePageStart);
    console.log("iniakhir");
    console.log(slicePageEnd);
  };

  const renderPage = (): any => {
    const page = [];
    for (let i: number = 1; i <= pageRow; i++) {
      page.push(
        <a
          onClick={() => changeColor(i)}
          href="#"
          className={`${
            currentPage === i
              ? "bg-indigo-500 text-white focus-visible:outline-indigo-600"
              : "bg-white text-black"
          } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-solid border-gray-300`}
        >
          {i}
        </a>
      );
    }

    return page;
  };

  return (
    <>
      <Content1
        title="Placement"
        fungsi1={() => router.back()}
        namafungsi1="back"
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
              <select className="text-white absolute left-56 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 ">
                <option selected>Status</option>
                <option value="US">On Bootcamp</option>
                <option value="CA">Idle</option>
                <option value="FR">Trial</option>
                <option value="DE">Placement</option>
              </select>
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
          <h2>Pilih Talent untuk Placement</h2>
          <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-10 pt-2 px-10  ">
            {(talent || [])?.map((dt: any, index: any) => (
              <div
                key={dt.id}
                className="max-w-sm bg-white rounded-lg shadow border border-gray-200  "
              >
                <img
                  src={`http://localhost:3001/public/users/image/${dt.user_photo}`}
                  alt="profile"
                  className="h-60 w-60 object-cover object-center rounded-full"
                />

                <div className="p-2 bg-white">
                  <a href="#">
                    <h3 className="mb-0 text-2xl font-bold tracking-tight text-gray-900">
                      {dt.user_first_name + " " + dt.user_last_name}
                    </h3>
                  </a>
                  <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">
                    {dt.status}
                  </p>
                  <div className="columns-2 mb-2 text-xs">
                    <h6>{dt.batch_name}</h6>
                    <h6>{dt.talent_skill}</h6>
                  </div>
                  {/* <div className="mb-3 flex">
                    {Array.from({ length: 4 }, (_, index) => (
                      <FaStar
                        key={index}
                        className="mr-1" // Jarak antara gambar bintang
                      />3
                    ))}
                  </div> */}
                  <StarRating rating={dt.talent_score} />
                  <div className="grid grid-cols-3 gap-1 text-sm text-gray-700 border-gray-200">
                    <button
                      onClick={() => openJoin(dt)}
                      className="col-span-2 text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-xs px-1 py-2 text-center"
                      //   className="col inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Join Placement
                    </button>
                    {/* <div>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md px-1 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <BsThreeDotsVertical
                              className="ml-2 mr-1 text-gray-700 hover:text-gray-400 sm:flex"
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
                                  <button
                                    onClick={() => {
                                      setIsAction(true);

                                      setIsId(dt.id);
                                    }}
                                    className={`${
                                      active
                                        ? "bg-blue-gray-700 text-white"
                                        : "text-gray-700"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <AiOutlineInteraction
                                        className="mr-2 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <AiOutlineInteraction
                                        className="mr-2 h-5 w-5 text-gray-700"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Switch Action
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => buttonDetail(dt.id)}
                                    className={`${
                                      active
                                        ? "bg-blue-gray-700 text-white"
                                        : "text-gray-700"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <CgDetailsMore
                                        className="mr-2 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <CgDetailsMore
                                        className="mr-2 h-5 w-5 text-gray-700"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Detail
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
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
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">{allPage}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {renderPage()}
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {joinPlacement ? (
          <JoinPlacement
            show={joinPlacement}
            closeModal={(): any => setJoinPlacement(false)}
            dataTalent={dataTalent}
          />
        ) : (
          ""
        )}
      </Content1>
    </>
  );
};
Placement.Layout = "Admin";
export default Placement;
