import { MyPage } from "@/components/types";
import topbarUser from "@/components/shared/topbarUser";
import Topbar2 from "@/components/shared/topbarUser";
import Content from "@/components/shared/content";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/Bimoli.jpg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { reqApplyBootcamp } from "@/redux/bootcampSchema/action/actionReducer";

const Apply: MyPage = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [age, setAge] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [programBootcamp, setProgramBootcamp] = useState("");
  const [isError, setIsError] = useState(false);
  const [birthDate, setBirthDate] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    unregister,

    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()
  const handleApplyBootcamp = (formData: any) => {
    console.log('data',formData);
    // dispatch(reqApplyBootcamp(formData))
  };

  const handleChangePendidikan = (event: SelectChangeEvent) => {
    setPendidikan(event.target.value as string);
  };
  const handleChangeProgramBootcamp = (event: SelectChangeEvent) => {
    setProgramBootcamp(event.target.value as string);
  };

  const handleDateChange = (value: any) => {
    register('birth_date')
    setBirthDate(value)
    if (value) {
      setSelectedDate(value);
      calculateAge(value);
    }else {
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
    const reader = new FileReader();

    reader.onload = function (e: any) {
      setSelectedPhoto(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const isPDF = selectedFile.type === "application/pdf";
    if (!isPDF) {
      // File is a PDF
      console.log("Selected file is not a PDF");
      // setIsError(true)
      // Do further processing for PDF file
    } else {
      // File is not a PDF
      console.log("Selected file is a PDF");
      // Show error message or handle accordingly
    }
  };
  return (

    <div className="mt-16 mb-5">
      <div className="grid place-items-center mx-2 sm:my-auto">
        <div className="w-full px-6 py-10 sm:px-10 sm:py-6  rounded-lg shadow-md lg:shadow-lg">
          <h2 className=" font-bold uppercase text-2xl lg:text-2xl text-blue-800">
            Application Process .NET Bootcamp
          </h2>

          <form onSubmit={handleSubmit(handleApplyBootcamp)}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    className="w-7/12"
                    variant="outlined"
                    {...register('first_name')}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    className="w-7/12 ml-5"
                    variant="outlined"
                    {...register('last_name')}
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
                        {...register("birth_date")}
                        onChange={handleDateChange}
                        className="w-7/12"
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
                    {...register('usdu_school')}
                    variant="outlined"
                  />
                </div>
                <div className="mt-5">
                  <TextField
                    id="outlined-basic"
                    label="Jurusan"
                    className="w-full"
                    variant="outlined"
                    {...register('usdu_field')}
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
                      {...register('usdu_degree')}
                      onChange={handleChangePendidikan}
                    >
                      <MenuItem value={'sarjana'}>Sarjana</MenuItem>
                      <MenuItem value={'diploma'}>Diploma</MenuItem>
                      <MenuItem value={'sma/smk'}>SMK/SMA</MenuItem>
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
                      {...register('prog_entity_id')}
                      onChange={handleChangeProgramBootcamp}
                    >
                      <MenuItem value={1}>NodeJS</MenuItem>
                      <MenuItem value={2}>.NET</MenuItem>
                      <MenuItem value={3}>GOLANG</MenuItem>
                      <MenuItem value={4}>FLUTTER</MenuItem>
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
                    {...register('parog_comment')}
                    className="w-full"
                    // className="w-10/12 ml-4"
                    inputProps={{ maxLength: 250, "aria-valuemax": 250 }}
                    // className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
                    // {...register("reason", registerOptions.reason)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor=""
                    className="block text-xs font-semibold text-gray-600 uppercase mt-5  mb-1"
                  >
                    Resume
                  </label>
                  <Input
                    type="file"
                    inputProps={{
                      accept: "application/pdf, .docx, .doc",
                    }}
                    {...register('cv')}
                    onChange={handleFileChange}
                  />
                  {/* <input
                  type="file"
                  name="upload"
                  accept="application/pdf,application/docx"
                /> */}
                  {/* <input
                  type="file"
                  accept=".pdf, .docx, .doc"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                  placeholder="Pilih file PDF, DOCX, atau DOC"
                /> */}
                </div>
                {/* <div>
                  <h5>*</h5>
                </div> */}
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
                      {...register('foto')}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                      onChange={handlePhotoSelection}
                    />
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
    </div>
  );
};
Apply.Layout = "User";
export default Apply;
