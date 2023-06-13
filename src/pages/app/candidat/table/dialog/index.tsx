import { reqUpdateCandidatApply } from "@/pages/redux/bootcampSchema/action/actionReducer";
import { Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const DefaultModal = ({ data, close }: any) => {
  // console.log('close',close)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const id = data.user_entity_id
  const dispatch = useDispatch()

  const handleStatusApply = (dataApply: any) => {
    const apahayo = {user:+dataApply.user_entity_id,prog_name:'filtering test'}
    dispatch(reqUpdateCandidatApply(apahayo))
    console.log('data',apahayo);
    close()
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusApply)}>
            <input
              type="hidden"
              value={data.user_entity_id}
              {...register("user_entity_id"
              
              )}
            />
        <h2 className=" text-black font-semibold mb-4">
          Kandidat : {data.trainee_name}
        </h2>
        <label className="text-black font-semibold">
          Status
          <span>
            <select
              {...register("progress_name", data.progress_name)}
              id=""
              className="border-solid-gray-400 font-light border-gray-400 ml-10 border-2 p-1 md:text-md"
            >
              <option value={data.progress_name} autoFocus disabled>
                {data.progress_name}
              </option>
              <option value="ready">Ready</option>
            </select>
          </span>
        </label>
        <div className="mt-4 flex justify-between">
          <Button
            type="submit"
            className="order-0 mb-2 inline-flex mr-2 items-center px-4 py-2 border border-transparent rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 sm:order-1 "
            // onClick={handleClose}
          >
            Submit
          </Button>
          <Button
          type="button"
            className="order-0 mb-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-red-500 text-sm font-medium hover:bg-red-600 text-white  sm:order-1"
            onClick={()=>close()}
            >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export const ReadyModal = ({ data }: any) => {
  return (
    <>
      <h2 className=" text-black font-semibold mb-4">Kandidat : {data.nama}</h2>
      <label className="text-black">
        Score Filtering Test :
        <span>
          <input
            type="number"
            className=" border-black border-2 p-1 md:text-md mb-2"
            min={1}
            max={100}
          />
        </span>
      </label>
      <div>
        <label className="text-black">
          Status :
          <span>
            <select
              name=""
              id=""
              className="border-solid-gray-400 border-black border-2 p-1 md:text-md"
            >
              <option value={data.id}>{data.status}</option>
              <option value="ready">Ready</option>
              <option value="contract">Contract</option>
              {/* <option value="">ready</option> */}
            </select>
          </span>
        </label>
      </div>
      <h1 className="text-black mt-2">Reviews</h1>
      <textarea
        name="review"
        id="review"
        className=" border-black border-2 p-1 md:text-md"
        cols={30}
        rows={10}
      ></textarea>
    </>
  );
};
