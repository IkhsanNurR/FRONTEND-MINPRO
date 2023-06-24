import { MyPage } from "@/components/types";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  makeStyles,
} from "@mui/material";

import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logo from "../../../../public/Bimoli.jpg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  reqApplyBatch,
  reqGetProgName,
} from "@/redux/bootcampSchema/action/actionReducer";
import dayjs from "dayjs";
import { format } from "date-fns";
import { ToastContainer } from "react-toastify";
import alert from "@/alert";
import { getCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";
import Image from "next/image";
import loading from "../../../../public/loading-infinite.svg";

const Apply: MyPage = () => {
  const router = useRouter();
  let { progname, refresh } = useSelector(
    (state: any) => state.prognameReducer
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [age, setAge] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [programBootcamp, setProgramBootcamp] = useState("");
  const [isError, setIsError] = useState("");
  const [fileIsValid, setFileIsValid] = useState(true);
  const [imageIsValid, setImageIsValid] = useState(true);
  const [birthDate, setBirthDate] = useState(null);
  let { users, msg, status }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );
  const token = getCookie("token");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    unregister,

    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqGetProgName());
    const token = getCookie("token");
    if (typeof token === "string") {
      const decode: any = jwt.decode(token);
      if (decode.aud) {
        dispatch(GetByNameOrEmail(decode.aud));
      }
    }
  }, [refresh, token]);

  const handleApplyBootcamp = (formData: any) => {
    // console.log('data',formData);
    if (fileIsValid && imageIsValid) {
      const data: any = new FormData();

      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("birth_date", formData.birth_date);
      data.append("usdu_school", formData.usdu_school);
      data.append("usdu_field", formData.usdu_field);
      data.append("usdu_degree", formData.usdu_degree);
      data.append("prog_entity_id", formData.prog_entity_id);
      data.append("parog_comment", formData.parog_comment);
      data.append("cv", formData.cv[0]);
      data.append("user_entity_id", users.user_entity_id);
      data.append("foto", formData.foto[0]);

      // console.log("ea", ...data);
      // console.log("size", formData.cv[0].size);
      if (
        formData.foto[0]?.size >= 2097152 ||
        formData.cv[0]?.size >= 2097152
      ) {
        alert.notifyFailed(413, "GAGAL, file is to large max 2MB");
      }

      // data.append()
      dispatch(reqApplyBatch(data));
      console.log("apply", ...data);
      router.push("/bootcamp/confirm");
      // router.back()
    } else {
      alert.notifyFailed(
        415,
        "Harus PDF atau DOCX atau DOC dan FOTO harus JPEG atau JPG atau PNG"
      );
    }
  };

  const handleChangePendidikan = (event: SelectChangeEvent) => {
    setPendidikan(event.target.value as string);
  };
  const handleChangeProgramBootcamp = (event: SelectChangeEvent) => {
    setProgramBootcamp(event.target.value as string);
  };

  const handleDateChange = (value: any) => {
    register("birth_date");
    setBirthDate(value);
    if (value) {
      const formattedDate: any = format(value.$d, "dd/MM/yyyy");
      setValue("birth_date", formattedDate);
      setSelectedDate(value);
      calculateAge(value); // Set the value of "date" field in the form
    } else {
      setError("birth_date", { message: "require" });
      unregister("birth_date");
    }
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(calculatedAge.toString());
  };

  const [selectedPhoto, setSelectedPhoto] = useState(logo.src);

  const handlePhotoSelection = (event: any) => {
    const file = event.target.files[0];
    const isJPEG = file?.type === "image/jpeg";
    const isJPG = file?.type === "image/jpg";
    const isPNG = file?.type === "image/png";
    if (isJPEG || isJPG || isPNG) {
      const reader = new FileReader();

      reader.onload = function (e: any) {
        setSelectedPhoto(e.target.result);
      };

      reader.readAsDataURL(file);
      setImageIsValid(true);
    } else {
      setImageIsValid(false);
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const isPDF = selectedFile?.type === "application/pdf";
    const isDOCX = selectedFile?.type === "application/docx";
    const isDOC = selectedFile?.type === "application/doc";
    if (!isPDF && !isDOCX && !isDOC) {
      setIsError("File Harus PDF atau DOCX atau DOC");
      setFileIsValid(false);
    } else {
      setIsError("");
      setFileIsValid(true);
    }
  };
  console.log(users.user_entity_id);
  if (!users) {
    return (
      <div className="mt-48 flex justify-center items-center">
        <Image src={loading} alt="loading" className="text-center" />
      </div>
    );
  } else {
    return (
      <>
        {/* <ContentUser> */}
        <ToastContainer />
        <div className="grid place-items-center mx-2 sm:my-auto">
          <div className="w-full px-6 py-10 sm:px-10 sm:py-6  rounded-lg shadow-md lg:shadow-lg">
            <h2 className=" font-bold uppercase text-2xl lg:text-2xl text-blue-800">
              Application Process Bootcamp
            </h2>

            <form onSubmit={handleSubmit(handleApplyBootcamp)}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="hidden"
                    value={users.user_entity_id}
                    {...register("user_entity_id")}
                  />
                  <div className="flex">
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      className="w-7/12"
                      variant="outlined"
                      {...register("first_name")}
                    />

                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      className="w-7/12 ml-5"
                      variant="outlined"
                      {...register("last_name")}
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center ">
                      {/* <input
                id="dateInput"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="bg-white text-black focus:text-gray-500 focus:outline-none border-b-2"
              /> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          slotProps={{
                            actionBar: {
                              actions: ["clear"],
                            },
                          }}
                          format="DD/MM/YYYY"
                          label="Birth Date"
                          className="w-7/12"
                          {...register("birth_date")}
                          onChange={handleDateChange}
                          value={dayjs(selectedDate)}
                        />
                      </LocalizationProvider>
                      {/* <input
                    id="age"
                    type="text"
                    name="age"
                    value={age ? `${age} tahun` : ""}
                    placeholder="Age"
                    className="bg-white text-black focus:outline-none"
                    readOnly
                  /> */}
                      <TextField
                        id="outlined-basic"
                        // label="Umur"
                        className="w-7/12 ml-5"
                        variant="outlined"
                        value={age ? `${age} tahun` : ""}
                        aria-readonly={true}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <TextField
                      id="outlined-basic"
                      label="University"
                      className="w-full"
                      {...register("usdu_school")}
                      variant="outlined"
                    />
                  </div>
                  <div className="mt-5">
                    <TextField
                      id="outlined-basic"
                      label="Jurusan"
                      className="w-full"
                      variant="outlined"
                      {...register("usdu_field")}
                    />
                  </div>
                  <div className="mt-5">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Pendidikan
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pendidikan}
                        label="Pendidikan"
                        {...register("usdu_degree")}
                        onChange={handleChangePendidikan}
                      >
                        <MenuItem value={"Bachelor"}>Sarjana</MenuItem>
                        <MenuItem value={"Diploma"}>Diploma</MenuItem>
                        {/* <MenuItem value={'sma/smk'}>SMK/SMA</MenuItem> */}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="mt-5">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Program Bootcamp
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={programBootcamp}
                        label="Program Bootcamp"
                        {...register("prog_entity_id")}
                        onChange={handleChangeProgramBootcamp}
                      >
                        {(progname || []).map((e: any, i: any) => (
                          <MenuItem value={e.prog_entity_id}>
                            {e.prog_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="mt-5">
                    <TextField
                      id="motivation"
                      variant="outlined"
                      label="Motivation Join Bootcamp"
                      autoComplete="off"
                      multiline
                      maxRows={4}
                      {...register("parog_comment")}
                      className="w-full"
                      // className="w-10/12 ml-4"
                      inputProps={{ maxLength: 250, "aria-valuemax": 250 }}
                      // className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
                      // {...register("reason", registerOptions.reason)}
                    />
                  </div>
                  <div className="mb-10">
                    <label
                      htmlFor=""
                      className="block text-xs ml-1 font-semibold text-gray-600 uppercase mt-5  mb-1"
                    >
                      Resume{" "}
                      <span className="italic text-red-400 lowercase">
                        {" "}
                        * only receive pdf, docx, doc
                      </span>
                    </label>
                    <input
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm mt-3  file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      type="file"
                      {...register("cv")}
                      onChange={handleFileChange}
                      accept="application/pdf,application/docx, application/doc"
                    />
                  </div>
                  <div className="mb-5 -mt-3">
                    {isError && (
                      <small className="italic font-semibold text-red-500">
                        {isError}
                      </small>
                    )}
                  </div>
                </div>

                <div className="lg:mt-0 sm:mt-8 items-end">
                  <div className="">
                    <label
                      htmlFor=""
                      className="block text-xs font-semibold text-gray-600 uppercase mb-2"
                    >
                      Photo Profile
                    </label>
                    <div className="shrink-0">
                      <img
                        className="h-32 w-32 p-2 object-cover rounded-full mb-3 "
                        src={selectedPhoto}
                        alt="Current profile photo"
                      />
                    </div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        {...register("foto")}
                        accept="image/jpeg, image/jpg, image/png"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={handlePhotoSelection}
                      />
                      <span className="italic text-red-400 lowercase text-xs font-semibold">
                        {" "}
                        * only receive jpg, png, jpeg
                      </span>
                    </label>
                  </div>

                  {/* <div>
                <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-5  mb-1"
                >
                Resume
                </label>
                <input
                type="file"
                  accept=".pdf"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                  placeholder="Pilih file PDF"
                  />
                </div> */}
                </div>
              </div>
              <Button
                type="submit"
                // onClick={() => router.push('/signup/confirm')}
                className="lg:py-3 w-full lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-blue-700 hover:shadow-none"
              >
                Apply
              </Button>
            </form>
          </div>
        </div>
        {/* </ContentUser> */}
      </>
    );
  }
};
Apply.Layout = "User";
export default Apply;
