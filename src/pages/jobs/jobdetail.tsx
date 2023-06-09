import React, { useEffect, useState } from "react";
import imgDummy from "../../../public/imageTest/ram-klev.jpg";
import Image from "next/image";
import {
  ShareIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  doRequestAddCandidate,
  doRequestGetJobPost,
  doRequestGetJobPostById,
} from "@/redux/jobhireSchema/jobHireSchema/action/actionReducer";
import CardJob from "@/components/jobHireSchema/cardjob";
import { MyPage } from "@/components/types";
import { CookieValueTypes, getCookie } from "cookies-next";
import decodeTokenName from "@/helper/decodedTokenName";
import {
  GetByNameOrEmail,
  applyJob,
} from "@/redux/usersSchema/profile/action/actionReducer";
import { Progress, notification } from "antd";

const JobDetail: MyPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [loadedData, setLoadedData]: any = useState(null);
  let { users, msg, status, refresh }: userProfile = useSelector(
    (state: any) => state.userProfileReducers
  );
  let { job_post_id } = useSelector((state: any) => state.JobPostReducers);

  let { job_post } = useSelector((state: any) => state.JobPostReducers);

  console.log("JOBPOST ID", job_post_id);
  console.log("JOBPOST", job_post);

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
    if (router.isReady) {
      const { id }: any = router.query;
      console.log("INI ID");
      dispatch(doRequestGetJobPostById(id));
      dispatch(doRequestGetJobPost());
    }
  }, [router]);

  const filtered = job_post?.filter(
    (item: any) =>
      item.joro_name
        .toLowerCase()
        .includes(job_post_id.joro_name?.toLowerCase()) &&
      item.jopo_entity_id !== job_post_id.jopo_entity_id
  );

  console.log("HASIL", filtered);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered?.slice(startIndex, endIndex);

  useEffect(() => {
    setLoadedData(job_post_id);
  }, [job_post_id]);

  /*  CHECK USER  */
  const [name, setName] = useState<string | null>(null);
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");

  function calculateDataCompleteness(user: Users): number {
    const requiredAttributes: (keyof Users)[] = [
      "user_first_name",
      "user_last_name",
      "user_birth_date",
      "user_photo",
      "phone",
      "education",
      "resume",
    ];
    const totalAttributes = requiredAttributes.length;
    let completedAttributes = 0;

    requiredAttributes.forEach((attribute) => {
      if (user?.hasOwnProperty(attribute) && user[attribute]) {
        completedAttributes++;
      }
    });

    const completenessPercentage =
      (completedAttributes / totalAttributes) * 100;
    return Number(completenessPercentage.toFixed());
  }
  const token = getCookie("token");
  useEffect(() => {
    const decode = decodeTokenName(token);
    setName(decode);

    if (name) dispatch(GetByNameOrEmail(name));
    setHaveToken(token);
  }, [token, refresh]);
  const completeness = calculateDataCompleteness(users);
  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    msg: string,
    completeness?: number
  ) => {
    let message = "";
    let description = null;

    switch (type) {
      case "success":
        message = msg;
        break;
      case "info":
        message = msg;
        break;
      case "warning":
        message = msg;
        break;
      case "error":
        message = msg;
        break;
      default:
        return null;
    }

    api[type]({
      message,
      description: (
        <>
          {description}
          {completeness !== undefined && (
            <Progress type="circle" percent={completeness} size={40} />
          )}
        </>
      ),
      duration: 2,
    });
  };

  /*  ```````````````CHECK USER```````````````  */

  /* HANDLE BUTTON APPLY */
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!haveToken) {
      openNotificationWithIcon("error", "Silahkan Login");
      setTimeout(() => {
        router.push({
          pathname: "/signin",
        });
      }, 2000);
    } else if (haveToken && completeness !== 100) {
      openNotificationWithIcon(
        "warning",
        "Silahkan Lengkapi Data Diri Anda",
        completeness
      );
    } else {
      // dispatch(
      //   applyJob({
      //     id: users.user_entity_id,
      //     idPost: job_post_id.jopo_entity_id,
      //   })
      // );
      const buatAdd = {
        user_entity_id: users.user_entity_id,
        entity_id: job_post_id.jopo_entity_id,
      };
      console.log("DISPATCH", buatAdd);
      dispatch(doRequestAddCandidate(buatAdd));
      openNotificationWithIcon(
        "success",
        "Terima kasih sudah apply job ,silahkan cek email untuk step berikutnya"
      );
      setIsPressed(true);
    }

    // Lakukan tindakan atau fungsi lain yang diinginkan saat tombol ditekan
  };

  if (loadedData) {
    /* UNTUK FORMAT UANG */
    const formatSalary = (salary: any) => {
      const formatter = new Intl.NumberFormat("id-ID");
      return formatter.format(salary);
    };
    const formattedMinSalary = formatSalary(loadedData.jopo_min_salary);
    const formattedMaxnSalary = formatSalary(loadedData.jopo_max_salary);

    /* UNTUK MISAHIN PRIMARYSKILL */
    const PrimaySkillArray = loadedData.jopo_primary_skill
      .split(",")
      .map((skill: string) => ({ primarySkill: skill.trim() }));

    /* UNTUK MISAHIN SECONDARYSKILL */
    const SecondSkillArray = loadedData.jopo_secondary_skill
      .split(",")
      .map((skill: string) => ({ secondarySkill: skill.trim() }));

    /* KONVERT JAM  */
    const startDate = new Date(loadedData.jopo_modified_date);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const diffInHours = Math.floor(timeDiff / (1000 * 3600));

    let timeAgoString = "";

    if (diffInDays > 0) {
      timeAgoString = `Dibuat ${diffInDays} hari yang lalu`;
    } else if (diffInHours > 0) {
      timeAgoString = `Dibuat ${diffInHours} jam yang lalu`;
    } else {
      timeAgoString = "Baru saja dibuat";
    }

    return (
      <div className="container grid lg:grid-cols-2">
        {contextHolder}
        <div>
          {/* Section Nama Perusahaan Start    */}
          <section className="pt-28 pb-6 border-b-2">
            <div className="container">
              <div className="flex">
                <img
                  src={`http://localhost:3001/public/jobhire/${loadedData.jopho_filename}`}
                  alt="gambar"
                  height={80}
                  width={80}
                  className="float-left mr-3 h-20 w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28"
                />
                <div className="w-full">
                  <h1 className="text-lg font-semibold md:text-xl lg:text-2xl ">
                    {loadedData.jopo_title}
                  </h1>
                  <h2 className="text-sm font-light lg:text-base">
                    {loadedData.clit_name}
                  </h2>
                  <div className="flex items-center">
                    <CurrencyDollarIcon height="20" width="20" />
                    <h3 className="text-sm font-normal pl-2 md:text-base lg:text-lg">
                      IDR {formattedMinSalary} - {formattedMaxnSalary}/month
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <h3 className="text-sm underline text-blue-500  font-normal pl-2 md:text-base lg:text-lg">
                      {loadedData.joro_name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                    <div className=" flex items-center">
                      <BuildingOfficeIcon height="20" width="20" />
                      <h3 className="text-xs font-light pl-2 md:text-sm lg:text-md">
                        {loadedData.woty_name}
                      </h3>
                    </div>
                    <div className=" flex  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clip-rule="evenodd"
                        />
                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                      </svg>
                      <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">
                        {loadedData.jopo_min_experience} -{" "}
                        {loadedData.jopo_max_experience} Tahun
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                    <div className=" flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">
                        {loadedData.city_name}, {loadedData.prov_name}
                      </h3>
                    </div>
                    <div className=" flex items-center">
                      <ClockIcon height="20" width="20" />
                      <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">
                        {timeAgoString}
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 pt-5 max-w-lg">
                    <div className="flex items-center">
                      <button
                        onClick={handleClick}
                        disabled={isPressed}
                        className={`text-sm font-bold text-white p-1.5 w-28 justify-center  ${
                          isPressed
                            ? "bg-gray-300"
                            : "bg-blue-500  hover:bg-blue-500"
                        } shadow-md rounded-lg border border-blue-200 md:px-12 md:py-1 flex items-center`}
                      >
                        Apply
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center">
                        <ShareIcon
                          height="25"
                          width="25"
                          className="fill-current"
                        />
                        <p className="text-lg font-semibold pl-1">Share</p>
                        <ChevronRightIcon height="20" width="20" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section Nama Perusahaan End   */}

          {/* Section Description Start    */}
          <section className="pt-6 pb-6">
            <div className="container">
              <div className="flex flex-wrap">
                <div className="w-full ">
                  <h1 className="text-lg mb-5 md:text-xl lg:text-2xl">
                    Description
                  </h1>
                  {/* <p className="font-medium text-sm max-w-2xl mb-16 md:text-lg">
                    {loadedData.jopo_description}
                  </p> */}
                  <div
                    className="font-base text-sm max-w-2xl mb-10 md:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: loadedData.jopo_description,
                    }}
                  />

                  <h1 className="text-lg mb-5 md:text-xl lg:text-2xl">
                    Primary Skills
                  </h1>
                  <div className="flex gap-2">
                    {PrimaySkillArray.map((option: any) => (
                      <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">
                        {option.primarySkill}
                      </p>
                    ))}
                  </div>

                  <h1 className="pt-5 text-lg mb-5 md:text-xl lg:text-2xl">
                    Seconday Skills
                  </h1>
                  <div className="flex gap-2 items-center">
                    {SecondSkillArray.map((option: any) => (
                      <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">
                        {option.secondarySkill}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section Description End    */}

          {/* Section Tentang Perusahaan Start    */}
          <section className="pt-6 pb-6">
            <div className="container">
              <div className="flex flex-wrap">
                <div className="w-full border border-slate-500 px-3 py-2 shadow-lg">
                  <h1 className="text-lg md:text-xl lg:text-2xl pb-6">
                    Tentang Perusahaan
                  </h1>
                  <div className="pb-3 md:pb-4 lg:pb-12">
                    <img
                      src={`http://localhost:3001/public/jobhire/${loadedData.jopho_filename}`}
                      alt="gambar"
                      height={80}
                      width={80}
                      className="float-left h-20 w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28"
                    />
                    <div className="grid grid-cols-1 pl-2">
                      <h1 className="text-lg font-semibold pb-2 md:text-xl">
                        {loadedData.clit_name}
                      </h1>
                      <h2 className="text-sm font-light pb-2 md:text-lg">
                        {loadedData.indu_name}
                      </h2>
                      <h3 className="text-sm font-light md:text-lg">
                        {loadedData.emra_range_min} -{" "}
                        {loadedData.emra_range_max} Karyawan
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm max-w-xl pb-6 md:text-lg">
                    {loadedData.clit_about}
                  </p>
                  <h1 className="text-lg font-semibold md:text-xl lg:text-2xl pb-3">
                    Address
                  </h1>
                  <p className="text-sm max-w-xl pb-6 md:text-lg">
                    {loadedData.addr_line1}
                    <br></br>
                    {loadedData.addr_line2}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Section Tentang Perusahaan Start    */}
        </div>

        <div className="container">
          <div className="xl:pl-48 lg:pl-10 md:pl-0 py-6 md:pt-28">
            <h1 className="text-lg font-semibold pb-3">
              Similiar jobs for you
            </h1>
            <CardJob dataArray={currentItems}></CardJob>
          </div>
        </div>
      </div>
    );
  }
};

JobDetail.Layout = "User";
export default JobDetail;
