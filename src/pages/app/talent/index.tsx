import Content from "@/components/shared/content";
import Content1 from "@/components/shared/content1";
import { MyPage } from "@/components/types";
import { reqGetTalent } from "@/redux/bootcampSchema/action/actionReducer";
import { MoreVertRounded, Update } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  MenuProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  styled,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

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

const Talent: MyPage = () => {
  const columns = [
    { name: "No" },
    { name: "Full Name" },
    { name: "Technology" },
    { name: "Batch " },
    { name: "Periode" },
    { name: "Trainer" },
    { name: "Status" },
    { name: "Aksi" },
  ];
  const router = useRouter();

  let { talent, message, refresh } = useSelector(
    (state: any) => state.talentReducer
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected]: any = useState(0);
  const [filterData, setFilterData] = useState(talent);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setSelected(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleFilter = (filter: any) => {
    let newData = [...talent];
    console.log(newData);
    console.log(filter);

    if (filter.talent_status_input === "" && filter.talent_status !== "null") {
      newData = newData.filter(
        (talent: any) => talent.talent_status === filter.talent_status
      );
      setFilterData(newData);
    } else if (
      filter.talent_status_input !== "" &&
      filter.talent_status === "null"
    ) {
      newData = newData.filter((user: any) => {
        return (
          user.talent_fullname
            .toLowerCase()
            .includes(filter.talent_status_input.toLowerCase()) ||
          user.talent_technology
            .toLowerCase()
            .includes(filter.talent_status_input.toLowerCase()) ||
          user.talent_trainer
            .toLowerCase()
            .includes(filter.talent_status_input.toLowerCase())
        );
      });
      setFilterData(newData);
    } else if (
      filter.talent_status === "null" &&
      filter.talent_status_input === ""
    ) {
      setFilterData(talent);
    } else if (
      filter.talent_status_input &&
      filter.talent_status &&
      filter.talent_status !== "null"
    ) {
      newData = newData.filter((user: any) => {
        return (
          (user.talent_fullname
            .toLowerCase()
            .includes(filter.talent_status_input.toLowerCase()) ||
            user.talent_technology
              .toLowerCase()
              .includes(filter.talent_status_input.toLowerCase()) ||
            user.talent_trainer
              .toLowerCase()
              .includes(filter.talent_status_input.toLowerCase())) &&
          user.talent_status === filter.talent_status
        );
      });

      if (newData.length === 0) {
        setFilterData([]);
      } else {
        setFilterData(newData);
      }
    }

    // if(filter.talent_status){
    //   newData = newData.filter((talent:any) => talent.talent_status === filter.talent_status)
    //   setFilterData(newData)
    // }
    // if(!filter.talent_status){
    //   setFilterData([])
    // }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqGetTalent());
    setFilterData(talent);
  }, [refresh]);
  return (
    <>
      <ToastContainer />
      <Content title="Talents" />

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
              {...register("talent_status_input")}
            />
          </div>
          <div className="mb-2 md:mb-0 md:mr-2 sm:ml-2 md:w-fit sm:w-full">
            <select
              id=""
              className="border-gray-200  w-full justify-center border-2 p-1 rounded-xl"
              defaultValue={"null"}
              {...register("talent_status")}
            >
              <option value="null">None</option>
              <option value="idle">Idle</option>
              <option value="placement">Placement</option>
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
              {...register("talent_status_input")}
            />
          </div>
          <div className="mb-2 md:mb-0 md:mr-2 sm:ml-2 md:w-fit sm:w-full ml-2">
            <select
              id=""
              className="border-gray-200  w-full justify-center border-2 p-1 rounded-xl"
              defaultValue={"null"}
              {...register("talent_status")}
            >
              <option value="null">None</option>
              <option value="idle">Idle</option>
              <option value="placement">Placement</option>
            </select>
          </div>
          <div className="mb-2 md:mb-0 md:mr-2">
            <button className="order-0 ml-2 w-full justify-center inline-flex items-center text-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <Paper sx={{ width: "auto", overflow: "hidden" }} className="mb-10">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell className="bg-blue-300 text-center justify-center items-center">
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData && filterData.length > 0 ? (
                  filterData.map((data: any, index: any) => (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell className=" text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className=" text-center">
                        {data.talent_fullname}
                      </TableCell>
                      <TableCell className=" text-center">
                        {data.talent_technology}
                      </TableCell>
                      <TableCell className=" text-center">
                        {data.talent_batch_name}
                      </TableCell>
                      <TableCell className=" text-center">
                        <div>
                          {format(
                            new Date(data.talent_start_date),
                            "dd MMMM yyyy"
                          )}
                        </div>
                        <div>
                          {format(
                            new Date(data.talent_end_date),
                            "dd MMMM yyyy"
                          )}
                        </div>
                      </TableCell>
                      <TableCell className=" text-center">
                        {data.talent_trainer}
                      </TableCell>
                      <TableCell className=" text-center">
                        {data.talent_status}
                      </TableCell>
                      <TableCell className=" text-center">
                        <button
                          id="demo-customized-button"
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e)}
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
                            // onClick={handleExtendBatch}
                            disableRipple
                            // disabled={selected.batch_status === 'open' || selected.batch_status === 'cancelled' || selected.batch_status === 'closed'}
                            // disabled={[
                            //   "open",
                            //   "cancelled",
                            //   "closed",
                            //   "pending",
                            // ].includes(selected.batch_status)}
                          >
                            <Update />
                            Extends Batch
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
        </Paper>
      </div>
    </>
  );
};

Talent.Layout = "Admin";
export default Talent;
