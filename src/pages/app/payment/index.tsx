import { MyPage } from "@/components/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuProps,
  alpha,
  styled,
  MenuItem,
  TableCell,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Edit,
  DeleteOutlineRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import { FormControl, InputLabel, Link } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import DeleteFintech from "./Fintech/deleteFintech";
import DeleteBank from "./Bank/deleteBank";
import DeleteUsersAccount from "./Usersaccount/deleteusersaccount";
import Transfer from "./Usersaccount/Transfer";
import Content from "@/components/shared/content";
import {
  doRequestGetBank,
  doRequestGetFintech,
  doRequestGetTRANSACTION,
  doRequestGetUsersAccount,
} from "@/redux/paymentSchema/action/ActionReducer";
import a11yProps from "../candidat/tabsComponent/a11yProps";
import TabPanel from "../candidat/tabsComponent/tabPanel";
import { useForm } from "react-hook-form";
import alert from "@/alert";
import Pagination from "@/components/pagination";
import Swal from "sweetalert2";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      "&:hover": {
        background: theme.palette.grey[300],
      },
    },
  },
}));

const Payment: MyPage = () => {
  let { bank, message, status, refresh } = useSelector(
    (state: any) => state.bankReducer
  );
  let { fintech, refreshfintech, messagefintech, statusfintech } = useSelector(
    (state: any) => state.fintechReducer
  );
  let { usersaccount, refreshaccount, messageaccount, statusaccount } =
    useSelector((state: any) => state.AccountReducer);
  let { transaction, refreshtransaction } = useSelector(
    (state: any) => state.transactionReducer
  );
  let { topup, refreshtopup, messagetopup, statustopup } = useSelector(
    (state: any) => state.topupReducer
  );
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteFintech, setDeleteFintech]: any = useState(false);
  const [deleteBank, setDeleteBank]: any = useState(false);
  const [deleteUsersAccount, setDeleteUsersAccount]: any = useState(false);
  const [isDataComplete, setIsDataComplete] = useState(false);
  const [transfer, setTransfer]: any = useState(false);
  const [selected, setSelected]: any = useState(0);
  const sourceIdRef = useRef("");
  const targetIdRef = useRef("");
  const [selectedAccountNumberBank, setSelectedAccountNumberBank] =
    useState<string>("");
  const [selectedAccountNumberFinttech, setSelectedAccountNumberFinttech] =
    useState<string>("");
  const [saldoTransfer, setSaldoTransfer] = useState();
  const [filterBank, setFilterBank] = useState(bank);
  const [filterFintech, setFilterFintech] = useState(fintech);
  const [filterTransaction, setFilterTransaction] = useState(transaction);
  const [filterUsersAccount, setFilterUsersAccount] = useState(usersaccount);
  const [filterTopup, setFilterTopup] = useState(topup);
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage]: any = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const totalPagesBank = Math.ceil(filterBank?.length / itemPerPage);
  const currentItemBank = filterBank?.slice(startIndex, endIndex);
  const totalPagesFintech = Math.ceil(filterFintech?.length / itemPerPage);
  const currentItemFintech = filterFintech?.slice(startIndex, endIndex);
  const totalPagesTransaction = Math.ceil(
    filterTransaction?.length / itemPerPage
  );
  const currentItemTransaction = filterTransaction?.slice(startIndex, endIndex);
  const totalPagesUsersAccount = Math.ceil(
    filterUsersAccount?.length / itemPerPage
  );
  const currentItemUsersAccount = filterUsersAccount?.slice(
    startIndex,
    endIndex
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: any) => {
    setSelected(data);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFintech = () => {
    setDeleteFintech(true);
    setAnchorEl(null);
  };

  const handleDeleteBank = () => {
    setDeleteBank(true);
    setAnchorEl(null);
  };

  const handleDeleteUsersAccount = () => {
    setDeleteUsersAccount(true);
    setAnchorEl(null);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as string;
    setSelectedType(selectedType);
    handleFilterTransaction({ selectedType }); // Memanggil handleFilterTransaction dengan filter yang diperbarui
  };

  const handleFilterFintech = (filter: any) => {
    let newDataFintech = [...fintech]; // Create a new array to store the filtered data
    if (filter.fintech_status_input) {
      newDataFintech = newDataFintech.filter((finte) =>
        finte.fint_name
          .toLowerCase()
          .includes(filter.fintech_status_input.toLowerCase())
      );
    }
    setFilterFintech(newDataFintech);
  };

  const handleFilterBank = (filter: any) => {
    let newDatabank = [...bank]; // Create a new array to store the filtered data
    if (filter.bank_status_input) {
      newDatabank = newDatabank.filter((gudang) =>
        gudang.bank_name
          .toLowerCase()
          .includes(filter.bank_status_input.toLowerCase())
      );
    }
    setFilterBank(newDatabank);
  };

  const handleFilterTransaction = (filter: any) => {
    let newDatatransaction = [...transaction]; // Create a new array to store the filtered data

    // Filter based on transaction number
    if (filter.transaction_status_input) {
      const inputValue = filter.transaction_status_input.toLowerCase();
      newDatatransaction = newDatatransaction.filter((list) =>
        list.trpa_code_number.toString().includes(inputValue)
      );
    }

    // Filter based on transaction type
    if (filter.selectedType) {
      newDatatransaction = newDatatransaction.filter(
        (list) => list.trpa_type === filter.selectedType
      );
    }
    setFilterTransaction(newDatatransaction);
  };

  const dispatch = useDispatch();

  const [selectedTypeSource, setSelectedTypeSource] = useState("");
  const [selectedTypeTarget, setSelectedTypeTarget] = useState("");

  interface AccountNumberBank {
    usac_account_number: string;
    account_name: string;
    balance: number;
  }

  const usacAccountNumberBank = {
    options: usersaccount?.filter(
      (account: AccountNumberBank) =>
        account.account_name === selectedTypeSource
    ),
    getOptionLabel: (option: AccountNumberBank) => option.usac_account_number,
    isOptionEqualToValue: (
      option: AccountNumberBank,
      value: AccountNumberBank
    ) => option.usac_account_number === value.usac_account_number,
  };

  const usacAccountNumberFintech = {
    options: usersaccount?.filter(
      (account: AccountNumberBank) =>
        account.account_name === selectedTypeTarget
    ),
    getOptionLabel: (option: AccountNumberBank) => option.usac_account_number,
    isOptionEqualToValue: (
      option: AccountNumberBank,
      value: AccountNumberBank
    ) => option.usac_account_number === value.usac_account_number,
  };

  const gabung = [
    {
      bank_source: selectedTypeSource,
      bank_target: selectedTypeTarget,
      account_source: selectedAccountNumberBank,
      account_target: selectedAccountNumberFinttech,
      saldo_transfer: saldoTransfer,
    },
  ];

  const handleTypeChangeSource = (value: string) => {
    setSelectedTypeSource(value);
    setIsDataComplete(
      !!value &&
        !!selectedTypeTarget &&
        !!selectedAccountNumberBank &&
        !!selectedAccountNumberFinttech &&
        !!saldoTransfer
    );
  };

  const handleTypeChangeTarget = (value: string) => {
    setSelectedTypeTarget(value);
  };

  const handleRegistrationTopup = () => {
    if (
      !selectedTypeSource ||
      !selectedTypeTarget ||
      !selectedAccountNumberBank ||
      !selectedAccountNumberFinttech ||
      !saldoTransfer
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Data",
        text: "Please complete all fields before initiating the transfer.",
      });
      return;
    }
    setTransfer(true);
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const columns = [
    { name: "Bank Code" },
    { name: "Bank Name" },
    {
      name: "",
      createButton: (
        <Link
          href={`./payment/Bank/addBank`}
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ml-auto"
        >
          Create
        </Link>
      ),
    },
  ];

  const column1 = [
    { name: "Fintech Code" },
    { name: "Fintech Name" },
    {
      name: "",
      createButton: (
        <Link
          href={`./payment/Fintech/addFintech`}
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ml-auto"
        >
          Create
        </Link>
      ),
    },
  ];

  const column2 = [
    { name: "Account Number" },
    { name: "Desc" },
    { name: "Saldo" },
    { name: "Type" },
    {
      name: "",
      createButton: (
        <Link
          href={`./payment/Usersaccount/addusersaccount`}
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ml-auto"
        >
          Create
        </Link>
      ),
    },
    { name: "" },
  ];

  const column4 = [
    { name: "Transaction Number" },
    { name: "Trx Date" },
    { name: "Debet" },
    { name: "Credit" },
    { name: "Note" },
    { name: "Source" },
    { name: "Target" },
    { name: "Type" },
    { name: "User" },
  ];

  const typ = [
    { id: 1, type: "topup" },
    { id: 2, type: "transfer" },
    { id: 3, type: "order" },
    { id: 4, type: "refund" },
  ];

  useEffect(() => {
    if (selectedAccountNumberBank !== "") {
      const selectedAccount = usersaccount.find(
        (account: AccountNumberBank) =>
          account.usac_account_number === selectedAccountNumberBank
      );

      if (selectedAccount) {
        sourceIdRef.current = selectedAccount.balance.toString();
      }
    }
    if (selectedAccountNumberFinttech !== "") {
      const selectedAccount = usersaccount.find(
        (account: AccountNumberBank) =>
          account.usac_account_number === selectedAccountNumberFinttech
      );

      if (selectedAccount) {
        targetIdRef.current = selectedAccount.balance.toString();
      }
    }
  }, [selectedAccountNumberBank, usersaccount, selectedAccountNumberFinttech]);

  useEffect(() => {
    if (status === 200 && message) {
      setTimeout(() => {
        alert.notifySuccess(status, message);
      }, 500);
    }
    if (status >= 400 && message) {
      setTimeout(() => {
        alert.notifyFailed(status, message);
      }, 500);
    }
    if (statusfintech === 200 && messagefintech) {
      setTimeout(() => {
        alert.notifySuccess(statusfintech, messagefintech);
      }, 500);
    }
    if (statusfintech >= 400 && messagefintech) {
      setTimeout(() => {
        alert.notifyFailed(statusfintech, messagefintech);
      }, 500);
    }
    if (statusaccount === 200 && messageaccount) {
      setTimeout(() => {
        alert.notifySuccess(statusaccount, messageaccount);
      }, 500);
    }
    if (statusaccount >= 400 && messageaccount) {
      setTimeout(() => {
        alert.notifyFailed(statusfintech, messagefintech);
      }, 500);
    }

    if (statustopup === 200 && messagetopup) {
      setTimeout(() => {
        alert.notifySuccess(statustopup, messagetopup);
      }, 500);
    }
    if (statustopup >= 400 && messagetopup) {
      setTimeout(() => {
        alert.notifyFailed(statustopup, messagetopup);
      }, 500);
    }

    dispatch(doRequestGetBank());
    dispatch(doRequestGetFintech());
    dispatch(doRequestGetUsersAccount());
    dispatch(doRequestGetTRANSACTION());
  }, [
    refresh,
    refreshfintech,
    refreshaccount,
    refreshtopup,
    refreshtransaction,
  ]);

  useEffect(() => {
    setFilterBank(bank);
    setFilterFintech(fintech);
    setFilterTransaction(transaction);
    setFilterUsersAccount(usersaccount);
    setFilterTopup(topup);
  }, [
    refresh,
    refreshfintech,
    refreshaccount,
    refreshtopup,
    refreshtransaction,
  ]);

  return (
    <>
      <ToastContainer />
      <Content title="Payment" />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            scrollButtons="auto"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{ fontSize: 14 }} label="Bank" {...a11yProps(0)} />
            <Tab sx={{ fontSize: 14 }} label="Fintech" {...a11yProps(1)} />
            <Tab
              sx={{ fontSize: 14 }}
              label="Users account"
              {...a11yProps(2)}
            />
            <Tab sx={{ fontSize: 14 }} label="TopUp" {...a11yProps(3)} />
            <Tab sx={{ fontSize: 14 }} label="Transaction" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <Fragment>
          <TabPanel value={value} index={0}>
            <div>
              <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <div className=" w-full p-4 text-center">
                    <form onSubmit={handleSubmit(handleFilterBank)}>
                      <label htmlFor="search" className="mr-2">
                        Search
                      </label>

                      <input
                        type="search"
                        className=" px-2 py-1 rounded-xl border-gray-200 border-2"
                        {...register("bank_status_input")}
                        placeholder="Bank Name"
                      />

                      <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1">
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <Paper sx={{ width: "100%", overflow: "auto" }} className="mb-10">
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className="table-auto">
                        {columns.map((col, index) => (
                          <TableCell
                            key={index}
                            className="bg-blue-300 text-center justify-center items-center"
                          >
                            <span>{col.name}</span>
                            {col.createButton}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItemBank && currentItemBank.length === 0 ? (
                        <TableRow>
                          <TableCell className="text-center" colSpan={3}>
                            Data tidak ada
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItemBank &&
                        currentItemBank.map((data: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {data.bank_code}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.bank_name}
                            </TableCell>
                            <TableCell className="text-center">
                              <button
                                id="demo-customized-button"
                                aria-controls={
                                  open ? "demo-customized-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => handleClick(e, data)}
                              >
                                <MoreVertRounded />
                              </button>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  "aria-labelledby": "demo-customized-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                              >
                                <MenuItem
                                  onClick={(e) =>
                                    router.push({
                                      pathname: `./payment/Bank/updateBank`,
                                      query: {
                                        bank_entity_id: selected.bank_entity_id,
                                        bank_code: selected.bank_code,
                                        bank_name: selected.bank_name,
                                      },
                                    })
                                  }
                                  disableRipple
                                >
                                  <Edit />
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={handleDeleteBank}
                                  disableRipple
                                >
                                  <DeleteOutlineRounded />
                                  Delete Bank
                                </MenuItem>
                              </StyledMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  totalPages={totalPagesBank}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </Paper>

              <DeleteBank
                open={deleteBank}
                handleClose={() => setDeleteBank(false)}
                data={selected}
              />
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div>
              <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
                  <div className=" w-full p-4 text-center">
                    <form onSubmit={handleSubmit(handleFilterFintech)}>
                      <label htmlFor="search" className="mr-2">
                        Search
                      </label>

                      <input
                        type="search"
                        className=" px-2 py-1 rounded-xl border-gray-200 border-2"
                        {...register("fintech_status_input")}
                        placeholder="Fintech Name"
                      />

                      <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1">
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <Paper sx={{ width: "100%", overflow: "auto" }} className="mb-10">
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className="table-auto">
                        {column1.map((col, index) => (
                          <TableCell
                            key={index}
                            className="bg-blue-300 text-center justify-center items-center"
                          >
                            <span>{col.name}</span>
                            {col.createButton}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItemFintech && currentItemFintech.length === 0 ? (
                        <TableRow>
                          <TableCell className="text-center" colSpan={3}>
                            Data tidak ada
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItemFintech &&
                        currentItemFintech.map((data: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {data.fint_code}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.fint_name}
                            </TableCell>
                            <TableCell className="text-center">
                              <button
                                id="demo-customized-button"
                                aria-controls={
                                  open ? "demo-customized-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => handleClick(e, data)}
                              >
                                <MoreVertRounded />
                              </button>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  "aria-labelledby": "demo-customized-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                              >
                                <MenuItem
                                  onClick={(e) =>
                                    router.push({
                                      pathname: `./payment/Fintech/editFintech`,
                                      query: {
                                        fint_entity_id: selected.fint_entity_id,
                                        fint_code: selected.fint_code,
                                        fint_name: selected.fint_name,
                                      },
                                    })
                                  }
                                  disableRipple
                                >
                                  <Edit />
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={handleDeleteFintech}
                                  disableRipple
                                >
                                  <DeleteOutlineRounded />
                                  Delete Fintech
                                </MenuItem>
                              </StyledMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  totalPages={totalPagesFintech}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </Paper>

              <DeleteFintech
                open={deleteFintech}
                handleClose={() => setDeleteFintech(false)}
                data={selected}
              />
            </div>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Paper sx={{ width: "100%", overflow: "auto" }} className="mb-10">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className="table-auto">
                      {column2.map((col, index) => (
                        <TableCell
                          key={index}
                          className="bg-blue-300 text-center justify-center items-center"
                        >
                          <span>{col.name}</span>
                          {col.createButton}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(currentItemUsersAccount || []).map(
                      (data: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell className="text-center">
                            {data.usac_account_number}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.account_name}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.balance}
                          </TableCell>
                          <TableCell className="text-center">
                            {data.usac_type}
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              id="demo-customized-button"
                              aria-controls={
                                open ? "demo-customized-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={(e) => handleClick(e, data)}
                            >
                              <MoreVertRounded />
                            </button>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => {
                                  router.push({
                                    pathname: `./payment/Usersaccount/editusersaccount`,
                                    query: {
                                      usac_user_entity_id:
                                        selected.usac_user_entity_id,
                                      usac_account_number:
                                        selected.usac_account_number,
                                      usac_saldo: selected.balance,
                                      type: selected.usac_type,
                                      desc: selected.account_name,
                                    },
                                  });
                                }}
                                disableRipple
                              >
                                <Edit />
                                Edit Users Account
                              </MenuItem>
                              <MenuItem
                                onClick={handleDeleteUsersAccount}
                                disableRipple
                              >
                                <DeleteOutlineRounded />
                                Delete Users Account
                              </MenuItem>
                            </StyledMenu>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                totalPages={totalPagesUsersAccount}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </Paper>
            <DeleteUsersAccount
              open={deleteUsersAccount}
              handleClose={() => setDeleteUsersAccount(false)}
              data={selected}
            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Box sx={{ minWidth: 120 }}>
              <div>
                {/* <form onSubmit={handleSubmit(handleRegistrationTopup)}> */}
                <div className="flex bg-white-100">
                  <div className="w-1/2 text-center bg-gray-100">
                    <h2 className="text-3xl font-bold mb-4 bg-blue-300">
                      Source
                    </h2>
                    <div className="mb-3">
                      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Source Name:
                        </div>
                        <FormControl className="w-72">
                          <InputLabel id="demo-simple-select-label">
                            Bank Name
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined"
                            value={selectedTypeSource}
                            {...register("selectedTypeSource")}
                            label="Filter By Type"
                            onChange={(event) =>
                              handleTypeChangeSource(event.target.value)
                            }
                          >
                            <MenuItem value="">None</MenuItem>
                            {bank?.map((userAccount: any, i: any) => (
                              <MenuItem key={i} value={userAccount.bank_name}>
                                {userAccount.bank_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Account:
                        </div>
                        <Autocomplete
                          sx={{ width: "50%" }}
                          {...usacAccountNumberBank}
                          autoComplete
                          className="w-5/12"
                          includeInputInList
                          onChange={(event: any, value: any) => {
                            register("trpa_source_id", { value: value });
                            setSelectedAccountNumberBank(
                              value ? value.usac_account_number : ""
                            );
                            sourceIdRef.current = value ? value.balance : "";
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Account Number"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                      <br />
                      <div className="relative flex w-80 ">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Current Saldo:
                        </div>
                        <input
                          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                          aria-label=""
                          aria-describedby="button-addon2"
                          value={sourceIdRef.current}
                          disabled
                        />
                      </div>
                      <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                        <div className="mt-4">
                          <button
                            onClick={handleRegistrationTopup}
                            // type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Transfer
                          </button>
                        </div>
                        <div className="mt-4 ms-8">
                          <input
                            className="mt-1 block w-full px-3 py-2 text-gray-600 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            type="number"
                            onChange={(event: any) => {
                              setSaldoTransfer(event.target.value);
                            }}
                            placeholder="Saldo"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 text-center bg-gray-100">
                    <h2 className="text-3xl font-bold mb-4 bg-blue-300">
                      Target
                    </h2>
                    <div className="mb-3">
                      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Target Name:
                        </div>
                        <FormControl className="w-72">
                          <InputLabel id="demo-simple-select-label">
                            Fintech Name
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined"
                            value={selectedTypeTarget}
                            label="Filter By Type"
                            {...register("selectedTypeTarget")}
                            onChange={(event) =>
                              handleTypeChangeTarget(event.target.value)
                            }
                          >
                            <MenuItem value="">None</MenuItem>
                            {fintech?.map((userAccount: any, i: any) => (
                              <MenuItem key={i} value={userAccount.fint_name}>
                                {userAccount.fint_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Account:
                        </div>
                        <Autocomplete
                          sx={{ width: "50%" }}
                          {...usacAccountNumberFintech}
                          id="trpa_target_id"
                          autoComplete
                          className="w-5/12"
                          includeInputInList
                          onChange={(event: any, value: any) => {
                            register("trpa_target_id", { value: value });
                            setSelectedAccountNumberFinttech(
                              value ? value.usac_account_number : ""
                            );
                            targetIdRef.current = value ? value.balance : "";
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Account Number"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                      <br />
                      <div className="relative flex w-80 ">
                        <div className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-normal text-neutral-700 dark:text-neutral-200">
                          Current Saldo:
                        </div>
                        <input
                          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                          aria-label=""
                          aria-describedby="button-addon2"
                          defaultValue={targetIdRef.current}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* </form> */}
                <Transfer
                  open={transfer}
                  handleClose={() => setTransfer(false)}
                  data={gabung}
                  disableClose={!isDataComplete}
                />
              </div>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <div>
              <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
                  <div className=" w-full p-4 text-center">
                    <form onSubmit={handleSubmit(handleFilterTransaction)}>
                      <label htmlFor="search" className="mr-2">
                        Search
                      </label>

                      <input
                        type="search"
                        className=" px-2 py-1 rounded-xl border-gray-200 border-2"
                        {...register("transaction_status_input")}
                        name="transaction_status_input"
                        placeholder="Transaction number"
                      />

                      <button className="order-0  ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-xl bg-blue-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1">
                        Search
                      </button>
                      <FormControl className="w-36 ms-8">
                        <InputLabel id="demo-simple-select-label">
                          Payment Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          variant="outlined"
                          value={selectedType}
                          {...register("selectedType")}
                          label="Filter By Type"
                          onChange={handleTypeChange}
                        >
                          <MenuItem value="">None</MenuItem>
                          {typ.map((typ, i) => (
                            <MenuItem key={i} value={typ.type}>
                              {typ.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </form>
                  </div>
                </div>
              </div>
              <Paper sx={{ width: "100%", overflow: "auto" }} className="mb-10">
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className="table-auto">
                        {column4.map((col, index) => (
                          <TableCell
                            key={index}
                            className="bg-blue-300 text-center justify-center items-center"
                          >
                            <span>{col.name}</span>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItemTransaction.length === 0 ? (
                        <TableRow>
                          <TableCell className="text-center" colSpan={9}>
                            Data tidak ada
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItemTransaction.map((data: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {data.trpa_code_number}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_modified_date}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_debet}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_credit}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_note}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_source_id}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_target_id}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.trpa_type}
                            </TableCell>
                            <TableCell className="text-center">
                              {data.user}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  totalPages={totalPagesTransaction}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </Paper>
              <DeleteUsersAccount
                open={deleteUsersAccount}
                handleClose={() => setDeleteUsersAccount(false)}
                data={selected}
              />
            </div>
          </TabPanel>
        </Fragment>
      </Box>
    </>
  );
};

Payment.Layout = "Admin";
export default Payment;
