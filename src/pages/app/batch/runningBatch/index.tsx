import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reqSetToRunningBootcamp } from "@/redux/bootcampSchema/action/actionReducer";

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

const RunningBatch = ({ open, handleClose, data }: any) => {
  // console.log('props', data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const dispatch = useDispatch();
  const onSubmit = (formData: any) => {
    const batch_id = formData.batch_id;
    const batch_entity_id = data.batch_entity_id;
    const batch_name = data.batch_name;
    const members = [data.members];
    let member: any = [];
    {
      members[0].map((member1: any, i: any) => {
        member.push(member1.trainee_id);
        // return member
        // console.log(member);
      });
    }
    const status = "running";
    const data1 = { member, batch_id, status, batch_entity_id, batch_name };
    console.log("data1", data1);
    // console.log(data, 'data')
    dispatch(reqSetToRunningBootcamp(data1));
    handleClose();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input hidden untuk mengirim data */}
            <input
              type="hidden"
              {...register("batch_id")}
              value={data.batch_id}
            />
            {/* <input type="hidden" {...register("batch_entity_id")} value={data.members} /> */}
            <p>Jalankan Batch : {data.batch_name}</p>
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

export default RunningBatch;
