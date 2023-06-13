import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import dataDummy from "../../../data";
import columns from "../columns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import { ReadyModal, DefaultModal } from "../dialog/index";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reqGetCandidatApply, reqGetCandidatFiltering } from "@/pages/redux/bootcampSchema/action/actionReducer";
import Pagination from "@/components/pagination";
// import Pagination from "../../../handling/pagination";

const ApplyTable = (props: any) => {
  let { apply, message, refresh } = useSelector(
    (state: any) => state.candidateApplyReducer
  );
  let { filtering } = useSelector(
    (state: any) => state.candidateFilteringReducer
  );

  const status = props.status;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData]: any = useState(null);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const totalPages = Math.ceil(data?.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItem = data?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleClickOpen = (data: any) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  // console.log("filte", filtering);

  useEffect(() => {
    switch (status) {
      case "apply":
        dispatch(reqGetCandidatApply());

        setData(apply);
        break;
      case "ready":
        dispatch(reqGetCandidatFiltering())
        // const ready: any = dataDummy.filter((dt) => dt.status === "ready");
        setData(filtering);
        break;
      case "placement":
        // const placement: any = dataDummy.filter(
        //   (dt) => dt.status === "placement"
        // );
        // setData(placement);
        break;
      default:
        break;
    }
  }, [status, refresh]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {(columns || []).map((col) => (
                <TableCell className="bg-gray-200 text-center">
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(currentItem || []).map((dt: any, index: any) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={dt.user_entity_id}
              >
                <TableCell className="text-center">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell className="text-center">{dt.trainee_name}</TableCell>
                <TableCell className="text-center">{dt.usdu_school}</TableCell>
                <TableCell className="text-center">{dt.lulus}</TableCell>
                <TableCell className="text-center">{dt.phone}</TableCell>
                <TableCell className="text-center">{dt.technology}</TableCell>
                <TableCell className="text-center">
                  <div className="">
                    Applied On {format(new Date(dt.applied), "dd MMMM yyyy")}
                  </div>
                  <div>{dt.progress_name}</div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => handleClickOpen(dt)}
                    className="text-black"
                  >
                    <MoreVertIcon />
                  </Button>
                  <Dialog
                    open={(Boolean(selectedData), open)}
                    // open={open}
                    // onClose={(() => setDataStatus(null), handleClose)}
                    // onClose={() => setSelectedData(null)}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    BackdropProps={{
                      style: {
                        backgroundColor: "rgba(0, 0, 0, 0.25)", // Atur warna latar belakang di luar modal
                      },
                    }}
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      className="border-b-2 mb-4"
                    >
                      {"Switch Status"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {selectedData &&
                          (selectedData.status === "ready" ? (
                            <ReadyModal data={selectedData} close={handleClose} />
                          ) : (
                            <DefaultModal data={selectedData} close={handleClose}  />
                          ))}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {/* <Button
                        className="order-0 mb-2 inline-flex  items-center px-4 py-2 border border-transparent rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 sm:order-1 "
                        onClick={handleClose}
                      >
                        Submit
                      </Button>
                      <Button
                        className="order-0 mb-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-red-500 text-sm font-medium hover:bg-red-600 text-white  sm:order-1"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button> */}
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Paper>
  );
};

export default ApplyTable;
