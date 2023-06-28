import { reqGetCurriclum } from "@/redux/CurriculumSchema/action/actionReducer";
import Content1 from "@/components/shared/content1";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Menu,
  IconButton,
  MenuItem,
  styled,
  MenuProps,
  alpha,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Router,
  MoreVertRounded,
  DoDisturbOnOutlined,
  Edit,
  DeleteOutlineRounded,
  PlayArrowOutlined,
  GradingRounded,
} from "@mui/icons-material";
import Link from "next/link";
import deleteCurriculum from "./deleteCurriculum";
import Pagination from "./pagination";
import { MyPage } from "@/components/types";

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
))(({ theme }) => ({
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

const Curriculum: MyPage = () => {
  const { curriculum, message, refresh, status } = useSelector(
    (state: any) => state.curriculumReducer
  );
  //   console.log("reducer", curriculum);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<any>(null);
  const [deleteCurriculum, setDeleteCurriculum]: any = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: any) => {
    setSelected(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqGetCurriclum());
  }, [refresh]);

  const router = useRouter();
  const value = 3.5;
  const [selectedValue, setSelectedValue] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleDeleteCurriculum = () => {
    setDeleteCurriculum(true);
    setAnchorEl(null);
  };
  // const handleSearchChange = (e: any) => {
  //     // setSearchValue(e.target.value);
  //     setIsSearching(true);
  //     const filtered = curriculum.filter((item: any) => item.prog_title.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         item.prog_headline.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  // };
  // const handleSelect = () => {
  //     const filter = display.filter(
  //         (item: any) =>
  //             item.prog_status.toLowerCase().includes(isSelect.toLowerCase())
  //     );
  //     setIsSearching(true);
  //     setFilteredData(filter);
  // };

  const handleSearchChange = () => {
    // currentPage(1)
    setIsSearching(true);
    const searched = curriculum.filter((item: any) => {
      const headline = item.prog_headline?.toLowerCase() ?? "";
      const title_deh = item.prog_title?.toLowerCase() ?? "";

      return (
        headline.includes(searchValue.toLowerCase()) ||
        title_deh.includes(searchValue.toLowerCase())
      );
    });

    const filtered = searchFilter
      ? searched.filter((item: any) => item.prog_status === searchFilter)
      : searched;

    console.log("suuuuu", searchFilter);

    setFilteredData(filtered);
  };

  const display = isSearching ? filteredData : curriculum;
  console.log("object", display);
  const [currentPage, setItemPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const totalPages = Math.ceil(display?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = display?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setItemPage(page);
  };
  console.log("object", selected);
  console.log("fakyu", currentItems);

  return (
    <>
      <Content1
        title={`Curriculum`}
        fungsi1={() => router.push("./curriculum/New")}
        namafungsi1="Create"
      />

      <div className=" bg-green-600 w-full p-4 text-center">
        <label htmlFor="search" className="mr-2">
          Search
        </label>
        <input
          type="search"
          className="p-1 rounded-xl"
          id="simple-search"
          placeholder="Headline, title"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* <select className="order-0 w-24  ml-2 inline-flex  ">

                    <option value="">status</option>
                    <option value="1">Draft</option>
                    <option value="2">Publish</option>
                </select> */}
        <select
          className="order-0 w-24  ml-2 inline-flex"
          value={selectedValue}
          onChange={(e) => {
            setSearchFilter(e.target.value);
            setSelectedValue(e.target.value);
          }}
        >
          <option value="">Status</option>
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
        </select>
        <button
          className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
          onClick={handleSearchChange}
        >
          Search
        </button>
      </div>
      <div className="mt-4 text-center">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-t border-gray-300">
              <th className="pr-6 py-2 border-b border-gray-300  bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Name</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Title</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Duration</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Total</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Type</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Rating</span>
              </th>
              <th className="pr-6 py-2 border-b border-gray-300 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(currentItems || []).map((data: any, i: any) => (
              <tr>
                {/* <td className="px-6 py-3 text-sm text-gray-500">{data + 1}</td> */}
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  {data.prog_title}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  {data.prog_headline}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  {data.prog_duration} {data.prog_duration_type}
                </td>
                {/* <td className="px-6 py-3 text-sm text-gray-500">{data.prog_duration_type}{data.prog_duration_type}</td> */}
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  <div>
                    {console.log("data", data.prog_entity_id)}
                    {data.prog_total_trainee} Member
                  </div>
                  <div> {data.total_batch} Batch </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  {data.prog_learning_type}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  {/* {Math.ceil( data.ratings)} */}
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center", // Align to the right
                    }}
                    className="text-left"
                  >
                    <Rating
                      name="text-feedback"
                      value={parseFloat(data.ratings)}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {/* <Box sx={{ ml: 2 }}>{parseFloat( data.ratings)}</Box> */}
                  </Box>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 text-center">
                  <button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
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
                    <MenuItem>
                      {selected && (
                        <Link
                          href={{
                            pathname: "/app/curriculum/edit",
                            query: { id: selected?.prog_entity_id },
                          }}
                          passHref
                          className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem
                      // onClick={handleRunningBatch}
                      disableRipple
                    >
                      <PlayArrowOutlined />
                      Add Rating
                    </MenuItem>
                    <MenuItem onClick={handleDeleteCurriculum} disableRipple>
                      <DeleteOutlineRounded />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        ></Pagination>
      </div>
      {/* <deleteCurriculum
                open={deleteCurriculum}
                handleClose={() => setDeleteCurriculum(false)}
                data={selected}
            /> */}
    </>
  );
};

Curriculum.Layout = "Admin";
export default Curriculum;
