import axios from "axios";

import { authenticate, getCookie, isAuth } from "./storage";
import history from "./history";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require("dotenv").config();

toast.configure();

export const signIn = async (e, values, setValues) => {
  e.preventDefault();

  let { email, password } = values;
  setValues({ ...values, buttonText: "Requesting.." });

  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/signin`,
      data: { email, password },
    });

    if (result.status === 240) {
      return setValues({
        ...values,
        errors: { email: "User Not Found" },
      });
    }
    if (result.status === 244) {
      return setValues({
        ...values,
        errors: { email: "Wrong Credentials" },
      });
    }

    if (result.status === 250) {
      return setValues({
        ...values,
        errors: { email: "Token Generation Failed" },
      });
    }

    if (result) {
      toast.success(result.data.message);
      authenticate(result, () => {
        //console.log(result?.data?.user?.role);
        window.location.href =
          result?.data?.user?.role === "teacher" ? "/admin" : "/home";
      });
    }
  } catch (e) {
    //console.log(e.response.data.message);
    //toast.error(e.response.data.message);
    setValues({ ...values, buttonText: "SIGN IN" });
  }
};

export const UserReg = async (values, setValues) => {
  let { first_name, last_name, phone, address, email, password, role } = values;

  //const token = getCookie("token");
  //console.log(token);

  try {
    let result = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      first_name,
      last_name,
      phone,
      address,
      email,
      password,
      role,
    });

    if (result.status === 240) {
      return setValues({
        ...values,
        errors: { email: "Email Address Already In Use" },
      });
    }

    if (result.status === 201) {
      setValues({
        ...values,
        first_name: null,
        last_name: null,
        phone: null,
        address: null,
        email: null,
        password: null,
        errors: {},
      });
      console.log(result);
      toast.success("User Successfully Created.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Sorry Failed to add");
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
    }
  } catch (e) {
    toast.error("Sorry Failed to Deleted.");
  }
};

export const getUsers = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/profile/${isAuth()?.id}`,
    });
    if (result) {
      return result.data;
    }
  } catch (e) {
    //console.log(e);
    toast.error("Something is Wrong. We are working on it");
    return {};
  }
};

export const updateProfile = async (values, setValues) => {
  let { id, first_name, last_name, phone, address, email, password, role } =
    values;

  //const token = getCookie("token");
  //console.log(token);

  try {
    let result = await axios.put(
      `${process.env.REACT_APP_API_URL}/profile/update`,
      {
        id,
        first_name,
        last_name,
        phone,
        address,
        email,
        password,
        role,
      },
    );

    if (result.status === 240) {
      return setValues({
        ...values,
        errors: { email: "Email Address Already In Use" },
      });
    }

    if (result.status === 201) {
      setValues({
        ...values,

        errors: {},
      });
      console.log(result);
      toast.success("User Information Successfully Updated.");
    }
  } catch (err) {
    console.log(err);
    toast.error("Sorry Failed to add");
  }
};

export const getSubjectList = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/subject`,
    });
    if (result) {
      return result.data;
    }
  } catch (error) {
    return [];
  }
};

export const getTeacherList = async (id) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/teacher/${id}`,
    });
    if (result) {
      return result.data;
    }
  } catch (error) {
    return [];
  }
};

export const addSubjectToProfile = async (subjectid) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/subject/${subjectid}/${
        isAuth()?.id
      }`,
    });
    if (result.status === 201) {
      return toast.success("Subject Added Successfully");
    }
    if (result.status === 203) {
      return toast.error("You Already Enrolled For This Subject");
    }
  } catch (error) {
    return toast.error("Failed To Add");
  }
};

export const studentEnrolment = async (subjectId, teacherId) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${
        process.env.REACT_APP_API_URL
      }/enrolment/${subjectId}/${teacherId}/${isAuth()?.id}`,
    });
    if (result.status === 201) {
      return toast.success("Subject Added Successfully");
    }
    if (result.status === 203) {
      return toast.error("You Already Enrolled For This Subject");
    }
    if (result.status === 204) {
      return toast.success("Maximum Student Enrolled, Please Try Next Time");
    }
  } catch (error) {
    return toast.error("Failed To Add");
  }
};

export const arrangeMark = async (subjectid) => {
  console.log(subjectid);
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/mark/${subjectid}/${isAuth()?.id}`,
    });
    if (result.status === 201) {
      toast.error("Sorry You Have Not Enrolled of This Subject");
      return [];
    }
    return result.data;
  } catch (error) {
    toast.error("Failed To Add");
    return [];
  }
};

export const updateStudentMark = async (id, grade) => {
  //console.log(subjectid);
  try {
    let result = await axios.put(
      `${process.env.REACT_APP_API_URL}/mark/update`,
      {
        id,
        grade,
      },
    );

    return result.data;
  } catch (error) {
    toast.error("Failed To Add");
    return [];
  }
};

export const makeGroupList = async (subjectid, magicNumber) => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/group/${subjectid}/${
        isAuth()?.id
      }/${magicNumber}`,
    });
    if (result.status === 204) {
      toast.error("Sorry Nothing Found");
      return [];
    }

    if (result.status === 206) {
      toast.error("Enrolment still less than 12");
      return [];
    }

    if (result.status === 203) {
      toast.error("Sorry Failed to Group. Please Change the MagicNumber");
      return [];
    }
    return result.data;
  } catch (error) {
    toast.error("Server Busy");
    return [];
  }
};
