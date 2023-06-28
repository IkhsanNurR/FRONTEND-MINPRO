import { headers } from "next/dist/client/components/headers";
import axios from "@/config/endPoint";

const getCurriculum = () => {
  return axios.get(`curriculum/lala`);
};

const getEmployee = () => {
  return axios.get(`curriculum`);
};

const getCurriculumById = (id: any) => {
  return axios.get(`curriculum/lele/${id}`);
};
const createCurriculum = (data: any) => {
  return axios.post(`curriculum/tambah`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const updateCurriculum = (data: any) => {
  let id = data.get("prog_entity_id");
  return axios.patch(`curriculum/koko/${+id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getMaster = () => {
  return axios.get(`curriculum/category`);
};

const getCurrNum = () => {
  return axios.get(`curriculum/curr`);
};

const createSectionDetail = (id: any, data: any) => {
  return axios.post(`curriculum/section_detail/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createSection = async (data: any) => {
  try {
    // console.log(data);
    const result = await axios.post("/curriculum/section", data);
    // const { sect_id } = result.data;

    // return { sect_id };
    return result;
  } catch (error) {
    throw error;
  }
};

const sectionMerge = async () => {
  try {
    const response = await axios.get(`/curriculum/getMerged`);
    console.log("abg", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

const sectionMergeUp = async (id: any) => {
  try {
    console.log(id);
    const response = await axios.get(`/program-entity/getMergedUp/${id}`);
    console.log("abg", response.data.mergedData[0]);
    return response;
  } catch (error) {
    throw error;
  }
};
export default {
  getCurriculum,
  getCurriculumById,
  createCurriculum,
  getMaster,
  getCurrNum,
  updateCurriculum,
  createSection,
  createSectionDetail,
  sectionMerge,
  sectionMergeUp,
  getEmployee,
};
