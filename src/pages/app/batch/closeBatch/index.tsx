import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { batch, useDispatch } from "react-redux";
import { reqCloseBootcamp } from "@/redux/bootcampSchema/action/actionReducer";
import alert from "@/alert";

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

const CloseBatch = ({ open, handleClose, data }: any) => {
  console.log("props", data);

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
    // console.log(formData);
    const batch_id = formData.batch_id;
    const batch_status = "closed";
    const batch_name = data.batch_name;

    let members = data.members;
    console.log("members", members);
    const filteredData = members.filter(
      (item: any) => item.status_trainee === "passed"
    );

    let batchTrainees: any = [];
    {
      filteredData.map((e: any, i: any) => {
        const member: any = {
          talent_fullname: e.fullname,
          talent_user_entity_id: e.trainee_id,
          talent_technology: data.technology,
          talent_start_date: data.batch_start_date,
          talent_end_date: data.batch_end_date,
          talent_trainer: data.trainer,
          talent_skill: data.skills,
        };
        batchTrainees.push(member);
      });
    }
    const datakirim = {
      batch_id,
      batch_status,
      batchTrainees,
      batch_name,
    };
    console.log("data", datakirim);
    data.members.map((e: any, i: any) => {
      if (e.status_trainee === "running") {
        alert.notifyFailed(400, "Masih ada Trainee yang belum dinilai!");
      } else {
        dispatch(reqCloseBootcamp(datakirim));
        handleClose();
      }
    });
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
            <p>Apakah Kamu Yakin Akan Menutup Batch : {data.batch_name}</p>
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

export default CloseBatch;
