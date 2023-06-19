import React, { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import img from "../.././../../../../public/Bimoli.jpg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useForm } from "react-hook-form";
import { MyPage } from "@/components/types";
import loading from "../../../../../../public/loading-infinite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  reqEvaluationDetail,
  reqGetBootcampById,
  reqGetTraineeById,
} from "@/redux/bootcampSchema/action/actionReducer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Button } from "@mui/material";
import dataDummy from '../../../../../data'
import dayjs from "dayjs";

const DetailEvaluation: MyPage = (props: any) => {
  let { trainee, message, refresh, status } = useSelector(
    (state: any) => state.traineeReducer
  );

  // console.log('datadummy',dataDummy)

  const [loadedData, setLoadedData]: any = useState(null);
  const router = useRouter();
  const query = router.query;
  const trainee_id = query.trainee_id;
  const batch_id = query.batch_id;
  // console.log('evaluation',trainee)

  const dispatch = useDispatch();
  useEffect(() => {
    if (router.isReady) {
      const data = { batch_id: batch_id, trainee_id: trainee_id };
      dispatch(reqGetTraineeById(data));
    }
  }, [refresh, router.isReady]);

  useEffect(() => {
    setLoadedData(trainee[0]);
  }, [trainee]);

  type FormValues = {
    fundamental: number;
    oop: number;
    database: number;
    communication: number;
    teamwork: number;
    selfLearning: number;
    gerak: number;
    pembawaan: number;
    nada: number;
  };
  const [expanded, setExpanded]: any = useState([]);
  const [score, SetScore] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  // console.log(loadedData)

  const handleReviewDetail = async (data: any) => {
    try {
      // console.log('data', data)


      const values = Object.values(data);
      const jumlah: any = values.reduce((acc: any, item: any) => {
        return acc + parseInt(item);
      }, 0);
      const Hasilscore: any = Math.ceil((jumlah / 36) * 100);
      SetScore(Hasilscore);
    } catch (error: any) {}
    // console.log(score)
    const batr_total_score = score;
    const batch_id = loadedData.batch_id;
    const trainee_id = loadedData.trainee_id;
    // const batch_entity_id = loadedData.batch_entity_id
    const fullname = loadedData.fullname

    // type SubType = Record<string, number>;

    type SubType = {
      technical: Record<string, number>;
      softskill: Record<string, number>;
      presentation: Record<string, number>;
    };

    const start = dayjs(loadedData.batch_start_date)
    const end = dayjs(loadedData.batch_end_date)
    const btev_week = end.diff(start, 'week')
    console.log('week',btev_week)

    const hardskillData = [
      {
        btev_type: 'hardskill',
        btev_header: loadedData.batch_name,
        btev_section: 'technical',
        btev_skill: 'fundamental',
        btev_week: btev_week,
        btev_skor: parseInt(data.fundamental),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'hardskill',
        btev_header: loadedData.batch_name,
        btev_section: 'technical',
        btev_skill: 'oop',
        btev_week: btev_week,
        btev_skor: parseInt(data.oop),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'hardskill',
        btev_header: loadedData.batch_name,
        btev_section: 'technical',
        btev_skill: 'database',
        btev_week: btev_week,
        btev_skor: parseInt(data.database),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
    ];
    
    const softskillData = [
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'softskill',
        btev_skill: 'communication',
        btev_week: btev_week,
        btev_skor: parseInt(data.communication),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'softskill',
        btev_skill: 'teamwork',
        btev_week: btev_week,
        btev_skor: parseInt(data.teamwork),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'softskill',
        btev_skill: 'selfLearning',
        btev_week: btev_week,
        btev_skor: parseInt(data.selfLearning),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
    ];
    
    const presentationData = [
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'presentation',
        btev_skill: 'gerak',
        btev_week: btev_week,
        btev_skor: parseInt(data.gerak),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'presentation',
        btev_skill: 'nada',
        btev_week: btev_week,
        btev_skor: parseInt(data.nada),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
      {
        btev_type: 'softskill',
        btev_header: loadedData.batch_name,
        btev_section: 'presentation',
        btev_skill: 'pembawaan',
        btev_week: btev_week,
        btev_skor: parseInt(data.pembawaan),
        btev_batch_id: data.batch_id,
        btev_trainee_entity_id: data.trainee_id,
      },
    ];
    
    const evaluation = [...hardskillData, ...softskillData, ...presentationData];

    // console.log(transformedData)

    // const sub: SubType = {
    //   technical : {
    //     fundamental: parseInt(data.fundamental),
    //     oop: parseInt(data.oop),
    //     database: parseInt(data.database),

    //   }, softskill: {
    //     communication: parseInt(data.communication),
    //     teamwork: parseInt(data.teamwork),
    //     selfLearning: parseInt(data.selfLearning),
    //   }, presentation : {
    //     gerak: parseInt(data.gerak),
    //     nada: parseInt(data.nada),
    //     pembawaan: parseInt(data.pembawaan),
    //   }
    // };

    // const evaluation = [
    //   { technical: sub.technical },
    //   { softskill: sub.softskill },
    //   { presentation: sub.presentation },
    // ];

    // const subArray = Object.keys(sub).map((key) => ({ key, value: sub[key] }));
    // const subArray = Object.keys(sub).map((key) => ({ key, value: sub[key as keyof SubType] }));
    let batr_status: any;
    if (batr_total_score < 50) {
      batr_status = "failed";
    } else if (batr_total_score >= 50 && batr_total_score < 75) {
      batr_status = "recommendation";
    } else {
      batr_status = "passed";
    }

    // console.log( score)
    // const parsingint = parseInt(sub)

    // const gabung = { batr_total_score, batch_id, trainee_id, batr_status, evaluation, batch_entity_id, fullname };
    const gabung = { batr_total_score, batch_id, trainee_id, batr_status, fullname, evaluation };
    console.log(gabung);
    dispatch(reqEvaluationDetail(gabung))
  };
  const onChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { id, value }: any = target;
    setValue(id, value);

    const values = getValues();
    const totalScore = Object.values(values).reduce((acc, item): any => {
      const parsedValue = parseInt(item.toString());
      if (!isNaN(parsedValue)) {
        return acc + parsedValue;
      } else {
        return acc;
      }
    }, 0);
    const newScore = Math.ceil((totalScore / 36) * 100);
    SetScore(newScore);
  };

  // useEffect(()=>{
  //   const values = getValues();
  //   const totalScore = Object.values(values).reduce((acc, item): any => {
  //     const parsedValue = parseInt(item.toString());
  //     if (!isNaN(parsedValue)) {
  //       return acc + parsedValue;
  //     } else {
  //       return acc;
  //     }
  //   }, 0);
  //   // console.log(totalScore)
  //   const newScore = Math.ceil((totalScore / 36) * 100);
  //   SetScore(newScore);
  // },[onChange])

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(
      isExpanded
        ? [...expanded, panel]
        : expanded.filter((item: any) => item !== panel)
    );
  };

  if (!loadedData) {
    return (
      <div className="mt-48 flex justify-center items-center">
        <Image src={loading} alt="loading" className="text-center" />
      </div>
    );
  } else {
    return (
      <div className="mt-20">
        <div className="bg-red-400 w-full pl-10 rounded-lg">
          <div className="pt-14 pb-14 grid grid-cols-4 gap-4">
            <Image
              src={img}
              className="rounded-full h-24 w-24 border-2 border-white bg-white shadow-sm p-2"
              alt="profile picture"
            />
            <div className="-ml-10">
              <h1 className="text-xl font-bold">{loadedData.fullname}</h1>
              <h3>
                {loadedData.program_title}, {loadedData.batch_name},{" "}
                {loadedData.status_trainee}
              </h3>
              <h3>
                {format(new Date(loadedData.batch_start_date), "dd MMMM yyyy")}{" "}
                until{" "}
                {format(new Date(loadedData.batch_end_date), "dd MMMM yyyy")}
              </h3>
            </div>
            <div className="text-base mt-6">
              <h3>{loadedData.school}</h3>
              <h3>{loadedData.field_study}</h3>
              <h3>{loadedData.grade}</h3>
            </div>
            <div className="text-base">
              <h3 className="text-3xl font-semibold mt-5">Score : {score}</h3>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(handleReviewDetail)}>
            <Accordion
              expanded={expanded.includes("panel1")}
              onChange={handleChange("panel1")}
              key="panel1"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  border: expanded !== "panel1" ? "1px solid #c2c2c2" : "none",
                  maxHeight: "10px",
                  // marginTop: "1px",
                }}
                className="shadow-b shadow-sm shadow-gray-400"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="font-semibold text-lg"
                >
                  Technical
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", marginLeft: "auto" }}
                  className="mr-4"
                >
                  (Scale 1-4)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2" id="panel1bh-content">
                  <label className="text-base mt-2" 
                  >Fundamental</label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    min="1"
                    max="4"
                    id="fundamental"
                    placeholder="0"
                    // defaultValue={1}
                    {...register("fundamental")}
                    // name="fundamental"

                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="oop" className="mt-2">
                    Object Oriented Programming (OOP)
                  </label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="oop"
                    min="1"
                    max="4"
                    {...register("oop")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="oop"

                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="database" className="mt-2">
                    Database
                  </label>
                  <input
                    type="number"
                    className=" placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="database"
                    min="1"
                    max="4"
                    // defaultValue={1}
                    placeholder="0"
                    {...register("database")}
                    // name="database"
                    onChange={onChange}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel2")}
              onChange={handleChange("panel2")}
              key="panel2"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                sx={{
                  border: expanded !== "panel1" ? "1px solid #c2c2c2" : "none",
                  maxHeight: "10px",
                }}
                className="shadow-b shadow-sm shadow-gray-400"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="font-semibold text-lg"
                >
                  Softskill
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", marginLeft: "auto" }}
                  className="mr-4"
                >
                  (Scale 1-4)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2" id="panel1bh-content">
                  <label className="text-base mt-2">Communication</label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    min="1"
                    max="4"
                    {...register("communication")}
                    id="communication"
                    // defaultValue={1}
                    placeholder="0"
                    // name="communication"
                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="teamwork" className="mt-2">
                    Teamwork
                  </label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="teamwork"
                    min="1"
                    max="4"
                    {...register("teamwork")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="teamwork"

                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="selfLearning" className="mt-2">
                    Self-Learning
                  </label>
                  <input
                    type="number"
                    className=" placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="selfLearning"
                    min="1"
                    max="4"
                    {...register("selfLearning")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="selfLearning"
                    onChange={onChange}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.includes("panel3")}
              onChange={handleChange("panel3")}
              key="panel3"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                sx={{
                  border: expanded !== "panel1" ? "1px solid #c2c2c2" : "none",
                  maxHeight: "10px",
                }}
                className="shadow-b shadow-sm shadow-gray-400"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="font-semibold text-lg"
                >
                  Presentation
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", marginLeft: "auto" }}
                  className="mr-4"
                >
                  (Scale 1-4)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2" id="panel1bh-content">
                  <label className="text-base mt-2">Gerak</label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    min="1"
                    max="4"
                    id="gerak"
                    {...register("gerak")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="gerak"
                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="pembawaan" className="mt-2">
                    Pembawaan
                  </label>
                  <input
                    type="number"
                    className="placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="pembawaan"
                    min="1"
                    max="4"
                    {...register("pembawaan")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="pembawaan"
                    onChange={onChange}
                  />
                </div>
                <div className="grid grid-cols-2 mt-2">
                  <label htmlFor="nada" className="mt-2">
                    Nada
                  </label>
                  <input
                    type="number"
                    className=" placeholder-text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-14"
                    id="nada"
                    min="1"
                    max="4"
                    {...register("nada")}
                    // defaultValue={1}
                    placeholder="0"
                    // name="nada"
                    onChange={onChange}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <div className="flex-row space-x-4 mt-4 ">
              <div className="flex justify-between">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  className="mt-4 mr-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Submit
                </Button>

                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="contained"
                  size="small"
                  className="mt-4 ml-2 mb-4 mr-4 bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

DetailEvaluation.Layout = "Admin";
export default DetailEvaluation;
