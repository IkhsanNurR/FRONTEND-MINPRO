import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Content from "../../../../components/shared/content";
import { useForm } from "react-hook-form";
import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reqDeleteBootcamp, reqExtendBootcamp, reqPendingBootcamp } from "@/redux/bootcampSchema/action/actionReducer";
import { format, parse } from 'date-fns';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { type } from "os";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ExtendBatch = ({ open, handleClose, data }: any) => {
  // console.log('props',open, handleClose, data);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  type Values = {
    reason : string
    StartPeriod: Date;
    EndPeriod: Date;
    batch_id: number
  }
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    unregister,
    formState: { errors },
  } = useForm<Values>();

  const registerOptions = {
    StartPeriod: { required: "Start Period is required" },
    EndPeriod: { required: "End Period is required" },
    reason: { required: "Reason is required" }
    
  }

  const handleStartDateChange = (date: any) => {
    register("StartPeriod", registerOptions.StartPeriod);
    setStartDate(date);
    setEndDate(null);
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      setValue("StartPeriod", formattedDate); // Set the value of "StartPeriod" field in the form
    } else {
      setError("StartPeriod", { message: "require" });
      unregister("StartPeriod");
    }
  };

  const handleEndDateChange = (date: any) => {
    register("EndPeriod", registerOptions.EndPeriod);
    setEndDate(date);
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      setValue("EndPeriod", formattedDate); // Set the value of "StartPeriod" field in the form
    } else {
      setError("EndPeriod", { message: "require" });
      unregister("EndPeriod");
    }
  };

  const isEndDateDisabled = !startDate;

  const minEndDate = data?.batch_end_date
    ? dayjs(data?.batch_end_date)
    : startDate
    ? dayjs(startDate).add(1, "day")
    : null;
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const dispatch = useDispatch();

  // console.log('data', data.batch_id)
  // const handleDelete = (formData: any) => {
  //   console.log('delete',formData);
  //   // handleClose();
  // };


  const handlePending = (formData: any) => {
    console.log("data", formData);
    const parsedDateStart = parse(formData.StartPeriod, 'dd/MM/yyyy', new Date());
    const parsedDateEnd = parse(formData.EndPeriod, 'dd/MM/yyyy', new Date());


    const formatted_start = format(parsedDateStart, 'dd MMMM yyyy');
    const formatted_end = format(parsedDateEnd, 'dd MMMM yyyy');
    const StartPeriod = formData.StartPeriod
    const EndPeriod = formData.EndPeriod
    const batch_reason = formData.reason
    const batch_name = data.batch_name

    const gabung = {
        batch_id : formData.batch_id,
        batch_start_date : formData.StartPeriod,
        batch_end_date : formData.EndPeriod,
        batch_name : data.batch_name,
        batch_status : 'pending',
        batch_reason : formData.reason,
        formatted_start,
        formatted_end
    }

    console.log(gabung)
    dispatch(reqPendingBootcamp(gabung))
    handleClose()

    // Memformat tanggal dengan format yang diinginkan
    // console.log(formattedDate)
    // console.log(formData.extend)
    
    
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm
          </Typography>
          <Divider className="w-full border-1 mb-3" />
          <form onSubmit={handleSubmit(handlePending)}>
            {/* Input hidden untuk mengirim data */}
            <input
              type="hidden"
              {...register("batch_id")}
              value={data.batch_id}
            />
            <p>
              Kamu ingin menunda Batch : {data.batch_name} ?
            </p>

            <div className=" p-4 items-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="w-11/12">
                    <DatePicker
                      slotProps={{
                        actionBar: {
                          actions: ["clear"],
                        },
                      }}
                      format="DD/MM/YYYY"
                      label="Mulai"
                      className="w-full mb-5"
                      onChange={handleStartDateChange}
                      minDate={dayjs(data.batch_start_date).add(1, "day")}
                      value={
                        data.batch_start_date
                          ? dayjs(data?.batch_start_date)
                          : startDate
                      }
                    />
                  </div>
                  <div className="w-6"></div>
                  <div className="w-11/12">
                    <DatePicker
                      slotProps={{
                        actionBar: {
                          actions: ["clear"],
                        },
                      }}
                      format="DD/MM/YYYY"
                      label="Selesai"
                      className="w-full mb-5"
                      minDate={dayjs(data.batch_end_date).add(1,'day')}
                      disabled={isEndDateDisabled}
                      onChange={handleEndDateChange}
                      value={
                        data.batch_end_date
                          ? dayjs(data?.batch_end_date)
                          : endDate
                      }
                    />
                  </div>
                </LocalizationProvider>
                <div className="w-6"></div>
              </div>
              <div className=" w-full -mt-4 flex">
                <div className="w-2/6">
                  {errors.StartPeriod && (
                    <small className="text-red-500 ml-4">
                      {errors?.StartPeriod.message}
                    </small>
                  )}
                </div>
                <div className="w-4"></div>
                <div className="w-2/6">
                  {errors.EndPeriod && (
                    <small className="text-red-500 ml-4">
                      {errors?.EndPeriod.message}
                    </small>
                  )}
                </div>
              </div>


            <div>
            <TextField
                id="reason"
                variant="outlined"
                label="reason"
                autoComplete="off"
                multiline
                maxRows={4}
                className="w-10/12 ml-4" 
                inputProps={{ maxLength: 250, "aria-valuemax": 250 }}
                // className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
                {...register("reason", registerOptions.reason)}
              />
            </div>
            <div className=" w-full">
                {errors?.reason && (
                  <small className="text-red-500 ml-4">
                    {errors.reason.message}
                  </small>
                )}
            </div>

            <div className="">
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="mt-4 mr-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Submit
              </Button>

              <Button
                type="button"
                onClick={handleClose}
                variant="contained"
                size="small"
                className="mt-4 ml-2 mb-4 mr-4 bg-red-500 hover:bg-red-600 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ExtendBatch;
