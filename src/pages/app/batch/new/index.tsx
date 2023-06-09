import Content from "@/components/shared/content";
import {
  Autocomplete,
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
import { useState } from "react";
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

const NewBatch:MyPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState<number[]>([]);

  //type form
  type FormValues = {
    BatchName: string;
    Technology: string;
    StartPeriod: Date;
    EndPeriod: Date;
    Trainer: string;
    CoTrainer: string;
    SelectedMembers: [];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  //submit
  const handleRegistration = async (data: any) => {
    // try {
    console.log(data);
    data.selectedMembers = checked.sort((a, b) => a - b);
    if (data.selectedMembers.length < 1) {
      console.log("pilih membernya");
    }
    console.log(data);
    //       // const result = await apiMethod.createUserCustomer(data);
    //       const result = dispatch(doAddUserCustomer(data));
    //       // if (result.status) {
    //       //   if (status === 200) {
    //       //     alert.notifySuccess("Sukses!", "User berhasil dibuat!");
    //       //
    //       //   } else if (status === 400) {
    //       //     alert.notifyFailed(status, statustext);
    //       //
    //       //   }
    //       // }
    // } catch (error) {
    //   console.error(error);
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

  //ceklist user
  const ngecek = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((item) => item !== index));
      console.log(`${index} tidak di cek`);
    } else {
      setChecked([...checked, index]);
      console.log(`${index} di cek`);
    }
  };

  console.log(checked);

  const registerOptions = {
    BatchName: { required: "Batch Name is required" },
    Technology: { required: "Firstname is required" },
    StartPeriod: { required: "Start Period is required" },
    EndPeriod: { required: "End Period is required" },
    Trainer: { required: "Trainer is required" },
    CoTrainer: { required: "Co-Trainer is required" },
    SelectedMembers: { required: "Selected Members is required" },
  };

  //contoh data
  const data = [
    { name: "Ikhsan Nur R", asal: "Purwokerto" },
    { name: "Aji Prakoso N", asal: "Jakarta" },
    { name: "Dany Utama R", asal: "Depok" },
    { name: "Rani Dwi H", asal: "Jakarta" },
  ];

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
    options: data,
    getOptionLabel: (option: TrainerType) => option.name,
  };

  const propsBulan = {
    options: dataBulan,
    getOptionLabel: (option: BulanType) => option.bulan,
  };

  const propsTahun = {
    options: dataTahun,
    getOptionLabel: (option: TahunType) => option.tahunnya,
  };

  //interface
  interface TrainerType {
    name: string;
    asal: string;
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

  //pagination dan filtering
  const [selectedBulan, setSelectedBulan] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [filteredData, setFilteredData] = useState(dataUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleFilter = (selectedBulan: any, selectedTahun: any) => {
    let newData = dataUser;
    if (selectedBulan) {
      newData = newData.filter((user) => user.bulan == selectedBulan.bulan);
    }

    if (selectedTahun) {
      newData = newData.filter((user) => user.tahun == selectedTahun?.tahun);
    }

    setFilteredData(newData);
    setCurrentPage(1); // Reset halaman ke halaman pertama setelah filtering

    // Reset selectedBulan and selectedTahun when they are null
    if (!selectedBulan && !selectedTahun) {
      setSelectedBulan(null);
      setSelectedTahun(null);
    }
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
      <Content title="CREATE BATCH">
        {/* <div className="mt-2">
          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
              <div className="col-span-1">
                <input
                  {...register("BatchName", registerOptions.BatchName)}
                  className="border-solid-gray-400 border-2 p-3 md:text-md w-full"
                  placeholder="Batch Name"
                  autoComplete="off"
                />
                <small className="text-danger">
                  {errors?.BatchName && errors.BatchName.message}
                </small>
              </div>
            </div>
          </form>
        </div> */}

        {/* <div className="container mx-auto">
          <form
            onSubmit={handleSubmit(handleRegistration, handleError)}
            className="mt-2"
          >
            <div className="border border-gray-300 rounded p-4 flex items-center">
              <TextField
                id="batchName"
                variant="outlined"
                label="Batch Name"
                autoComplete="off"
                className="w-2/6"
                {...register("BatchName", registerOptions.BatchName)}
              />
              <div className="w-8" />
              <FormControl variant="outlined" className="w-2/6">
                <InputLabel id="Technology">Technology</InputLabel>
                <Select
                  labelId="Technology"
                  id="Technology"
                  //   value={selectedOption}
                  {...register("Technology", registerOptions.Technology)}
                  label="Technology"
                >
                  <MenuItem value="Aji Ganteng Sekali">
                    Aji Ganteng Sekali
                  </MenuItem>
                  <MenuItem value="Ikram Kalah 7-0">Ikram Kalah 7-0</MenuItem>
                  <MenuItem value="Barcelona Peringkat pertama dari bawah">
                    Barcelona Peringkat pertama dari bawah
                  </MenuItem>
                </Select>
              </FormControl>
              <div className="w-10" />
              <div className="w-2/6 flex justify-center items-center">
                <GroupsIcon style={{ fontSize: 80 }} />
              </div>
              <div className="flex justify-center items-start">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Mulai"
                    className="w-3/6"
                  />
                  <div className="w-8"></div>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Selesai"
                    className="w-3/6"
                  />
                </LocalizationProvider>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Submit
            </Button>
          </form>
        </div> */}

        <div className="container mx-auto border-2 border-gray-300 relative rounded-xl">
          <form
            onSubmit={handleSubmit(handleRegistration, handleError)}
            className="mt-2"
          >
            <div className=" rounded p-4 flex items-center relative ">
              <div className="w-2/6">
                <TextField
                  id="batchName"
                  variant="outlined"
                  label="Batch Name"
                  autoComplete="off"
                  className="w-full "
                  {...register("BatchName", registerOptions.BatchName)}
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
                    <MenuItem value={1}>Aji Ganteng Sekali</MenuItem>
                    <MenuItem value={2}>Ikram Kalah 7-0</MenuItem>
                    <MenuItem value={3}>
                      Barcelona Peringkat pertama dari bawah
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-6"></div>
              <div className="w-2/6 flex justify-center items-center relative">
                <GroupsIcon style={{ fontSize: "8vw" }} className="relative" />
              </div>
            </div>
            <div className="w-4/6 text-center"></div>
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
                  />
                </div>
              </LocalizationProvider>
              <div className="w-6"></div>
              <div className="w-2/6 flex justify-center items-center">
                <a
                  className={`text-4xl -mt-32 ${
                    checked.length == 0 ? "hidden" : ""
                  }`}
                >
                  {checked.length}
                </a>
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
                isOptionEqualToValue={(option, value) => option === value}
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
            {/* <div className=" p-4 flex items-center w-8/12 justify-center relative">
                <Autocomplete
                  {...defaultProps}
                  id="Trainer"
                  autoComplete
                  className="w-6/12"
                  includeInputInList
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Trainer"
                      variant="standard"
                    />
                  )}
                />
                <div className="w-6"></div>
                <Autocomplete
                  {...defaultProps}
                  id="Trainer"
                  autoComplete
                  className="w-6/12"
                  includeInputInList
                  renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search Co-Trainer"
                    variant="standard"
                    />
                    )}
                />
                <div className="w-6"></div>
                <Autocomplete
                  {...defaultProps}
                  id="Trainer"
                  autoComplete
                  className="w-6/12"
                  includeInputInList
                  renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search Co-Trainer"
                    variant="standard"
                    />
                    )}
                />
                <div className="w-6"></div>
              <div className="flex justify-center items-center relative">
              </div>
            </div> */}
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
            <div className="flex flex-wrap w-full items-center justify-center">
              {(currentData || []).map((user) => (
                <Card
                  key={user.id}
                  className={`m-3 rounded-lg ${
                    checked.includes(user.id)
                      ? "transisi bg-green-500"
                      : "transisi  bg-white"
                  }`}
                  sx={{ minWidth: 250 }}
                  onClick={() => ngecek(user.id)}
                >
                  <CardContent className="flex flex-wrap items-center justify-between">
                    <Typography variant="h5" component="div">
                      {user.name}
                    </Typography>

                    <AddRoundedIcon
                      className={`${
                        checked.includes(user.id)
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

NewBatch.Layout="Admin"
export default NewBatch;
