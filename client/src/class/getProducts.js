import axios from "axios";
import { isAuth } from "./storage";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

export const getMarchentList = async () => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getmarchentlists`,
      data: {
        company_id: isAuth().company_id,
      },
    });
    return result.data.marchentList;
  } catch (error) {
    return false;
  }
};

export const getAdminList = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/getadminlists`,
    });
    return result.data.companyList;
  } catch (error) {
    return false;
  }
};

export const getManList = async () => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getmanlists`,
      data: {
        company_id: isAuth().company_id,
      },
    });
    return result.data.marchentList;
  } catch (error) {
    return false;
  }
};

export const getAllProducts = async (id, role, company_id) => {
  //console.log(company_id);

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getproducts`,
      data: {
        id,
        role,
        company_id,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const getAllSproducts = async () => {
  //console.log(company_id);

  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/getsproducts`,
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const getAllPayment = async (id, role, company_id) => {
  //console.log(company_id);

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getpayment`,
      data: {
        id,
        role,
        company_id,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const getsAllPayment = async () => {
  //console.log(company_id);

  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/getspayment`,
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const updateProduct = async (product_id, stats) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updateproductstatus`,
      data: {
        product_id,
        stats,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const updatePaidStatus = async (product_id, paid) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updateproductpaidstatus`,
      data: {
        product_id,
        paid,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};
