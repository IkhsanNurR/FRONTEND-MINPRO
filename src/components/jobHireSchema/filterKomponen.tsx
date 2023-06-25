import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { doRequestGetWorktype } from "@/redux/jobhireSchema/master-jobhireSchema/action/actionReducer";

const FilterComp = (props: any) => {
  const {
    handleToggle,
    valueCheck,
    handleCheckboxChange,
    handleCheckboxChangeExpe,
    handleOptionChange,
    handleNewestButton,
    handleMatchButton,
  } = props;

  const dispatch = useDispatch();
  let { work_type, refresh } = useSelector(
    (state: any) => state.WorktypeReducers
  );

  const rangeExpe = [
    { value: "0-0", label: "< 1 Tahun" },
    { value: "1-3", label: "1 - 3 Tahun" },
    { value: "5-10", label: "5 - 10 Tahun" },
    { value: "11-100", label: "> 10 Tahun" },
  ];

  const terUpdate = [
    { value: "24 Jam Terakhir", label: "24 Jam Terakhir" },
    { value: "Seminggu Terakhir", label: "Seminggu Terakhir" },
    { value: "Sebulan Terakhir", label: "Sebulan Terakhir" },
    { value: "Kapan pun", label: "Kapan pun" },
  ];

  useEffect(() => {
    dispatch(doRequestGetWorktype());
  }, [refresh]);

  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <button
        className="p-2 rounded-lg lg:hidden mb-5 flex items-center gap-3 justify-center w-full text-white bg-blue-400 border-2 border-transparent hover:bg-white hover:text-black hover:border-blue-400"
        onClick={() => {
          setOpenNav(!openNav);
        }}
      >
        {openNav ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <div className="flex items-center gap-3 justify-center">
            <AdjustmentsHorizontalIcon className="w-6 h-6" /> Filter Pencarianmu
          </div>
        )}
      </button>

      <div
        className={`pr-5 pb-5 lg:block ${openNav ? "flex mx-auto" : "hidden"}`}
      >
        <div
          className={`overflow-y-auto h-[32rem] w-[22rem] ${
            openNav ? "overflow-y-hidden h-full mx-5" : ""
          } `}
        >
          <div>
            <div className="mx-auto w-full max-w-md  border p-2">
              <Disclosure as="div" className="">
                <>
                  <Disclosure.Button className="flex w-full justify-between  text-md px-4 py-2 text-left font-medium text-black ">
                    <span>Filter Pencarianmu</span>
                  </Disclosure.Button>
                </>
              </Disclosure>

              {/* Tampilankan Berdasar */}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between border-t-2 px-4 py-2 text-left text-md font-medium text-black hover:text-blue-500">
                      <span>Tampilan berdasarkan</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="relative flex flex-wrap justify-center pb-3">
                        <button
                          type="button"
                          className="flex justify-center items-center h-7 w-20 text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium rounded-lg text-xs px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800"
                          onClick={handleMatchButton}
                        >
                          Match
                        </button>

                        <button
                          type="button"
                          className="flex justify-center items-center h-7 w-20 text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium rounded-lg text-xs px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800"
                          onClick={handleNewestButton}
                        >
                          Newest
                        </button>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Tipe Pekerjaan */}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between border-t-2 px-4 py-2 text-left text-md font-medium text-black hover:text-blue-500">
                      <span>Tipe Pekerjaan</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="grid grid-rows-1 gap-3 pl-1 pb-5  ">
                        {work_type.map((option: any) => (
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                              value={option.woty_code}
                              onChange={handleCheckboxChange}
                            />
                            <span className="ml-2 text-gray-700">
                              {option.woty_name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Pengalaman */}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between border-t-2 px-4 py-2 text-left text-md font-medium text-black hover:text-blue-500">
                      <span>Pengalaman</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="grid grid-rows-1 gap-3 pl-1 pb-5 ">
                        {rangeExpe.map((option: any) => (
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                              value={option.value}
                              onChange={handleCheckboxChangeExpe}
                            />
                            <span className="ml-2 text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Remote */}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Panel className="border-t-2 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="pl-1 pt-2 text-center">
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={valueCheck}
                            onChange={handleToggle}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <p className="pl-3 text-md font-semibold">
                            Bisa Kerja Remote
                          </p>
                        </label>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* Terupdate*/}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between border-t-2 px-4 py-2 text-left text-md font-medium text-black hover:text-blue-500">
                      <span>Terupdate</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 `}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="pl-1 text-center ">
                        {terUpdate.map((option: any, index: any) => (
                          <div className="flex items-center mb-3">
                            <input
                              id={`radio-${index}`}
                              type="radio"
                              value={option.value}
                              name="default-radio"
                              onChange={handleOptionChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="ml-2 text-gray-700">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterComp;
