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
  reqGetBootcampById,
  reqGetBootcampDaftarApply,
  reqGetProgName,
  reqGetTrainer,
} from "@/pages/redux/bootcampSchema/action/actionReducer";

const EditBatch: MyPage = (props: any) => {

  //reducer
  let { bootcamp, message, refresh, status } = useSelector(
    (state: any) => state.bootcampReducer
  );
  let { daftarapply } = useSelector((state: any) => state.orangApplyReducer);

  let { progname } = useSelector((state: any) => state.prognameReducer);

  let {trainer} = useSelector((state:any)=> state.trainerReducer);

  //===============================================================
   
  //Query
  const router = useRouter();
  const { id } = router.query;
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
    dispatch(reqGetBootcampById(id));
    dispatch(reqGetTrainer())
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
    batch_type:string;
  };
  //================


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>();

  //submit
  const handleRegistration = async (data: any) => {
    const trainerId = data.Trainer?.user_entity_id;
    const coTrainerId = data.CoTrainer?.user_entity_id;
    const trainer = [trainerId, coTrainerId];
    let dataBatch;
    let dataTrainee;
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
    batchname: { required: "Batch Name is required" },
    Technology: { required: "Technology is required" },
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

  const dataTahun = [
    { id: 1, tahun: 1999, tahunnya: "1999" },
    { id: 2, tahun: 2000, tahunnya: "2000" },
    { id: 3, tahun: 2001, tahunnya: "2001" },
    { id: 4, tahun: 2002, tahunnya: "2002" },
    { id: 5, tahun: 2003, tahunnya: "2003" },
    { id: 6, tahun: 2004, tahunnya: "2004" },
    { id: 7, tahun: 2005, tahunnya: "2005" },
  ];

  const tahunArray = daftarapply
  .map((item:any) => parseInt(item.applied_year))
  .filter((tahun:any, index:any, array:any) => array.indexOf(tahun) === index)
  .map((tahun:any) => ({
    id: tahun,
    tahun: tahun,
    tahunnya: tahun.toString(),
  }));

  const bulanArray = daftarapply
  .map((item:any) => parseInt(item.applied_year))
  .filter((tahun:any, index:any, array:any) => array.indexOf(tahun) === index)
  .map((tahun:any) => ({
    id: tahun,
    tahun: tahun,
    tahunnya: tahun.toString(),
  }));

  const dataUser = [
    { id: 1, bulan: "Januari", tahun: 1999, name: "nama" },
    { id: 2, bulan: "Januari", tahun: 1999, name: "nama2" },
    { id: 3, bulan: "Februari", tahun: 2000, name: "nama3" },
    { id: 4, bulan: "Maret", tahun: 2000, name: "nama4" },
    { id: 5, bulan: "Maret", tahun: 2001, name: "nama5" },
    { id: 6, bulan: "April", tahun: 2001, name: "nama6" },
    { id: 7, bulan: "Mei", tahun: 2001, name: "nama7" },
    { id: 8, bulan: "Juni", tahun: 2002, name: "nama8" },
    { id: 9, bulan: "Juli", tahun: 2003, name: "nama9" },
    { id: 10, bulan: "Februari", tahun: 2000, name: "nama10" },
    { id: 11, bulan: "Maret", tahun: 2000, name: "nama11" },
    { id: 12, bulan: "Juli", tahun: 2003, name: "nama12" },
  ];

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
      newData = newData.filter((user: any) => parseInt(user.applied_month) === selectedBulan.id);
    }
  
    if (selectedTahun) {
      newData = newData.filter((user: any) => parseInt(user.applied_year) === selectedTahun.tahun);
    }
  
    setFilteredData(newData);
    setCurrentPage(1);
  
    if (!selectedBulan && !selectedTahun) {
      setSelectedBulan(null);
      setSelectedTahun(null);
    }
    console.log('newData',newData)
    console.log('selected',selectedBulan)
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

  const pageCount =  Math.ceil(filteredData.length / itemsPerPage);
  return (
    <div>
      <Content title={`EDIT ${bootcamp[0].batch_name}`}>
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
                  defaultValue={bootcamp[0].batch_name}
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
                    defaultValue={bootcamp[0].batch_entity_id}
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
                defaultValue={bootcamp[0].batch_description}
              />
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
                defaultValue={bootcamp[0].batch_reason}
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
            </div>
            <div className="w-full mb-4">
              <FormControl variant="outlined" className="lg:w-[63.7%] md:w-[60%] sm:w-[60%] w-[61.7%] ml-4">
                <InputLabel id="batch_type">Batch Type</InputLabel>
                <Select
                  labelId="batch_type"
                  id="batch_type"
                  {...register("batch_type", registerOptions.batch_type)}
                  label="batch_type"
                  defaultValue={bootcamp[0].batch_type}
                >
                    <MenuItem
                      value={'online'}
                    >
                      Online
                    </MenuItem>
                    <MenuItem
                      value={'offline'}
                    >
                      Offline
                    </MenuItem>
                    <MenuItem
                      value={'corporate'}
                    >
                      Corporate
                    </MenuItem>
                </Select>
              </FormControl>
              <div className="ml-6"></div>
            </div>
            <div className="w-4/6 text-center"></div>
            <input
              type="hidden"
              defaultValue={bootcamp[0].batch_id}
              {...register("batch_id", registerOptions.batch_id)}
            />
            <a className="sm:text-sm md:text-base text-sm h-auto ml-4 ">
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
                    defaultValue={bootcamp[0].batch_start_date}
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
                    defaultValue={bootcamp[0].batch_end_date}
                  />
                </div>
              </LocalizationProvider>
              <div className="w-6"></div>
            </div>
            <div className=" p-4 flex items-center w-full relative">
              <Autocomplete
                {...propsData}
                id="Trainer"
                autoComplete
                className="w-5/12"
                includeInputInList
                onChange={(event: any, value: any) => {
                  register("Trainer", { value: value });
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
              {( (filteredData.length==0? daftarapply : filteredData) || []).map((user: any) => (
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

EditBatch.Layout = "Admin";
export default EditBatch;
