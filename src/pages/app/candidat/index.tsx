import React, { useState, SyntheticEvent, useEffect, Fragment } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import TabPanel from "./tabsComponent/tabPanel";
// import a11yProps from "./tabsComponent/a11yProps";
import ApplyTable from "./table/rows/apply";
import { MyPage } from "@/components/types";
import Content from "@/components/shared/content";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TabScrollButton,
  Typography,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Candidat: MyPage = (props: any) => {
  const [value, setValue] = useState(1);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("")

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setSelectMonth(event.target.value as string);
  };
  
  const handleChangeYear = (event: SelectChangeEvent) => {
    setSelectYear(event.target.value as string);
  };

  const dataTahun = [
    { id: 1, tahun: "2017" },
    { id: 2, tahun: "2018" },
    { id: 3, tahun: "2019" },
    { id: 4, tahun: "2020" },
    { id: 5, tahun: "2021" },
    { id: 6, tahun: "2022" },
    { id: 7, tahun: "2023" },
    { id: 8, tahun: "2024" },
    { id: 9, tahun: "2025" },
    { id: 10, tahun: "2026" },
    { id: 11, tahun: "2027" },
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
  useEffect(() => {
    setValue(0);
  }, []);

  return (
    <>
      <Content title="Candidate" />
      <Box sx={{ width: "auto" }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          // sx={{width: '100%'}}
        >
          <Tab sx={{ fontSize: 14 }} label="Apply" {...a11yProps(0)} />
          <Tab sx={{ fontSize: 14 }} label="Filtering Test" {...a11yProps(1)} />
          <Tab sx={{ fontSize: 14 }} label="Contract" {...a11yProps(2)} />
          <Tab sx={{ fontSize: 14 }} label="Disqualified" {...a11yProps(3)} />
          <Tab sx={{ fontSize: 14 }} label="Not Responding" {...a11yProps(4)} />
          <Box sx={{ display: "flex" }}>
            <FormControl className="w-36 mt-2">
              <InputLabel id="demo-simple-select-label">
                Filter By Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={selectMonth}
                label="Filter By Month"
                onChange={handleChangeMonth}
                //  data = {filterBulan}
              >
                {/* <MenuItem value='null'>None</MenuItem> */}
                {dataBulan.map((bulan, i) => (
                  <MenuItem value={bulan.id}>{bulan.bulan}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="w-36 mt-2 ml-5">
              <InputLabel id="demo-simple-select-label">
                Filter By Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={selectYear}
                label="Filter By Month"
                onChange={handleChangeYear}
                //  data = {filterBulan}
              >
                {/* <MenuItem value='null'>None</MenuItem> */}
                {dataTahun.map((tahun, i) => (
                  <MenuItem value={tahun.tahun}>{tahun.tahun}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Tabs>

        <Fragment>
          <TabPanel value={value} index={0}>
            <ApplyTable status="apply" selectedMonth={selectMonth} selectYear={selectYear}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ApplyTable status="filtering test" selectedMonth={selectMonth} selectYear={selectYear}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ApplyTable status="contract" selectedMonth={selectMonth} selectYear={selectYear}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ApplyTable status="disqualified" selectedMonth={selectMonth} selectYear={selectYear}/>
          </TabPanel>
          <TabPanel value={value} index={4} >
            <ApplyTable status="notresponding" selectedMonth={selectMonth} selectYear={selectYear}/>
          </TabPanel>
        </Fragment>
      </Box>
    </>
  );
};

Candidat.Layout = "Admin";
export default Candidat;
