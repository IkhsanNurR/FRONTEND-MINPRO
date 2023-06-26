import axios from "../../config/endPoint";

//semua data
const getallCat = () => {
  return axios.get("category");
};

const getallSkillType = () => {
  return axios
    .get("skill-type")
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};
const updateCat = (data: any) => {
  // console.log("DATA API", data);
  return axios.patch(`category/${data.cate_id}`, data);
};

const createCat = (data: any) => {
  console.log(data);
  return axios.post(`category`, data);
};
const delCat = (id: any) => {
  console.log(id);
  return axios.delete(`category/${id}`);
};

const createSkillType = (data: any) => {
  console.log("api", data);
  return axios.post(`skill-type`, data);
};

const delSkillType = (data: any) => {
  console.log("del", data);
  return axios.delete(`skill-type/${data.skty_name}`);
};

const updateSkillType = (data: any) => {
  console.log(data);
  return axios.patch(`skill-type/${data.skty_name}`, data);
};

//skill _ tempelete
const getallSkillTemplete = () => {
  return axios.get("skill-template");
};
const delSKillTemplete = (id: any) => {
  return axios.delete(`skill-template/${id}`);
};

const createST = (data: any) => {
  return axios.post(`skill-template`, data);
};
const updateST = (data: any) => {
  console.log(data);
  return axios.patch(`skill-template/${data.skte_id}`, data);
};

//modules
const getModule = () => {
  return axios
    .get("modules")
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};

const createModule = (data: any) => {
  return axios.post("modules", data);
};

const delModule = (data: any) => {
  console.log("del", data);
  return axios.delete(`modules/${data}`);
};

const updateModule = (data: any) => {
  console.log("up", data);
  return axios.patch(`modules/${data.old_module_name}`, data);
};

// address type
const getAddressType = () => {
  return axios
    .get("address-type")
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};

const createAddType = (data: any) => {
  return axios.post("address-type", data);
};

const updateAddressType = (data: any) => {
  console.log("sampe sini ", data);
  return axios.patch(`address-type/${data.adty_id}`, data);
};

const deleteAddressType = (id: any) => {
  console.log("sampe sini ", id);
  return axios.delete(`address-type/${id}`);
};
//route-actions

const getRouteActions = () => {
  return axios.get("route-actions");
};

const delRouteActions = (id: number) => {
  return axios.delete(`route-actions/${id}`);
};

const createRA = (data: any) => {
  console.log("api", data);
  return axios.post("route-actions", data);
};

const updateRA = (data: any) => {
  return axios.patch(`route-actions/${data.roac_id}`, data);
};
const updateDisplayRA = (data: any) => {
  console.log(data);
  return axios.patch(`route-actions/display/${data.roac_id}`, data);
};

//country
const getCountry = () => {
  return axios.get("country");
};
const createCountry = (data: any) => {
  return axios.post("country", data);
};
const DelCountry = (data: any) => {
  return axios.delete(`country/${data}`);
};
const updateCountry = (data: any) => {
  console.log("object", data);
  return axios.patch(`country/${data.old_country_code}`, data);
};
// province

const getProv = () => {
  return axios.get("provinces");
};

const delProv = (data: any) => {
  return axios.delete(`provinces/${data}`);
};

const createProv = (data: any) => {
  return axios.post("provinces", data);
};

const updateProv = (data: any) => {
  console.log("update", data);
  return axios.patch(`provinces/${data.prov_id}`, data);
};
// city
const getCity = () => {
  return axios.get("city");
};

const delCity = (data: any) => {
  console.log(data);
  return axios.delete(`city/${data}`);
};

const createCity = (data: any) => {
  console.log("city", data);
  return axios.post("city", data);
};

const updateCity = (data: any) => {
  return axios.patch(`city/${data.city_id}`, data);
};

export default {
  updateProv,
  updateCity,
  createCity,
  createProv,
  delCity,
  delProv,
  getProv,
  getCity,
  delCat,
  getallCat,
  getallSkillType,
  getallSkillTemplete,
  updateCat,
  createCat,
  createSkillType,
  delSkillType,
  updateSkillType,
  getModule,
  getAddressType,
  getRouteActions,
  getCountry,
  createAddType,
  updateAddressType,
  deleteAddressType,
  DelCountry,
  createCountry,
  updateCountry,
  createModule,
  delModule,
  updateModule,
  delSKillTemplete,
  delRouteActions,
  createRA,
  updateRA,
  createST,
  updateST,
  updateDisplayRA,
};
