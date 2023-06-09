import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { MyPage } from "@/components/types";
import Content from "@/components/shared/content";
import Content1 from "@/components/shared/content1";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  doGetCartItem,
  doDeleteCartItem,
} from "@/redux/salesSchema/action/actionReducer";
import { ToastContainer, toast } from "react-toastify";
import { BiCartDownload } from "react-icons/bi";
import BookMarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PaymentsIcon from "@mui/icons-material/Payments";
import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
interface OrderSalesDetail {}
const BasicGrid: MyPage = () => {
  const { cart, refresh } = useSelector((state: any) => state.cartItemReducer);
  const { order, refreshh } = useSelector(
    (state: any) => state.salesOrderReducer
  );
  const dispatch = useDispatch();

  const [isAccountValid, setIsAccountValid] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);

  const [selectedFintech, setSelectedFintech] = useState("");
  const handleAccountFintechClick = (fintech: string) => {
    setSelectedFintech(fintech);
  };

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeItemId, setRemoveItemId] = useState(0);

  const router = useRouter();
  const {
    totalPrice,
    accountNumber,
    fintechName,
    userName,
    spof_id,
    spof_discount,
  }: any = router.query;
  const totalPriceString = Array.isArray(totalPrice)
    ? totalPrice[0]
    : totalPrice;
  const totalPriceNumber = parseInt(totalPriceString || "0");

  //filter cart berdasarkan user
  const cartById =
    cart && Array.isArray(cart)
      ? cart.filter((item) => item.cait_user_entity_id === 18)
      : [];

  useEffect(() => {
    dispatch(doGetCartItem());
  }, [refresh]);

  // Fungsi untuk menghasilkan nomor pesanan acak
  const generateOrderNumber = () => {
    const prefix = "ORDER";
    const characters = "0123456789";
    let randomNumber = "";
    for (let i = 0; i < 6; i++) {
      randomNumber += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `${prefix}${randomNumber}`;
  };

  // Fungsi untuk menghasilkan kode nomor TRPA acak
  const generateTrpaCodeNumber = () => {
    const prefix = "TRPA";
    const characters = "0123456789";
    let randomNumber = "";
    for (let i = 0; i < 6; i++) {
      randomNumber += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `${prefix}${randomNumber}`;
  };

  // Fungsi untuk menghasilkan kode lisensi acak
  const generateLicenseCode = () => {
    const prefix = "LICENSE";
    const characters = "0123456789";
    let randomNumber = "";
    for (let i = 0; i < 5; i++) {
      randomNumber += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    if (router.query.thanksMessage) {
      console.log("Thanks for buying");
      // Tambahkan logika atau perintah lainnya di sini untuk menampilkan teks atau melakukan tindakan yang diinginkan
    }
  }, [router.query.thanksMessage]);

  // Menggunakan generator untuk mendapatkan nilai acak
  // const handleCreateOrder = async () => {
  //   const trpaCodeNumber = generateTrpaCodeNumber();

  //   const cartItems = items.map((item: any) => {
  //     return {
  //       cait_id: item.cait_id,
  //       cait_quantity: item.cait_quantity,
  //       cait_unit_price: totalPrice,
  //       cait_user_entity_id: item.cait_user_entity_id,
  //       cait_prog_entity_id: item.cait_prog_entity_id,
  //     };
  //   });

  //   const dummyData = {
  //     cartItems,
  //     p_sohe_order_number: generateOrderNumber(),
  //     p_sohe_account_number: accountNumber,
  //     p_sohe_trpa_code_number: trpaCodeNumber,
  //     p_sohe_license_code: generateLicenseCode(),
  //     p_sohe_user_entity_id: items[0].cait_user_entity_id,
  //     p_sohe_status: 'open',
  //     p_sode_unit_discount: parseFloat(spof_discount),
  //     p_sode_soco_id: parseInt(spof_id),
  //   };

  //   try {
  //     await dispatch(addOrderReq(dummyData));
  //     // Pindahkan halaman ke '/sales/receipt' setelah memasukkan data
  //     router.push({
  //       pathname: '/sales/receipt',
  //       query: { totalPrice, accountNumber, fintechName, userName, trpaCodeNumber, thanksMessage: true },
  //     });
  //   } catch (error) {
  //     // Handle error jika terjadi kegagalan
  //     console.error('Gagal memasukkan data:', error);
  //   }
  // };

  const handleCreateOrder = async () => {
    // const trpaCodeNumber = generateTrpaCodeNumber();
    router.push({
      pathname: "/app/sales/receipt",
    });
    // const cartItems = cart.map((item: any) => {
    //     return {
    //         cait_id: item.cait_id,
    //         cait_quantity: item.cait_quantity,
    //         cait_unit_price: totalPrice,
    //         cait_user_entity_id: item.cait_user_entity_id,
    //         cait_prog_entity_id: item.cait_prog_entity_id,
    //     };
    // });

    // const dummyData = {
    //     cartItems,
    //     p_sohe_order_number: generateOrderNumber(),
    //     p_sohe_account_number: accountNumber,
    //     p_sohe_trpa_code_number: trpaCodeNumber,
    //     p_sohe_license_code: generateLicenseCode(),
    //     p_sohe_user_entity_id: cart[0].cait_user_entity_id,
    //     p_sohe_status: 'open',
    //     p_sode_unit_discount: parseFloat(spof_discount),
    //     p_sode_soco_id: parseInt(spof_id),
    // };

    // try {
    //     const response: any = await dispatch(doAddSalesOrder(dummyData));
    //     console.log("RESPONSEEE sts", status);
    //     if (status === 200) {
    //         // Pindahkan halaman ke '/sales/receipt' setelah memasukkan data
    //         router.push({
    //             pathname: '/sales/receipt',
    //             query: { totalPrice, accountNumber, fintechName, userName, trpaCodeNumber, thanksMessage: true },
    //         });
    //     } else {
    //         console.error('Gagal memasukkan data ke database');
    //         // Tampilkan pesan kesalahan di frontend
    //         // Sesuaikan penanganan kesalahan berdasarkan framework atau library spesifik Anda
    //     }
    // } catch (error) {
    //     // Handle error jika terjadi kegagalan
    //     console.error('Gagal memasukkan data:', error);
    //     // Tampilkan pesan kesalahan di frontend
    //     // Sesuaikan penanganan kesalahan berdasarkan framework atau library spesifik Anda
    // }
  };

  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [items]);

  // const calculateTotalPrice = () => {
  //   if (items && items.length > 0) {
  //     const total = items.reduce((accumulator: number, course: any) => {
  //       const price = parseFloat(course.prog_price.replace(/[^0-9.-]+/g, ""));
  //       return accumulator + price;
  //     }, 0);
  //     setTotalPrice(total);
  //   } else {
  //     setTotalPrice(0); // Set total price to 0 if there are no items
  //   }
  // };

  const handleRemoveCartItem = (id: number) => {
    setRemoveItemId(id);
    setShowRemoveModal(true);
  };

  const confirmRemoveCartItem = () => {
    dispatch(doDeleteCartItem(removeItemId));
    toast.success("Item removed from cart"); // Menampilkan pesan berhasil
    setShowRemoveModal(false);
  };

  const cancelRemoveCartItem = () => {
    setShowRemoveModal(false);
  };

  const handleCancelOrder = () => {
    router.push("/sales/checkout");
  };

  return (
    <div>
      <Content1 title="JUDUL" fungsi1={null} namafungsi1="BEBAS"></Content1>
      <ToastContainer />
      <div className="container mx-auto p-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-bold text-black">
            <span className="cart-icon bg-red-500 text-white px-2 py-1 rounded mr-2">
              {cartById.length}
            </span>
            Course in cart
            <BiCartDownload className="inline-block ml-2" />
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4">
              {cartById &&
                cartById.map((course: any, index: any) => {
                  if (course.cait_id && !isNaN(course.cait_id)) {
                    return (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-white rounded-lg shadow-lg"
                      >
                        <div className="h-16 w-16 mr-4 relative">
                          gambar sembarang{" "}
                          {/* <Image src={courseImage} alt="Course Image" layout="fill" objectFit="cover" className="rounded-full" /> */}
                        </div>
                        <div className="flex flex-col flex-grow">
                          <div className="flex justify-between mb-4">
                            <div>
                              <p className="text-lg font-bold text-gray-800">
                                {course.prog_headline}
                              </p>
                              <p className="text-gray-600">
                                {course.prog_title}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="text-red-600">
                                Rp. {course.cait_unit_price}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-900 rounded-full flex items-center transform hover:scale-105">
                              Save for later
                              <BookMarkAddIcon className=" ml-2" />
                            </button>
                            <button
                              className="bg-yellow-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-900 rounded-full flex items-center transform hover:scale-105"
                              onClick={() =>
                                handleRemoveCartItem(course.cait_id)
                              }
                            >
                              Remove
                              <DeleteForeverIcon className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // If cait_id is not valid, the course item won't be rendered
                  }
                })}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
                <p className="text-lg font-bold text-black">Payment</p>
                <PaymentsIcon className="ml-2" />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4 h-full">
              <div className="p-5 y-1 bg-white rounded-lg shadow-lg flex flex-col">
                <p className="text-lg font-bold text-black">Total:</p>
                <p className="text-3xl font-bold text-black">
                  Rp. {totalPriceNumber.toLocaleString()}
                </p>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-900 rounded-full mt-4 flex items-center justify-center flex-row-reverse"
                  onClick={handleCreateOrder}
                >
                  <MdShoppingCart className="ml-2" />
                  Create Order
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-900 rounded-full mt-4 flex items-center justify-center flex-row-reverse"
                  onClick={handleCancelOrder}
                >
                  <MdRemoveShoppingCart className="ml-2" />
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
          <div>
            <div className="items-center p-4 bg-white mt-2">
              <p className="text-2xl font-bold bg-gradient-to-r from-red-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">
                Payment via {fintechName}
              </p>
              <p className="text-lg font-semibold italic bg-gradient-to-r from-red-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">
                Account Number: {accountNumber}
              </p>
              <p className="text-lg font-semibold italic bg-gradient-to-r from-red-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">
                Account Name: {userName}
              </p>
              <p className="text-lg font-semibold italic bg-gradient-to-r from-red-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">
                Credit: Rp. {totalPriceNumber.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold">Remove Item</h2>
            <p>Are you sure you want to remove this item?</p>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outlined"
                className="mr-2"
                onClick={cancelRemoveCartItem}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="bg-red-500"
                onClick={confirmRemoveCartItem}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BasicGrid.Layout = "Admin";
export default BasicGrid;
