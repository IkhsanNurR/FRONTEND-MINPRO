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
import {
  ReadyModal,
  DefaultModal,
  ContractModal,
  DisqualifiedModal,
  NotrespondingModal,
} from "../dialog/index";
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
import {
  reqGetCandidatApply,
  reqGetCandidatContract,
  reqGetCandidatDisqualified,
  reqGetCandidatFiltering,
  reqGetCandidatNotResponding,
} from "@/redux/bootcampSchema/action/actionReducer";
import Pagination from "@/components/pagination";
import { promises } from "dns";
// import Pagination from "../../../handling/pagination";

const ApplyTable = (props: any) => {
  let { apply, message, refreshApply } = useSelector(
    (state: any) => state.candidateApplyReducer
  );
  let { filtering, refreshFiltering } = useSelector(
    (state: any) => state.candidateFilteringReducer
  );
  let { contract, refreshContract } = useSelector(
    (state: any) => state.candidateContractReducer
  );
  let { disqualified, refreshDisqualified } = useSelector(
    (state: any) => state.candidateDisqualifiedReducer
  );
  let { notresponding, refreshNotResponding } = useSelector(
    (state: any) => state.candidateNotRespondingReducer
  );

  // console.log('props',props);
  const status = props.status;
  const selectMonth = props.selectedMonth;
  const selectYear = props.selectYear

  console.log(props.selectYear)

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData]: any = useState(null);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const totalPages = Math.ceil(dataFilter?.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItem = dataFilter?.slice(startIndex, endIndex);

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
  // console.log(notresponding)
  console.log('data', data)

  useEffect(() => {
    let newData: any = [...data]; // Create a new array to store the filtered data
  
    if (selectMonth && selectYear !== "") {
      newData = newData.filter(
        (user: any) =>
          parseInt(user.applied_month) === selectMonth &&
          user.applied_year === selectYear
      );
      setDataFilter(newData);
    } else if (selectMonth && selectYear === "") {
      setDataFilter([]); // Set dataFilter to an empty array if year is not selected
    } else if (selectYear !== "") {
      newData = newData.filter((user: any) => user.applied_year === selectYear);
      setDataFilter(newData);
    } else {
      setDataFilter(data);
    }
  }, [selectMonth, selectYear, status]);

  useEffect(() => {
    switch (status) {
      case "apply":
        dispatch(reqGetCandidatApply());
        break;
      case "filtering test":
        dispatch(reqGetCandidatFiltering());
        break;
      case "contract":
        dispatch(reqGetCandidatContract());
        break;
      case "disqualified":
        dispatch(reqGetCandidatDisqualified());
        break;
      case "notresponding":
        dispatch(reqGetCandidatNotResponding());
        break;
      default:
        break;
    }
  }, [
    refreshApply,
    refreshFiltering,
    refreshContract,
    refreshDisqualified,
    refreshNotResponding,
    status,
  ]);

  useEffect(() => {
    switch (status) {
      case "apply":
        setData(apply);
        setDataFilter(data);
        break;
      case "filtering test":
        setData(filtering);
        setDataFilter(data);
        break;
      case "contract":
        setData(contract);
        setDataFilter(data);
        break;
      case "disqualified":
        setData(disqualified);
        setDataFilter(data);
        break;
      case "notresponding":
        setData(notresponding);
        setDataFilter(data);
        break;
      default:
        break;
    }
  }, [apply, filtering, contract, disqualified, notresponding]);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", height: "100vh" }}
      className="h-fit"
    >
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {(columns || []).map((col) => (
                <TableCell className="bg-blue-300 text-center">
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItem && currentItem.length > 0 ? (
              currentItem.map((dt: any, index: any) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={dt.user_entity_id}
                >
                  <TableCell className="text-center">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {dt.trainee_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {dt.usdu_school}
                  </TableCell>
                  <TableCell className="text-center">{dt.lulus}</TableCell>
                  <TableCell className="text-center">{dt.phone} </TableCell>
                  <TableCell className="text-center">{dt.technology}</TableCell>
                  <TableCell className="text-center">
                    <div className="">
                      Applied On {format(new Date(dt.applied), "dd MMMM yyyy")}
                    </div>
                    <div className="">
                      {dt.progress_name === "contract" ||
                      dt.progress_name === "disqualified"
                        ? "Test Score : "
                        : ""}
                      {dt.progress_name === "contract" ||
                      dt.progress_name === "disqualified"
                        ? dt.test_score
                        : ""}
                      {dt.progress_name === "contract" ||
                      dt.progress_name === "disqualified"
                        ? ", "
                        : ""}
                      {dt.progress_name === "contract" ||
                      dt.progress_name === "disqualified" ? (
                        //  dt.prap_status
                        <span className="capitalize">{dt.prap_status}</span>
                      ) : (
                        <span className="capitalize">{dt.progress_name}</span>
                      )}
                    </div>
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
                      // slotProps={{
                      //   backdrop: "rgba(0, 0, 0, 0.25)",
                      // }}
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
                            (selectedData.progress_name === "filtering test" ? (
                              <ReadyModal
                                data={selectedData}
                                close={handleClose}
                              />
                            ) : selectedData.progress_name === "contract" ? (
                              <ContractModal
                                data={selectedData}
                                close={handleClose}
                              />
                            ) : selectedData.progress_name ===
                              "disqualified" ? (
                              <DisqualifiedModal
                                data={selectedData}
                                close={handleClose}
                              />
                            ) : selectedData.progress_name ===
                              "not responding" ? (
                              <NotrespondingModal
                                data={selectedData}
                                close={handleClose}
                              />
                            ) : (
                              <DefaultModal
                                data={selectedData}
                                close={handleClose}
                              />
                            ))}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions></DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Data tidak ada
                </TableCell>
              </TableRow>
            )}
            {/* ))} */}
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
