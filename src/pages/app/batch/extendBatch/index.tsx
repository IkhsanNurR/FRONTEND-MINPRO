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
import { reqDeleteBootcamp, reqExtendBootcamp } from "@/redux/bootcampSchema/action/actionReducer";
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

  const [endDate, setEndDate] = useState(null);

  type Values = {
    reason : string
    extend: string
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
    date: { required: "date is required" },
    reason: { required: "Reason is required" }
    
  }



  const handleextenddate = (date: any) => {
    register("extend", registerOptions.date);
    setEndDate(date);
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      setValue("extend", formattedDate); // Set the value of "date" field in the form
    } else {
      setError("extend", { message: "require" });
      unregister("extend");
    }
  };
  const minEndDate = data.batch_end_date ? dayjs(data.batch_end_date).add(1, "day") : null;
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


  const handleExtend = (formData: any) => {
    // console.log("data", formData);


    const parsedDate = parse(formData.extend, 'dd/MM/yyyy', new Date());
    const reason = formData.reason

    // Memformat tanggal dengan format yang diinginkan
    const formattedDate = format(parsedDate, 'dd MMMM yyyy');
    // console.log(formattedDate)
    // console.log(formData.extend)
    
    const gabung = {
        batch_id : formData.batch_id,
        batch_end_date : formData.extend,
        batch_name : data.batch_name,
        reason,
        formattedDate
    }
    
    console.log(gabung)
    dispatch(reqExtendBootcamp(gabung))
    // handleClose()
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
          <Divider className="w-full border-1" />
          <form onSubmit={handleSubmit(handleExtend)}>
            {/* Input hidden untuk mengirim data */}
            <input
              type="hidden"
              {...register("batch_id")}
              value={data.batch_id}
            />
            <p>
              Apakah Kamu Yakin Akan Memperpanjang Batch : {data.batch_name}
            </p>

            <div className=" p-4 flex items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="w-1/2">
                  <DatePicker
                    slotProps={{
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    format="DD/MM/YYYY"
                    label="Extend"
                    className="w-full"
                    {...register("extend")}
                    onChange={handleextenddate}
                    minDate={minEndDate}
                    value={data?.batch_end_date
                        ? dayjs(data?.batch_end_date)
                        : endDate}
                  />
                </div>
                <div className="w-6"></div>
              </LocalizationProvider>
              <div className="w-6"></div>
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
