import Content from "../../../../components/shared/content";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GroupsIcon from "@mui/icons-material/Groups";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { MyPage } from "@/components/types";
import { useDispatch, useSelector } from "react-redux";
import {
  reqCreateBootcamp,
  reqGetBootcampById,
  reqGetBootcampDaftarApply,
  reqGetProgName,
  reqGetTrainer,
} from "@/pages/redux/bootcampSchema/action/actionReducer";

const newBatch: MyPage = (props: any) => {
  //reducer
  let { bootcamp, message, refresh, status } = useSelector(
    (state: any) => state.bootcampReducer
  );
  let { daftarapply } = useSelector((state: any) => state.orangApplyReducer);

  let { progname } = useSelector((state: any) => state.prognameReducer);

  let { trainer } = useSelector((state: any) => state.trainerReducer);
  console.log("trainernya", trainer);
  //===============================================================

  //router
  const router = useRouter();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState<number[]>([]);
  //ceklist user
  const cekUser = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((item) => item !== index));
      // console.log(`${index} tidak di cek`);
    } else {
      setChecked([...checked, index]);
      // console.log(`${index} di cek`);
    }
  };

  console.log(checked);
  //useEffect API
  useEffect(() => {
    dispatch(reqGetProgName());
    dispatch(reqGetBootcampDaftarApply());
    dispatch(reqGetTrainer());
  }, []);
  //===================

  //useEffect Trainee
  useEffect(() => {
    setValue(
      "batchTrainees",
      [...checked].sort((a, b) => a - b)
    );
  }, [checked]);
  //================

  //type form
  type FormValues = {
    batchname: string;
    Technology: string;
    description: string;
    reason: string;
    StartPeriod: Date;
    EndPeriod: Date;
    Trainer: string;
    CoTrainer: string;
    batchTrainees: number[];
    batch_id: number;
    batch_type: string;
  };
  //================

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormValues>();

  //submit

  const handleRegistration = async (data: any) => {
    // console.log("data", data);
    // if (!data.StartPeriod) {
    //   setError("StartPeriod", { message: "require" });
    // }
    // if (!data.EndPeriod) {
    //   setError("EndPeriod", { message: "require" });
    // }
    // if (!data.EndPeriod || !data.StartPeriod) {
    //   return true;
    // } else {
      const trainerId = data.Trainer?.user_entity_id;
      const coTrainerId = data.CoTrainer?.user_entity_id;
      const trainerPrograms = [trainerId, coTrainerId];
      const batch = {
        batch_entity_id: data.Technology,
        batch_name: data.batchname,
        batch_description: data.description,
        batch_start_date: data.StartPeriod,
        batch_end_date: data.EndPeriod,
        batch_reason: data.reason,
        batch_type: data.batch_type,
        batch_status: "open",
        batch_pic_id: 1,
      };
      const batchTrainees = data.batchTrainees;
      const gabung = { batch, batchTrainees, trainerPrograms };
      // dispatch(reqCreateBootcamp(gabung));
      console.log(gabung);
    // }
  };

  //Date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //handle start date
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    setEndDate(null);
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      setValue("StartPeriod", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };

  //handle end date
  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    if (date) {
      const formattedDate: any = format(date.$d, "dd/MM/yyyy");
      setValue("EndPeriod", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };
  //End Date > start Date
  const isEndDateDisabled = !startDate;
  const minEndDate = startDate ? dayjs(startDate).add(1, "day") : null;

  //=================================================================================

  const registerOptions = {
    batchname: { required: "required" },
    Technology: { required: "required" },
    description: { required: "description is required" },
    reason: { required: "reason is required" },
    StartPeriod: { required: "Start Period is required" },
    EndPeriod: { required: "End Period is required" },
    Trainer: { required: "Trainer is required" },
    CoTrainer: { required: "Co-Trainer is required" },
    batchTrainees: { required: "Selected Members is required" },
    batch_id: { required: "batch id is  required" },
    batch_type: { required: "batch_type is  required" },
  };

  //contoh data

  const dataBulan = [
    { id: 1, bulan: "Januari" },
    { id: 2, bulan: "Februari" },
    { id: 3, bulan: "Maret" },
    { id: 4, bulan: "April" },
    { id: 5, bulan: "Mei" },
    { id: 6, bulan: "Juni" },
    { id: 7, bulan: "Juli" },
    { id: 8, bulan: "Agustus" },
    { id: 9, bulan: "September" },
    { id: 10, bulan: "Oktober" },
    { id: 11, bulan: "November" },
    { id: 12, bulan: "Desember" },
  ];

  const tahunArray = daftarapply
    .map((item: any) => parseInt(item.applied_year))
    .filter(
      (tahun: any, index: any, array: any) => array.indexOf(tahun) === index
    )
    .map((tahun: any) => ({
      id: tahun,
      tahun: tahun,
      tahunnya: tahun.toString(),
    }));

  const bulanArray = daftarapply
    .map((item: any) => parseInt(item.applied_year))
    .filter(
      (tahun: any, index: any, array: any) => array.indexOf(tahun) === index
    )
    .map((tahun: any) => ({
      id: tahun,
      tahun: tahun,
      tahunnya: tahun.toString(),
    }));

  //props
  const propsData = {
    options: trainer,
    getOptionLabel: (option: TrainerType) => option.trainer_name,
  };

  const propsBulan = {
    options: dataBulan,
    getOptionLabel: (option: BulanType) => option.bulan,
  };

  const propsTahun = {
    options: tahunArray,
    getOptionLabel: (option: TahunType) => option.tahunnya,
  };

  //interface
  interface TrainerType {
    trainer_name: string;
    user_entity_id: number;
  }

  interface BulanType {
    id: number;
    bulan: string;
  }

  interface TahunType {
    id: number;
    tahun: number;
    tahunnya: string;
  }
  const handleError = (errors: any) => {};

  const [selectedTechnology, setSelectedTechnology] = useState("");
  const handleTechnologyChange = (event: any) => {
    setSelectedTechnology(event.target.value);
  };

  //pagination dan filtering
  const [selectedBulan, setSelectedBulan] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [filteredData, setFilteredData] = useState(daftarapply);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // const handleFilter = (selectedBulan: any, selectedTahun: any) => {
  //   let newData = daftarapply;
  //   if (selectedBulan) {
  //     newData = newData.filter((user:any) => user.applied_month == selectedBulan.bulan);
  //   }

  //   if (selectedTahun) {
  //     newData = newData.filter((user:any) => parseInt(user.applied_year) == selectedTahun?.tahun);
  //     console.log('filter',newData.filter((user:any) => parseInt(user.applied_year) == selectedTahun?.tahun))
  //   }

  //   setFilteredData(newData);
  //   setCurrentPage(1); // Reset halaman ke halaman pertama setelah filtering

  //   // Reset selectedBulan and selectedTahun jika nul
  //   if (!selectedBulan && !selectedTahun) {
  //     setSelectedBulan(null);
  //     setSelectedTahun(null);
  //   }
  // };

  const handleFilter = (selectedBulan: any, selectedTahun: any) => {
    let newData = [...daftarapply]; // Create a new array to store the filtered data

    if (selectedBulan) {
      newData = newData.filter(
        (user: any) => parseInt(user.applied_month) === selectedBulan.id
      );
    }

    if (selectedTahun) {
      newData = newData.filter(
        (user: any) => parseInt(user.applied_year) === selectedTahun.tahun
      );
    }

    setFilteredData(newData);
    setCurrentPage(1);

    if (!selectedBulan && !selectedTahun) {
      setSelectedBulan(null);
      setSelectedTahun(null);
    }
    console.log("newData", newData);
    console.log("selected", selectedBulan);
  };

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = currentPage * itemsPerPage;
  const currentData = filteredData?.slice(firstIndex, lastIndex);

  // const paginatedData = useMemo(() => {
  //   const firstIndex = (currentPage - 1) * itemsPerPage;
  //   const lastIndex = firstIndex + itemsPerPage;
  //   return filteredData?.slice(firstIndex, lastIndex);
  // }, [currentPage, filteredData, itemsPerPage]);

  const handleChangePage = (event: any, page: any) => {
    setCurrentPage(page);
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <div>
      <Content title={`CREATE BATCH`}>
        <div className="container mx-auto border-2 border-gray-300 relative rounded-xl">
          <form
            onSubmit={handleSubmit(handleRegistration, handleError)}
            className="mt-2"
          >
            <div className=" rounded p-4 flex items-center relative ">
              <div className="w-2/6">
                <TextField
                  id="batchname"
                  variant="outlined"
                  label="Batch Name"
                  autoComplete="off"
                  className="w-full "
                  {...register("batchname", registerOptions.batchname)}
                />
              </div>
              <div className="w-6"></div>
              <div className="w-2/6">
                <FormControl variant="outlined" className="w-full">
                  <InputLabel id="Technology">Technology</InputLabel>
                  <Select
                    labelId="Technology"
                    id="Technology"
                    {...register("Technology", registerOptions.Technology)}
                    label="Technology"
                  >
                    {progname.map((prog: any) => (
                      <MenuItem
                        key={prog.prog_entity_id}
                        value={prog.prog_entity_id}
                      >
                        {prog.prog_title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-6"></div>
              <div className="w-2/6 flex justify-center items-center relative">
                <GroupsIcon style={{ fontSize: "8vw" }} className="relative" />
              </div>
            </div>
            <div className={`w-full flex ml-4`}>
              <div className="w-2/6">
                {errors?.batchname && (
                  <small className="text-red-500 absolute -mt-5 lg:-mt-10 md:-mt-6 sm:-mt-4">
                    {errors.batchname.message}
                  </small>
                )}
              </div>
              <div className="w-2/6">
                {errors?.Technology && (
                  <small className="text-red-500 absolute -mt-5 lg:-mt-10 md:-mt-6 sm:-mt-4">
                    {errors.Technology.message}
                  </small>
                )}
              </div>
            </div>
            <div className="w-full">
              <TextField
                id="description"
                variant="outlined"
                label="Description"
                autoComplete="off"
                multiline
                maxRows={4}
                inputProps={{ maxLength: 120, "aria-valuemax": 120 }}
                className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
                {...register("description", registerOptions.description)}
              />
              <div className="absolute w-full">
                {errors?.description && (
                  <small className="text-red-500 ml-4">
                    {errors.description.message}
                  </small>
                )}
              </div>
            </div>
            <div className="w-full mt-10 mb-8 flex ">
              <TextField
                id="reason"
                variant="outlined"
                label="Reason"
                autoComplete="off"
                multiline
                maxRows={4}
                inputProps={{ maxLength: 120, "aria-valuemax": 120 }}
                className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
                {...register("reason", registerOptions.reason)}
              />
              <div className="w-2/6 flex justify-center items-center">
                <a
                  className={`text-6xl ml-2 -mt-36 ${
                    checked.length == 0 ? "hidden" : ""
                  }`}
                >
                  {checked.length}
                </a>
              </div>
              <div className="absolute w-full ml-4 mt-14">
                {errors?.reason && (
                  <small className="text-red-500">
                    {errors.reason.message}
                  </small>
                )}
              </div>
            </div>
            <div className="w-full mb-4">
              <FormControl
                variant="outlined"
                className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4"
              >
                <InputLabel id="batch_type">Batch Type</InputLabel>
                <Select
                  labelId="batch_type"
                  id="batch_type"
                  {...register("batch_type", registerOptions.batch_type)}
                  label="batch_type"
                >
                  <MenuItem value={"online"}>Online</MenuItem>
                  <MenuItem value={"offline"}>Offline</MenuItem>
                  <MenuItem value={"corporate"}>Corporate</MenuItem>
                </Select>
              </FormControl>
              <div className="ml-6"></div>
            </div>
            <div className="w-full ml-4 -mt-4 mb-1">
              {errors?.batch_type && (
                <small className="text-red-500">
                  {errors.batch_type.message}
                </small>
              )}
            </div>
            <div className="w-4/6 text-center"></div>
            <a className="sm:text-sm md:text-base text-sm h-auto ml-4 mt-4">
              Periode
            </a>
            <div className=" p-4 flex items-center -mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="w-2/6">
                  <DatePicker
                    slotProps={{
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    format="DD/MM/YYYY"
                    label="Mulai"
                    className="w-full"
                    onChange={handleStartDateChange}
                    value={startDate}
                  />
                </div>
                <div className="w-6"></div>
                <div className="w-2/6">
                  <DatePicker
                    slotProps={{
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    format="DD/MM/YYYY"
                    label="Selesai"
                    className="w-full"
                    minDate={minEndDate}
                    disabled={isEndDateDisabled}
                    onChange={handleEndDateChange}
                    value={endDate}
                  />
                </div>
              </LocalizationProvider>
              <div className="w-6"></div>
            </div>
            <div className=" w-full -mt-4 flex">
              <div className="w-2/6">
                {errors.StartPeriod && (
                  <small className="text-red-500 ml-4">
                    {errors?.StartPeriod.message}
                  </small>
                )}
              </div>
              <div className="w-4"></div>
              <div className="w-2/6">
                {errors.StartPeriod && (
                  <small className="text-red-500 ml-4">
                    {errors?.StartPeriod.message}
                  </small>
                )}
              </div>
            </div>
            <div className=" p-4 flex items-center w-full relative">
              <Autocomplete
                {...propsData}
                id="Trainer"
                autoComplete
                className="w-5/12"
                includeInputInList
                onChange={(event: any, value: any) => {
                  register("Trainer", {
                    ...registerOptions.Trainer,
                    value: value
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Trainer"
                    variant="standard"
                  />
                )}
              />
              <div className="w-8"></div>
              <Autocomplete
                {...propsData}
                id="CoTrainer"
                autoComplete
                className="w-5/12"
                includeInputInList
                onChange={(event: any, value: any) => {
                  register("CoTrainer", { value: value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Co-Trainer"
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="w-2/6">
              {errors.Trainer && (
                <small className="text-red-500 ml-4">
                  {errors?.Trainer.message}
                </small>
              )}
            </div>
            <div className="mt-6"></div>
            <a className="sm:text-sm md:text-base text-sm h-auto ml-4 relative">
              Recommended Bootcamp Members
            </a>
            <div className="p-4 flex items-center justify-center -mt-2">
              <div className="w-8/12 flex justify-center items-center relative -ml-2">
                <Autocomplete
                  {...propsBulan}
                  id="Filter By Month"
                  autoComplete
                  className="w-6/12 relative"
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event: any, value: any) => setSelectedBulan(value)}
                  includeInputInList
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter By Month"
                      variant="standard"
                    />
                  )}
                />
                <div className="w-10"></div>
                <Autocomplete
                  {...propsTahun}
                  id="Filter By Year"
                  autoComplete
                  className="w-6/12 relative"
                  value={selectedTahun}
                  onChange={(event: any, value: any) => setSelectedTahun(value)}
                  includeInputInList
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter By Year"
                      variant="standard"
                    />
                  )}
                />
                <div className="w-10"></div>
                <Button
                  type="button"
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-600 relative"
                  onClick={() => handleFilter(selectedBulan, selectedTahun)}
                >
                  Search
                </Button>
              </div>
            </div>
            {/* Filter orangnya, ketika filtered.length = 0, maka pake yang lama */}
            <div className="flex flex-wrap w-full items-center justify-center">
              {(
                (filteredData.length == 0 ? daftarapply : filteredData) || []
              ).map((user: any) => (
                //batchTrainees digunakan jika sudah ada datanya
                <Card
                  key={user.user_entity_id}
                  className={`m-3 rounded-lg ${
                    checked.includes(user.user_entity_id)
                      ? "transisi bg-green-400"
                      : "transisi  bg-white"
                  }`}
                  sx={{ minWidth: 250 }}
                  onClick={() => cekUser(user.user_entity_id)}
                >
                  <CardContent className="flex flex-wrap items-center justify-between">
                    <Avatar alt="Remy Sharp" src={user.foto} />
                    <Typography variant="body1" component="div">
                      {user.trainee_name}
                    </Typography>

                    <AddRoundedIcon
                      className={`${
                        checked.includes(user.user_entity_id)
                          ? "transisi rotate-45"
                          : "transisi"
                      }`}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </div>
            <input type="hidden" {...register("batchTrainees")} />
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                variant="contained"
                className="mt-4 mr-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Submit
              </Button>

              <Button
                type="button"
                onClick={() => {
                  router.back();
                }}
                variant="contained"
                className="mt-4 ml-2 mb-4 mr-4 bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Content>
    </div>
  );
};

newBatch.Layout = "Admin";
export default newBatch;
