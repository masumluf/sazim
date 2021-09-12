import axios from "axios";
import { jsPDF } from "jspdf";
import { getCookie, authenticate, isAuth } from "./storage";
import history from "./history";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dev } from "../config";
require("dotenv").config();

toast.configure();

export const signIn = async (e, values, setValues) => {
  e.preventDefault();

  let { username, password, buttonText } = values;
  setValues({ ...values, buttonText: "Login.." });

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: { username, password },
    });
    if (result) {
      toast.success(result.data.message);
      authenticate(result, () => {
        window.location.href = "/auth/admin";
      });
    }
  } catch (e) {
    //console.log(e.response.data.message);
    toast.error(e.response.data.message);
    setValues({ ...values, buttonText: "Login" });
  }
};

export const checkFileSize = (event) => {
  let files = event.target.files;
  let size = 1000000;
  let err = "";
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      //err += files[x].type + "is too large, please pick a smaller file\n";
      return false;
    }
  }
  if (err !== "") {
    event.target.value = null;
    console.log(err);
    return false;
  }

  return true;
};

export const checkMimeType = (event) => {
  //getting file object

  let files = event.target.files;
  //console.log(files);

  //define message container
  let err = "";
  // list allow mime type
  const types = ["text/csv"];
  // loop access array
  for (let x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err += files[x].type + " is not a supported format\n";
      toast.error("Wrong File Extension. Only Image allowed.");
      return false;
    }
  }

  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    toast.error("Error Found.");
    console.log(err);
    return false;
  }
  return true;
};

export const UserReg = async (e, values, setValues) => {
  e.preventDefault();

  let {
    username,
    password,
    name,
    phone,
    age,
    address,
    area,
    gender,
    photo,
    join,
  } = values;

  let datas = new FormData();
  datas.append("username", username);
  datas.append("password", password);
  datas.append("name", name);
  datas.append("phone", phone);
  datas.append("age", age);
  datas.append("address", address);
  datas.append("area", area);
  datas.append("gender", gender);
  datas.append("join", join);
  datas.append("file", photo);
  //const token = getCookie("token");
  //console.log(token);

  try {
    const config = {
      headers: { "content-Type": "multipart/Form-data" },
    };

    let result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user-reg`,
      datas,
      config,
    );

    if (result) {
      setValues({
        ...values,
        username: "",
        password: "",
        name: "",
        phone: "",
        age: "",
        address: "",
        user: "",
        gender: "",
        photo: "",
        area: "",
        join: "",
        buttonText: "Submit",
      });
      toast.success("User Successfully Created.");
      return;
    }
  } catch (err) {
    toast.error("Sorry Failed to add");
    return;
  }
};

export const userDelete = async (id, setPhoneNumber) => {
  const token = getCookie("token");
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/delete-user`,
      data: { id, token },
    });
    if (result) {
      toast.info("User Successfully Deleted.");

      setPhoneNumber(Date.now());

      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    toast.error("Sorry Failed to Deleted.");

    return;
  }
};

export const getUser = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-user`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const getUsers = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-users`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const patientReg = async (e, values, setValues) => {
  e.preventDefault();

  let {
    username,
    password,
    name,
    phone,
    age,
    address,
    user,
    district,
    gender,
    photo,
  } = values;

  let datas = new FormData();
  datas.append("username", username);
  datas.append("password", password);
  datas.append("name", name);
  datas.append("phone", phone);
  datas.append("age", age);
  datas.append("address", address);
  datas.append("user", user);
  datas.append("gender", gender);
  datas.append("district", district);
  datas.append("file", photo);
  //const token = getCookie("token");
  //console.log(token);

  try {
    const config = {
      headers: { "content-Type": "multipart/Form-data" },
    };

    let result = await axios.post(
      `${process.env.REACT_APP_API_URL}/patient-reg`,
      datas,
      config,
    );

    if (result) {
      setValues({
        ...values,
        username: "",
        password: "",
        name: "",
        phone: "",
        age: "",
        address: "",
        user: "",
        gender: "",
        photo: "",
        area: "",
        join: "",
        buttonText: "Submit",
      });
      toast.success("User Successfully Created.");
      return;
    }
  } catch (err) {
    toast.error("Sorry Failed to add");
    return;
  }
};

export const updatePatient = async (
  e,
  values,
  setPhoneNumber,
  setValues,
  setOpen,
) => {
  e.preventDefault();

  let { id, name, phone, age, user, address, district, gender } = values;
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-patient-info`,
      data: {
        id,
        name,
        phone,
        age,
        user,
        address,
        district,
        gender,
      },
    });
    if (result) {
      toast.info("User Information Successfully Updated.");
      setValues({
        name: "",
        phone: "",
        age: "",
        address: "",
        user: "",
        gender: "",

        buttonText: "Update",
      });

      setPhoneNumber(Date.now());
      setOpen(false);
      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    console.log(e);
    toast.error("Sorry Failed to Update.");

    return;
  }
};

export const patientDelete = async (e, id, setPhoneNumber) => {
  e.preventDefault();
  if (window.confirm("Are You Sure Want To Delete This Post ?")) {
    try {
      let result = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/delete-user`,
        data: { id },
      });
      if (result) {
        toast.info("User Successfully Deleted.");

        setPhoneNumber(Date.now());

        //Router.push("/admin/posts/post");
        return;
      }
    } catch (e) {
      toast.error("Sorry Failed to Deleted.");

      return;
    }
  }
};

export const getPatient = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-patient`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const doctorReg = async (e, values, setValues) => {
  e.preventDefault();

  let {
    username,
    password,
    name,
    phone,
    age,
    address,
    area,
    district,
    education,
    gender,
    doctorType,
    photo,
    join,
  } = values;

  let datas = new FormData();
  datas.append("username", username);
  datas.append("password", password);
  datas.append("name", name);
  datas.append("phone", phone);
  datas.append("age", age);
  datas.append("address", address);
  datas.append("area", area);
  datas.append("gender", gender);
  datas.append("join", join);
  datas.append("district", district);
  datas.append("education", education);
  datas.append("doctorType", doctorType);
  datas.append("file", photo);
  //const token = getCookie("token");
  //console.log(token);

  try {
    const config = {
      headers: { "content-Type": "multipart/Form-data" },
    };

    let result = await axios.post(
      `${process.env.REACT_APP_API_URL}/doctor-reg`,
      datas,
      config,
    );

    if (result) {
      setValues({
        ...values,
        username: "",
        password: "",
        name: "",
        phone: "",
        age: "",
        address: "",
        user: "",
        gender: "",
        district: "",
        education: "",
        doctorType: "",
        photo: "",
        area: "",
        join: "",
        buttonText: "Submit",
      });
      toast.success("Doctor Successfully Created.");
      return;
    }
  } catch (err) {
    toast.error("Sorry Failed to add");
    return;
  }
};

export const updateDoctor = async (
  e,
  values,
  setPhoneNumber,
  setValues,
  setOpen,
) => {
  e.preventDefault();

  let {
    id,

    name,
    phone,
    age,
    address,
    area,
    district,
    education,
    gender,
    doctorType,

    join,
  } = values;
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-doctor-info`,
      data: {
        id,

        name,
        phone,
        age,
        address,
        area,
        district,
        education,
        gender,
        doctorType,

        join,
      },
    });
    if (result) {
      toast.info("Doctor Information Successfully Updated.");
      setValues({
        name: "",
        phone: "",
        age: "",
        address: "",
        area: "",
        district: "",
        education: "",
        gender: "",
        doctorType: "",

        join: "",
        buttonText: "Update",
      });

      setPhoneNumber(Date.now());
      setOpen(false);
      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    console.log(e);
    toast.error("Sorry Failed to Update.");

    return;
  }
};

export const doctorDelete = async (e, id, setPhoneNumber) => {
  e.preventDefault();
  if (window.confirm("Are You Sure Want To Delete This Post ?")) {
    try {
      let result = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/delete-user`,
        data: { id },
      });
      if (result) {
        toast.info("User Successfully Deleted.");

        setPhoneNumber(Date.now());

        //Router.push("/admin/posts/post");
        return;
      }
    } catch (e) {
      toast.error("Sorry Failed to Deleted.");

      return;
    }
  }
};

export const getDoctor = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-doctor`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const groupAdd = async (e, values, setValues) => {
  e.preventDefault();

  let { group } = values;

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-group`,
      data: {
        group,
      },
    });

    if (result) {
      setValues({
        ...values,
        group: "",
        buttonText: "Submit",
      });
      toast.success("Group Successfully Created.");
      return;
    }
  } catch (err) {
    toast.error("Sorry Failed to add");
    return;
  }
};

export const updateGroup = async (
  e,
  values,
  setPhoneNumber,
  setValues,
  setOpen,
) => {
  e.preventDefault();

  let { id, group } = values;
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-group`,
      data: {
        id,
        group,
      },
    });
    if (result) {
      toast.info("Group Information Successfully Updated.");
      setValues({
        group: "",
        buttonText: "Update",
      });

      setPhoneNumber(Date.now());
      setOpen(false);
      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    console.log(e);
    toast.error("Sorry Failed to Update.");

    return;
  }
};

export const groupDelete = async (e, id, setPhoneNumber) => {
  e.preventDefault();
  if (window.confirm("Are You Sure Want To Delete This Post ?")) {
    try {
      let result = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/delete-group`,
        data: { id },
      });
      if (result) {
        toast.info("Group Successfully Deleted.");

        setPhoneNumber(Date.now());

        //Router.push("/admin/posts/post");
        return;
      }
    } catch (e) {
      toast.error("Sorry Failed to Deleted.");

      return;
    }
  }
};

export const getGroup = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-group`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const medicineAdd = async (e, values, setValues) => {
  e.preventDefault();

  let { group, medicine } = values;

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-medicine`,
      data: {
        group,
        medicine,
      },
    });

    if (result) {
      setValues({
        ...values,
        group: "",
        medicine: "",
        buttonText: "Submit",
      });
      toast.success("Medicine Successfully Created.");
      return;
    }
  } catch (err) {
    toast.error("Sorry Failed to add");
    return;
  }
};

export const updateMedicine = async (
  e,
  values,
  setPhoneNumber,
  setValues,
  setOpen,
) => {
  e.preventDefault();

  let { id, group, medicine } = values;
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-medicine`,
      data: {
        id,
        group,
        medicine,
      },
    });
    if (result) {
      toast.info("Group Information Successfully Updated.");
      setValues({
        group: "",
        medicine: "",
        buttonText: "Update",
      });

      setPhoneNumber(Date.now());
      setOpen(false);
      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    console.log(e);
    toast.error("Sorry Failed to Update.");

    return;
  }
};

export const medicineDelete = async (e, id, setPhoneNumber) => {
  e.preventDefault();
  if (window.confirm("Are You Sure Want To Delete This Post ?")) {
    try {
      let result = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/delete-medicine`,
        data: { id },
      });
      if (result) {
        toast.info("Group Successfully Deleted.");

        setPhoneNumber(Date.now());

        //Router.push("/admin/posts/post");
        return;
      }
    } catch (e) {
      toast.error("Sorry Failed to Deleted.");

      return;
    }
  }
};

export const getMedicine = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-medicine`,
    });
    if (result) {
      setRows(result.data);
      return;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    setRows([]);
    return;
  }
};

export const checkLogin = async () => {
  if (getCookie("token")) {
    if (isAuth().role === "admin") {
      window.location.href = "/auth/admin";
    } else {
      window.location.href = "/dashboard";
    }
  } else {
    window.location.href = "/";
  }
};

export const callSocket = async (e, id) => {
  e.preventDefault();

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/call-socket`,
      data: { id },
    });
    if (result) {
      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    toast.error("Sorry Failed to Deleted.");

    return;
  }
};

export const uidMaker = () => {
  // var randomChars =
  //   "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  // var result = "";
  // for (var i = 0; i < 6; i++) {
  //   result += randomChars.charAt(
  //     Math.floor(Math.random() * randomChars.length),
  //   );
  // }
  let numberSeries=[1,2,3,4,5,6,7,8,9,0];
  return (
      Math.floor(10 + Math.random() * 100)+Math.random().toString(36).substring(2, 8).toUpperCase() +Math.floor(10 + Math.random() * 100)+
    Math.random().toString(36).substring(2, 4).toUpperCase()+Math.floor(10 + Math.random() * 100)
  );
};

export const addCost = async (e, values, setValues) => {
  e.preventDefault();

  let { cost,outSideCost, extraWeight, loader, errors } = values;

  let token = getCookie("token");

  if (!cost)
    return setValues({
      ...values,
      errors: { cost: "Cost Filed Must be Required" },
    });
  else
    setValues({
      ...values,
      errors: { cost: "" },
    });

  // if (Object.keys(errors).length > 0)
  setValues({ ...values, loader: true });
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-cost`,
      data: {
        cost,
        extraWeight,
        outSideCost,
        token,
      },
    });

    if (result) {
      setValues({
        ...values,
        cost: "",
        extraWeight: "",
        buttonText: "Add Cost",
        loader: false,
      });
      toast.success("Cost Successfully Added.");
      return;
    }
  } catch (err) {
    //console.log(err.response.data);

    setValues({
      ...values,
      loader: false,
      errors: err.response.data,
    });
    //toast.error("Sorry Failed to add");
    return;
  }
};

export const getCost = async (values, setValues, setFinalCharge = null) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-cost`,
    });
    if (result) {
      //console.log(result.data[0].cost);
      setFinalCharge(result.data[0].cost);
      setValues({
        ...values,
        fee: result.data[0].cost,
        outSideFee:result.data[0].outSideCost,
        extraWeight: result.data[0].extraWeight,
      });
      return;
    }
  } catch (error) {
    setFinalCharge(0);
    setValues({
      ...values,
      fee: 0,
      extraWeight: 0,
    });
    toast.error("Sorry Failed to Load");
  }
};

export const addProduct = async (values, setValues, finalCharge) => {
  //e.preventDefault();

  let {
    orderid,
    receiverName,
    description,
    cost,
    pickup,
    pickupAddress,
    receiverAddress,
    receiverPhone,
    express,
    expressTime,
    marchent,
    hub,
    deliveryman,
    buttonText,
    loader,
    weight,
    errors,
  } = values;

  if (!description)
    return setValues({
      ...values,
      errors: { description: "Please Enter Product Description " },
    });

  if (!receiverName)
    return setValues({
      ...values,
      errors: { receiverName: "Please Enter Receiver Name" },
    });

  if (!receiverAddress)
    return setValues({
      ...values,
      errors: { receiverAddress: "Please Enter Receiver Address" },
    });

  if (!receiverPhone)
    return setValues({
      ...values,
      errors: { receiverPhone: "Please Enter Receiver Phone" },
    });

  if (isAuth().role === "hub"){
    console.log(marchent);
    if (!marchent){
      toast.error("Please Select A Merchent");
      return setValues({
        ...values,
        errors: { marchent: "Please Select A Marchent" },
      });
    }


  }
  console.log("role");
  console.log(isAuth().role);
  // if (!deliveryman)
  //   return setValues({
  //     ...values,
  //     errors: { deliveryman: "Please Select A Deliveryman" },
  //   });

  let token = getCookie("token");

  let hubname = isAuth().name;

  try {
    setValues({
      ...values,

      loader: true,
    });
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/addproduct`,
      data: {
        orderid,
        receiverName,
        description,
        cost,
        receiverAddress,
        receiverPhone,
        express,
        expressTime,
        marchent,
        deliveryman,
        hub,
        pickup,
        pickupAddress,
        finalCharge,
        weight,
        hubname,
        token,
      },
    });

    if (result) {
      setValues({
        ...values,
        buttonText: "Add Product",
        loader: false,
      });
      toast.success("Product Successfully Added.");
      window.location.href = "/product";
      //history.push("/product");
      return true;
    }
  } catch (error) {
    setValues({
      ...values,
      loader: false,
      errors: error.response.data,
    });
    return false;
  }
};

export const updateProduct = async (values, setValues) => {
  let {
    id,
    orderid,
    receiverName,
    description,
    cost,
    hub,
    pickup,
    pickupAddress,
    hubname,
    receiverAddress,
    receiverPhone,
    express,
    expressTime,
    marchent,
    deliveryman,
    buttonText,
    finalCharge,
    loader,
    weight,
    errors,
  } = values;

  if (!description)
    return setValues({
      ...values,
      errors: { description: "Please Enter Product Description " },
    });

  if (!receiverName)
    return setValues({
      ...values,
      errors: { receiverName: "Please Enter Receiver Name" },
    });

  if (!receiverAddress)
    return setValues({
      ...values,
      errors: { receiverAddress: "Please Enter Receiver Address" },
    });

  if (!receiverPhone)
    return setValues({
      ...values,
      errors: { receiverPhone: "Please Enter Receiver Phone" },
    });

  let token = getCookie("token");

  try {
    setValues({
      ...values,

      loader: true,
    });
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updateproduct`,
      data: {
        id,
        orderid,
        pickup,
        pickupAddress,
        receiverName,
        description,
        cost,
        receiverAddress,
        receiverPhone,
        express,
        expressTime,
        marchent,
        deliveryman,
        hub,
        finalCharge,
        weight,
        token,
      },
    });

    if (result) {
      setValues({
        ...values,
        buttonText: "Update Product",
        loader: false,
      });
      toast.info("Product Successfully Added.");

      return true;
    }
  } catch (error) {
    setValues({
      ...values,
      loader: false,
      errors: error.response.data,
    });
    return false;
  }
};

export const addMan = async (e, values, setValues, setPhoneNumber, setOpen) => {
  e.preventDefault();
  let {
    name,
    nid,
    username,
    password,
    payment,
    address,
    phone,
    area,
    role,
    drivingLicense,
    bikeRegNumber,
    loader,
    errors,
  } = values;

  if (!name)
    return setValues({
      ...values,
      errors: { name: "Please Enter Name First " },
    });

  if (!address)
    return setValues({
      ...values,
      errors: { address: "Please Enter Address" },
    });

  if (!username)
    return setValues({
      ...values,
      errors: { username: "Please Enter Username" },
    });

  if (!password)
    return setValues({
      ...values,
      errors: { password: "Please Enter Password" },
    });

  if (!payment)
    return setValues({
      ...values,
      errors: { payment: "Please Enter Payment Details" },
    });

  if (!phone)
    return setValues({
      ...values,
      errors: { phone: "Please Enter Phone Number" },
    });

  if (!area)
    return setValues({
      ...values,
      errors: { area: "Please Enter Area" },
    });

  if (!nid)
    return setValues({
      ...values,
      errors: { nid: "Please Enter National ID Card Number" },
    });

  // console.log(address);

  let token = getCookie("token");
  try {
    setValues({
      ...values,

      loader: true,
    });
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-man`,
      data: {
        name,
        nid,
        username,
        password,
        payment,
        address,
        phone,
        area,
        drivingLicense,
        bikeRegNumber,
        role,
        token,
      },
    });

    if (result) {
      setValues({
        ...values,
        name: "",
        nid: "",
        username: "",
        password: "",
        payment: "",
        address: "",
        phone: "",
        area: "",
        drivingLicense: "",
        bikeRegNumber: "",
        buttonText: "Submit",
        loader: false,
      });
      toast.info("Record Successfully Added.");
      //window.location.href = "";
      setOpen(false);
      setPhoneNumber(Date.now());
      history.push(`/auth/${role}`);
      return;
    }
  } catch (error) {
    console.log(error);
    setValues({
      ...values,
      loader: false,
      errors: error.response.data,
    });
    toast.error("Operation Failed");
    return;
  }
};

export const addManPublic = async (e, values, setValues,) => {
  e.preventDefault();
  let {
    name,
    nid,
    username,
    password,
    payment,
    address,
    phone,
    area,
    role,
    drivingLicense,
    bikeRegNumber,
    loader,
    errors,
  } = values;

  if (!name)
    return setValues({
      ...values,
      errors: { name: "Please Enter Name First " },
    });

  if (!address)
    return setValues({
      ...values,
      errors: { address: "Please Enter Address" },
    });

  if (!username)
    return setValues({
      ...values,
      errors: { username: "Please Enter Username" },
    });

  if (!password)
    return setValues({
      ...values,
      errors: { password: "Please Enter Password" },
    });

  if (!payment)
    return setValues({
      ...values,
      errors: { payment: "Please Enter Payment Details" },
    });

  if (!phone)
    return setValues({
      ...values,
      errors: { phone: "Please Enter Phone Number" },
    });

  if (!area)
    return setValues({
      ...values,
      errors: { area: "Please Enter Area" },
    });

  if (!nid)
    return setValues({
      ...values,
      errors: { nid: "Please Enter National ID Card Number" },
    });

  // console.log(address);


  try {
    setValues({
      ...values,

      loader: true,
    });
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-man`,
      data: {
        name,
        nid,
        username,
        password,
        payment,
        address,
        phone,
        area,
        drivingLicense,
        bikeRegNumber,
        role,
      },
    });

    if (result) {
      setValues({
        ...values,
        name: "",
        nid: "",
        username: "",
        password: "",
        payment: "",
        address: "",
        phone: "",
        area: "",
        drivingLicense: "",
        bikeRegNumber: "",
        buttonText: "Submit",
        loader: false,
      });
      toast.info("Record Successfully Added.");
      window.location.href = "/";

      //history.push("/");
      return;
    }
  } catch (error) {
    console.log(error);
    setValues({
      ...values,
      loader: false,
      errors: error.response.data,
    });
    toast.error("Operation Failed");
    return;
  }
};

export const getList = async (role, setRows, setNewResult, token) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-list`,
      data: {
        role,
        token,
      },
    });

    setRows(result.data.manList);
    setNewResult(result.data.manList);
  } catch (error) {
    setRows([]);
    setNewResult([]);
    toast.error("Sorry Server Busy At The Moment.");
  }
};

export const updateUser = async (
  e,
  values,
  setValues,
  setPhoneNumber,
  setOpens,
) => {
  e.preventDefault();
  let {
    _id,
    name,
    nid,
    payment,
    address,
    phone,
    area,
    drivingLicense,
    bikeRegNumber,
    loader,
    errors,
  } = values;

  if (!name)
    return setValues({
      ...values,
      errors: { name: "Please Enter Name First " },
    });

  if (!address)
    return setValues({
      ...values,
      errors: { address: "Please Enter Address" },
    });

  if (!phone)
    return setValues({
      ...values,
      errors: { phone: "Please Enter Phone Number" },
    });
  if (!payment)
    return setValues({
      ...values,
      errors: { payment: "Please Enter Payment Details" },
    });

  if (!phone)
    return setValues({
      ...values,
      errors: { phone: "Please Enter Phone Number" },
    });

  if (!area)
    return setValues({
      ...values,
      errors: { area: "Please Enter Area" },
    });

  if (!nid)
    return setValues({
      ...values,
      errors: { nid: "Please Enter National ID Card Number" },
    });

  // console.log(address);

  let token = getCookie("token");
  try {
    setValues({
      ...values,

      loader: true,
    });
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-man`,
      data: {
        _id,
        name,
        nid,
        payment,
        address,
        phone,
        area,
        drivingLicense,
        bikeRegNumber,
        token,
      },
    });

    if (result) {
      setValues({
        ...values,

        buttonText: "Submit",
        loader: false,
      });
      toast.info("Record Successfully Updated.");
      setOpens(false);
      setPhoneNumber(Date.now());
      return;
    }
  } catch (error) {
    setValues({
      ...values,
      loader: false,
      errors: error.response.data,
    });
    toast.error("Operation Failed");
    return;
  }
};

export const getProduct = async (id, role, page, limit) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-product`,
      data: {
        id,
        role,
        page,
        limit,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return;
  }
};

export const addPayment = async (e, values, setValues) => {
  e.preventDefault();

  let { details, man, amount, trid, paymentType } = values;

  if (!details)
    return setValues({
      ...values,
      errors: { details: "Please Enter Something First " },
    });

  if (!man)
    return setValues({
      ...values,
      errors: { man: "Please Select Person First " },
    });

  if (!amount)
    return setValues({
      ...values,
      errors: { amount: "Please Enter amount First " },
    });

  let token = getCookie("token");

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-payment`,
      data: {
        details,
        man,
        amount,
        trid,
        paymentType,
        token,
      },
    });
    if (result) {
      toast.info("Payment Successfully Added.");
      setValues({
        ...values,
        details: "",
        man: "",
        amount: "",
        trid: "",
        paymentType: "",
        buttonText: "Submit",
        loader: false,
        errors: {},
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Failed to Add");
    return false;
  }
};

export const getPayment = async (date1 = null, date2 = null) => {
  const token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getpayment`,
      data: {
        date1,
        date2,
        token,
      },
    });

    return result.data;
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};

export const updatePayment = async (e, values, setValues) => {
  e.preventDefault();

  let { id, details, man, amount, trid, paymentType } = values;

  if (!details)
    return setValues({
      ...values,
      errors: { details: "Please Enter Something First " },
    });

  if (!man)
    return setValues({
      ...values,
      errors: { man: "Please Select Person First " },
    });

  if (!amount)
    return setValues({
      ...values,
      errors: { amount: "Please Enter amount First " },
    });

  let token = getCookie("token");

  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-payment`,
      data: {
        id,
        details,
        man,
        amount,
        trid,
        paymentType,
        token,
      },
    });
    if (result) {
      toast.info("Payment Successfully Added.");
      setValues({
        ...values,
        details: "",
        man: "",
        amount: "",
        trid: "",
        paymentType: "",
        buttonText: "Submit",
        loader: false,
        errors: {},
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Failed to Add");
    return false;
  }
};

export const getPeople = async (id, setProductStatus) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/getpeople`,
      data: { id },
    });
    if (result) {
      setProductStatus(result.data.productStatus);
      return true;
    }
  } catch (e) {
    toast.error("Sorry Server Busy At The Moment.");

    return false;
  }
};

export const deletePayment = async (id) => {
  const token = getCookie("token");
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/delete-payment`,
      data: { id, token },
    });
    if (result) {
      toast.info("Data Successfully Deleted.");

      //Router.push("/admin/posts/post");
      return;
    }
  } catch (e) {
    toast.error("Sorry Failed to Deleted.");

    return;
  }
};

export const updateProductStatus = async (
  e,
  id,
  productStatus,
  returnReason = "",
) => {
  e.preventDefault();
  try {
    if (!id) return false;
    else if (!productStatus) return false;

    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updateproductstatus`,
      data: { id, productStatus, returnReason },
    });
    if (result) {
      toast.info("Product Status Successfully Updated");
      return true;
    }
  } catch (e) {
    toast.error("Failed to Update");
    return false;
  }
};

export const updatePickupStatus = async (e, id, man) => {
  e.preventDefault();
  try {
    if (!id) return false;

    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updatepickupstatus`,
      data: { id, man },
    });
    if (result) {
      toast.info("Pickup Status Successfully Updated");
      return true;
    }
  } catch (e) {
    toast.error("Failed to Update");
    return false;
  }
};

export const findProductByStatus = async (status) => {
  const token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/findproductbystatus`,
      data: { status, token },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    return [];
  }
};

export const getNotification = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-notification`,
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    toast.error("Failed to fetch Data");
    return [];
  }
};

export const productReport = async (
  date1,
  date2,
  branch,
  status,
  values,
  setValues,
) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/productreport`,
      data: { date1, date2, branch, status },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const hubReport = async (date1, date2, status, values, setValues) => {
  let branch = isAuth()._id;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/productreport`,
      data: { date1, date2, branch, status },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const productSearch = async (values, setValues) => {
  let token = getCookie("token");
  let { date1, date2, status } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/product-search`,
      data: { date1, date2, status, token },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const otherReport = async (date1, date2, status, values, setValues) => {
  let branch = isAuth()._id;
  let tb = isAuth().role;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/productreport`,
      data: { date1, date2, branch, status, tb },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const userReport = async (values, setValues) => {
  let { date1, date2, status } = values;
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/userreport`,
      data: { date1, date2, status, token },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const profit = async (values, setValues) => {
  let { date1, date2 } = values;
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/profit`,
      data: { date1, date2 },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const getRandomLocation = async (setRows) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/view-random-location`,
    });
    if (result) {
      return setRows(result.data);
    }
  } catch (e) {
    console.log(e);
    return setRows([]);
  }
};

export const disableUser = async (id, action) => {
  const token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/disable-user`,
      data: {
        id,
        action,
      },
    });
    toast.success(`User Successfully ${action ? "Enabled" : "Disabled"}`);
    return true;
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return false;
  }
};

export const getProfile = async () => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-profile`,
      data: {
        token,
      },
    });

    return result.data;
  } catch (e) {
    return {};
  }
};

export const singleProfile = async (id) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/single-profile`,
      data: {
        id,
      },
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    return {};
  }
};

export const statistics = async (values, setValues, token) => {
  let { date1, date2, branch, man, marchent } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/statistics`,
      data: {
        date1,
        date2,
        branch: isAuth().role === "admin" ? branch : isAuth()._id,
        man,
        marchent,

        token,
      },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return [];
  }
};

export const addBalance = async (values, setValues) => {
  let { details, amount, trId, man } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-receive-payment`,
      data: {
        hub: isAuth()._id,
        details,
        amount,
        man,
        trId,
      },
    });

    return false;
  } catch (e) {
    return true;
  }
};

export const getBalance = async (token, page, limit) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-balance`,
      data: {
        token,
        page,
        limit,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};
export const updateBalance = async (values, setValues) => {
  let { id, details, amount, trId, man } = values;
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-balance`,
      data: {
        _id: id,
        details,
        amount,
        man,
        trId,
        token,
      },
    });

    setValues({ ...values, details: "", amount: "", trId: "", man: "" });

    return false;
  } catch (e) {
    return true;
  }
};
export const deleteBalance = async (_id) => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/delete-balance`,
      data: {
        _id,
        token,
      },
    });

    return false;
  } catch (e) {
    return true;
  }
};

export const getBalanceByDate = async (values, setValues) => {
  let { date1, date2, hub, man } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-balance-by-date`,
      data: {
        date1,
        date2,
        hub: isAuth().role === "hub" ? isAuth()._id : hub,
        man,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};

export const addExpense = async (values, setValues) => {
  let { details, amount, trId } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-expense`,
      data: {
        hub: isAuth()._id,
        details,
        amount,
        trId,
      },
    });

    setValues({ ...values, details: "", amount: "", trId: "" });

    return false;
  } catch (e) {
    return true;
  }
};

export const getExpense = async (token, page, limit) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-expense`,
      data: {
        token,
        page,
        limit,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};

export const updateExpense = async (values, setValues) => {
  let { id, details, amount, trId } = values;
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-expense`,
      data: {
        id,
        details,
        amount,
        trId,
        token,
      },
    });

    return false;
  } catch (e) {
    return true;
  }
};
export const deleteExpense = async (id) => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/delete-expense`,
      data: {
        id,
        token,
      },
    });

    return false;
  } catch (e) {
    return true;
  }
};

export const getExpenseByDate = async (values, setValues) => {
  let { date1, date2, hub } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-expense-by-date`,
      data: {
        date1,
        date2,
        hub: isAuth().role === "hub" ? isAuth()._id : hub,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};

export const searchOrderId = async (values, setValues) => {
  let { orderId } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/search-orderid`,
      data: {
        orderId,
      },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return {};
  }
};

export const openTicket = async (ticket) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/open-ticket`,
      data: {
        ticket,
      },
    });
    if (result) {
      toast.success("Ticket Successfully Created");
      return true;
    }
  } catch (e) {
    //console.log(e.response.data.error);
    toast.error("Failed to Open Ticket");
    return false;
  }
};

export const getTicket = async () => {
  try {
    let token = getCookie("token");
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-ticket`,
      data: {
        token,
      },
    });
    if (result) {
      //setResults();
      return result.data;
    }
  } catch (e) {
    toast.error("Sorry Server Busy At The Moment");
    return false;
  }
};

export const updateTicket = async (id, msg = "", status = 0) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-ticket`,
      data: {
        id,
        msg,
        status,
      },
    });
    if (result) {
      //setResults();
      if (status) {
        toast.info("Issue Has Been Solved");
        return false;
      } else {
        toast.info("Action Added");
        return false;
      }
    }
  } catch (e) {
    toast.error("Sorry Server Busy At The Moment");
    return true;
  }
};

/////

export const getHubPaymentByDate = async (values, setValues) => {
  let { date1, date2, hub } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-hub-payment-by-date`,
      data: {
        date1,
        date2,
        hub: isAuth().role === "hub" ? isAuth()._id : hub,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};

export const addHubPayment = async (values, setValues) => {
  let { details, amount, trId, date1, date2, hub } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-hub-payment`,
      data: {
        hub,
        details,
        amount,
        trId,
        date1,
        date2,
      },
    });

    setValues({
      ...values,
      details: "",
      amount: "",
      trId: "",
      date1: "",
      date2: "",
    });
    toast.success("Payment Added Successfully.");

    return false;
  } catch (e) {
    toast.error("Operation Failed.Server Busy");
    return true;
  }
};

export const getHubPayment = async (token, page, limit) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-hub-payment`,
      data: {
        token,
        page,
        limit,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Server Busy, Please Try Again ");
    return [];
  }
};

export const updateHubPayment = async (values, setValues) => {
  let { id, details, amount, trId, date1, date2, hub } = values;
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-hub-payment`,
      data: {
        id,
        details,
        amount,
        trId,
        date1,
        date2,
        hub,
        token,
      },
    });
    toast.success("Data Updated Successfully.");
    return false;
  } catch (e) {
    toast.error("Operation Failed.Server Busy");
    return true;
  }
};
export const deleteHubPayment = async (id) => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/delete-hub-payment`,
      data: {
        id,
        token,
      },
    });
    toast.success("Data Deleted Successfully");
    return false;
  } catch (e) {
    toast.error("Operation Failed.Server Busy");
    return true;
  }
};

export const mainGraph = async () => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/group-product`,
      data: {
        token,
      },
    });

    return result.data;
  } catch (e) {
    toast.error("Operation Failed.Server Busy");
    return [];
  }
};

export const hubOverView = async () => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/hub-group`,
    });

    return result.data;
  } catch (e) {
    return {};
  }
};

export const getInstantLocation = async (id) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-instant-location`,
      data: { id },
    });

    return result.data;
  } catch (e) {
    return false;
  }
};

export const grabLocation = async (lat, long) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/grab-location`,
      data: { lat, long },
    });

    return true;
  } catch (e) {
    return false;
  }
};

export const getFootPrint = async (id) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-footprint`,
      data: { id },
    });

    return result.data;
  } catch (e) {
    return false;
  }
};

export const addPickupOrder = async (values, setValues, man) => {
  let { orderid } = values;
  try {
    setValues({
      ...values,
      loader: true,
    });
    console.log(orderid, man);
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/add-pickup`,
      data: { orderid, man },
    });
    setValues({
      ...values,
      loader: false,
      orderid: "",
    });
    return false;
  } catch (e) {
    setValues({
      ...values,
      loader: false,
    });
    return true;
  }
};

export const getPickupDetails = async (setRows) => {
  let token = getCookie("token");
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-pickup`,
      data: { token },
    });
    setRows(result.data);
    return true;
  } catch (e) {
    return [];
  }
};

export const changePassword = async (values, setValues) => {
  let token = getCookie("token");
  let { password,username, confirmPassword } = values;
  try {
    setValues({
      ...values,
      loader: true,
    });
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/change-password`,
      data: { token, password,  username , confirmPassword },
    });
    setValues({
      ...values,
      loader: false,
    });
    toast.success("Password Successful Changed");
    return true;
  } catch (e) {
    toast.error("Sorry Failed to Change");
    setValues({
      ...values,
      loader: false,
      errors: { confirmPassword: e.response.data.error },
    });

    return false;
  }
};

export const traceOrder = async (values, setValues, setResult) => {
  let { orderid } = values;
  try {
    setValues({
      ...values,
      loader: true,
    });
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/trace-order`,
      data: { orderid },
    });
    setValues({
      ...values,
      loader: false,
    });

    return setResult(result.data);
  } catch (e) {
    console.log(e)
    setValues({
      ...values,
      loader: false,
      errors: { orderid: e.response.data.error },
    });

    return setResult({});
  }
};

export const getAllNotification = async (setRows) => {
  try {
    let results = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/get-all-notification`,
    });

    return setRows(results.data);
  } catch (e) {
    toast.error("Sorry Failed to Load Data");
    return setRows([]);
  }
};


export const updateHub = async (_id,hub) => {


  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/update-hub`,
      data: {
       _id,
        hub,
      },
    });
    toast.success("Data Updated Successfully.");
    return true;
  } catch (e) {
    toast.error("Operation Failed.Server Busy");
    return false;
  }
};


export const getBulkProduct = async (id, role, page, limit) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/get-bulk-product`,
      data: {
        id,
        role,
        page,
        limit,
      },
    });

    if (result) {
      return result.data;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};

export const addBulkProduct = async (products,man) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/bulk-product`,
      data: {
        products,
        man
      },
    });

    if (result) {
      return true;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return false;
  }
};


export const fetchSheet = async (man) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/sheet`,
      data: {
        man
      },
    });

    if (result) {
      return result.data;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};


export const marchentReportByProduct = async (date1, date2, branch, status, values, setValues) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/marchent-report`,
      data: {
        date1, date2, marchent:branch, status,
      },
    });

    if (result) {
      return result.data;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};



export const manReportByProduct = async (date1, date2, branch, status, values, setValues) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/man-report`,
      data: {
        date1, date2, marchent:branch, status,
      },
    });

    if (result) {
      return result.data;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};




export const downloadProductSheet = async (date1, date2, branch, status, values, setValues) => {
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/download/product`,
      data: {
        date1, date2, marchent:branch, status,
      },
    });

    if (result) {
      return result.data;
    }
  } catch (error) {
    toast.error("Sorry Server Busy At The Moment.");
    return [];
  }
};


export const ledger = async (values, setValues, token) => {
  let { date1, date2, marchent } = values;
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/ledger`,
      data: {
        date1,
        date2,
        marchent,
        token,
      },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    setValues({
      ...values,
      errors: e.response.data,
    });
    return {};
  }
};






export const uploadImage = async (img) => {
  let data = new FormData();

    data.append("file", img);
  try {
    let result = await axios.post(
        `${process.env.REACT_APP_API_URL}/file`,
        data
    );
    if (result) {
      // setValues({
      //   ...values,
      //   loader: false,
      // });
      toast.success("Information Successfully Updated");

      return true;
    }
  } catch (e) {
    //
    // console.log(e.response);
    // setValues({
    //   ...values,
    //   loader: false,
    //   errors: e.response.data.error,
    // });
    toast.error("Sorry Failed to Create.");

    return false;
  }
};



// export const downloadProductSheet = async (date1, date2, branch, status, values, setValues) => {
//   try {
//     let result = await axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_API_URL}/download/product`,
//       data: {
//         date1, date2, marchent:branch, status,
//       },
//     });
//
//     if (result) {
//       return result.data;
//     }
//   } catch (error) {
//     toast.error("Sorry Server Busy At The Moment.");
//     return [];
//   }
// };


export const getArea = async () => {

  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/area`,

    });
    if (result) {
      return result.data;
    }
  } catch (e) {

    return [];
  }
};


export const fetchArea = async (area) => {

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/area-fetch`,
      data: {
       area,
      },
    });
    if (result) {
      return result.data;
    }
  } catch (e) {

    return [];
  }
};


/// features functions

export const searchManReport = async (values,setValues) => {
  let {date2} = values;
  try {
    //setLoader(true);
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/search-man-report`,
      data: {
        username:date2,
      },
    });
    if (result) {
      //setLoader(false);
      return result.data;
    }
  } catch (e) {
    //setLoader(false);
    toast.error(e.response.data);
    setValues({
      ...values,
      date2:" ",
    });
    return {};
  }
};
