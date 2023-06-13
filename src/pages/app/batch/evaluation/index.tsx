import Content1 from "@/pages/shared/content1";
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
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ReviewModal from "./editreview";
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
    },
  },
}));

const EvaluationBatch:MyPage = () => {
  const dataUser = [
    {
      id: 1,
      user_id: 1,
      bulan: "Januari",
      tahun: 1999,
      firstname: "Aji",
      lastname: "Sasongko",
      nilai: 90,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 2,
      user_id: 2,
      bulan: "Januari",
      tahun: 1999,
      firstname: "Aji",
      lastname: "Badongko",
      nilai: 85,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 3,
      user_id: 3,
      bulan: "Februari",
      tahun: 2000,
      firstname: "Aji",
      lastname: "Muludin",
      nilai: 80,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 4,
      user_id: 4,
      bulan: "Maret",
      tahun: 2000,
      firstname: "Bagas",
      lastname: "Pratama S",
      nilai: 86,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 5,
      user_id: 5,
      bulan: "Maret",
      tahun: 2001,
      firstname: "Dany",
      lastname: "Utama R",
      nilai: 83,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 6,
      user_id: 6,
      bulan: "April",
      tahun: 2001,
      firstname: "Dewi",
      lastname: "Sri S",
      nilai: 82,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 7,
      user_id: 7,
      bulan: "Mei",
      tahun: 2001,
      firstname: "Ade",
      lastname: "Kurnia Sari",
      nilai: 87,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 8,
      user_id: 8,
      bulan: "Juni",
      tahun: 2002,
      firstname: "Welly",
      lastname: "Putri K",
      nilai: 88,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 9,
      user_id: 9,
      bulan: "Juli",
      tahun: 2003,
      firstname: "Dani",
      lastname: "Putra",
      nilai: 89,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 10,
      user_id: 10,
      bulan: "Februari",
      tahun: 2000,
      firstname: "Annisa",
      lastname: "Dewi",
      nilai: 92,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 11,
      user_id: 11,
      bulan: "Maret",
      tahun: 2000,
      firstname: "Wulan",
      lastname: "Arienza",
      nilai: 95,
      image: "https://i.pravatar.cc/300",
    },
    {
      id: 12,
      user_id: 12,
      bulan: "Juli",
      tahun: 2003,
      firstname: "Fany",
      lastname: "Putri",
      nilai: 97,
      image: "https://i.pravatar.cc/300",
    },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setSelected(user);
    setAnchorEl(event.currentTarget);
  };

  const handleEvaluation = () => {
    console.log(selected);
    setAnchorEl(null);
  };

  const handleReview = () => {
    setOpenReviewModal(true);
    setAnchorEl(null);
  };
  const handleResign = () => {
    console.log(selected);
    setAnchorEl(null);
  };
  const router = useRouter();

  return (
    <div>
      <Content1
        title={`BATCH#13, Bootcamp Net Framework Evaluation`}
        fungsi1={() => router.back()}
        namafungsi1="Back"
      >
        <div className="flex flex-wrap w-full items-center justify-center">
          {(dataUser || []).map((data: any) => (
            <Card
              key={data.id}
              className={`m-3 rounded-b-xl`}
              sx={{ minWidth: 250 }}
            >
              <CardMedia
                component="img"
                sx={{ height: 170 }} // Mengatur tinggi gambar menjadi 100px
                image={data.image}
                alt="green iguana"
                className="-mt-1"
              />
              <CardContent className=" flex flex-wrap text-center">
                <div className="flex flex-wrap w-full justify-center">
                  <div>
                    <h1 className="text-lg font-semibold">{data.firstname}</h1>
                    <h2 className="text-lg font-semibold">{data.lastname}</h2>
                    <h3 className="pt-4 text-base">
                      Total Score: {data.nilai}
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
                    <MenuItem onClick={handleEvaluation} disableRipple>
                      Evaluation
                    </MenuItem>
                    <MenuItem onClick={handleReview} disableRipple>
                      Review
                    </MenuItem>
                    <MenuItem onClick={handleResign} disableRipple>
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
        </div>
      </Content1>
    </div>
  );
};

EvaluationBatch.Layout="Admin"
export default EvaluationBatch;
