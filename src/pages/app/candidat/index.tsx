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

const Candidat: MyPage = (props: any) => {
  const [value, setValue] = useState(1);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const data = dataDummy;

  useEffect(() => {
    setValue(0);
  }, []);

  return (
    <Content
      title = 'Candidates'
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Apply" {...a11yProps(0)} />
            <Tab label="Filtering Test" {...a11yProps(1)} />
            <Tab label="Contract" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Fragment>
          <TabPanel value={value} index={0}>
            <ApplyTable status="apply" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ApplyTable status="ready" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ApplyTable status="placement" />
          </TabPanel>
        </Fragment>
      </Box>
    </Content>
  );
};

Candidat.Layout = "Admin";
export default Candidat;
