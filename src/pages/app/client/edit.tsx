import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Content1 from "@/components/shared/content1";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import {
  doRequestGetClientById,
  doRequestGetEmprange,
  doRequestUpdateClient,
} from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import {
  doRequestGetCity,
  doRequestGetIndustry,
} from "@/redux/jobhireSchema/master-jobhireSchema/action/actionReducer";
import { MyPage } from "@/components/types";

const EditClient: MyPage = () => {
  let { industry, refreshIndu } = useSelector(
    (state: any) => state.IndustryReducers
  );

  let { emp_range } = useSelector((state: any) => state.EmprangeReducers);

  let { city } = useSelector((state: any) => state.CityReducers);

  let { client_id } = useSelector((state: any) => state.ClientReducers);

  const dispatch = useDispatch();
  const router = useRouter();
  const [loadedData, setLoadedData]: any = useState(null);

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
    dispatch(doRequestGetIndustry());
    dispatch(doRequestGetEmprange());
    dispatch(doRequestGetCity());

    if (router.isReady) {
      const { clit_id }: any = router.query;
      dispatch(doRequestGetClientById(clit_id));
    }
  }, [refreshIndu, router]);

  useEffect(() => {
    setLoadedData(client_id);
  }, [client_id]);

  type FormValues = {
    clit_name: string;
    addr_line1: string;
    addr_line2: string;
    clit_indu_code: string;
    clit_about: string;
    clit_emra_id: number;
    addr_spatial_location: string;
    addr_postal_code: string;
    addr_city_id: number;
    clit_id: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    dispatch(doRequestUpdateClient(data));
    router.push("/client");
    console.log(data);
  };

  if (loadedData) {
    return (
      <Content1
        title="Edit Client"
        namafungsi1="Back"
        fungsi1={() => router.push("/app/client")}
      >
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="lg:grid lg:grid-cols-2">
              {/* Input Form Start*/}
              <section className="pt-4 pb-10">
                <div className="container">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-2/2">
                      <div>
                        <input
                          hidden
                          {...register("clit_id")}
                          defaultValue={loadedData.clit_id}
                        ></input>
                      </div>
                      {/* Client Name */}
                      <div className="pad-input">
                        <h1 className="text-format">Client Name</h1>
                        <TextField
                          id="outlined-basic"
                          defaultValue={loadedData.clit_name}
                          {...register("clit_name")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                      </div>

                      {/* Address 1 */}
                      <div className="pad-input">
                        <h1 className="text-format">Address Line 1</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Address Line 1"
                          defaultValue={loadedData.addr_line1}
                          {...register("addr_line1")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                      </div>
                      {/* Address 2 */}
                      <div className="pad-input">
                        <h1 className="text-format">Address Line 2</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Address Line 2"
                          defaultValue={loadedData.addr_line2}
                          {...register("addr_line2")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                      </div>

                      {/* Spatial Location */}
                      <div className="pad-input">
                        <h1 className="text-format">Spatial Location</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Spatial Location"
                          defaultValue={loadedData.addr_spatial_location}
                          {...register("addr_spatial_location")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                      </div>

                      {/* City */}
                      <div className="pad-input ">
                        <h1 className="text-format">City</h1>
                        <TextField
                          id="outlined"
                          select
                          label="Choose City"
                          className="w-full"
                          defaultValue={loadedData.city_id}
                          {...register("addr_city_id")}
                          size="small"
                        >
                          {city.map((option: any) => (
                            <MenuItem
                              key={option.city_id}
                              value={option.city_id}
                            >
                              {option.city_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      {/* Postal Code */}
                      <div className="pad-input">
                        <h1 className="text-format">Postal Code</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Postal Code"
                          defaultValue={loadedData.addr_postal_code}
                          {...register("addr_postal_code")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                      </div>

                      {/* Industri Type  */}
                      <div className="pad-input ">
                        <h1 className="text-format">Industry Type</h1>
                        <TextField
                          id="outlined"
                          select
                          label="Choose Type"
                          className="w-full"
                          defaultValue={loadedData.indu_code}
                          {...register("clit_indu_code")}
                          size="small"
                        >
                          {industry.map((option: any) => (
                            <MenuItem
                              key={option.indu_code}
                              value={option.indu_code}
                            >
                              {option.indu_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      {/* Employee Range */}

                      <div className="pad-input ">
                        <h1 className="text-format">Employee Range</h1>
                        <TextField
                          id="outlined"
                          select
                          label="Choose Range"
                          className="w-full"
                          defaultValue={loadedData.emra_id}
                          {...register("clit_emra_id")}
                          size="small"
                        >
                          {emp_range.map((option: any) => (
                            <MenuItem
                              key={option.emra_id}
                              value={option.emra_id}
                            >
                              {option.emra_range_min} - {option.emra_range_max}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      {/* About */}
                      <div className="pad-input">
                        <h1 className="text-format">About</h1>

                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={4}
                          placeholder="About"
                          defaultValue={loadedData.clit_about}
                          className="w-full"
                          {...register("clit_about")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Input Form End*/}
            </div>

            <section>
              <div className="flex flex-wrap">
                <div className="w-full mt-24">
                  <div className="bg-white h-[60px]  border-t-2">
                    <div className=" flex pt-3.5 justify-center lg:justify-start">
                      <button type="submit" className="button-foot">
                        Save
                      </button>
                      <button type="button" className="button-foot">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </Content1>
    );
  }
};
EditClient.Layout = "Admin";
export default EditClient;
