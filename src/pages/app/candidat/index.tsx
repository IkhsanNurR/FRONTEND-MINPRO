import React, { useState, SyntheticEvent, useEffect, Fragment } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./tabsComponent/tabPanel";
import a11yProps from "./tabsComponent/a11yProps";
import dataDummy from "../data";
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
} from "@mui/material";

const Candidat: MyPage = (props: any) => {
  const [value, setValue] = useState(1);
  const [age, setAge] = useState("");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeOption = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    setValue(0);
  }, []);

  return (
    // <Content title="Candidates">
    //     <Box sx={{ Width: '100%' }}>
    //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //         <Tabs
    //           value={value}
    //           onChange={handleChange}
    //           aria-label="basic tabs example"
    //         >
    //           <Tab label="Apply" {...a11yProps(0)} />
    //           <Tab label="Filtering Test" {...a11yProps(1)} />
    //           <Tab label="Contract" {...a11yProps(2)} />
    //           <Tab label="Disqualified" {...a11yProps(3)} />
    //           <Tab label="NotResponding" {...a11yProps(4)} />

    //           <Box>
    //             <FormControl fullWidth className="w-20">
    //               <InputLabel id="demo-simple-select-label">Age</InputLabel>
    //               <Select
    //                 labelId="demo-simple-select-label"
    //                 id="demo-simple-select"
    //                 // value={age}
    //                 label="Age"
    //                 onChange={handleChangeOption}
    //                 // className="w-2/6"
    //               >
    //                 <MenuItem value={10}>Ten</MenuItem>
    //                 <MenuItem value={20}>Twenty</MenuItem>
    //                 <MenuItem value={30}>Thirty</MenuItem>
    //               </Select>
    //             </FormControl>
    //           </Box>
    //         </Tabs>
    //       </Box>
    //       <Fragment>
    //         <TabPanel value={value} index={0}>
    //           <ApplyTable status="apply" />
    //         </TabPanel>
    //         <TabPanel value={value} index={1}>
    //           <ApplyTable status="filtering test" />
    //         </TabPanel>
    //         <TabPanel value={value} index={2}>
    //           <ApplyTable status="contract" />
    //         </TabPanel>
    //         <TabPanel value={value} index={3}>
    //           <ApplyTable status="disqualified" />
    //         </TabPanel>
    //         <TabPanel value={value} index={4}>
    //           <ApplyTable status="notresponding" />
    //         </TabPanel>
    //       </Fragment>
    //     </Box>
    // </Content>
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
          <Tab sx={{fontSize: 14}} label="Apply" {...a11yProps(0)} />
          <Tab sx={{fontSize: 14}} label="Filtering Test" {...a11yProps(1)} />
          <Tab sx={{fontSize: 14}} label="Contract" {...a11yProps(2)} />
          <Tab sx={{fontSize: 14}} label="Disqualified" {...a11yProps(3)} />
          <Tab sx={{fontSize: 14}} label="Not Responding" {...a11yProps(4)} />
          <Box sx={{ display: "flex" }}>
            <FormControl className="w-36 mt-2">
              <InputLabel id="demo-simple-select-label">
                Filter By Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                
                // value={age}
                label="Filter By Month"
                onChange={handleChangeOption}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-36 ml-6 mt-2">
              <InputLabel id="demo-simple-select-label">
                Filter By Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                // value={age}
                label="Filter By Month"
                onChange={handleChangeOption}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Tabs>

        <Fragment>
          <TabPanel value={value} index={0}>
            <ApplyTable status="apply" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ApplyTable status="filtering test" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ApplyTable status="contract" />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ApplyTable status="disqualified" />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ApplyTable status="notresponding" />
          </TabPanel>
        </Fragment>
      </Box>
    </>
  );
};

Candidat.Layout = "Admin";
export default Candidat;
