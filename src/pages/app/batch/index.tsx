import { MyPage } from "@/components/types";
import {
  reqGetBootcamp,
  reqGetBootcampDaftarApply,
} from "@/redux/bootcampSchema/action/actionReducer";
import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  alpha,
  styled,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GradingRounded,
  DeleteOutlineRounded,
  Edit,
  MoreVertRounded,
  PlayArrowOutlined,
  DoDisturbOnOutlined,
  Update,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import CloseBatch from "./closeBatch";
import DeleteBatch from "./deleteBatch";
import RunningBatch from "./runningBatch";
import alert from "@/pages/alert";
import Content from "@/components/shared/content";
import Content1 from "@/components/shared/content1";
import Pagination from "@/components/pagination";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import ExtendBatch from "./extendBatch";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PendingBatch from "./pending";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }: any) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      "&:hover": {
        background: theme.palette.grey[300],
      },
    },
  },
}));

const Bootcamp: MyPage = () => {
  let { bootcamp, message, refresh, status } = useSelector(
    (state: any) => state.bootcampReducer
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [closeBatch, setCloseBatch]: any = useState(false);
  const [deleteBatch, setDeleteBatch]: any = useState(false);
  const [runningBatch, setRunningBatch]: any = useState(false);
  const [pendingBatch, setPendingBatch]: any = useState(false);
  const [extendsBatch, setExtendsBatch]: any = useState(false);
  const [filterData, setFilterData] = useState(bootcamp);
  const [selected, setSelected]: any = useState(0);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const totalPages = Math.ceil(filterData?.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItem = filterData?.slice(startIndex, endIndex);

  const columns = [
    { name: "No" },
    { name: "Batch" },
    { name: "Technology" },
    { name: "Members " },
    { name: "Periode" },
    { name: "Trainer" },
    { name: "Status" },
    { name: "Aksi" },
  ];

  const statusFilter = [
    { id: 1, status: "open" },
    { id: 2, status: "running" },
    { id: 3, status: "closed" },
    { id: 4, status: "pending" },
    { id: 5, status: "cancelled" },
    { id: 6, status: "extend" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleFilter = (filter: any) => {
    let newData = [...bootcamp]; // Create a new array to store the filtered data

    if (filter.batch_status_input === "" && filter.batch_status !== "null") {
      newData = newData.filter(
        (user: any) => user.batch_status === filter.batch_status
      );
      setFilterData(newData);
    } else if (
      filter.batch_status_input !== "" &&
      filter.batch_status === "null"
    ) {
      newData = newData.filter((user: any) => {
        return (
          user.technology
            .toLowerCase()
            .includes(filter.batch_status_input.toLowerCase()) ||
          user.batch_name
            .toLowerCase()
            .includes(filter.batch_status_input.toLowerCase()) ||
          user.trainer
            .toLowerCase()
            .includes(filter.batch_status_input.toLowerCase())
        );
      });
      setFilterData(newData);
    } else if (
      filter.batch_status === "null" &&
      filter.batch_status_input === ""
    ) {
      setFilterData(bootcamp);
    } else if (
      filter.batch_status_input &&
      filter.batch_status &&
      filter.batch_status !== "null"
    ) {
      newData = newData.filter((user: any) => {
        return (
          (user.technology
            .toLowerCase()
            .includes(filter.batch_status_input.toLowerCase()) ||
            user.batch_name
              .toLowerCase()
              .includes(filter.batch_status_input.toLowerCase()) ||
            user.trainer
              .toLowerCase()
              .includes(filter.batch_status_input.toLowerCase())) &&
          user.batch_status === filter.batch_status
        );
      });

      if (newData.length === 0) {
        setFilterData([]);
      } else {
        setFilterData(newData);
      }
    }
  };

  console.log("selected", selected);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: any) => {
    setSelected(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleCloseBatch = () => {
    setCloseBatch(true);
    setAnchorEl(null);
  };
  const handlePendingBatch = () => {
    setPendingBatch(true);
    setAnchorEl(null);
  };

  const handleDeleteBatch = () => {
    setDeleteBatch(true);
    setAnchorEl(null);
  };

  const handleExtendBatch = () => {
    setExtendsBatch(true);
    setAnchorEl(null);
  };

  const handleRunningBatch = () => {
    setRunningBatch(true);
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  // console.log("status", status);

  useEffect(() => {
    dispatch(reqGetBootcamp());
    setFilterData(bootcamp);
  }, [refresh]);

  return (
    <>
      <ToastContainer />
      <Content1
        title="Batch"
        namafungsi1="Create"
        fungsi1={() => router.push("./batch/new")}
      />

      {/* <div className=" p-4 text-center">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex flex-col md:flex-row md:items-center md:justify-center "
        >
          <div className="mb-2 sm:w-full md:w-3/12 md:mb-0">
            <label htmlFor="search" className=" invisible md:mr-2  md:visible">
              Search
            </label>
            <input
              type="search"
              placeholder={`Search`}
              className="px-2 py-1 sm:w-full sm:ml-2 md:w-fit rounded-xl border-gray-200 border-2"
              {...register("batch_status_input")}
            />
          </div>
          <div className="mb-2 md:mb-0 md:mr-2 sm:ml-2 md:w-fit sm:w-full">
            <select
              id=""
              className="border-gray-200  w-full justify-center border-2 p-1 rounded-xl"
              defaultValue={"null"}
              {...register("batch_status")}
            >
              <option value="null">None</option>
              {statusFilter.map((status: any, index: any) => (
                <option value={status.status}>{status.status}</option>
              ))}
            </select>
          </div>
          <div className="mb-2 md:mb-0 md:mr-2">
            <button className="order-0 ml-2 w-full justify-center inline-flex items-center text-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
              Search
            </button>
          </div>
        </form>
      </div> */}

      <div className=" p-4 text-center">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex flex-col md:flex-row md:items-center md:justify-center "
        >
          <div className="mb-2 sm:w-full md:w-4/12 md:mb-0 ml-2">
            <label htmlFor="search" className=" invisible md:mr-2  md:visible">
              Search
            </label>
            <input
              type="search"
              placeholder={`Search`}
              className="px-2 py-1 sm:w-full sm:ml-2 md:w-fit w-full rounded-xl border-gray-200 border-2"
              {...register("batch_status_input")}
            />
          </div>
          <div className="mb-2 md:mb-0 md:mr-2 sm:ml-2 md:w-fit sm:w-full ml-2">
            <select
              id=""
              className="border-gray-200  w-full justify-center border-2 p-1 rounded-xl"
              defaultValue={"null"}
              {...register("batch_status")}
            >
              <option value="null">None</option>
              {statusFilter.map((status: any, index: any) => (
                <option value={status.status}>{status.status}</option>
              ))}
            </select>
          </div>
          <div className="mb-2 md:mb-0 md:mr-2">
            <button className="order-0 ml-2 w-full justify-center inline-flex items-center text-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
              Search
            </button>
          </div>
        </form>
      </div>

      <Paper sx={{ width: "auto", overflow: "hidden" }} className="mb-10">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {(columns || []).map((col) => (
                  <>
                    <TableCell className="bg-blue-300 text-center justify-center items-center">
                      {col.name}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItem && currentItem?.length > 0 ? (
                currentItem?.map((data: any, i: any) => (
                  <TableRow>
                    <TableCell className=" text-center">
                      {startIndex + i + 1}
                    </TableCell>
                    <TableCell className=" text-center">
                      {data.batch_name}
                    </TableCell>
                    <TableCell className=" text-center">
                      {data.technology}
                    </TableCell>
                    <TableCell className=" text-center">
                      <AvatarGroup total={data.members.length}>
                        {data.members
                          .slice(0, 4)
                          .map((members: any, index: any) => (
                            <Avatar
                              key={index}
                              alt={members.trainee_id}
                              // src={members.user_photo}
                              src={`https://i.pravatar.cc/300/img=${index + 1}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell className=" text-center">
                      <div>
                        {format(
                          new Date(data.batch_start_date),
                          "dd MMMM yyyy"
                        )}
                      </div>
                      <div>
                        {format(new Date(data.batch_end_date), "dd MMMM yyyy")}
                      </div>
                    </TableCell>
                    <TableCell className=" text-center">
                      {data.trainer}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="justify-center flex">
                        <a
                          className={`${
                            data.batch_status == "open"
                              ? " bg-green-500"
                              : data.batch_status == "closed"
                              ? " bg-orange-500"
                              : data.batch_status == "running"
                              ? " bg-blue-500"
                              : data.batch_status == "pending"
                              ? " bg-yellow-500"
                              : data.batch_status == "cancelled"
                              ? " bg-red-500"
                              : data.batch_status == "extend"
                              ? " bg-cyan-500"
                              : ""
                          } rounded-lg p-2 capitalize text-white w-[100px] justify-center flex`}
                        >
                          {data.batch_status}
                        </a>
                      </span>
                    </TableCell>
                    <TableCell className=" text-center">
                      <button
                        id="demo-customized-button"
                        aria-controls={
                          open ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, data)}
                      >
                        <MoreVertRounded />
                      </button>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() =>
                            router.push({
                              pathname: `./batch/edit`,
                              query: {
                                batch_id: selected.batch_id,
                                // progname1: selected.technology
                              },
                            })
                          }
                          disableRipple
                          // disabled = {selected.batch_status === 'running' || selected.batch_status === 'closed' || selected.batch_status === 'cancelled'}
                          disabled={
                            selected.batch_status !== "open" &&
                            selected.batch_status !== "pending"
                          }
                        >
                          <Edit />
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={handleCloseBatch}
                          disableRipple
                          // disabled = {selected.batch_status === 'closed' || selected.batch_status === 'cancelled' || selected.batch_status === 'open' || selected.batch_status === 'pending'}
                          disabled={
                            selected.batch_status !== "extend" &&
                            selected.batch_status !== "running"
                          }
                        >
                          <DoDisturbOnOutlined />
                          Closed Batch
                        </MenuItem>
                        <MenuItem
                          onClick={handlePendingBatch}
                          disableRipple
                          disabled={
                            selected.batch_status !== "open" &&
                            selected.batch_status !== "pending"
                          }
                        >
                          <PendingActionsIcon />
                          Pending Batch
                        </MenuItem>
                        <MenuItem
                          onClick={handleExtendBatch}
                          disableRipple
                          // disabled={selected.batch_status === 'open' || selected.batch_status === 'cancelled' || selected.batch_status === 'closed'}
                          disabled={[
                            "open",
                            "cancelled",
                            "closed",
                            "pending",
                          ].includes(selected.batch_status)}
                        >
                          <Update />
                          Extends Batch
                        </MenuItem>
                        <MenuItem
                          onClick={handleDeleteBatch}
                          disableRipple
                          // disabled={selected.batch_status === 'closed' || selected.batch_status === 'cancelled' || selected.batch_status === 'extend' || selected.batch_status === 'running'}>
                          disabled={
                            selected.batch_status !== "open" &&
                            selected.batch_status !== "pending"
                          }
                        >
                          <DeleteOutlineRounded />
                          Delete Batch
                        </MenuItem>
                        <MenuItem
                          onClick={handleRunningBatch}
                          disableRipple
                          // disabled={selected.batch_status === 'closed' || selected.batch_status === 'cancelled' || selected.batch_status === 'running'}
                          disabled={
                            selected.batch_status !== "open" &&
                            selected.batch_status !== "pending"
                          }
                        >
                          <PlayArrowOutlined />
                          Set To Running
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            router.push({
                              pathname: `./batch/evaluation`,
                              query: {
                                batch_id: selected.batch_id,
                              },
                            })
                          }
                          disabled={
                            selected.batch_status !== "running" &&
                            selected.batch_status !== "extend"
                          }
                          disableRipple
                        >
                          <GradingRounded />
                          Evaluation
                        </MenuItem>
                      </StyledMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center ">
                    Data tidak ada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Paper>
      <CloseBatch
        open={closeBatch}
        handleClose={() => setCloseBatch(false)}
        data={selected}
      />
      <ExtendBatch
        open={extendsBatch}
        handleClose={() => setExtendsBatch(false)}
        data={selected}
      />
      <PendingBatch
        open={pendingBatch}
        handleClose={() => setPendingBatch(false)}
        data={selected}
      />
      <DeleteBatch
        open={deleteBatch}
        handleClose={() => setDeleteBatch(false)}
        data={selected}
      />
      <RunningBatch
        open={runningBatch}
        handleClose={() => setRunningBatch(false)}
        data={selected}
      />
    </>
  );
};

Bootcamp.Layout = "Admin";
export default Bootcamp;
