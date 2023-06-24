const a11yProps = (index: number) => {
  // console.log(index)
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default a11yProps;
