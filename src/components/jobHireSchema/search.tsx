import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetJobrole } from "@/redux/jobhireSchema/master-jobhireSchema/action/actionReducer";

const SearchBar = (props: any) => {
  const dispatch = useDispatch();
  let { job_role, refresh } = useSelector(
    (state: any) => state.JobroleReducers
  );

  useEffect(() => {
    dispatch(doRequestGetJobrole());
  }, [refresh]);

  const {
    searchValue,
    setSearchValue,
    buttonClick,
    searchLocation,
    setSearchLocation,
    selectedValue,
    handleChange,
  } = props;

  return (
    <div className="container">
      <div className="w-full lg:pb-6">
        <div className="pt-6 lg:grid lg:grid-flow-col lg:justify-items-stretch items-center justify-center">
          <div className="pb-2 lg:pb-0 lg:pl-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="simple-search"
                className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[500px] "
                placeholder="Jabatan, Kata Kunci, Perusahaan"
                value={searchValue}
                onChange={setSearchValue}
              />
            </div>
          </div>

          <div className="pb-2 lg:pb-0 lg:pl-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="simple-search"
                className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[300px]   "
                placeholder="Location"
                value={searchLocation}
                onChange={setSearchLocation}
              />
            </div>
          </div>

          <div className="pb-4 lg:pb-0 lg:pl-4">
            <select
              className="text-sm rounded-lg ring-1 block w-full lg:w-[250px]   p-2.5"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="">All</option>
              {job_role.map((option: any) => (
                <option value={option.joro_name}>{option.joro_name}</option>
              ))}
            </select>
          </div>

          <div className="pb-2 lg:pb-0 lg:pl-4">
            <button
              className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500 "
              onClick={buttonClick}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
