import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { MyPage } from "@/components/types";

import Content1 from "@/components/shared/content1";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { Button, Paper, TextField } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  doAddCartItem,
  doGetCartItem,
  doDeleteCartItem,
} from "@/redux/salesSchema/action/actionReducer";
import {
  doGetSpecialOffer,
  doAddSpecialOffer,
} from "@/redux/salesSchema/action/actionReducer";
import { doGetPayment } from "@/redux/salesSchema/action/actionReducer";
import { handleDeleteCartItem } from "@/redux/salesSchema/saga/cartItemsSaga";
import ActionSalesTypes from "@/redux/salesSchema/action/actionType";
import { match } from "assert";
import { MdCancel } from "react-icons/md";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { useForm } from "react-hook-form";
interface CartDetail {
  cait_id?: number;
  cait_prog_entity_id?: number;
  cait_quantity?: number;
  cait_unit_price?: number;
  cait_user_entity_id?: number;
  prog_title?: string;
  sect_description?: string;
  coupon_name?: string;
}

interface Cart {
  cart: CartDetail[];
  refresh?: boolean;
}

interface PaymentDetail {
  trpa_id?: number;
  trpa_code_number?: number;
  trpa_order_number?: number;
  fint_code?: number;
  fint_name?: string;
  user_entity_id?: number;
  user_name?: string;
  usac_account_number?: number;
}
interface Payment {
  payment: PaymentDetail[];
  refreshPayment?: boolean;
}
const checkoutSales: MyPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const dispatch = useDispatch();
  const { cart, refresh }: Cart = useSelector(
    (state: any) => state.cartItemReducer
  );
  const { specialOffer, refreshh } = useSelector(
    (state: any) => state.specialOfferReducer
  );
  const { payment, refreshPayment }: Payment = useSelector(
    (state: any) => state.paymentReducer
  );
  if (payment !== undefined) {
    console.log("data payment yang ditampilkan defined");
  }
  // const payment = useSelector((state: any) => state.paymentReducer.payment)
  // const [isOpen, se    tIsOpen] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDiscountApplied, isSetDiscountApplied] = useState(false);
  const [selectedFintech, setSelectedFintech] = useState("");
  // const [selectedAccountNumber, setSelectedAccountNumber] = useState('')
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [discountApply, setDiscountApply] = useState<any>();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [selectedCredit, setSelectedCredit] = useState("");
  const handleAccountFintechClick = (fintech: string) => {
    console.log("handleaccountfintechclick", fintech);

    setSelectedFintech(fintech);
    // setSelectedAccountNumber('');
  };

  const router = useRouter();

  const handleCheckOut = () => {
    if (selectedFintech) {
      const dataSend = {
        usac_account_number: selectedAccountNumber,
        trpa_credit: selectedCredit,
        user_name: selectedUserName,
      };
      router.push({
        pathname: "/app/sales/order",
        query: {
          totalPrice: totalPrice,
          fintechName: selectedFintech,
          username: selectedUserName,

          // spof_id: discountApply?.spof_id,
          // spof_discount: discountApply?.spof_discount
        },
      });
    } else {
      alert("tidak dapat checkout");
    }
  };
  const handleSearch = (event: any) => {
    const searchTerm = event.target.values;
    console.log("mencarisesuatu", searchTerm);

    setSearchTerm(searchTerm);
  };
  // const handleSearchFintech = (event: any) => {
  //     const searchTerm = event.target.values
  //     console.log('carifintech', searchTerm);
  //     setSearchTerm(searchTerm)
  // }

  // const handleSearchAccountNumber = () => {

  //     console.log('checktipepayment', typeof payment);
  // if (Array.isArray(payment)) {

  //     const matchingAccount = payment.find(
  //         (account: any) =>
  //             account.usac_account_number.toLowerCase() === searchTerm.toLowerCase()
  //     );
  //     if (matchingAccount) {
  //         const accountNumber = matchingAccount.usac_account_number.toString();
  //         const usersName = matchingAccount.user_name.toString();
  //         setSelectedAccountNumber(accountNumber);
  //         setSelectedUserName(usersName);
  //         toast.success(`Account found ${usersName} with ${accountNumber}`);
  //     } else {
  //         toast.error('Account fintech not matched');
  //         setSelectedAccountNumber('');
  //         setSelectedUserName('');
  //     }
  // } else {
  //     // handle jika payment bukan array
  //     toast.error('Invalid payment data');
  //     setSelectedAccountNumber('');
  //     setSelectedUserName('');
  // }
  // };

  useEffect(() => {
    dispatch(doGetCartItem());
    dispatch(doGetSpecialOffer());
    dispatch(doGetPayment());
  }, [refresh]);

  //filter cart berdasarkan user
  const cartById =
    cart && Array.isArray(cart)
      ? cart.filter((item) => item.cait_user_entity_id === 18)
      : [];
  console.log(cartById);

  // Calculate the total price
  useEffect(() => {
    if (cart) {
      const totalPrice = cart.reduce((total, item) => {
        if (item.cait_unit_price && item.cait_user_entity_id === 18) {
          const prices: any = String(item.cait_unit_price).split(" "); // Convert to string and then split
          prices.forEach((price: any) => {
            const numericPrice = parseInt(price);
            if (!isNaN(numericPrice)) {
              total += numericPrice;
            }
          });
          const matchingDiscount =
            specialOffer &&
            specialOffer.find(
              (so: any) => so.soco.prog_entity_id === item.cait_prog_entity_id
            );
          if (matchingDiscount) {
            const discount = parseFloat(matchingDiscount.spof_discount);
            const discountedHarga = prices - (prices * discount) / 100;
          }
        }
        return total;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [cart]);

  // const selectedUserData = payment.find((item: any) => item.user_entity_id === cartById.)
  // console.log('mendapatkanUserData', selectedUserData);
  // if (selectedUserData === undefined) {
  //     console.log('data undefined');
  // }else
  // const calculateTotalPrice = () => {
  //     if (cart && cart?.length > 0) {
  //         const total = cart?.reduce((accumulator: number, course: any) => {
  //             const price = parseFloat(course.prog_price.replace(/[^0-9.-]+/g, ""));
  //             const matchingDiscount = specialOffer.find((d: any) => d.prog_entity_id === course.prog_entity_id);
  //             if (matchingDiscount) {
  //                 const discount = parseFloat(matchingDiscount.spof_discount);
  //                 const discountedPrice = price - (price * discount) / 100;
  //                 return accumulator + discountedPrice;
  //             } else {
  //                 return accumulator + price;
  //             }
  //         }, 0);
  //         setTotalPrice(total);
  //         setOriginalPrice(total);
  //     } else {
  //         setTotalPrice(0);
  //         setOriginalPrice(0);
  //     }
  // };
  const handleRemoveCartItem = (itemId: any) => {
    setDeleteItemId(itemId);
    setIsDeleteConfirmationOpen(true);
  };
  const confirmDeleteCartItem = () => {
    dispatch(doDeleteCartItem(deleteItemId));
    setIsDeleteConfirmationOpen(false);
  };
  const cancelDeleteCartItem = () => {
    setIsDeleteConfirmationOpen(false);
  };
  const handleApplyDiscount = () => {
    console.log("tipe", typeof specialOffer);

    if (
      typeof specialOffer === "object" &&
      Object.keys(specialOffer).length > 0
    ) {
      const matchingDiscount = specialOffer.find(
        (so: any) =>
          so.spof_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          so.prog_entity_id === so.prog_entity_id
      );
      console.log("checkmatchingdiscount", matchingDiscount);

      if (matchingDiscount) {
        setDiscountApply(matchingDiscount);
        const discount = parseFloat(matchingDiscount.spof_discount);
        const hargaDiscount = totalPrice - (totalPrice * discount) / 100;
        setTotalPrice(hargaDiscount);
        isSetDiscountApplied(true);
        alert("discount applied");
      } else {
        alert("No matching discount found");
      }
    } else {
      alert("Special offers not available");
    }
  };
  const handleCancelDiscount = () => {
    setTotalPrice(originalPrice);
    isSetDiscountApplied(false);
    alert("discount canceled");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // const handleFindAcount = (filterAccount: any) => {
  //     let newData: any = [...payment]
  //     // console.log('new', newData)
  //     const fintect_account = filterAccount.fintect_account
  //     const fintect_account1 = parseInt(fintect_account)

  //     console.log('filter', filterAccount);

  //     const mappedData = newData.map((data: any, index: any) => {
  //         if (filterAccount.fintect === newData[index].fint_name) {
  //             alert('ya');
  //             return newData[index];
  //         } else {
  //             alert('ga');
  //             return null;
  //         }
  //     });
  //     return mappedData
  // }

  return (
    <div>
      <Content1 title="JUDUL" fungsi1={null} namafungsi1="BEBAS"></Content1>
      <React.Fragment>
        <ToastContainer />
        <div>
          <span className="lgl-1">{cartById.length} barang di dalam cart</span>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Item>
              {cartById.map((item: any, index: any) => (
                <Grid container spacing={1}>
                  <Grid item xs={5} sx={{ textAlign: "left" }}>
                    <div
                      style={{
                        border: "1px solid",
                        width: "90%",
                        height: "150px",
                      }}
                    >
                      <span>gambar yang akan dimasukkan</span>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    sx={{ textAlign: "left", padding: "40 px" }}
                  >
                    <div>
                      <Grid container spacing={1}>
                        <Grid item xs={7}>
                          <span>{item.prog_title}</span>
                        </Grid>
                        <Grid item xs={5}>
                          <span>Rp {item.cait_unit_price}</span>
                        </Grid>
                      </Grid>
                    </div>
                    <br />
                    <div>
                      <span>{item.sect_description}</span>
                    </div>
                    <div>
                      <div>
                        <Button
                          variant="text"
                          style={{
                            color: "orange",
                            backgroundColor: "red",
                            marginRight: "10px",
                          }}
                        >
                          <p>Save for later</p>
                          <ArrowForwardIosIcon />
                        </Button>
                      </div>
                      <div key={item.id}>
                        <Button
                          variant="text"
                          style={{ color: "orange", backgroundColor: "red" }}
                          onClick={() => handleRemoveCartItem(item.cait_id)}
                        >
                          <p>Remove</p>
                          <ArrowForwardIosIcon />
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </Item>

            <Item style={{ margin: "5px" }}>
              <p>Payment</p>
            </Item>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
              <div className="flex grid-cols-2">
                {/* <form onSubmit={handleSubmit(handleFindAcount)}> */}

                <div className="flex items-center justify-between mt-4 sm:justify-start">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {selectedFintech || "Fintech"}
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>

                    <Menu.Items className="origin-top-right absolute right-0 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-[20rem] overflow-y-auto">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => handleAccountFintechClick("GOTO")}
                            {...register("GOTO")}
                          >
                            GOTO
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => handleAccountFintechClick("OVO")}
                            {...register("OVO")}
                          >
                            OVO
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                  {/* <IconButton>
                                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-600" />
                                    </IconButton> */}
                </div>

                <div>
                  {/* <div className="mt-4 flex items-center">
                                        <TextField
                                            id="search"
                                            label="Fintech Account"
                                            variant="outlined"
                                            size="small"
                                            // onChange={handleSearchFintech}
                                            fullWidth
                                            className="mr-2"
                                        /> */}

                  {/* <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SearchIcon />}
                                            type='submit'
                                            style={{ backgroundColor: '#3f51b5' }}
                                        // onClick={handleSearchAccountNumber}
                                        >
                                            Search
                                        </Button> */}
                </div>
              </div>
              {/* <div className='flex'>
                                        <div>

                                            <select id="" {...register('fintect')}>
                                                <option value="GOTO">Goto</option>
                                                <option value="OVO">OVO</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">Fintect Account</label>
                                            <input type="search" {...register('fintect_account')} className='bg-red-500' />
                                            <button >Search</button>

                                        </div>


                                    </div>
                                </form> */}
              {/* </div> */}
            </div>
          </Grid>

          <Grid item xs={4}>
            <Item style={{ height: "220px" }}>
              <div style={{ marginBottom: "9px" }}>Total</div>
              <div style={{ marginBottom: "9px" }}>{totalPrice}</div>
              <div style={{ marginBottom: "9px" }}>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<ArrowForwardIosIcon />}
                  style={{
                    color: "orange",
                    backgroundColor: "red",
                    width: "70%",
                    margin: "10p",
                  }}
                  onClick={handleCheckOut}
                >
                  <p>CheckOut</p>
                </Button>
              </div>
              <div>
                <div>
                  {isDiscountApplied ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<MdCancel />}
                      style={{ backgroundColor: "white" }}
                      className="mr-2 mt-3"
                      onClick={handleCancelDiscount}
                    >
                      <p>Cancel Discount</p>
                    </Button>
                  ) : (
                    <div>
                      <div>
                        <Paper
                          component="form"
                          sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            id="search"
                            label="discount"
                            variant="outlined"
                            placeholder="masukkan kupon diskon"
                            size="small"
                            className="mr-2"
                            onChange={handleSearch}
                          />
                          <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                          >
                            <SearchIcon />
                          </IconButton>
                        </Paper>
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<ArrowForwardIosIcon />}
                          style={{
                            color: "orange",
                            backgroundColor: "red",
                            width: "10%",
                            marginLeft: "10px",
                          }}
                          className="mr-2"
                          onClick={handleApplyDiscount}
                        >
                          <p>apply</p>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </React.Fragment>
      {/* Delete Confirmation Dialog */}
      <Transition.Root show={isDeleteConfirmationOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={cancelDeleteCartItem}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-96 bg-white rounded-lg p-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center"
                >
                  Are you sure you want to delete this cart item?
                </Dialog.Title>
                <div className="flex justify-center mt-4 space-x-2">
                  <Button onClick={confirmDeleteCartItem}>Yes</Button>
                  <Button onClick={cancelDeleteCartItem}>No</Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

checkoutSales.Layout = "Admin";
export default checkoutSales;
