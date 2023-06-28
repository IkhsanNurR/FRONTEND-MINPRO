import React, { Fragment, useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Dialog, Menu, Transition } from "@headlessui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import {
  doRequestGetCandidateApply,
  doRequestGetCandidateContract,
  doRequestGetCandidateFailed,
  doRequestGetCandidateInterview,
  doRequestUpdateCandidate,
} from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import { MyPage } from "@/components/types";
import Image from "next/image";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const App: MyPage = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    p: 4,
  };

  const [status, setStatus] = useState("1");

  const onChange = (key: string) => {
    setStatus(key);
  };

  let {
    candidates_apply,
    candidates_interview,
    candidates_contract,
    candidates_failed,
    refresh,
  } = useSelector((state: any) => state.JobTalentReducers);

  console.log("APPLY", candidates_apply);
  console.log("INTERVIEW", candidates_interview);
  console.log("CONTRACT", candidates_contract);
  console.log("FAILED", candidates_failed);

  useEffect(() => {
    setStatus(status);
    if (status === "1") {
      dispatch(doRequestGetCandidateApply());
    } else if (status === "2") {
      dispatch(doRequestGetCandidateInterview());

      // dispatch(filteringAction());
    } else if (status === "3") {
      dispatch(doRequestGetCandidateContract());
    } else if (status === "4") {
      dispatch(doRequestGetCandidateFailed());
    }
  }, [refresh, status]);

  const dispatch = useDispatch();

  /* HANDLE STATUS */

  type Value = {
    user_entity_id: number;
    taap_scoring: number;
    tapr_progress_name: string;
    taap_status: string;
    tapr_comment: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Value>();

  let [isOpenApply, setIsOpenApply] = useState(false);
  let [isOpenInterview, setIsOpenInterview] = useState(false);
  let [statusTalent, setStatusTalent] = useState("");

  function closeModal() {
    setIsOpenApply(false);
    setIsOpenInterview(false);
  }

  function openModalApply() {
    setIsOpenApply(!isOpenApply);
  }

  // function closeModalInterview() {
  //   setIsOpenInterview(false);
  // }

  function openModalInterview() {
    setIsOpenInterview(!isOpenInterview);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const registerOption = {
    tapr_comment: { required: "Review is required" },
  };

  const handleNumberChange = (e: any) => {
    const value = parseInt(e.target.value);
    // console.log("value", value);
    if (value < 70) {
      setStatusTalent("failed");
    } else {
      setStatusTalent("succeed");
    }
  };

  useEffect(() => {
    setValue("taap_status", statusTalent);
  }, [statusTalent]);

  const handleApplyStatus = (data: any) => {
    const dataApply = {
      user_entity_id: candidates_apply[0].user_entity_id,
      taap_status: data.taap_status,
      tapr_status: data.taap_status === "interview" ? "waiting" : "cancelled",
      tapr_progress_name:
        data.taap_status === "interview" ? "interview" : "cancelled",
    };
    dispatch(doRequestUpdateCandidate(dataApply));
  };

  const handleInterviewStatus = (data: any) => {
    const dataInter = {
      user_entity_id: candidates_interview[0].user_entity_id,
      taap_status: data.taap_status,
      taap_scoring: data.taap_scoring,
      tapr_comment: data.tapr_comment,
      tapr_status: data.taap_status === "succeed" ? "done" : "cancelled",
      tapr_progress_name:
        data.taap_status === "succeed" ? "contract" : "cancelled",
    };
    console.log("EYE2", data);
    dispatch(doRequestUpdateCandidate(dataInter));
    console.log("EYE", dataInter);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <p className="font-semibold">Apply</p>,
      children: [
        <>
          {(candidates_apply || []).map((dt: any) => (
            <div className="w-full h-[5rem] p-3 justify-between flex items-center border-b-2 ">
              <div className="">
                <Image
                  src={`http://localhost:3001/public/users/image/${dt.user_photo}`}
                  className="ring-2 rounded-full"
                  alt="gambar"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div>
                <h1 className="font-semibold">{dt.full_name}</h1>
                <h1 className="font-light italic">{dt.pmail_address}</h1>
              </div>

              <div>
                <h1 className="font-semibold">{dt.usdu_school}</h1>
                <h1 className="font-light italic">{dt.usdu_field_study}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Lulusan</h1>
                <h1 className="font-light italic">{dt.usdu_graduate_year}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Apply Job</h1>
                <h2 className="font-light italic">{dt.jopo_title}</h2>
              </div>

              <div>
                <h1 className="font-semibold">{dt.clit_name}</h1>
              </div>

              <div>
                <h1 className="font-semibold">
                  Applied On -{" "}
                  {format(new Date(dt.taap_modified_date), "dd MMMM yyyy")}
                </h1>
                <p className="font-light italic capitalize">
                  {dt.tapr_progress_name}
                </p>
              </div>

              <div className="">
                <div className="finline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <button
                    type="button"
                    onClick={openModalApply}
                    className="text-black hover:text-gray-400"
                  >
                    <MoreVertIcon></MoreVertIcon>
                  </button>
                </div>

                <Transition appear show={isOpenApply} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-60 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Edit Status
                            </Dialog.Title>
                            <form onSubmit={handleSubmit(handleApplyStatus)}>
                              <div className="px-1 py-1 ">
                                <div>
                                  <select
                                    className="text-sm rounded-lg ring-1 block w-full p-1"
                                    {...register("taap_status")}
                                  >
                                    <option selected value="interview">
                                      Interview
                                    </option>
                                    <option value="failed">Failed</option>
                                  </select>
                                  <div className="pt-2 flex flex-cols-1 gap-2 w-full justify-center">
                                    <button
                                      type="submit"
                                      className="border  w-full rounded-lg text-white bg-blue-400"
                                      onClick={closeModal}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
          ))}
        </>,
      ],
    },
    {
      key: "2",
      label: <p className="font-semibold">Interview</p>,
      children: [
        <>
          {(candidates_interview || []).map((dt: any) => (
            <div className="w-full h-[5rem] p-3 justify-between flex items-center border-b-2 ">
              <div className="">
                <Image
                  src={`http://localhost:3001/public/users/image/${dt.user_photo}`}
                  className="ring-2 rounded-full"
                  alt="gambar"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div>
                <h1 className="font-semibold">{dt.full_name}</h1>
                <h1 className="font-light italic">{dt.pmail_address}</h1>
              </div>

              <div>
                <h1 className="font-semibold">{dt.usdu_school}</h1>
                <h1 className="font-light italic">{dt.usdu_field_study}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Lulusan</h1>
                <h1 className="font-light italic">{dt.usdu_graduate_year}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Apply Job</h1>
                <h2 className="font-light italic">{dt.jopo_title}</h2>
              </div>

              <div>
                <h1 className="font-semibold">{dt.clit_name}</h1>
              </div>

              <div>
                <h1 className="font-semibold">
                  Applied On -{" "}
                  {format(new Date(dt.taap_modified_date), "dd MMMM yyyy")}
                </h1>
                <p className="font-light italic capitalize">
                  {dt.tapr_progress_name}
                </p>
              </div>

              <div className="">
                {/* <div className="">
                  <Button onClick={handleOpen}>EDIT</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className="border-b-2 border-black"
                      >
                        Edit Status
                      </Typography>
                      <form onSubmit={handleSubmit(handleInterviewStatus)}>
                        <div className="pt-4 ">
                          <div className="pb-4">
                            <p>Score</p>
                            <input
                              type="number"
                              className=" w-full px-2 py-1 ring-1 ring-slate-300"
                              placeholder="Score"
                              {...register("taap_scoring")}
                              onChange={handleNumberChange}
                            ></input>
                          </div>
                          <div className="pb-4">
                            <label>Status</label>
                            <input
                              className=" w-full px-2 py-1 ring-1 ring-slate-300"
                              value={statusTalent}
                            ></input>
                          </div>
                          <div>
                            <label>Review</label>
                            <TextField
                              multiline
                              rows={4}
                              placeholder="Review"
                              className=" w-full border "
                              {...register("tapr_comment")}
                            />
                          </div>
                          <div className="pt-2 flex justify-center">
                            <button
                              type="submit"
                              className="border w-full rounded-lg text-white bg-blue-400"
                              onClick={handleClose}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </Box>
                  </Modal>
                </div> */}

                <div className="finline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <button
                    type="button"
                    onClick={openModalInterview}
                    className="text-black hover:text-gray-400"
                  >
                    <MoreVertIcon></MoreVertIcon>
                  </button>
                </div>

                <Transition appear show={isOpenInterview} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => {
                      setIsOpenInterview(true);
                    }}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-60 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Edit Status
                            </Dialog.Title>
                            <form
                              onSubmit={handleSubmit(handleInterviewStatus)}
                            >
                              <div className="px-1 py-1 ">
                                <div>
                                  <div className="flex pb-3 justify-between items-center">
                                    <label className="pr-2">Score</label>
                                    <input
                                      type="number"
                                      className="border rounded-lg w-20 px-2 py-1 ring-1"
                                      placeholder="Score"
                                      {...register("taap_scoring")}
                                      onChange={handleNumberChange}
                                    ></input>
                                  </div>
                                  <div className="flex items-center pb-3">
                                    <label className="pr-2">Status</label>
                                    <input
                                      className="border rounded-lg w-full px-2 py-1 ring-1"
                                      value={statusTalent}
                                    ></input>
                                  </div>
                                  <div>
                                    <label>Review</label>
                                    <TextField
                                      multiline
                                      rows={4}
                                      placeholder="Review"
                                      {...register("tapr_comment")}
                                    />
                                  </div>
                                  <div className="pt-2 flex flex-cols-1 gap-2 w-full justify-center">
                                    <button
                                      type="submit"
                                      className="border  w-full rounded-lg text-white bg-blue-400"
                                      onClick={closeModal}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="border  w-full rounded-lg text-white bg-red-400"
                                      onClick={closeModal}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
          ))}
        </>,
      ],
    },
    {
      key: "3",
      label: <p className="font-semibold">Contract</p>,
      children: [
        <>
          {(candidates_contract || []).map((dt: any) => (
            <div className="w-full h-[5rem] p-3 justify-between flex items-center border-b-2 ">
              <div className="">
                <Image
                  src={`http://localhost:3001/public/users/image/${dt.user_photo}`}
                  className="ring-2 rounded-full"
                  alt="gambar"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div>
                <h1 className="font-semibold">{dt.full_name}</h1>
                <h1 className="font-light italic">{dt.pmail_address}</h1>
              </div>

              <div>
                <h1 className="font-semibold">{dt.usdu_school}</h1>
                <h1 className="font-light italic">{dt.usdu_field_study}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Lulusan</h1>
                <h1 className="font-light italic">{dt.usdu_graduate_year}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Apply Job</h1>
                <h2 className="font-light italic">{dt.jopo_title}</h2>
              </div>

              <div>
                <h1 className="font-semibold">{dt.clit_name}</h1>
              </div>

              <div>
                <h1 className="font-semibold">
                  Applied On -{" "}
                  {format(new Date(dt.taap_modified_date), "dd MMMM yyyy")}
                </h1>
                <p className="font-light italic capitalize">
                  {dt.tapr_progress_name}
                </p>
              </div>

              <div className=""></div>
            </div>
          ))}
        </>,
      ],
    },
    {
      key: "4",
      label: <p className="font-semibold">Failed</p>,
      children: [
        <>
          {(candidates_failed || []).map((dt: any) => (
            <div className="w-full h-[5rem] p-3 justify-between flex items-center border-b-2 ">
              <div className="">
                <Image
                  src={`http://localhost:3001/public/users/image/${dt.user_photo}`}
                  className="ring-2 rounded-full"
                  alt="gambar"
                  width={20}
                  height={20}
                ></Image>
              </div>
              <div>
                <h1 className="font-semibold">{dt.full_name}</h1>
                <h1 className="font-light italic">{dt.pmail_address}</h1>
              </div>

              <div>
                <h1 className="font-semibold">{dt.usdu_school}</h1>
                <h1 className="font-light italic">{dt.usdu_field_study}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Lulusan</h1>
                <h1 className="font-light italic">{dt.usdu_graduate_year}</h1>
              </div>

              <div>
                <h1 className="font-semibold">Apply Job</h1>
                <h2 className="font-light italic">{dt.jopo_title}</h2>
              </div>

              <div>
                <h1 className="font-semibold">{dt.clit_name}</h1>
              </div>

              <div>
                <h1 className="font-semibold">
                  Applied On -{" "}
                  {format(new Date(dt.taap_modified_date), "dd MMMM yyyy")}
                </h1>
                <p className="font-light italic capitalize">
                  {dt.tapr_progress_name}
                </p>
              </div>

              <div className=""></div>
            </div>
          ))}
        </>,
      ],
    },
  ];

  return (
    <div className="w-full justify-center">
      <Tabs
        className="text-center border-2 px-2 bg-gray-100"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};
App.Layout = "Admin";
export default App;
