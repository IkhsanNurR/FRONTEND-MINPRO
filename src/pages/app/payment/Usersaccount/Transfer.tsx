import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doAddTOPUP } from "../../../../redux/paymentSchema/action/ActionReducer";

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

type FormValue = {
    trpa_source_id: number;
    trpa_target_id: number;
    trpa_credit: number;
};

const Transfer = ({ open, handleClose, data }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const dispatch = useDispatch();

  const handleRegistrationTopup = (data: any) => {
    dispatch(doAddTOPUP(data));
    window.location.reload();
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
          <form onSubmit={handleSubmit(handleRegistrationTopup)}>
            <input
              type="hidden"
              {...register("trpa_source_id")}
              value={data[0].account_source}
            />
            <input
              type="hidden"
              {...register("trpa_target_id")}
              value={data[0].account_target}
            />
            <input
              type="hidden"
              {...register("trpa_credit")}
              value={data[0].saldo_transfer}
            />
            <p>
              Apakah Kamu Yakin Akan Menstransfer dari {data[0].bank_source} ke {data[0].bank_target}, klik button TRANSFER untuk Konfirmasi
            </p>
            <div className="flex justify-between mt-4">
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="mt-4 mr-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Transfer
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

export default Transfer;
