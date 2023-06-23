import Content1 from "@/components/shared/content1";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import loading from "../../../../../public/loading-infinite.svg";
import { useRouter } from "next/router";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ReviewModal from "./editreview";
import { MyPage } from "@/components/types";
import { useDispatch, useSelector } from "react-redux";
import { reqGetBootcampById } from "@/redux/bootcampSchema/action/actionReducer";
import DetailEvaluation from "./detail";
import StatusModal from "./status";
import { Grading, ManageAccountsRounded } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
// import StatusModal from "./status";

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
))(({ theme }:any) => ({
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
    },
  },
}));

const EvaluationBatch: MyPage = () => {
  let { bootcamp, message, refresh, status } = useSelector(
    (state: any) => state.bootcampReducer
  );
  let { refreshEvaluation } = useSelector(
    (state: any) => state.evaluationReducer
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const [loadedData, setLoadedData]: any = useState(null);
  const { batch_id } = router.query;

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
    if (router.isReady) {
      dispatch(reqGetBootcampById(batch_id));
    }
  }, [router.isReady, refreshEvaluation]);

  useEffect(() => {
    setLoadedData(bootcamp[0]);
    console.log(loadedData);
  }, [bootcamp, refreshEvaluation]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected]:any = useState(0);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openEvaluationModal, setOpenEvaluationModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setSelected(user);
    setAnchorEl(event.currentTarget);
  };

  const handleEvaluation = () => {
    // console.log(selected);
    setOpenEvaluationModal(true);
    setAnchorEl(null);
  };

  const handleReview = () => {
    setOpenReviewModal(true);
    setAnchorEl(null);
  };
  const handleStatus = () => {
    setOpenStatusModal(true);
    setAnchorEl(null);
  };
  console.log('select',selected)
  if (!loadedData) {
    return (
      <div className="mt-48 flex justify-center items-center">
        <Image src={loading} alt="loading" className="text-center" />
      </div>
    );
  } else {
    return (
      <div>
      <ToastContainer/>
        <Content1
          title={`${loadedData.batch_name}, ${loadedData.technology} Bootcamp Evaluation`}
          fungsi1={() => router.back()}
          namafungsi1="Back"
        >
          <div className="flex flex-wrap w-full items-center justify-center">
            {(loadedData.members || []).map((data: any) => (
              <Card
                key={data.trainee_id}
                className={`m-3 rounded-b-xl rounded-t-lg border-gray-300 shadow-xl`}
                sx={{ minWidth: 250 }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 170 }} // Mengatur tinggi gambar menjadi 100px
                  image={data.user_photo}
                  alt="green iguana"
                  className="-mt-1"
                />
                <CardContent className=" flex flex-wrap text-center">
                  <div className="flex flex-wrap w-full justify-center">
                    <div>
                      <h1 className="text-lg font-semibold">
                        {data.firstname}
                      </h1>
                      <h2 className="text-lg font-semibold">{data.lastname}</h2>
                      <h3 className="text-lg font-semibold capitalize">
                       <h1 className={`mt-2 ${data.status_trainee == 'resign' ? "bg-red-500" : data.status_trainee == 'selected' ? "bg-blue-500" : data.status_trainee == 'passed' ? "bg-green-500" : ""} rounded-xl w-full p-1 text-white`}>

                        {data.status_trainee}
                       </h1>
                       
                      </h3>
                      <h3 className="pt-4 text-base">
                        Total Score : {data.total_score}
                      </h3>
                    </div>
                    <button
                      className="pl-[200px] absolute"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, data)}
                    >
                      <MoreVertRoundedIcon className="h-7 w-7 items-center transition durataion-300 ease-in-out bg-transparent rounded-full hover:bg-slate-100" />
                    </button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem
                        onClick={() =>
                          router.push({
                            pathname: `./evaluation/detail`,
                            query: {
                              trainee_id: selected.trainee_id,
                              batch_id: loadedData.batch_id,
                              // progname1: selected.technology
                            },
                          })
                        }
                        disableRipple
                        disabled={selected.total_score > 0 || selected.status_trainee === 'resign'}
                      >
                        <Grading/>
                        Evaluation
                      </MenuItem>
                      <MenuItem onClick={handleStatus} disableRipple>
                        <ManageAccountsRounded/>
                        Status
                      </MenuItem>
                    </StyledMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
            <ReviewModal
              open={openReviewModal}
              handleClose={() => setOpenReviewModal(false)}
              data={selected}
            />

            <StatusModal
              open={openStatusModal}
              handleClose={() => setOpenStatusModal(false)}
              data={selected}
            />
          </div>
        </Content1>
      </div>
    );
  }
};

EvaluationBatch.Layout = "Admin";
export default EvaluationBatch;
