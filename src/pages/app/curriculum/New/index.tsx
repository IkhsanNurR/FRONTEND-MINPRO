import Content1 from "@/components/shared/content1";
import {
  Autocomplete,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  duration,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import logo from "../../../../../public/laga.jpg";
import Image from "next/image";
// import Materi from "../materi";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useForm } from "react-hook-form";
import {
  getEmployee,
  reqCreateCurriculum,
  reqCreateSection,
  reqGetCurrNum,
  reqGetCurriclum,
  reqGetSectionMerge,
} from "@/redux/CurriculumSchema/action/actionReducer";
import { reqGetMaster } from "@/redux/CurriculumSchema/MasterSchema/action/actionReducer";
import { Select as SelectAntd } from "antd";
import { MyPage } from "@/components/types";
import { AddOutlined } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ReactFileViewer from 'react-file-viewer';
import AddIcon from "@mui/icons-material/Add";
// import SectionDialog from '../dialog/sectionDialog';
// import SubSectionDialog from '../dialog/subsectionDialog';
import ModalSection from "../materi/section";
import ModalSectionDetail from "../materi/sectiondetail";
import dynamic from "next/dynamic";

// const ReactFileViewer = dynamic(() => import('react-file-viewer'), {
//     ssr: false
// });

interface userEmployee {
  userEmployee: userEmployeeDetail[];
  refresh?: boolean;
}

interface userEmployeeDetail {
  emp_entity_id?: number;
  user_name: string;
  user_photo: string;
}

const curriculum: MyPage = () => {
  const dispatch = useDispatch();
  let { curriculum, refresh: lala } = useSelector(
    (state: any) => state.curriculumReducer
  );
  let { section, refresh: lili } = useSelector(
    (state: any) => state.curriculumReducer
  );
  // console.log("section", section);
  let { userEmployee, refresh: blok }: userEmployee = useSelector(
    (state: any) => state.curriculumReducer
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number>();

  const handleChangeSelect = (value: userEmployeeDetail) => {
    setSelectedImage(value.user_photo);
    setSelectedId(value.emp_entity_id);
  };

  useEffect(() => {
    const nameImage = userEmployee?.find(
      (item) => item.emp_entity_id === selectedId
    );
    setSelectedImage(nameImage?.user_photo ?? null);
  }, [blok, selectedId]);

  useEffect(() => {
    dispatch(getEmployee());
  }, [blok]);

  let { currnum, refresh: bebas } = useSelector(
    (state: any) => state.curriculumReducer
  );
  let { master, refresh } = useSelector((state: any) => state.masterReducer);
  // console.log('selector', currnum);
  const router = useRouter();
  const [age, setAge] = useState("");
  const [materi, setMateri] = useState(false);
  const [isduration, setIsDuration] = useState(0);

  type FormValues = {
    headline: string;
    title: string;
    prog_type: string;
    learning_type: string;
    total_trainee: number;
    image: any;
    price: number;
    language: string;
    duration: number;
    duration_type: string;
    tag_skill: string;
    category: number;
    create_by: number;
    status: string;
    type_payment: string;
    batch_total: number;
    item_learning: string;
    description: string;
    min_score: number;
    curr_number: string;
  };
  const handleDuration = () => {
    if (isduration > 0) {
      setIsDuration(isduration - 1);
    }
  };
  const [selectedPhoto, setSelectedPhoto] = useState(logo.src);
  //  const [isImageSelected, setIsImageSelected]: any = useState(false);

  const fileInputRef: any = useRef(null);

  const [openedSectionIndex, setOpenedSectionIndex] = useState<number | null>(
    null
  );
  const [expanded, setExpanded] = useState<string | false>("1");
  const [open, setOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [navbarTitle, setNavbarTitle] = useState<string[]>([]);
  const [opens, setOpens] = useState(false);
  const [data, setData] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [sections, setSections] = useState(false);
  const handleGetSelect = () => {
    setSections(true);
  };
  const handleOpens = (items: any) => {
    setSelectedFile(items);
    setShowModals(!showModals);
  };

  const handleOpen = (index: any) => {
    setOpenedSectionIndex(index === openedSectionIndex ? null : index);
  };

  const handleNavbarTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionTitle(e.target.value);
  };

  const handleAddSection = () => {
    setNavbarTitle([...navbarTitle, sectionTitle]);
    // setShowModal(false);
    setSectionTitle("");
  };

  const handlePhotoSelection = (event: any) => {
    const File = event.target.files;
    const FileList = File[0];
    const reader = new FileReader();

    reader.onload = function (e: any) {
      setSelectedPhoto(e.target.result);
    };

    reader.readAsDataURL(FileList);
  };

  const handleRemoveImage = () => {
    setSelectedPhoto(logo.src);
    // setIsImageSelected(false);
    // fileInputRef.current.value = null;
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleDuration2 = () => {
    setIsDuration(isduration + 1);
  };

  const handleRegister = async (data: FormValues) => {
    // console.log("object", data);
    const item_include = "20";
    const requirement = "requirement";
    const target_level = "good";
    // // const create = "1"
    const formData = new FormData();
    formData.append("prog_headline", data.headline);
    formData.append("prog_title", data.title);
    formData.append("prog_learning_type", data.learning_type);
    formData.append("prog_total_trainee", String(data.total_trainee));
    formData.append("image", data.image[0]);
    let type = data.image[0]?.type;
    let imageType = type?.split("/")[1];
    formData.append("image_type", imageType);
    formData.append("image_size", data.image[0]?.size);
    formData.append("prog_price", String(data.price));
    formData.append("prog_language", data.language);
    formData.append("prog_duration", String(data.duration));
    formData.append("prog_duration_type", data.duration_type);
    formData.append("prog_tag_skill", data.tag_skill);
    formData.append("prog_cate_id", String(data.category));
    formData.append("payment_type", String(data.type_payment));
    formData.append("total_batch", String(data.batch_total));
    formData.append("prog_min_score", String(data.min_score));
    formData.append("item_learning", data.item_learning);
    formData.append("description", data.description);
    formData.append("curr_number", data.curr_number);
    formData.append("prog_status", data.status ? "publish" : "draft");
    formData.append("prog_create_by", String(data.create_by));
    formData.append("item_include", item_include);
    formData.append("requirement", requirement);
    formData.append("target_level", target_level);
    formData.append("prog_type", data.prog_type);

    // Dispatch the form data to the appropriate action
    dispatch(reqCreateCurriculum(formData));
    setMateri(true);
    // console.log('form dataa', formData);
  };
  // console.log('data', curriculum);

  useEffect(() => {
    dispatch(reqGetMaster());
    dispatch(reqGetCurrNum());
    // dispatch(reqCreateSection())
    dispatch(reqGetSectionMerge());
    // dispatch(reqCreateCurriculum(FormData))
    // console.log("useEffect", currnum);
    // }, [refresh, lala, bebas]);
  }, [lili]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const propsData = {
    option: curriculum,
    getOptionLable: (option: any) => option.create_by,
  };
  const registOptions = {
    headline: { required: "headline Is required" },
    title: { required: "title Is required" },
    learning_type: { required: "learning type Is required" },
    total_trainee: { required: "total trainee Is required" },
    image: { required: "image Is required" },
    price: { required: "price Is required" },
    language: { required: "language Is required" },
    duration: { required: "duration Is required" },
    duration_type: { required: "duration_type Is required" },
    tag_skill: { required: "tag_skill Is required" },
    cate_id: { required: "cate_id Is required" },
    type_payment: { required: "payment_type Is required" },
    min_score: { required: "min_score Is required" },
    batch_total: { required: "total_batch Is required" },
    item_learning: { required: "item_learning Is required" },
    description: { required: "description Is required" },
    curr_number: { required: "Currnum Is required" },
    status: { required: "status Is required" },
  };

  return (
    <Content1
      title="CREATE CURICULUM"
      fungsi1={() => router.back()}
      namafungsi1="BACK"
    >
      <div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="lg:grid lg:grid-cols-2">
            <section className="pt-4 pb-10">
              <div className="container">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-2/2">
                    <div className="pad-input">
                      <h1 className="text-format">Headline</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Headline"
                        {...register("headline")}
                        variant="outlined"
                        className="w-full"
                      />
                    </div>

                    <div className="pad-input">
                      <h1 className="text-format">Title</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Title"
                        {...register("title")}
                        variant="outlined"
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6 my-4">
                      <div>
                        <TextField
                          className="text-format w-full"
                          select
                          label="Payment Type"
                          {...register("type_payment")}
                        >
                          <MenuItem value="regular">regular</MenuItem>
                          <MenuItem value="pay">pay</MenuItem>
                        </TextField>
                      </div>
                      <div>
                        <TextField
                          className="text-format w-full"
                          select
                          label="Learning Type"
                          {...register("learning_type")}
                        >
                          <MenuItem value="online">online</MenuItem>
                          <MenuItem value="offline">offline</MenuItem>
                        </TextField>
                      </div>
                    </div>

                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <TextField
                          className="text-format w-full"
                          select
                          label="Language"
                          {...register("language")}
                        >
                          <MenuItem value="english">english</MenuItem>
                          <MenuItem value="bahasa">bahasa</MenuItem>
                        </TextField>
                      </div>
                      <div>
                        <TextField
                          className="text-format w-full"
                          select
                          label="Category"
                          {...register("category")}
                        >
                          {(master || []).map((option: any, index: any) => (
                            <MenuItem
                              key={option.cate_id}
                              value={option.cate_id}
                            >
                              {option.cate_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className="pad-input grid grid-cols-1 gap-4 w-full">
                      <h1 className="text-format">Duration in Month</h1>
                      <div className="pad-input grid grid-cols-3 gap-4 w-full">
                        <div className="my-4 flex items-center gap-4 w-72">
                          <TextField
                            id="outlined-basic"
                            type="number"
                            {...register("duration")}
                            className="w-28 text-sm py-1 px-2"
                          />
                          <TextField
                            className="w-full"
                            select
                            {...register("duration_type")}
                          >
                            <MenuItem value="days">days</MenuItem>
                            <MenuItem value="week">week</MenuItem>
                            <MenuItem value="month">month</MenuItem>
                          </TextField>
                        </div>
                      </div>
                    </div>
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Total Trainee</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Total Trainee"
                          {...register("total_trainee")}
                          className="w-full text-sm py-1 px-2"
                        />
                      </div>
                      <div>
                        <h1 className="text-format">Total Batchs</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Total Batchs"
                          {...register("batch_total")}
                          className="w-full text-sm py-1 px-2"
                        />
                      </div>
                    </div>
                    <div className="pad-input grid grid-cols-1 gap-4">
                      <div>
                        <h1 className="text-format">Price</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Price"
                          {...register("price")}
                          variant="outlined"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="pad-input my-4">
                      <h1 className="text-format">Tag Skill</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Tag Skill"
                        {...register("tag_skill")}
                        variant="outlined"
                        className="w-full"
                        // size="md"
                      />
                    </div>
                    <div className="pad-input my-4">
                      <TextField
                        className="text-format w-full"
                        select
                        label="Type"
                        {...register("prog_type")}
                      >
                        <MenuItem value="bootcamp">Bootcamp</MenuItem>
                        <MenuItem value="course">Course</MenuItem>
                      </TextField>
                    </div>
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Min Scoring</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Min Scoring"
                          {...register("min_score")}
                          className="w-full text-sm py-1 px-2"
                        />
                      </div>
                      <div>
                        <h1 className="text-format">Status</h1>
                        <TextField
                          id="outlined-basic"
                          select
                          placeholder="Status"
                          {...register("status")}
                          className="w-full text-sm py-1 px-2"
                        >
                          <MenuItem value="draft">draft</MenuItem>
                          <MenuItem value="publish">publish</MenuItem>
                        </TextField>
                      </div>
                    </div>
                    <div className="pb-2 lg:pb-0 lg:pl-4">
                      <h1 className="text-format">Instructor</h1>
                      <SelectAntd
                        showSearch
                        placeholder="Instructor"
                        optionFilterProp="children"
                        options={userEmployee?.map((item) => ({
                          value: item.emp_entity_id,
                          label: item.user_name,
                        }))}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        style={{ width: "200px" }}
                        onChange={(value) => {
                          setSelectedId(value);
                          setValue("create_by", value); // Menggunakan setValue untuk mengatur nilai create_by
                        }}
                      />
                      <input
                        type="hidden"
                        {...register("create_by")} // Menggunakan register untuk menghubungkan create_by dengan formulir
                      />
                      <Image
                        src={process.env.imageUser + `/${selectedImage}`}
                        width={100}
                        height={100}
                        quality={100}
                        alt="image"
                      />
                    </div>
                    <div className="pad-input">
                      <h1 className="text-format">What Will You Learn</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Tag Skill"
                        {...register("item_learning")}
                        variant="outlined"
                        className="w-full"
                      />
                    </div>
                    <div className="pad-input">
                      <div className="pad-input">
                        <h1 className="text-format">Description</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Description"
                          {...register("description")}
                          variant="outlined"
                          className="w-full"
                          //   size="md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="lg:ml-20 pb-10 lg:pt-4">
              <div className="container">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-1/2">
                    <div className="pad-input">
                      <h1 className="text-format">Curriculum Register No</h1>
                      <TextField
                        id="outlined-basic"
                        value={currnum}
                        {...register("curr_number")}
                        variant="outlined"
                        className="w-full"
                      />
                    </div>
                    <div className="w-full pl-[33px] justify-center lg:pl-0">
                      <div className="pb-10">
                        <img
                          src={selectedPhoto}
                          alt="gambar"
                          height={300}
                          width={300}
                          className="pb-6"
                        ></img>

                        <div className="flex items-center">
                          <button
                            className="px-2 py-[1.5px] w-24 text-center border border-black bg-gray-400 bg-opacity-20 mr-5 hover:bg-gray-300"
                            onClick={handleRemoveImage}
                            type="button"
                          >
                            Remove
                          </button>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            onChange={handlePhotoSelection}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section>
            <div className="flex-row space-x-4 mt-4 text-left">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleGetSelect}
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </section>
        </form>
      </div>
      {sections && (
        <div className="lg:grid lg:grid-cols2">
          <section className="my-8">
            <div>
              <h1 className="text-format text-left">
                Materi (Add Section & Sub Section Materi)
              </h1>
              <div className="text-right">
                <IconButton onClick={() => setShowModal(true)}>
                  <AddOutlined />
                </IconButton>
              </div>
            </div>
            {showModal && (
              <ModalSection
                setShowModal={setShowModal}
                handleNavbarTitle={handleNavbarTitle}
                handleAddSection={handleAddSection}
              />
            )}
            {/* <div className="flex flex-col"> */}
            {section?.map((item: any, index: any) => (
              <Accordion
                key={item.sect_prog_entity_id}
                expanded={expanded === index}
                onChange={() => handleOpen(index)}
                className="text-right"
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  onClick={() => handleOpen(index)}
                >
                  <div className="flex justify-between">
                    <div>{item.sect_title}</div>
                    <div className="absolute top-4 right-20 text-lg">
                      {!item.sect_total_minute
                        ? "0 Minutes"
                        : item.sect_total_minute >= 60
                        ? `${Math.floor(item.sect_total_minute / 60)} Jam`
                        : `${item.sect_total_minute} Minutes`}
                    </div>
                  </div>
                </AccordionSummary>
                <div className="absolute top-5 right-10 text-lg cursor-pointer">
                  <AddOutlined
                    onClick={() => {
                      handleOpen(null);
                      setShowModals(true);
                      setData(item);
                    }}
                  />
                </div>
                {item.sectionDetail.map((detailItem: any) => (
                  <AccordionDetails
                  // key={index}
                  // onClick={() => handleOpens(detailItem)}
                  >
                    <Card className="bg-gray-100  shadow-none text-start flex justify-between flex-row">
                      <button
                        onClick={() => handleOpens(detailItem)}
                        className="text-blue-800 underline cursor-pointer"
                      >
                        {detailItem.secd_title}
                      </button>
                      <div>{detailItem.secd_minute}</div>
                    </Card>
                    <Dialog maxWidth="xl" open={opens} onClose={handleOpens}>
                      <DialogTitle>{detailItem.secd_title}</DialogTitle>
                      <DialogContent>
                        {selectedFile?.sedm_filetype === "image" && (
                          // {selectedFile?.sedm_filelink}
                          <img
                            src={`http://localhost:3001/image/${selectedFile?.sedm_filelink}`}
                            // src="http://localhost:7300/image/Lyx6jYltNKNEaSG9ehYuJg==_signature_c8pes0jimgc75c4dvk.png"
                            alt={selectedFile?.filename}
                            className="w-64 h-64"
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
            {showModals && (
              <ModalSectionDetail
                setShowModals={setShowModals}
                data={data}
              ></ModalSectionDetail>
            )}
          </section>
        </div>
      )}
    </Content1>
  );
};

curriculum.Layout = "Admin";
export default curriculum;
