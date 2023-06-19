import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Content from "@/components/shared/content";
import { useForm } from "react-hook-form";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reqEvaluationStatus } from "@/redux/bootcampSchema/action/actionReducer";

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

const StatusModal = ({ open, handleClose, data }: any) => {
  console.log(open, handleClose, data);
  type FormValues = {
    status: string;
    user_entity_id: number;
    review: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const registerOptions = {
    status: { required: "Status is required" },
    user_entity_id: { required: "User Id is required" },
    review: { required: "Review is required" },
  };
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const dispatch = useDispatch()
  const onSubmit = (formData: any) => {
    dispatch(reqEvaluationStatus(formData))
    console.log(formData);
    // handleClose();
  };

  const handleError = (errors: any) => {};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            Switch Status
          </Typography>
          <Divider className="w-full border-1" />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Kandidat : {data.firstname} {data.lastname}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit, handleError)}>
            <input
              type="hidden"
              {...register("user_entity_id")}
              value={data.trainee_id}
            />
            <FormControl variant="outlined" className="w-full mt-4">
              <InputLabel id="Status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                {...register("status", registerOptions.status)}
                label="status"
                defaultValue={data.status_trainee ? data.status_trainee : null}
              >
                <MenuItem value={"selected"} disabled={true}>
                  Selected
                </MenuItem>
                <MenuItem value={"resign"}>Resign</MenuItem>
                <MenuItem value={"passed"}>Passed</MenuItem>
                <MenuItem value={"failed"}>Failed</MenuItem>
              </Select>
            </FormControl>
            {errors?.status && (
              <small className="text-red-500">{errors.status.message}</small>
            )}
            <TextField
              id="review"
              variant="outlined"
              label="Review"
              autoComplete="off"
              className="w-full mt-5"
              multiline
              maxRows={4}
              inputProps={{
                maxLength: 1024,
                "aria-valuemax": 1024,
              }}
              {...register("review", registerOptions.review)}
            />
            {errors?.review && (
              <small className="text-red-500">{errors.review.message}</small>
            )}
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

export default StatusModal;