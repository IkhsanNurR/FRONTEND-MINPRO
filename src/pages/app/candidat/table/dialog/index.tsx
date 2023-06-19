import { reqUpdateCandidatApply, reqUpdateCandidatContract, reqUpdateCandidatDisqualified, reqUpdateCandidatFiltering, reqUpdateCandidatNotResponding } from "@/redux/bootcampSchema/action/actionReducer";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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

  const id = data.user_entity_id;
  const dispatch = useDispatch();

  const handleStatusApply = (dataApply: any) => {
    const apahayo = {
      user: +dataApply.user_entity_id,
      prog_name: "filtering test",
    };
    dispatch(reqUpdateCandidatApply(apahayo));
    console.log("data", apahayo);
    close();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusApply)}>
        <input
          type="hidden"
          value={data.user_entity_id}
          {...register("user_entity_id")}
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
            onClick={() => close()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export const ReadyModal = ({ data, close }: any) => {
  const [status, setStatus] = useState("");
  // console.log(data);
  type Value = {
    user_entity_id: number,
    test_score: number,
    progress_name : string ,
    prap_status: string,
    review : string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Value>();

  const dispatch = useDispatch()
  const handleStatusFiltering = (dataFiltering: any) => {
    // console.log('data',dataFiltering);
    dispatch(reqUpdateCandidatFiltering(dataFiltering))
    close()
  };

  const registerOptions = {
    review: {
      required: "Review is Required",
    },
  };

  const handleNumberChange = (e: any) => {
    const value = parseInt(e.target.value);
    // console.log("value", value);
    if (value < 25) {
      setStatus("failed");
    } else if (value >= 25 && value <= 50) {
      setStatus("recommendation");
    } else if (value >= 51) {
      setStatus("passed");
    }
  };

  useEffect(()=>{
    setValue('progress_name',(status!='failed'? 'contract' : 'disqualified'))
    setValue('prap_status', status )
  },[status])

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusFiltering)}>
        <input
          type="hidden"
          value={data.user_entity_id}
          {...register("user_entity_id")}
        />
        <input
          type="hidden"
          {...register("progress_name")}
        />
        <h2 className=" text-black font-semibold mb-4">
          Kandidat : {data.trainee_name}
        </h2>
        <label className="text-black">
          Score Filtering Test :
          <span>
            <input
              type="number"
              className=" border-gray-300 ml-5  border-2 p-1 md:text-md mb-3 rounded-lg"
              min={1}
              max={100}
              {...register("test_score")}
              placeholder="Score"
              onChange={handleNumberChange}
            />
          </span>
        </label>
        <div>
          <label className="text-black">
            Status :
            <span>
              <select
                {...register("prap_status")}
                id=""
                placeholder="Status"
                className="border-solid-gray-400 ml-28 border-gray-300 border-2 p-1 md:text-md rounded-lg"
                defaultValue={status == "" ? data.progress_name : ""}
              >
                <option value='ready' autoFocus disabled>
                  Ready Test
                </option>
                <option
                  value="passed"
                  selected={status == "passed" ? true : false}
                >
                  Passed
                </option>
                <option
                  value="recommendation"
                  selected={status == "recommendation" ? true : false}
                >
                  Recomendation
                </option>
                <option
                  value="failed"
                  selected={status == "failed" ? true : false}
                >
                  Failled
                </option>
              </select>
            </span>
          </label>
        </div>
        <h1 className="text-black mt-2">Reviews :</h1>
        <TextField
          id="review"
          variant="outlined"
          autoComplete="off"
          className="w-full"
          multiline
          maxRows={4}
          inputProps={{ maxLength: 250, "aria-valuemax": 250 }}
          {...register("review", registerOptions.review)}
        />
        <small className="text-red-500">
          {errors?.review && errors.review.message}
        </small>
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
            onClick={() => close()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};





export const ContractModal = ({ data, close }: any) => {
  // console.log('data', data)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const id = data.user_entity_id;
  const dispatch = useDispatch();

  const handleStatusContract = (dataApply: any) => {
    const apahayo = {
      user_entity_id: +dataApply.user_entity_id,
      progress_name: dataApply.progress_name
      // progress_name: dataApply.progress_name
    };
    dispatch(reqUpdateCandidatContract(apahayo));
    console.log("data", apahayo);
    close();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusContract)}>
        <input
          type="hidden"
          value={data.user_entity_id}
          {...register("user_entity_id")}
        />
        <h2 className=" text-black font-semibold mb-4">
          Kandidat : {data.trainee_name}
        </h2>
        <label className="text-black font-semibold">
          Status
          <span>
            <select
              {...register("progress_name")}
              id=""
              className="border-solid-gray-400 font-light border-gray-400 ml-10 border-2 p-1 md:text-md"
            >
              <option value={data.progress_name} autoFocus disabled>
                {data.progress_name}
              </option>
              <option value="contracted">Contracted</option>
              <option value="not responding">Not Responding</option>
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
            onClick={() => close()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};








export const DisqualifiedModal = ({ data, close }: any) => {
  // console.log('close',close)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const id = data.user_entity_id;
  const dispatch = useDispatch();

  const handleStatusDisqualified = (dataApply: any) => {
    const apahayo = {
      user_entity_id: +dataApply.user_entity_id,
      progress_name: 'contract',
      prap_status: dataApply.prap_status
    };
    dispatch(reqUpdateCandidatDisqualified(apahayo));
    console.log("data", apahayo);
    close();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusDisqualified)}>
        <input
          type="hidden"
          value={data.user_entity_id}
          {...register("user_entity_id")}
        />
        <h2 className=" text-black font-semibold mb-4">
          Kandidat : {data.trainee_name}
        </h2>
        <label className="text-black font-semibold">
          Status
          <span>
            <select
              {...register("prap_status")}
              id=""
              className="border-solid-gray-400 font-light border-gray-400 ml-10 border-2 p-1 md:text-md"
            >
              <option value={data.progress_name} autoFocus disabled>
                {data.progress_name}
              </option>
              <option value="recommendation">Recommendation</option>
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
            onClick={() => close()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
export const NotrespondingModal = ({ data, close }: any) => {
  // console.log('close',close)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const id = data.user_entity_id;
  const dispatch = useDispatch();

  const handleStatusNotResponding = (dataApply: any) => {
    const apahayo = {
      user_entity_id: +dataApply.user_entity_id,
      progress_name: 'contract',
      prap_status: dataApply.prap_status
    };
    dispatch(reqUpdateCandidatNotResponding(apahayo));
    console.log("data", apahayo);
    close();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleStatusNotResponding)}>
        <input
          type="hidden"
          value={data.user_entity_id}
          {...register("user_entity_id")}
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
              <option value="recommendation">Recommendation</option>
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
            onClick={() => close()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
