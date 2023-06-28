import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import Content1 from "@/components/shared/content1";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";

import { Router, useRouter } from "next/router";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  doRequestGetClient,
  doRequestGetJobPostById,
  doRequestUpdateJobPost,
} from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import {
  doRequestGetEducation,
  doRequestGetWorktype,
  doRequestGetJobrole,
} from "@/redux/jobhireSchema/master-jobhireSchema/action/actionReducer";
import ReactEditor from "@/components/jobHireSchema/react-quill";
import { MyPage } from "@/components/types";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const JobEdit: MyPage = () => {
  /*`````````` koneksi ke backend  ``````````````*/
  const dispatch = useDispatch();
  const router = useRouter();

  let { job_post_id, refresh } = useSelector(
    (state: any) => state.JobPostReducers
  );

  console.log("JOB POST ID ", job_post_id);

  let { education, refreshEdu } = useSelector(
    (state: any) => state.EducationReducers
  );

  let { work_type } = useSelector((state: any) => state.WorktypeReducers);

  let { job_role } = useSelector((state: any) => state.JobroleReducers);

  let { client } = useSelector((state: any) => state.ClientReducers);

  type FormValues = {
    title: string;
    min_salary: string;
    max_salary: string;
    min_experience: string;
    max_experience: string;
    primary_skill: string;
    secondary_skill: string;
    specification_role: string;
    working_type: string;
    education: string;
    benefit: string;
    client: string;
    location: string;
    publish: boolean;
    remote: boolean;
    description: string;
    image: string;
    jopo_number: string;
    start_date: string;
    end_date: string;
    test: string;
    close_hiring: string;
    emp_entity_id: number;
    jopo_entity_id: number;
  };

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<FormValues>();

  const propsData = {
    options: client,
    getOptionLabel: (option: any) => option.clit_name,
  };

  /*`````````````` fungsi untuk switch publish ,remote, hiring start ````````````````*/

  const [isPublishChecked, setIsPublishChecked] = useState(true);
  const [isRemoteChecked, setIsRemoteChecked] = useState(true);
  const [isHiringChecked, setIsHiringChecked] = useState(true);

  const handlePublishToggle = () => {
    setIsPublishChecked(!isPublishChecked);
  };
  const handleRemoteToggle = () => {
    setIsRemoteChecked(!isRemoteChecked);
  };

  const handleHiringToggle = () => {
    setIsHiringChecked(isHiringChecked);
  };

  /*```````````` fungsi untuk switch publish ,remote, hiring end ``````````````*/

  /* Button Cancel start */
  const handleCancelButton = () => {
    router.push("/app/jobs");
  };

  /* Button Cancel end*/

  const [loadedData, setLoadedData]: any = useState(null);

  useEffect(() => {
    dispatch(doRequestGetEducation());
    dispatch(doRequestGetWorktype());
    dispatch(doRequestGetJobrole());
    dispatch(doRequestGetClient());
    // setValue("jopo_number", cur_number);
    setValue("start_date", loadedData?.jopo_start_date);
    setValue("end_date", loadedData?.jopo_end_date);
  }, [refreshEdu, loadedData]);

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
    if (router.isReady) {
      const { id }: any = router.query;
      dispatch(doRequestGetJobPostById(id));
    }
  }, [router]);

  useEffect(() => {
    setLoadedData(job_post_id);
  }, [job_post_id]);

  /* ------------------------------ UPLOAD ---------------------------*/

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList]: any = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log("IMAGE", fileList);

  /* ----------------------------------------------------------------------*/

  /*````````````````` fungsi handle date  `````````````````````*/

  const [startDate, setStartDate]: any = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    setEndDate(null);
    if (date) {
      const formattedDate: any = format(date.$d, "dd-MM-yyyy");
      setValue("start_date", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    if (date) {
      const formattedDate: any = format(date.$d, "dd-MM-yyyy");
      setValue("end_date", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const isEndDateDisabled = !startDate;
  const minEndDate = startDate ? dayjs(startDate).add(1, "day") : null;

  /*``````````````` fungsi handle date `````````````````` */

  const handleRegistration = async (data: any) => {
    const formData: any = new FormData();

    formData.append("jopo_emp_entity_id", data.emp_entity_id);
    formData.append("jopo_entity_id", data.jopo_entity_id);
    formData.append("jopo_number", data.jopo_number);
    formData.append("jopo_title", data.title);
    formData.append("jopo_start_date", data.start_date);
    formData.append("jopo_end_date", data.end_date);
    formData.append("jopo_min_salary", data.min_salary);
    formData.append("jopo_max_salary", data.max_salary);
    formData.append("jopo_min_experience", data.min_experience);
    formData.append("jopo_max_experience", data.max_experience);
    formData.append("jopo_primary_skill", data.primary_skill);
    formData.append("jopo_secondary_skill", data.secondary_skill);
    formData.append("jopo_joro_id", data.specification_role);
    formData.append("jopo_work_code", data.working_type);
    formData.append("jopo_edu_code", data.education);
    formData.append("jopo_benefit", data.benefit);
    formData.append("jopo_clit_id", data.client.clit_id);
    formData.append("jopo_addr_id", data.client.addr_id);
    formData.append("jopo_description", data.description);
    formData.append("image", data.image[0].originFileObj);
    let type = data.image[0]?.type;
    let imageType = type?.split("/")[1];
    formData.append("image_type", imageType);
    formData.append("image_size", data.image[0]?.size);
    formData.append("jopo_status", data.publish ? "publish" : "draft");
    formData.append("jopo_joty_id", data.remote ? 2 : 1); //2 onsite 1remote
    formData.append("jopo_open", data.close_hiring ? 0 : 1);

    dispatch(doRequestUpdateJobPost(formData));
    router.push("/app/jobs");
    console.log("aa", ...formData);
    console.log("DATA", data);
  };

  const registerOptions = {
    title: { required: "Title is required" },
    start_date: { required: "Start Date is required" },
    end_date: { required: "End Date is required" },
    min_salary: { required: "Min Salary is required" },
    max_salary: { required: "Max Salary is required" },
    min_experience: { required: "Min Experience is required" },
    max_experience: { required: "Max Experience required" },
    primary_skill: { required: "Primary Skill is required" },
    secondary_skill: { required: "Secondary Skill is required" },
    specification_role: { required: "Specification Role is required" },
    working_type: { required: "Working is required" },
    education: { required: "Education is required" },
    benefit: { required: "Benefit is required" },
    client: { required: "Client is required" },
    location: { required: "Location is required" },
    image: { required: "Image is required" },
  };

  if (loadedData) {
    return (
      <Content1
        title="Edit Jobs"
        namafungsi1="Back"
        fungsi1={() => router.push("/app/jobs")}
      >
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="lg:grid lg:grid-cols-2">
              {/* Input Form Start*/}
              <section className="pt-4 pb-10">
                <div className="container">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-2/2">
                      <div>
                        <input
                          hidden
                          defaultValue={loadedData.jopo_emp_entity_id}
                          {...register("emp_entity_id")}
                        ></input>
                      </div>
                      <div>
                        <input
                          hidden
                          defaultValue={loadedData.jopo_entity_id}
                          {...register("jopo_entity_id")}
                        ></input>
                      </div>
                      {/* Title */}
                      <div className="pad-input">
                        <h1 className="text-format">Title</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Title"
                          defaultValue={loadedData.jopo_title}
                          {...register("title")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                        {/* <p className="px-2 text-red-800">
                        {errors?.title && errors.title.message}
                      </p> */}
                      </div>
                      {/* Date */}
                      <div className="pad-input">
                        <h1 className="text-format">Periode Posting</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div className="grid grid-cols-2 w-full gap-4">
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
                              value={
                                loadedData.jopo_start_date
                                  ? dayjs(loadedData?.jopo_start_date)
                                  : startDate
                              }
                            />

                            <DatePicker
                              slotProps={{
                                actionBar: {
                                  actions: ["clear"],
                                },
                              }}
                              format="DD/MM/YYYY"
                              label="Selesai"
                              className="w-full"
                              defaultValue={dayjs(loadedData.jopo_end_date)}
                              minDate={minEndDate}
                              disabled={isEndDateDisabled}
                              onChange={handleEndDateChange}
                              value={
                                loadedData.jopo_end_date
                                  ? dayjs(loadedData?.jopo_end_date)
                                  : startDate
                              }
                            />
                          </div>
                        </LocalizationProvider>
                      </div>
                      {/* Salary & Experience */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Min Salary</h1>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            placeholder="Min Salary"
                            defaultValue={loadedData.jopo_min_salary}
                            {...register("min_salary")}
                            variant="outlined"
                            className="w-full"
                            size="small"
                            inputProps={{
                              min: 1,
                            }}
                          />
                          {/* <p className="px-2 text-red-800">
                          {errors?.min_salary && errors.min_salary.message}
                        </p> */}
                        </div>
                        <div>
                          <h1 className="text-format">Max Salary</h1>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            placeholder="Max Salary"
                            defaultValue={loadedData.jopo_max_salary}
                            {...register("max_salary")}
                            variant="outlined"
                            className="w-full"
                            size="small"
                            inputProps={{
                              min: 1,
                            }}
                          />
                          {/* <p className="px-2 text-red-800">
                          {errors?.max_salary && errors.max_salary.message}
                        </p> */}
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Min Eperience</h1>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            placeholder="Min"
                            defaultValue={loadedData.jopo_min_experience}
                            {...register("min_experience")}
                            size="small"
                            className="w-full"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              min: 0,
                            }}
                          />
                          {/* <p className="px-2 text-red-800">
                          {errors?.min_experience &&
                            errors.min_experience.message}
                        </p> */}
                        </div>
                        <div>
                          <h1 className="text-format">Max Eperience</h1>
                          <TextField
                            id="outlined-basic"
                            type="number"
                            placeholder="Max"
                            defaultValue={loadedData.jopo_max_experience}
                            {...register("max_experience")}
                            size="small"
                            className="w-full"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              min: 1,
                            }}
                          />
                          {/* <p className="px-2 text-red-800">
                          {errors?.max_experience &&
                            errors.max_experience.message}
                        </p> */}
                        </div>
                      </div>
                      {/* Primary Skill */}
                      <div className="pad-input">
                        <h1 className="text-format">Primary Skill</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="Java, Springboot, Oracle, Pl/Sql"
                          defaultValue={loadedData.jopo_primary_skill}
                          {...register("primary_skill")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                        {/* <p className="px-2 text-red-800">
                        {errors?.primary_skill && errors.primary_skill.message}
                      </p> */}
                      </div>
                      {/* Secondary Skill */}
                      <div className="pad-input">
                        <h1 className="text-format">Secondary Skill</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="SDLC,HTML/CSS,Javascript"
                          defaultValue={loadedData.jopo_secondary_skill}
                          {...register("secondary_skill")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                        {/* <p className="px-2 text-red-800">
                        {errors?.secondary_skill &&
                          errors.secondary_skill.message}
                      </p> */}
                      </div>

                      {/* Specification Role */}
                      <div className="pad-input ">
                        <div>
                          <h1 className="text-format">Specification Role</h1>
                          <TextField
                            id="outlined"
                            select
                            className="w-full"
                            defaultValue={loadedData.jopo_joro_id}
                            {...register("specification_role")}
                            size="small"
                          >
                            {job_role.map((option: any) => (
                              <MenuItem
                                key={option.joro_id}
                                value={option.joro_id}
                              >
                                {option.joro_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
                      {/* Working Type & Education */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Working Type</h1>
                          <TextField
                            id="outlined"
                            select
                            className="w-full"
                            defaultValue={loadedData.jopo_work_code}
                            {...register("working_type")}
                            size="small"
                          >
                            {work_type.map((option: any) => (
                              <MenuItem
                                key={option.woty_code}
                                value={option.woty_code}
                              >
                                {option.woty_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div>
                          <h1 className="text-format">Education</h1>
                          <TextField
                            id="outlined"
                            select
                            className="w-full"
                            defaultValue={loadedData.jopo_edu_code}
                            {...register("education")}
                            size="small"
                          >
                            {education.map((option: any) => (
                              <MenuItem
                                key={option.edu_code}
                                value={option.edu_code}
                              >
                                {option.edu_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>

                      {/* Benefit */}
                      <div className="pad-input">
                        <h1 className="text-format">Benefit</h1>
                        <TextField
                          id="outlined-basic"
                          placeholder="THR,BPJS,Bonus"
                          defaultValue={loadedData.jopo_benefit}
                          {...register("benefit")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                        />
                        {/* <p className="px-2 text-red-800">
                        {errors?.benefit && errors.benefit.message}
                      </p> */}
                      </div>

                      {/* Search Client */}
                      <div className="pad-input">
                        <h1 className="text-format">Client</h1>
                        <Autocomplete
                          {...propsData}
                          autoComplete
                          size="small"
                          includeInputInList
                          onChange={(event: any, value: any) => {
                            register("client", { value: value });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Client"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <SearchIcon color="action" />
                                    {params.InputProps.startAdornment}
                                  </>
                                ),
                              }}
                              {...register("test", registerOptions.client)}
                            />
                          )}
                        />
                        {/* <p className="px-2 text-red-800">
                        {errors?.client && errors.client.message}
                      </p> */}
                      </div>
                      {/* Description */}
                      <div className="pad-input">
                        <h1 className="text-format">Description</h1>
                        <ReactEditor
                          register={register}
                          setValue={setValue}
                          inputName={"description"}
                          defaultValue={loadedData.jopo_description}
                        />
                        {/* <CKEditor /> */}
                        {/* <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Description"
                        defaultValue={loadedData.jopo_description}
                        className="w-full"
                        {...register("description")}
                      /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Input Form End*/}

              {/* Upload Logo Start */}
              <section className="lg:ml-20 pb-10 lg:pt-4">
                <div className="container">
                  <div className="flex flex-wrap ">
                    <div className="w-full lg:w-1/2">
                      <div className="pad-input">
                        <h1 className="text-format">Posting Number</h1>
                        <TextField
                          id="outlined-basic"
                          value={loadedData.jopo_number}
                          {...register("jopo_number")}
                          variant="outlined"
                          className="w-full bg-slate-300 opacity-80 lg:w-[18.7rem]"
                          size="small"
                        />
                      </div>
                      <div className="w-full pl-[33px] justify-center lg:pl-0">
                        <div className="pb-10">
                          <Upload
                            listType="picture-circle"
                            onPreview={handlePreview}
                            fileList={fileList}
                            onChange={(value) => {
                              handleChange(value);
                              setValue("image", fileList);
                            }}
                          >
                            {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                          <Modal
                            open={previewOpen}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                        </div>
                        {/* Switch Publish & Remote */}
                        <div className="items-center">
                          <div className="flex">
                            <h1 className="pr-14 ">Publish</h1>
                            <label className="relative inline-flex items-center mb-4 cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                {...register("publish")}
                                defaultChecked={
                                  loadedData.jopo_status === "publish"
                                    ? true
                                    : false
                                }
                                // checked={isPublishChecked}
                                onChange={handlePublishToggle}
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className=" flex">
                            <h1 className="pr-[29px]">Remotely ?</h1>
                            <label className="relative inline-flex items-center mb-4 cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                {...register("remote")}
                                defaultChecked={
                                  loadedData.jopo_joty_id === "1" ? true : false
                                }
                                // checked={isRemoteChecked}
                                onChange={handleRemoteToggle}
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex">
                            <h1 className="pr-[9px] ">Close Hiring ?</h1>
                            <label className="relative inline-flex items-center mb-4 cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                {...register("close_hiring")}
                                defaultChecked={
                                  loadedData.jopo_open === "0" ? true : false
                                }
                                // checked={isHiringChecked}
                                onChange={handleHiringToggle}
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Upload Logo End */}
            </div>

            <section>
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="bg-white h-[60px] border-t-2 shadow-gray-200 shadow-inner">
                    <div className=" flex pt-3.5 justify-center lg:justify-start">
                      <button type="submit" className="button-foot">
                        Save
                      </button>
                      <button
                        type="button"
                        className="button-foot"
                        onClick={handleCancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </Content1>
    );
  }
};
JobEdit.Layout = "Admin";
export default JobEdit;
