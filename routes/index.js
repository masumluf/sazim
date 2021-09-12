const express = require("express");

const router = express.Router();
const {
  helloWorld,
  fetchAllProducts,
  fetchProductById,
  signUp,
  signIn,
  getProfile,
  profileUpdate,
  getSubjectName,
  getTeacherBySubject,
  addSubjectToProfile,
  subjectEnrolment,
  arrangeMark,
  markUpdate,
  makeGroup,
} = require("../controller");
const { checkUniqueEmail } = require("../helper/middleware");

router.get("/", helloWorld);

router.get("/products", fetchAllProducts);

router.get("/products/:id", fetchProductById);

router.get("/profile/:id", getProfile);
router.put("/profile/update", profileUpdate);
router.post("/signup", checkUniqueEmail, signUp);
router.post("/signin", signIn);
router.get("/subject", getSubjectName);
router.get("/teacher/:id", getTeacherBySubject);
router.get("/subject/:subjectid/:id", addSubjectToProfile);
router.get("/mark/:subjectId/:id", arrangeMark);
router.get("/enrolment/:subjectId/:teacherId/:id", subjectEnrolment);
router.put("/mark/update", markUpdate);
router.get("/group/:subjectId/:teacherId/:magicNumber", makeGroup);

module.exports = router;
